// <reference type="cypress" />
it("Design World Page Open", function () {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  cy.visit("https://app.designwizard.com/");

  cy.get("#email").type("trupti.shiraskar@gmail.com");
  cy.get("#password").type("design_world");
  cy.get("#login-button").click();
  cy.wait(4000);
  cy.get(":nth-child(5) > .ng-isolate-scope > .frame > .gradient").click();
  cy.wait(2000);
  cy.get(":nth-child(3) > .ng-isolate-scope > .frame > .gradient").click();

  cy.get('[ng-click="setStoryMode()"]').click();

  cy.get("#videosNavBarButton > .ng-isolate-scope > .icon").click();

  cy.get("#col0 > :nth-child(1) > figure > .ui-draggable").click();
});
