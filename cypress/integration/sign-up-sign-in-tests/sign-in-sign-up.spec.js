import SignUp from "../../utils/sign-up-page";
import Login from "../../utils/login-page";

describe("Design World Sign In & Sign Up Test Cases", function () {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  it("SignUp the User", function () {
    localStorage.clear();
    const login = new SignUp();
    login.navigate();
    login.SignUpPage();
    login.SignUpname("Trupti Sable");
    login.enterEmail("trupti.sable@scispl.com");
    login.enterPassword("design_world");
    cy.url().should("be.equal", "https://app.dwiz.io/signup");
    login.submit();
  });
  it("Login the user", function () {
    const login1 = new Login();
    login1.LoginPage();
    login1.enterEmail1("abhinav.pandey@scispl.com");
    login1.enterPassword1("Test@123");
    login1.loginbutton();
    cy.url().should("be.equal", "https://app.dwiz.io/");
  });
});
