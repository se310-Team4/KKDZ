// /// <reference types="cypress" />
// describe("merges of the same number create a tile with the right data attribute values", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:1234/2048-expert/index.html");
//     cy.get("[id=close-btn]").click();
//   });

//   it("test tile with number 4", () => {
//     cy.get(".tile").eq(0).invoke("text", 2);
//     cy.get(".tile").eq(1).invoke("text", 2);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("4");
//   });

//   it("test tile with number 8", () => {
//     cy.get(".tile").eq(0).invoke("text", 4);
//     cy.get(".tile").eq(1).invoke("text", 4);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("8")
//   });

//   it("test tile with number 16", () => {
//     cy.get(".tile").eq(0).invoke("text", 8);
//     cy.get(".tile").eq(1).invoke("text", 8);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("16")
//   });

//   it("test tile with number 32", () => {
//     cy.get(".tile").eq(0).invoke("text", 16);
//     cy.get(".tile").eq(1).invoke("text", 16);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("32")
//   });

//   it("test tile with number 64", () => {
//     cy.get(".tile").eq(0).invoke("text", 32);
//     cy.get(".tile").eq(1).invoke("text", 32);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("64")
//   });

//   it("test tile with number 128", () => {
//     cy.get(".tile").eq(0).invoke("text", 64);
//     cy.get(".tile").eq(1).invoke("text", 64);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("128")
//   });

//   it("test tile with number 256", () => {
//     cy.get(".tile").eq(0).invoke("text", 128);
//     cy.get(".tile").eq(1).invoke("text", 128);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("256")
//   });

//   it("test tile with number 512", () => {
//     cy.get(".tile").eq(0).invoke("text", 256);
//     cy.get(".tile").eq(1).invoke("text", 256);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("512")
//   });

//   it("test tile with number 1024", () => {
//     cy.get(".tile").eq(0).invoke("text", 512);
//     cy.get(".tile").eq(1).invoke("text", 512);

//     cy.get("body").trigger("keyup", { keyCode: 37 });

//     cy.get(".tile").contains("1024")
//   });
// });
