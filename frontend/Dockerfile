# Use official nginx as base image
FROM nginx:alpine

# Copy frontend files
COPY . /usr/share/nginx/html/

# Copy custom nginx config from parent directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
