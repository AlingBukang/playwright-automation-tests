# GitHub Copilot Instructions

## Project Overview
Regression testing suite using Playwright, TypeScript, and Docker containers. Tests a microservices-based web application consisting of multiple complex modules.

## Autonomous Work Guidelines

### When I Can Work Independently
- **Simple Bug Fixes**: Syntax errors, type issues, import problems
- **Standard Test Cases**: CRUD operations, validation tests, smoke tests
- **Code Refactoring**: Following established patterns, improving readability
- **Documentation Updates**: Inline comments, JSDoc updates

### When I Need Human Review
- **Complex Business Logic**: Multi-step workflows, calculations
- **New Architecture**: Adding patterns or frameworks
- **Security Changes**: Authentication, authorization, data handling
- **Breaking Changes**: API modifications, schema changes

## Error Patterns & Quick Fixes

### CRITICAL: Always Use MCP to Explore First
**MANDATORY PROCESS FOR DEBUGGING UI ISSUES:**
1. **Use MCP Playwright tools** to explore the live application at http://localhost:3000
2. **Inspect actual DOM structure** before making assumptions
3. **Test interactions** to understand component behavior (dialogs, menus, portals)
4. **Verify selectors** match the real implementation
5. **NEVER assume** how UI components work without checking

### Playwright Timeouts
```typescript
// Problem: Times out
await page.locator('[data-testid="button"]').click();

// Fix: Add wait
await expect(page.locator('[data-testid="button"]')).toBeVisible();
await page.locator('[data-testid="button"]').click();
```

### Grid Loading Issues
```typescript
// Always wait for grid first
await this.grid.waitForLoad();
await this.grid.setFilter('searchTerm');
```

### Strict Mode Violations
```typescript
// Fix: Be specific
await page.locator('.menu-item').first().click();
```

### API Authentication
```typescript
// Always setup auth first
await api.setupAuthentication();
const response = await api.createData(data);
```

## Quick Templates

### Smoke Test
```typescript
test('[@smoke] loads page', async ({ modulePage }) => {
  await modulePage.navigateToPage();
  await modulePage.grid.waitForLoad();
  await expect(modulePage.getPageTitle()).toBeVisible();
});
```

### CRUD Test
```typescript
test('[@regression] CRUD operations', async ({ modulePage, moduleApi }) => {
  // Create via API
  const id = await moduleApi.createEntity(testData);

  // Verify in UI
  await modulePage.navigateToPage();
  const row = await modulePage.grid.getRowByCode(testData.code);
  await expect(row).toBeVisible();

  // Cleanup
  await moduleApi.deleteEntity(id);
});
```

### Validation Test
```typescript
test('[@regression] validates required field', async ({ modulePage }) => {
  await modulePage.openCreateDialog();
  await modulePage.dialog.clickSave();
  await expect(modulePage.dialog.getFieldError('name')).toContainText('Required');
});
```

## Decision Rules

### Architecture Choices
- **Page Objects**: Always for test interactions, never direct locators in tests
- **GridHelper**: Use for standard operations (filter, search, select)
- **Custom Code**: Only for module-specific behaviors not in GridHelper
- **API vs UI**: API for setup/cleanup, UI for testing workflows

### When to Use What
- **Traditional Methods**: Page object class methods
- **Arrow Functions**: Callbacks, utilities, event handlers
- **Web-First Locators**: Always use `page.locator()`, never `page.$()`
- **Strict Mode**: Use `.first()`, `.nth()`, `.last()` for multiple matches

## Quality Gates

### Before Changes
- [ ] Identify specific error or requirement
- [ ] Check existing patterns for similar implementations
- [ ] Plan cleanup and rollback strategy

### After Changes
- [ ] Run affected tests to verify fix
- [ ] Check for proper error handling with types
- [ ] Verify cleanup in `afterEach` hooks
- [ ] Validate code follows project conventions

## Architecture & Patterns

### Page Object Model
```typescript
export class ExamplePage extends BasePage {
  readonly grid: GridHelper<GridType.Example>;

  constructor(page: Page) {
    super(page, PAGE_CONFIGS['example']);
    this.grid = GridHelper.getGrid(page, GridType.Example);
  }

  async openCreateDialog(): Promise<void> {
    await this.page.locator('[data-testid="create-button"]').click();
  }
}
```

### Test Structure
```typescript
test.describe('Module Tests', () => {
  test.beforeEach(async ({ modulePage }) => {
    api = new ModuleApi(modulePage.page);
    await api.setupAuthentication();
  });

  test.afterEach(async () => {
    if (entityId) await api.deleteEntity(entityId);
  });
});
```

## Essential Workflows

### Running Tests
```bash
npm run test                    # All tests
npm run test:smoke             # Smoke tests only
npm run test:regression        # Regression tests
npm run validate               # TypeScript + ESLint
```

### Development Environment
```bash
docker-compose up -d           # Start services
npm run seed                   # Seed databases
npm run setup                  # Full setup
```

## Key Conventions

### Coding Style
- **Method Definitions**: Traditional methods for classes, arrow functions for callbacks
- **Type Safety**: Always include explicit return types for public methods
- **Error Handling**: Use proper error type checking with `error instanceof Error`
- **Web-First**: Use locator-first approach with auto-waiting
- **Strict Mode**: Use `.first()` when multiple elements match

### Import Patterns
```typescript
import { test, expect } from '@/fixtures/page.fixtures';
import { ChartOfAccountsPage } from '@/pages/coa';
import { GridType, FilterStatus } from '@/models/base';
```

## Critical Don'ts
- **No Direct Locators**: Use page object methods in tests
- **No Hard Waits**: Use `waitForLoad()` and auto-retrying assertions
- **No Data Leakage**: Always clean up test data in `afterEach`
- **No Manual Waits**: Don't use `page.waitForTimeout()` unless necessary
- **No Page-First**: Avoid `page.$()` - use `page.locator()`
- **No Untyped Errors**: Handle error types with `instanceof Error` checks
