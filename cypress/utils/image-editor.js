// <reference type="cypress" />
it("Design World Page Open", function () {
  cy.visit("https://app.designwizard.com/");

  cy.get("#email").type("trupti.shiraskar@gmail.com");
  cy.get("#password").type("design_world");
  cy.get("#login-button").click();
  cy.wait(4000);

  cy.get(":nth-child(2) > .ng-isolate-scope > .frame > .background").click();
  cy.wait(5000);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  cy.get('[ng-click="setDesignMode()"]').click();
  cy.get("#col0 > :nth-child(1) > figure > .ui-draggable").dblclick();
  cy.wait(5000);

  cy.get(".confirm > .wbm-button > .button-text > .line0").then(($button) => {
    if ($button.is(":visible")) {
      //you get here only if button is visible
      cy.wrap(".confirm > .wbm-button > .button-text > .line0").click();

      cy.get(
        "#guides > .bar-button > button > .ng-scope > .icon > use"
      ).click();
    } else {
      cy.get(
        "#guides > .bar-button > button > .ng-scope > .icon > use"
      ).click();
    }
  });
  cy.wait(7000);

  cy.get(".switch", { force: true }).click();
  cy.wait(4000);
  cy.get("#guides > .bar-button > button > .ng-scope > .icon > use").click();
  cy.get("#clear > button > .ng-scope > .icon").click();
  cy.get(".full-round-bckg").click();

  cy.get(
    '    #userColorsList > [style="background-color: rgb(89, 46, 111);"]'
  ).click();
  cy.get(".full-round-bckg").click();

  cy.get("#zoom-in").dblclick();

  cy.get("#zoom-out").click();
});
