@login
Feature: Positive and negative login tests

  Background:
    #Given I visit "" website
    When I click on "Login" on header bar

  @sad-login
  Scenario: Sad path login
    Given I login with "dsa" and "dsa" as my credentials
    Then I validate wrong user message
