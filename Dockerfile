# Stewardship Dashboard — single-image build.
# The FastAPI backend serves BOTH the JSON API (/api/*) and the static
# frontend (index.html, app.js, ...) on one port, so one container is enough.
#
# Layout note: backend/main.py computes STATIC_DIR as the parent of the
# backend/ directory, so the frontend files must sit one level ABOVE backend/.
# Here that is /app (frontend) and /app/backend (API code).
FROM python:3.12-slim

# No .pyc files, unbuffered logs (better for container log streams).
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080

WORKDIR /app

# Install Python deps first for better layer caching.
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Backend code.
COPY backend/ /app/backend/

# Static frontend (served from /app by StaticFiles).
COPY index.html app.js styles.css /app/
COPY dcr-detail.html dcr-detail.js form.css multi-form.html multi-form.js /app/

# Run as a non-root user (OpenShift assigns an arbitrary UID in the root group;
# make /app group-writable so that works too).
RUN chgrp -R 0 /app && chmod -R g=u /app
USER 1001

EXPOSE 8080

# Container-level healthcheck (K8s/OpenShift probes can also target /api/health).
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8080/api/health').status==200 else 1)"

WORKDIR /app/backend
# Honor $PORT (platforms often inject it); default 8080.
CMD ["sh", "-c", "exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
