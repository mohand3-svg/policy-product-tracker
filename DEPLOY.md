# Deploying the Stewardship Dashboard

The app is a single FastAPI service that serves both the JSON API (`/api/*`)
and the static frontend on one port. One container image, one port (`8080`).

## What it needs at runtime

| Env var | Required | Default | Purpose |
|---|---|---|---|
| `GITHUB_DEV_WINS` | **Yes** | — | Foundry bearer token (or use `FOUNDRY_TOKEN`) |
| `FOUNDRY_TOKEN` | alt | — | Alternative name for the bearer token |
| `FOUNDRY_HOST` | No | `https://gene.palantirfoundry.com` | Foundry base URL |
| `PORT` | No | `8080` | Listen port (platforms often inject this) |

> Security: the token grants read access to Foundry payer/policy data. Store it
> as a platform **Secret**, never in the image, git, or plain env manifests.
> Restrict the route to the Roche network / SSO — do not expose it publicly.

## Endpoints

- `GET /api/health` — config + Foundry connectivity (`"foundry":"ok"` when reachable)
- `GET /api/wins` — Policy Wins summary + rows
- `GET /api/dcr-utilization` — automation-adoption metrics
- `GET /` — static frontend

## Build the image

```bash
# From the repo root (the Dockerfile expects this context).
docker build -t stewardship-dashboard:latest .
# or: podman build -t stewardship-dashboard:latest .
```

## Run locally to verify

```bash
docker run --rm -p 8080:8080 -e GITHUB_DEV_WINS="<token>" stewardship-dashboard:latest
curl -s localhost:8080/api/health | jq .        # expect "foundry":"ok"
curl -s localhost:8080/api/dcr-utilization | jq .summary
```

## OpenShift

```bash
# 1) Create the secret (do NOT commit the token).
oc create secret generic foundry-token \
  --from-literal=GITHUB_DEV_WINS='<token>'

# 2) Build from source in-cluster (uses the repo Dockerfile).
oc new-app . --name=stewardship-dashboard --strategy=docker

# 3) Inject the secret as an env var.
oc set env deployment/stewardship-dashboard --from=secret/foundry-token

# 4) Expose it inside the Roche network (add SSO/auth per your platform).
oc expose service/stewardship-dashboard
oc get route stewardship-dashboard   # -> the shareable URL

# Probes (recommended)
oc set probe deployment/stewardship-dashboard \
  --readiness --get-url=http://:8080/api/health --initial-delay-seconds=15
oc set probe deployment/stewardship-dashboard \
  --liveness  --get-url=http://:8080/api/health --initial-delay-seconds=30
```

The image already runs as non-root (UID 1001, root group, group-writable
`/app`), so it is compatible with OpenShift's arbitrary-UID policy.

## Kubernetes (generic)

Push the image to your registry, then:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stewardship-dashboard
spec:
  replicas: 1
  selector:
    matchLabels: { app: stewardship-dashboard }
  template:
    metadata:
      labels: { app: stewardship-dashboard }
    spec:
      containers:
        - name: app
          image: <registry>/stewardship-dashboard:latest
          ports: [{ containerPort: 8080 }]
          env:
            - name: GITHUB_DEV_WINS
              valueFrom:
                secretKeyRef: { name: foundry-token, key: GITHUB_DEV_WINS }
          readinessProbe:
            httpGet: { path: /api/health, port: 8080 }
            initialDelaySeconds: 15
          livenessProbe:
            httpGet: { path: /api/health, port: 8080 }
            initialDelaySeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: stewardship-dashboard
spec:
  selector: { app: stewardship-dashboard }
  ports: [{ port: 80, targetPort: 8080 }]
```

Then expose via your Ingress/Route with Roche SSO in front.

## Notes

- The frontend calls the API with **relative** paths (`/api/...`), so it works
  behind any hostname/route with no rebuild.
- `/api/health` returns HTTP 200 even when Foundry is unreachable; check the
  `"foundry"` field (`"ok"` vs `"error"`) to distinguish app-up from data-up.
