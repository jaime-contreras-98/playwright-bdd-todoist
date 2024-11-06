@tasks
Feature: Tasks creation tests

  Background:
    Given I login with correct credentials via API
    Then I validate homepage presence

  @create-tasks
  Scenario Outline: Create a task for <dateTime> and <priorityNum>
    Given I create a task with "<name>", "<description>", "<dateTime>" and "<priorityNum>"
    Then I validate presence of task created with "<name>" and "<description>"

    Examples:
      | name          | description           | dateTime  | priorityNum |
      | My new test 1 | A basic description 1 | Today     | Priority 1  |
      | My new test 2 | A basic description 2 | Tomorrow  | Priority 2  |
      | My new test 3 | A basic description 3 | Next week | Priority 3  |
