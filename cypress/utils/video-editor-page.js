class VideoEditorPage {
  enterColumnSize(columnSize) {
    cy.get(".sc-TBWPX > :nth-child(1) > :nth-child(2)")
      .clear()
      .type(columnSize);
    return this;
  }

  enterRowSize(rowSize) {
    cy.get(".sc-TBWPX > :nth-child(1) > :nth-child(5)").clear().type(rowSize);
    return this;
  }
}
export default VideoEditorPage;
