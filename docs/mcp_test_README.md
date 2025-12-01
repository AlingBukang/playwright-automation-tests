# 🤖 AI Test Generation with Playwright MCP

This guide shows you how to set up and use Playwright's Model Context Protocol (MCP) to generate automated tests using AI. No more manual test writing - let AI explore your app and create comprehensive tests!

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- VS Code with GitHub Copilot extension enabled
- Docker and Docker Compose (for running the GL application)
- Git bash or compatible terminal

## 🔧 Initial Setup

### 1. Install & Configure

```bash
# Install MCP package
npm install @playwright/mcp@latest

# Verify setup
npm run verify-mcp
```

### 2. VS Code Setup

Add to your `.vscode/settings.json`:
```json
{
  "chat.mcp.enabled": true,
  "chat.tools.autoApprove": true
```

Add to your `.vscode/mcp.json`:
```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

**Note**: You can combine mcp settings into a settings.json file.

## ✨ Generate Tests

1. **Start your app**: `http://localhost:3000`
2. **Open VS Code Chat**: `Ctrl+Shift+I`
3. **Use the chat mode**: Load `.github/chatmodes/mcp.chatmode.md`
4. **Or use the prompt**: Load `.github/prompt/generate_tests.prompt.md`

## 🎯 Example Prompt

```
Generate a test for Chart of Accounts:
- Login with test user
- Navigate to Chart of Accounts
- Test the search functionality
- Create a new account
- Verify it appears in the list
```

## � Troubleshooting

**MCP not working?**
```bash
# Restart VS Code and try again
npm run verify-mcp
```

**Tests failing?**
- Make sure your app is running at `http://localhost:3000`
- Check your `.env` file has the correct password

That's it! The AI will explore your app and generate working tests automatically.
