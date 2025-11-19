# CI/CD Deployment Guide

## GitHub Actions Workflows

This project uses GitHub Actions for automated CI/CD with Docker.

### Available Workflows

1. **docker-build.yml** - Build and push Docker images
   - Runs on push to master/main
   - Lints backend code
   - Builds backend and frontend images
   - Pushes to GitHub Container Registry (GHCR)

2. **deploy.yml** - Deploy to production
   - Triggered on code push
   - Pulls latest Docker images
   - Generates deployment configuration

3. **code-quality.yml** - Code quality checks
   - Runs linting
   - Optional SonarCloud integration
   - Optional CodeCov integration

## Setup Instructions

### 1. Enable GitHub Container Registry

No setup needed - it's enabled by default for all repositories.

### 2. Create GitHub Token (if needed)

```bash
# Personal Access Token with scope: write:packages, read:packages
# Settings > Developer settings > Personal access tokens > Tokens (classic)
```

### 3. Docker Image Tags

Images are automatically tagged with:
- `latest` (for master branch)
- `branch-name` (for feature branches)
- `sha-{commit_sha}` (for commit reference)
- Semantic versioning (if using git tags like v1.0.0)

### 4. Pull and Run Images

```powershell
# Login to GitHub Container Registry
docker login ghcr.io -u USERNAME -p TOKEN

# Pull images
docker pull ghcr.io/ken1004-vnv/devop2_canhan/backend:latest
docker pull ghcr.io/ken1004-vnv/devop2_canhan/frontend:latest

# Run with docker-compose
docker-compose pull
docker-compose up -d
```

### 5. Environment Variables

Copy `.env.example` to `.env` in backend folder:

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your actual values
```

## GitHub Actions Secrets (Optional)

For advanced deployments, add these secrets to repository:

```
Settings > Secrets and variables > Actions > New repository secret
```

Available secrets:
- `DOCKER_REGISTRY` - Private docker registry URL
- `DOCKER_USERNAME` - Registry username
- `DOCKER_PASSWORD` - Registry password/token
- `SONAR_TOKEN` - SonarCloud token (for code quality)
- `DEPLOYMENT_KEY` - SSH key for production server

## Workflow Triggers

### Automatic Triggers:
- Push to master/main branch
- Pull requests to master/main
- Manual workflow dispatch (available in Actions tab)

### Conditional Deployments:
- Only pushes to master trigger Docker push
- Feature branches build only (don't push)
- Pull requests run tests only

## Monitoring Workflows

1. Go to repository on GitHub
2. Click "Actions" tab
3. View workflow runs and logs
4. Check for:
   - ✅ Workflow passed
   - ❌ Workflow failed
   - ⏳ Workflow running

## Troubleshooting

### Images not pushing?
- Check GitHub token has `write:packages` scope
- Verify repository is public or you have private registry access
- Check workflow logs for errors

### Build failures?
- Check Node.js dependencies in backend/package.json
- Ensure Dockerfile paths are correct
- Verify docker-compose.yml syntax

### Deployment issues?
- Pull images manually: `docker-compose pull`
- Check logs: `docker-compose logs`
- Verify environment variables in .env file

## Example: Manual Workflow Trigger

```bash
# Push code
git add .
git commit -m "Update application"
git push origin master

# GitHub Actions will automatically:
# 1. Run linting
# 2. Build Docker images
# 3. Push to GHCR
# 4. Generate deployment files
```

## Next Steps

1. ✅ Push code to GitHub (already done)
2. ✅ GitHub Actions workflows will run automatically
3. Monitor workflows in Actions tab
4. Pull latest images and deploy:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## Docker Image Locations

- **Backend**: `ghcr.io/ken1004-vnv/devop2_canhan/backend:latest`
- **Frontend**: `ghcr.io/ken1004-vnv/devop2_canhan/frontend:latest`
- **MongoDB**: `mongo:7` (from Docker Hub)

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
