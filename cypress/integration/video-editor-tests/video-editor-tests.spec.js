import SignUp from "../../utils/sign-up-page";
import Login from "../../utils/login-page";
import VideoEditorPage from "../../utils/video-editor-page";

//New Code Written by Abhinav Pandey
describe("Design World Video Editor Test Cases", function () {
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

  it("Navigate to Video Editor", function () {
    cy.xpath(
      "//img[@src='/static/media/ezgif.com-gif-maker.127e642d.gif']"
    ).click();
    cy.xpath("//span[text()='Video Editor']").should("contain", "Video Editor");
  });

  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    return;
  };

  it("Navigate to Template", function () {
    cy.wait(1000);
    cy.xpath("//p[text()='Templates']").click();
    cy.xpath("//p[text()='Templates']").should("contain", "Templates");
  });

  it("Navigate to Video", function () {
    cy.xpath("//p[text()='Videos']").click();
    cy.xpath("//p[text()='Videos']").should("contain", "Videos");
  });

  it("Navigate to Add Images", function () {
    cy.xpath("//p[text()='Add Images']").click();
    cy.xpath("//p[text()='Add Images']").should("contain", "Add Images");
  });

  it("Navigate to Text", function () {
    cy.xpath("//p[text()='Text']").click();
    cy.xpath("//p[text()='Text']").should("contain", "Text");
    cy.wait(5000);
    cy.xpath("(//video[@width='126px'])[1]").click();
  });

  it("Click On Undo", function () {
    cy.xpath("//button[@aria-label='Undo']").click();
  });

  it("Click On Redo", function () {
    cy.xpath("//button[@aria-label='Redo']").click();
  });

  it("Navigate to Upload", function () {
    cy.xpath("//p[text()='Uploads']").click();
    cy.xpath("//p[text()='Uploads']").should("contain", "Uploads");
    cy.wait(1000);
    cy.xpath("//p[@style='color: white; text-align: center;']").should(
      "contain",
      "You haven't uploaded anything yet."
    );
  });

  it("Navigate to Favourite", function () {
    cy.xpath("//p[text()='Favourites']").click();
    cy.xpath("//p[text()='Favourites']").should("contain", "Favourites");
    cy.wait(1000);
  });

  it("Open column grid", function () {
    cy.xpath("//button[@aria-label='Grid']").click({ force: true });
    cy.wait(1000);
  });

  it("Show Grid", function () {
    cy.xpath("//span[text()='Show grid']").click();
    cy.xpath("//span[text()='Show grid']").should("contain", "Show grid");
    cy.wait(1000);
  });

  it("Enter Column Size", function () {
    const videoEditorPage = new VideoEditorPage();
    videoEditorPage.enterColumnSize("2");
    cy.get(".sc-TBWPX > :nth-child(1) > :nth-child(2)").should(
      "have.class",
      "sc-jOxtWs lfHWGu"
    );
    cy.wait(1000);
    cy.get("#txt-fld").should("not.exist");
  });

  it("Enter Row Size", function () {
    const videoEditorPage = new VideoEditorPage();
    videoEditorPage.enterRowSize("2");
    cy.get(".sc-TBWPX > :nth-child(1) > :nth-child(5)").should(
      "have.class",
      "sc-jOxtWs lfHWGu"
    );
    cy.wait(1000);
    cy.get("#txt-fld").should("not.exist");
  });

  it("Click On Close Grid", function () {
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").trigger(
      "keydown",
      { keyCode: 27 }
    );
    cy.wait(1000);
  });

  // it("Click On Close", function () {
  //   cy.get(":nth-child(4) > .sc-ezbkAF").click();
  //   cy.get(":nth-child(4) > .sc-ezbkAF").should(
  //     "have.class",
  //     "sc-ezbkAF kdEPht"
  //   );
  //   cy.wait(1000);
  // });

  // it("Open ArtBoard", function () {
  //   cy.get(".sc-jJoQJp").click();
  //   cy.get("#txt-fld").should("not.exist");
  //   cy.wait(1000);
  // });

  // it("Select ArtBoard Section", function () {
  //   cy.get(
  //     '[style="border-radius: 0px; border-right: 2px solid rgb(102, 108, 132);"] > .sc-jcFjpl'
  //   ).click();
  //   cy.wait(1000);
  //   cy.get(
  //     '[style="border-radius: 0px; border-right: 2px solid rgb(102, 108, 132);"] > .sc-jcFjpl'
  //   ).should("have.class", "sc-jcFjpl");
  // });

  // it("Add New ArtBoard", function () {
  //   cy.get(".sc-eGPXGI").click();
  //   cy.wait(1000);
  //   cy.get("#txt-fld").should("not.exist");
  // });

  it("Open ArtBoard", function () {
    cy.xpath("//div[text()='Artboards']").click();
  });

  it("Hide ArtBoard", function () {
    cy.xpath("//div[text()='Hide Panel']").click();
    cy.wait(1000);
  });

  it("Add New ArtBoard", function () {
    cy.xpath("(//img[@alt='canvas'])[3]").click();
    cy.xpath("//div[text()='Artboards']").click();
    cy.xpath("//span[text()='+']").click();
  });

  it("Select Layers Section", function () {
    cy.get(".sc-jJoQJp").click();
    cy.get(
      '[style="border-radius: 0px; border-right: 2px solid rgb(102, 108, 132);"] > .sc-jcFjpl'
    ).click();
    cy.get(":nth-child(2) > .sc-jcFjpl").click();
    cy.get(":nth-child(2) > .sc-jcFjpl").should("have.class", "sc-jcFjpl");
    cy.wait(1000);
  });

  it("Bring Layer to Front", function () {
    cy.get(":nth-child(1) > .sc-jQrDum > .sc-fvxzrP").click();
    cy.get(":nth-child(1) > .sc-jQrDum > .sc-fvxzrP").should(
      "have.class",
      "sc-fvxzrP"
    );
    cy.wait(1000);
  });

  it("Bring Layer to Forward", function () {
    cy.get(":nth-child(2) > .sc-jQrDum > .sc-fvxzrP").click();
    cy.get(":nth-child(2) > .sc-jQrDum > .sc-fvxzrP").should(
      "have.class",
      "sc-fvxzrP"
    );
    cy.wait(1000);
  });

  it("Send Layer to Backward", function () {
    cy.get(":nth-child(3) > .sc-jQrDum > .sc-fvxzrP").click();
    cy.get(":nth-child(3) > .sc-jQrDum > .sc-fvxzrP").should(
      "have.class",
      "sc-fvxzrP"
    );
    cy.wait(1000);
  });

  it("Send Layer to Back", function () {
    cy.get(":nth-child(4) > .sc-jQrDum > .sc-fvxzrP").click();
    cy.get(":nth-child(4) > .sc-jQrDum > .sc-fvxzrP").should(
      "have.class",
      "sc-fvxzrP"
    );
    cy.wait(1000);
  });

  it("Hide ArtBoard", function () {
    cy.get(":nth-child(2) > .sc-jcFjpl").click();
    cy.get(":nth-child(2) > .sc-jcFjpl").should("have.class", "sc-jcFjpl");
    cy.wait(1000);
  });

  it("Lock Current Layer", function () {
    cy.get(".sc-dPiLbb > :nth-child(1)").click();
    cy.get("#txt-fld").should("not.exist");
    cy.wait(1000);
  });

  it("Copy Current Layer", function () {
    cy.get(".sc-dPiLbb > :nth-child(2)").click();
    cy.wait(1000);
  });

  it("Delete Current Layer", function () {
    cy.get(".sc-dPiLbb > :nth-child(3)").click();
    cy.wait(1000);
  });

  it("Click On Set Color", function () {
    cy.get(".sc-iJKOTD > :nth-child(5)").click();
    cy.get(".sc-iJKOTD > :nth-child(5)").should(
      "have.class",
      "sc-giYglK gOODZy"
    );
    cy.wait(1000);
  });

  it("Select Color", function () {
    cy.get(".purple-bg-color").click();
    cy.get(".purple-bg-color").should(
      "have.css",
      "background-color",
      "rgb(89, 46, 111)"
    );
    cy.wait(1000);
  });

  it("Close Color Palette", function () {
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.wait(500);
    cy.get("body").trigger("keyup", { keyCode: 27 });
    cy.get("#txt-fld").should("not.exist");
    cy.wait(1000);
  });

  it("Logout", function () {
    cy.xpath("//span[@class='caret']").click();
    cy.xpath("//div[text()='Log Out']").click();
    cy.url().should("be.equal", "https://app.dwiz.io/");
  });
});
