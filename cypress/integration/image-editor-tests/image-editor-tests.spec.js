import SignUp from "../../utils/sign-up-page";
import Login from "../../utils/login-page";
import ImageEditorPage from "../../utils/image-editor-page";

describe("Design World Image Editor Test Cases", function () {
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
    login.submit();
  });
  it("login the User", function () {
    const login1 = new Login();
    login1.LoginPage();
    login1.enterEmail1("abhinav.pandey@scispl.com");
    login1.enterPassword1("Test@123");
    login1.loginbutton();
    cy.url().should("be.equal", "https://app.dwiz.io/");
  });

  it("Navigate to Change your sizes", function () {
    cy.xpath("//span[text()='Change your sizes']", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.xpath("//span[text()='Change your sizes']").click();
    cy.wait(3000);
    cy.xpath("//span[text()='Facebook ads']").should(
      "have.text",
      "Facebook ads"
    );
    cy.xpath("//span[text()='Facebook ads']").click();
    cy.get("body").click(0, 0);
    cy.xpath("//p[text()='Facebook ads']").should("have.text", "Facebook ads");
  });

  it("Navigate to More Sizes", function () {
    cy.xpath("//p[text()=' MORE SIZES']").click();
    cy.xpath("//h5[text()='Videos']", { timeout: 5000 }).should("be.visible");
    cy.url().should("be.equal", "https://app.dwiz.io/dashboard/choose-type");
    cy.go("back");
  });

  it("Navigate to Image Editor", function () {
    cy.xpath(
      "//img[@src='/static/media/ezgif.com-gif-maker.127e642d.gif']"
    ).click();
    cy.xpath("//span[text()='Image Editor']").click();
    cy.wait(3000);
  });
  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    return;
  };

  it("Select Template", function () {
    cy.wait(2000);
    cy.xpath("(//img[@alt='canvas'])[3]").click({ force: true });
    cy.get(".sc-dkPtRN > :nth-child(1)").should("contain", "Templates");
  });

  it("Select Image", function () {
    cy.xpath("//p[text()='Images']").click();
    cy.xpath("(//img[@alt='canvas'])[3]").click();
    cy.wait(1000);

    //clicking on second image
    cy.xpath("(//img[@alt='canvas'])[4]").click();
    cy.wait(3000);

    cy.xpath("//p[text()='Images']").should("contain", "Images");
  });

  it("Flip Image Horizontal", function () {
    cy.wait(2000);
    cy.xpath("//button[@style='margin-right: 10px;']").click();
  });

  it("Flip Image Vertical", function () {
    cy.wait(5000);
    cy.xpath("(//button)[24]").click();
  });

  it("Select Layers Section", function () {
    cy.xpath("//div[text()='Layers']").click();
    cy.wait(1000);
  });

  it("Bring Layer to Front", function () {
    cy.xpath("//button[@title='Bring to Front']").click();
    cy.wait(1000);
  });

  it("Bring Layer to Forward", function () {
    cy.xpath("//button[@title='Bring Forward']").click();
    cy.wait(1000);
  });

  it("Send Layer to Backward", function () {
    cy.xpath("//button[@title='Send Backward']").click();
    cy.wait(1000);
  });

  it("Send Layer to Back", function () {
    cy.xpath("//button[@title='Send to Back']").click();
    cy.wait(1000);
  });

  it("Copy Current Layer", function () {
    cy.xpath("(//button//*[@width='16px'])[2]").click({ force: true });
    cy.wait(1000);
  });

  it("Lock Current Layer", function () {
    cy.xpath("(//*[@height='20px'])[1]").click({ force: true });
    cy.wait(1000);
  });

  it("Delete Current Layer", function () {
    cy.xpath("(//*[@width='16px'])[1]").click({ force: true });
    cy.wait(1000);
  });

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

  it("Click On Undo", function () {
    cy.xpath("//button[@aria-label='Undo']").click();
  });

  it("Click On Redo", function () {
    cy.xpath("//button[@aria-label='Redo']").click();
  });

  it("Save Image", function () {
    cy.get(".sc-eCImPb > :nth-child(1)").click();
    cy.xpath("//div[text()='SAVE CURRENT DESIGN']").click();
  });

  it("Title Of Image", function () {
    cy.wait(2000);
    cy.xpath("//input[@value='Untitled']").clear().type("ImageEditor");
  });

  it("Zoom In", function () {
    cy.get(".sc-egiyK").click();
    cy.get(".sc-egiyK").should("contain", "+");
  });

  it("Zoom Out", function () {
    cy.get(".sc-crHmcD").click();
    cy.get(".sc-crHmcD").should("contain", "-");
  });

  it("Navigate to Text", function () {
    cy.xpath("//p[text()='Text']").click();
    cy.xpath("//div[text()='Add Heading']").click();
    cy.xpath("//p[text()='Text']").should("contain", "Text");

    cy.wait(1000);
  });

  it("Navigate to Shapes", function () {
    cy.xpath("//p[text()='Shapes']").click();
    cy.xpath("//hr").click();
    cy.xpath("//p[text()='Shapes']").should("contain", "Shapes");
    cy.wait(1000);
  });

  it("Navigate to Uploads", function () {
    cy.xpath("//p[text()='Uploads']").click();
    cy.xpath("//p[text()='Uploads']").should("contain", "Uploads");
    cy.wait(1000);
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
    const imageEditorPage = new ImageEditorPage();
    imageEditorPage.enterColumnSize("4");
    cy.get("#txt-fld").should("not.exist");
    cy.wait(1000);
  });

  it("Enter Row Size", function () {
    const imageEditorPage = new ImageEditorPage();
    imageEditorPage.enterRowSize("4");
    cy.get("#txt-fld").should("not.exist");
    cy.wait(1000);
  });

  it("Click On Close Grid", function () {
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").trigger(
      "keydown",
      { keyCode: 27 }
    );
    cy.wait(1000);
  });

  it("Click On Close", function () {
    cy.xpath("//button[@aria-label='Clear']").click();
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

  it("Goto My Designs", function () {
    cy.xpath("(//a[@href='/home'])[2]//p").click();
  });

  it("Goto Tutorials", function () {
    cy.xpath("//div[text()='Tutorials']").click();
    cy.xpath("//div[text()='Tutorials']").should("contain", "Tutorials");
    cy.wait(2000);
    cy.xpath("//div[@role='combobox']").type("Take a tour 1");
    cy.xpath("(//button[@tabindex='0'])[2]").click();
    cy.wait(4000);
    cy.xpath("(//*[@id='Layer_1'])[1]").click();
    cy.wait(2000);
  });

  it("Logout", function () {
    cy.xpath("//span[@class='caret']").click();
    cy.xpath("//div[text()='Log Out']").click();
    cy.url().should("be.equal", "https://app.dwiz.io/");
  });
});
