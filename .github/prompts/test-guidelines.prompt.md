---
tools: ['playwright']
mode: 'agent'
---

# Test Generation Guidelines

You are an expert Playwright test generator for a cloud-based web application.

## Context Understanding First

### Explore Before Building
- Use MCP browser tools to navigate and understand the UI
- Check existing patterns from similar modules
- Identify required framework integration based on task scope

### Decision Framework
- **New Module**: Full framework integration required
- **Existing Module**: Check current structure, add missing pieces
- **Simple Test Addition**: Use existing patterns and fixtures
- **Bug Fix**: Focus on specific test scenario

## Framework Integration (When Creating New Module)

### Required Files in Order:
1. **Page Configuration**: Add to `playwright/models/base/page.types.ts`
2. **Path Alias**: Add to `tsconfig.json` paths section
3. **Test Project**: Add to `playwright.config.ts` projects array
4. **Page Fixtures**: Update `playwright/fixtures/page.fixtures.ts`

### Validation Command:
```bash
npm run validate  # Must pass before proceeding
```

## Module Structure Pattern

### Complete Module Template:
```
playwright/
├── models/{module}/
│   ├── {module}.types.ts      # Data models and interfaces
│   └── index.ts               # Export models
├── pages/{module}/
│   ├── {module}.page.ts       # Page object with methods
│   └── index.ts               # Export page objects
├── test-data/{module}/
│   └── constants.ts           # Test data constants
└── tests/tests-ui/{module}/
    └── {module}-tests.spec.ts # Test implementation
```

### Export Integration:
- Add module exports to `playwright/models/index.ts`
- Add page exports to `playwright/pages/index.ts`

## Test Implementation Standards

### Test Structure:
```typescript
import { test, expect } from '@/fixtures/page.fixtures';
import { ModulePage } from '@/pages/module';

test.describe('Module Feature', {
  tag: ['@smoke', '@regression']
}, () => {
  test.beforeEach(async ({ modulePage }) => {
    await modulePage.navigateToPage();
    await modulePage.waitForPageLoad();
  });

  test('should perform basic operation', async ({ modulePage }) => {
    await expect(modulePage.getPageTitle()).toBeVisible();
    // Test implementation
  });

  test.afterEach(async () => {
    // Cleanup if needed
  });
});
```

### Coding Standards:
- **Traditional Methods**: Use for page object classes
- **Semantic Locators**: Prefer `getByRole()`, `getByLabel()`, `getByText()`
- **Web-First Assertions**: Use `await expect(element).toBeVisible()`
- **Proper Waiting**: Use `waitForLoad()` and auto-retrying assertions
- **Error Handling**: Include proper error types with `instanceof Error`

### Common Patterns:
```typescript
// Navigation and setup
await modulePage.navigateToPage();
await modulePage.grid.waitForLoad();

// Interactions
await modulePage.openCreateDialog();
await modulePage.dialog.fillForm(testData);
await modulePage.dialog.save();

// Assertions
await expect(modulePage.getSuccessMessage()).toBeVisible();
await expect(modulePage.grid.getRowByCode(code)).toBeVisible();
```

## Quality Gates

### Framework Validation:
- Run `npm run validate` after framework changes
- Verify TypeScript compilation passes
- Check ESLint rules compliance

### Test Execution:
```bash
npm run test -- --project={module}-tests  # Run module tests
npm run test:smoke                         # Run smoke tests
```

### Success Criteria:
- All framework integration files created
- Tests execute without compilation errors
- Tests pass consistently (aim for 100% pass rate)
- No data leakage between tests
- Proper cleanup in afterEach hooks

## Error Resolution

### Common Issues and Fixes:
- **Import Errors**: Check path aliases in tsconfig.json
- **Fixture Not Found**: Verify fixture added to page.fixtures.ts
- **Test Project Missing**: Add project to playwright.config.ts
- **Page Config Missing**: Add to PAGE_CONFIGS in page.types.ts
- **Timeout Issues**: Add proper wait conditions and increase timeouts

### Debugging Approach:
1. Check console output for specific errors
2. Verify all required files exist and are properly exported
3. Run validation commands to identify framework issues
4. Test individual components before full test suite

## Best Practices

### Test Data:
- Use API for setup and cleanup when possible
- Create minimal test data for faster execution
- Use factory patterns for consistent data generation
- Clean up in afterEach to prevent data leakage

### Page Objects:
- Extend BasePage for consistent behavior
- Implement proper error handling
- Include meaningful method names and return types

### Test Organization:
- Group related tests with describe blocks
- Use descriptive test names
- Include appropriate tags for test categorization
- Structure tests with clear setup, action, and assertion phases
