describe("merges of the same number create a tile with the right data attribute values", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test tile with number 4", () => {
    cy.get(".cell").eq(0).invoke("text", 2);
    cy.get(".cell").eq(1).invoke("text", 2);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("4").should("have.attr", "data-digits", "1");
  });

  it("test tile with number 8", () => {
    cy.get(".cell").eq(0).invoke("text", 4);
    cy.get(".cell").eq(1).invoke("text", 4);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("8").should("have.attr", "data-digits", "1");
  });

  it("test tile with number 16", () => {
    cy.get(".cell").eq(0).invoke("text", 8);
    cy.get(".cell").eq(1).invoke("text", 8);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("16").should("have.attr", "data-digits", "2");
  });

  it("test tile with number 32", () => {
    cy.get(".cell").eq(0).invoke("text", 16);
    cy.get(".cell").eq(1).invoke("text", 16);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("32").should("have.attr", "data-digits", "2");
  });

  it("test tile with number 64", () => {
    cy.get(".cell").eq(0).invoke("text", 32);
    cy.get(".cell").eq(1).invoke("text", 32);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("64").should("have.attr", "data-digits", "2");
  });

  it("test tile with number 128", () => {
    cy.get(".cell").eq(0).invoke("text", 64);
    cy.get(".cell").eq(1).invoke("text", 64);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("128").should("have.attr", "data-digits", "3");
  });

  it("test tile with number 256", () => {
    cy.get(".cell").eq(0).invoke("text", 128);
    cy.get(".cell").eq(1).invoke("text", 128);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("256").should("have.attr", "data-digits", "3");
  });

  it("test tile with number 512", () => {
    cy.get(".cell").eq(0).invoke("text", 256);
    cy.get(".cell").eq(1).invoke("text", 256);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("512").should("have.attr", "data-digits", "3");
  });

  it("test tile with number 1024", () => {
    cy.get(".cell").eq(0).invoke("text", 512);
    cy.get(".cell").eq(1).invoke("text", 512);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.get(".cell").contains("1024").should("have.attr", "data-digits", "4");
  });
});
