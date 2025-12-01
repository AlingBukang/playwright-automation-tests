# Testing GitHub Actions with Act

This guide explains how to test GitHub Actions workflows locally using [act](https://github.com/nektos/act).

## Prerequisites

- Docker Desktop installed and running
- Act CLI tool installed
- Access to Slack bot token for notification testing

## Installation

Install act using your preferred package manager:

**Windows (Chocolatey):**

```bash
choco install act-cli
```

**macOS (Homebrew):**

```bash
brew install act
```

**Linux:**

```bash
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

Verify installation:

```bash
act --version
```

## Quick Start

### Test Slack Notifications

```bash
act workflow_dispatch -W .github/workflows/test-slack-notification.yml \
  --secret SLACK_BOT_TOKEN=your_token_here
```

### Test Simplified Daily Regression

```bash
act workflow_dispatch -W .github/workflows/test-daily-regression-simplified.yml \
  --secret SLACK_BOT_TOKEN=your_token_here
```

### List Available Workflows

```bash
act --list
```

## Common Commands

### Basic Testing

```bash
# Test a specific workflow
act workflow_dispatch -W .github/workflows/daily-regression.yml

# List all workflows
act workflow_dispatch --list

# Verbose output for debugging
act workflow_dispatch --verbose
```

### Managing Secrets

**Option 1: Command line (recommended):**

```bash
act workflow_dispatch \
  --secret SLACK_BOT_TOKEN=xoxb-your-token \
  --secret OTHER_SECRET=value
```

**Option 2: Environment file:**

Create `.env` file:

```env
SLACK_BOT_TOKEN=xoxb-your-token
...other secrets
```

Then run:

```bash
act workflow_dispatch --env-file .env
```

## Available Test Workflows

| Workflow | Purpose | Required Secrets |
|----------|---------|------------------|
| `daily-regression.yml` | Full regression testing | All secrets listed above |
| `test-daily-regression-simplified.yml` | Test workflow logic only | `SLACK_BOT_TOKEN` |
| `test-slack-notification.yml` | Test Slack integration | `SLACK_BOT_TOKEN` |

## Troubleshooting

### Common Issues

**Docker permission errors:**

```bash
# Linux: Add user to docker group
sudo usermod -aG docker $USER
# Then logout and login
```

**Platform issues:**

```bash
# Specify platform explicitly
act workflow_dispatch -P ubuntu-latest=node:16-buster-slim
```

**Container cleanup:**

```bash
# Clean up containers and networks
docker container prune -f
docker network prune -f
```

### Debugging Tips

1. Use verbose output: `act workflow_dispatch --verbose`
2. Test syntax: `act workflow_dispatch --dryrun`
3. Keep containers: `act workflow_dispatch --reuse`
4. Test specific job: `act workflow_dispatch -j job_name`

## Example Test Session

Complete workflow testing example:

```bash
# 1. List available workflows
act --list

# 2. Test Slack notifications
act workflow_dispatch \
  -W .github/workflows/test-slack-notification.yml \
  --secret SLACK_BOT_TOKEN=your_token

# 3. Test complete workflow logic
act workflow_dispatch \
  -W .github/workflows/test-daily-regression-simplified.yml \
  --secret SLACK_BOT_TOKEN=your_token

# 4. Clean up
docker container prune -f
```

## Security Notes

- Never commit real secrets to version control
- Use dummy values for non-critical secrets in tests
- Keep `.env` files in `.gitignore`
- Use test Slack channels for notification testing

## Additional Resources

- [Act Documentation](https://github.com/nektos/act)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
