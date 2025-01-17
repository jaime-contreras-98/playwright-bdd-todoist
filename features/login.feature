@login
Feature: Positive and negative login tests

  Background:
    Given I visit login website

  @sad-login
  Scenario Outline: Sad path login
    Given I login with "<email>" and "<password>" as my credentials
    Then I validate wrong user message

    Examples:
      | email            | password    |
      | hello1@gmail.com | asdfsdaf123 |
      | hello2@gmail.com | asasds2465  |

  @happy-login
  Scenario: Happy path login
    Given I login with correct credentials
    Then I validate homepage presence

  @api-login
  Scenario: Happy path login via api
    Given I login with correct credentials via API
    Then I validate homepage presence
