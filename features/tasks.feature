@task
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

  @modify-api-tasks
  Scenario Outline: Create a task via API and then modify task name and description
    Given I create a task via API with "<name>", "<description>" and "<priorityNum>"
    And I click on inbox button
    When I click task "<name>"
    And change it with values "<newName>" and "<newDescription>"
    Then I validate task old name "<name>" does not exists and validate new "<newName>" and "<newDescription>"

    Examples:
      | name          | description           | priorityNum | newName         | newDescription         |
      | My new test 1 | A basic description 1 |           1 | Modified Task 1 | Modified description 1 |
      | My new test 2 | A basic description 2 |           2 | Modified Task 2 | Modified description 2 |
      | My new test 3 | A basic description 3 |           3 | Modified Task 3 | Modified description 3 |
      | My new test 4 | A basic description 4 |           4 | Modified Task 4 | Modified description 4 |
