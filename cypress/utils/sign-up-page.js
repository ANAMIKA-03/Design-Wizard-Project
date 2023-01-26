class SignUp {
  navigate() {
    cy.visit("https://app.dwiz.io/");
  }
  enterEmail(username) {
    cy.get(":nth-child(2) > .MuiFormControl-root")
      // .clear()
      .type(username);
    return this;
  }
  enterPassword(pswd) {
    cy.get(":nth-child(3) > .MuiFormControl-root").clear().type(pswd);
    return this;
  }
  submit() {
    cy.get("button[tabindex='0']").click();
  }
  SignUpname(signname) {
    cy.get(":nth-child(1) > .MuiFormControl-root")
      // .clear()
      .type(signname);
  }
  SignUpPage() {
    // cy.get(".sc-faIbUi > a").click();
    cy.xpath("//a[text()='Sign Up']").click();
  }
  LoginPage() {
    cy.get(".sc-jFkwbb > a").click();
  }
}

class Login {
  navigate() {
    cy.visit("https://app.dwiz.io/");
  }
  LoginPage() {
    cy.get(".sc-jFkwbb > a").click();
  }
  enterEmail1(username) {
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic"
    )
      .clear()
      .type(username);
    return this;
  }
  enterPassword1(pswd) {
    cy.get(
      ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic"
    )
      .clear()
      .type(pswd);
    return this;
  }
  loginbutton() {
    cy.get(".MuiButtonBase-root").click();
  }
}
export default SignUp;
