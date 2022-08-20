/// <reference types="cypress" />

describe("capidle autofill", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/capidle?test");
    cy.get("[id=close-btn]").click();
  });

  it("shows the autofill popup when the user types", () => {
    // popup is hidden by default
    cy.get(".autofill-popup").should("not.exist");

    // type in a guess (which is spelt wrong)
    cy.get("input[type=text]").type("Otā");

    // there should be 3 suggestions in the autofill popup, inspite of the spelling mistake
    cy.get(".autofill-popup > div").should("have.length", 3);

    // We typed "Otā" and "Christchurch" is one of the suggested values.
    // This is expected, because its te reo name is Ōtautahi.
    cy.get(".autofill-popup > div").first().should("have.text", "Christchurch");
    cy.get(".autofill-popup > div").eq(1).should("have.text", "Ōtaki");
    cy.get(".autofill-popup > div").last().should("have.text", "Ōtaki Beach");

    // none of the suggestions are "active" yet
    cy.get(".active").should("not.exist");

    // press the down arrow. Now the first option (Christchurch) should be active
    cy.get("input[type=text]").type("{downarrow}");
    cy.get(".active").should("have.text", "Christchurch");

    // press the up arrow. since we're at the top of the list, this has no effect
    cy.get("input[type=text]").type("{uparrow}");
    cy.get(".active").should("have.text", "Christchurch");

    // push the down arrow twice. now the last option should be selected
    cy.get("input[type=text]").type("{downarrow}{downarrow}");
    cy.get(".active").should("have.text", "Ōtaki Beach");

    // push the down arrow again. Since we're at the bottom of the list, this has no effect
    cy.get("input[type=text]").type("{downarrow}");
    cy.get(".active").should("have.text", "Ōtaki Beach");

    // press enter. The popup will close and the value will be inserted into the text field
    cy.get("input[type=text]").type("{enter}");
    cy.get(".autofill-popup").should("not.exist");
    cy.get("input[type=text]").should("have.value", "Ōtaki Beach");

    // press enter again. This will submit the guess, and clear the input field
    cy.get("input[type=text]").type("{enter}");
    cy.get(".autofill-popup").should("not.exist");
    cy.get("input[type=text]").should("have.value", "");
  });

  it("supports touch interaction", () => {
    // the previous test used arrow keys/enter, now we'll try clicking an option
    cy.get("input[type=text]").type("Ōtepoti");
    cy.get(".autofill-popup > div").should("have.length", 1);
    cy.get(".autofill-popup > div").first().click();

    cy.get(".autofill-popup").should("not.exist");
    cy.get("input[type=text]").should("have.value", "Dunedin");
  });

  it("disables the submit button if the current form value is invalid", () => {
    // disabled by default, since the input field is blank
    cy.get("input[type=submit]").should("be.disabled");

    cy.get("input[type=text]").type("Auckland");
    cy.get("input[type=submit]").should("not.be.disabled");

    cy.get("input[type=text]").type("ddddddd");
    cy.get("input[type=submit]").should("be.disabled");
  });
});
