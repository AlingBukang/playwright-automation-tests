## Playwright Regression Test Suite

This is the regression test suite for a complex web application that is based on a microservices architecture.

### Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Folder Structure](#project-folder-structure)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Contributing](#contributing)


### Introduction

This regression tests suite is designed to ensure the reliability and stability of the system under test. It leverages modern testing frameworks and tools to provide adequate test coverage.

### Testing Philosophy and Best Practices

- **Goals**: Our primary goal is to maintain a regression test suite that is maintainable, organised, and scalable.
- **Fail Fast**: We aim to identify and address issues as quickly as possible to minimise the impact on development.
- **Avoid Bloated Tests**: We focus on writing efficient tests that provide maximum coverage without being overly complex or time-consuming.
- **Test User Flow**: Our tests are designed to simulate real user interactions and flows rather than focusing on the underlying implementation details.

### Architecture

- **Page Object Model (POM) Pattern**: We use the POM pattern to organise our test code, promoting reusability and maintainability.
- **Composition and Inheritance**: Our POM implementation leverages both composition and inheritance to create flexible and extensible test structures.
- **Host-Based Testing**: Tests run on the host machine while application services run in Docker containers for optimal performance and easier debugging.
- **Multi-Service Testing**: Supports testing across multiple microservices in the Cloud GL ecosystem.

### What is the Page Object Model (POM)?

The Page Object Model (POM) is a design pattern in test automation that creates an abstraction layer for your web pages. Each page (or component) of your web application is represented by a corresponding Page Object class. This class encapsulates the page's elements and actions, providing a clear and maintainable structure for your tests.

### Benefits of Using POM with Playwright

- **Encapsulation**: Hides the internal structure of the pages, exposing only relevant actions and elements.
- **Reusability**: Common actions can be reused across multiple tests.
- **Maintainability**: Changes in the UI require updates only in the respective Page Object classes.
- **Readability**: Tests become more readable and easier to understand.
- **Isolation**: Ensures tests are independent and do not interfere with each other.

### Technical Stack

- **Testing Framework**: [Playwright](https://playwright.dev/) for reliable end-to-end testing
- **Language**: TypeScript for type-safe test development
- **Containerization**: Docker and Docker Compose for environment management
- **Database**: MongoDB and PostgreSQL for data persistence and testing
- **Mocking**: Mock Service Worker (MSW) for API mocking and isolation
- **Code Quality**: ESLint and Prettier for code formatting and linting
- **CI/CD**: Integrated with GitHub Actions for automated testing
- **Architecture**: Host-based testing with containerized services for optimal performance

### Features

- **Page Object Model (POM) Framework**: Organises test code for better maintainability and readability.
- **Global Login Using Storage State**: Manages authentication across tests.
- **Mock Service Worker (MSW)**: Mocks external services for isolated and reliable tests.
- **Data Seeding**: Seeds MongoDB and PostgreSQL databases with initial data for consistent test environments.
- **Host-Based Testing Environment**: Uses Docker containers for services while running tests on the host for optimal performance.
- **Test Data Management**: Uses fixtures, seed data, and database snapshots to maintain consistent test data. Cleans up data after tests to avoid state leakage.

### Key Directories

**`docker-files/`**

- Contains Docker-related configuration files and environment templates
- Includes mock services, database configurations, and service-specific environment templates

**`playwright/`**

- **`pages/`**: Page Object Model classes for UI components and pages
- **`tests/`**: Test specifications organized by test type (UI, API, visual, security)
- **`fixtures/`**: Custom Playwright fixtures for enhanced testing capabilities
- **`helpers/`**: Utility functions and common test helpers
- **`msw/`**: Mock Service Worker configuration for API mocking
- **`api/`**: API testing utilities and shared API functions
- **`models/`**: TypeScript interfaces and data models
- **`test-data/`**: Static test data and fixtures
- **`.auth/`**: Authentication state storage for persistent login sessions(dynamically created)

**`scripts/`**

- Shell scripts for service management and test execution utilities

</details>

### Setup Instructions

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher) installed on your machine
- [Docker](https://www.docker.com/) installed and running
- [Git](https://git-scm.com/) for version control

#### Installation

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd gl-regression-tests
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

### Contributing

When contributing to this project, please follow these guidelines:

#### Code Style

- Follow the existing TypeScript and ESLint configuration
- Run `npm run validate` before committing to ensure code quality
- Use meaningful test names and organize tests logically

#### Adding New Tests

1. Create page objects in the `playwright/pages/` directory for new UI components
2. Add test data to `playwright/test-data/` as needed
3. Organize tests by feature area in the `playwright/tests/` directory
4. Use the existing fixtures and helpers where possible

#### Tests Tags
When adding new test cases, verify if any test must have a tag according to the folowing criteria:
- smoke: core test cases that can give a quick feedback in case there is a blocker or critical failure in any of the features. 
- regression: for now we identify all tests as part of regression, so no need to add this tag.
- edge-case: test cases validating edge scenarios. i.e. limit values

#### Pull Request Guidelines

- Ensure all tests pass locally before submitting
- Include test coverage for new features
- Update documentation as needed
- Follow the existing commit message conventions