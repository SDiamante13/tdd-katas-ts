## TDD Fundamentals

### Uncle Bob's 3 Laws of TDD (Fundamental Rules)

**Law 1**: You are not allowed to write any production code unless it is to make a failing unit test pass.

**Law 2**: You are not allowed to write any more of a unit test than is sufficient to fail; compilation failures count as failures.

**Law 3**: You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

These laws must be followed strictly - they are the foundation of TDD discipline.

### The Prediction Phase: Think Before You Test

Before writing any test, engage in **Predictive TDD** by explicitly answering two critical questions:

**🎯 Question 1: "What should it do?"**
- Define the specific behavior you want to implement
- Be concrete and measurable, not vague
- Focus on the observable outcome

**🔍 Question 2: "How will you know it did it?"**
- Predict exactly how the test will fail when you run it
- Anticipate the specific error message or assertion failure
- This prediction validates your understanding of the current system state

**Example for Mars Rover:**
- What should it do? *"When rover receives 'F' command while facing North, it should move one position forward on Y-axis"*
- How will you know? *"Test will fail with 'Expected y to be 1, got 0' because moveForward method doesn't exist yet"*

**Why Prediction Matters:**
- Catches incorrect assumptions before writing code
- Makes testing more intentional and thoughtful  
- Helps identify missing setup or incomplete understanding
- Prevents "accidental" passing tests that don't accurately test what you think

### The TDD Cycle
The foundation of TDD is the Red-Green-Refactor cycle:

1. **Red Phase**: Predict, then write ONE failing test
   - **Step 1**: Make explicit predictions (see Prediction Phase above)
   - **Step 2**: Write the test based on your predictions
   - **Step 3**: Run the test and verify it fails as predicted
   - ✅ **Correct Prediction**: Test fails as expected → proceed to Green
   - ❌ **Incorrect Prediction**: Test fails differently → reassess understanding
   - The test must fail for the RIGHT reason (not syntax/import errors)
   - Only one test at a time - this is critical for TDD discipline
   - **Adding a single test to a test file is ALWAYS allowed** - no prior test output needed

2. **Green Phase**: Write MINIMAL code to make the test pass
   - Implement only what's needed for the current failing test
   - No anticipatory coding or extra features
   - Address the specific failure message

3. **Refactor Phase**: Improve code structure while keeping tests green
   - Only allowed when tests are passing (green)
   - Run tests before refactoring to confirm green state
   - Valid refactoring: extract methods, rename, add types, eliminate duplication
   - Invalid refactoring: new behavior, additional methods, changed logic
   - Apply to BOTH test and implementation code

### Test Prioritization: ZOMBIES FIRST

Write tests in this order for optimal TDD flow:
- **Z**ero: Empty cases, null inputs, zero values (start here)
- **O**ne: Single item, basic happy path
- **M**any: Multiple items, collections
- **B**oundary: Edge cases, min/max values  
- **I**nterface: Different implementations
- **E**xercise Exceptional behavior: Errors, exceptions
- **S**imple: Prefer simple scenarios and solutions

*Example: For Mars Rover movement, start with Zero (no movement), then One (single step North), then Many (multiple steps), then Boundary (grid edges), etc.*

### Refactoring Guidelines

**✅ VALID Refactoring (No new tests needed):**
- Extract methods or classes
- Rename variables, methods, classes
- Add TypeScript types or interfaces  
- Extract constants (replace magic values)
- Eliminate code duplication
- Improve code organization

**❌ INVALID "Refactoring" (Requires failing test first):**
- Add new methods with different behavior
- Add error handling or validation
- Support new input types or formats
- Add business logic or calculations
- Change method signatures or return types

**Decision Rule:** "If I remove this change, will any existing test fail?"
- No → Valid refactoring
- Yes → New functionality requiring a failing test

### TDD Decision Tree

**"Can I add this code?"**
```
Is there a failing test? 
├─ YES: Does the code make ONLY that test pass?
│  ├─ YES: ✅ Proceed (Green Phase)
│  └─ NO: ❌ Remove extra code (Law 3 violation)
└─ NO: Are tests currently green?
   ├─ YES: Is this refactoring (no behavior change)?
   │  ├─ YES: ✅ Proceed (Refactor Phase)  
   │  └─ NO: ❌ Write failing test first (Law 1 violation)
   └─ NO: ❌ Make tests green before refactoring
```

### Minimal Implementation Strategy

Follow this progression for each failing test:

1. **Compilation Error** → Create minimal stub
   ```typescript
   // Test fails: "MarsRover is not defined"
   export class MarsRover {} // ONLY this, nothing more
   ```

2. **Method Missing** → Add method stub  
   ```typescript
   // Test fails: "move is not a function"
   move() {} // ONLY this method, no implementation
   ```

3. **Assertion Failure** → Implement minimal logic
   ```typescript
   // Test fails: Expected position to be {x:0,y:1}, got undefined
   move() { 
     this.position = {x:0, y:1}; // Hardcode exact expected result
   }
   ```

**Critical Rule:** If test expects North movement, implement ONLY North. Do NOT implement East, South, West until you have failing tests for each direction.

### Core Violations and Solutions

**❌ Multiple Test Addition**
- Problem: Adding >1 test at once breaks Law 2
- Solution: Write one test, make it pass, then write next test
- Exception: Initial test file setup only

**❌ Over-Implementation**  
- Problem: Code exceeds current test requirements (Law 3)
- Examples: Implementing all directions when test only needs North
- Solution: Implement literally what the test expects, nothing more

**❌ Premature Implementation**
- Problem: Adding code without failing test (Law 1)
- Solution: Always start with failing test, then minimal implementation
- Note: Creating stubs for compilation is allowed

**❌ Refactoring with Red Tests**
- Problem: Changing structure while tests fail
- Solution: Make tests green first, then refactor safely

**❌ Prediction Violations**
- Problem: Writing tests without explicit failure predictions
- Examples: "Let me just write this test and see what happens"
- Solution: Always predict specific failure before writing/running test
- Impact: Leads to accidental passing tests and misunderstood requirements

### Test Quality: FIRST Principles

Your tests should be:
- **Fast**: Run in milliseconds, avoid I/O operations
- **Independent**: Each test stands alone, no dependencies
- **Repeatable**: Same results every time, any environment  
- **Self-validating**: Clear pass/fail, descriptive assertions
- **Timely**: Written just before production code

*Poor test example:* `expect(result).toBeTruthy()` (not self-validating)
*Good test example:* `expect(rover.position).toEqual({x: 0, y: 1})` (specific, clear)

### Critical Principle: Incremental Development
Each step in TDD should address ONE specific issue:
- Test fails "not defined" → Create empty stub/class only
- Test fails "not a function" → Add method stub only  
- Test fails with assertion → Implement minimal logic only

### General Information
- Sometimes the test output shows as no tests have been run when a new test is failing due to a missing import or constructor. In such cases, allow the agent to create simple stubs. Ask them if they forgot to create a stub if they are stuck.
- It is never allowed to introduce new logic without evidence of relevant failing tests. However, stubs and simple implementation to make imports and test infrastructure work is fine.
- In the refactor phase, it is perfectly fine to refactor both test and implementation code. That said, completely new functionality is not allowed. Types, clean up, abstractions, and helpers are allowed as long as they do not introduce new behavior.
- Adding types, interfaces, or a constant in order to replace magic values is perfectly fine during refactoring.
- Provide the agent with helpful directions so that they do not get stuck when blocking them.