class Login {
  navigate() {
    cy.visit("https://app.dwiz.io/");
  }
  LoginPage() {
    // cy.get(".sc-bePbDJ > a").click();
    cy.xpath(
      "(//a[@style='text-decoration: none; color: rgb(53, 218, 211);'])[1]"
    ).click();
  }
  enterEmail1(username) {
    cy.xpath("//input[@type='text']").clear().type(username);
    return this;
  }
  enterPassword1(pswd) {
    cy.xpath("//input[@type='password']").clear().type(pswd);
    return this;
  }
  loginbutton() {
    cy.xpath("//span[text()=' LOG IN ']").click();
  }
}
export default Login;
