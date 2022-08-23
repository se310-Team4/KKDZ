# Contributing Guidelines

Thank you for taking interest in this project! Please review the guidelines below to help make the contribution process as smooth as possible.

To get an overview of the project, please visit the [README](https://github.com/se310-Team4/KKDZ/blob/main/README.md).

## Code of Conduct

By submitting a contribution, you agree to the following terms:

- Treat everyone with respect
- Credit your sources
- No harrassment, toxicity, sexism, racism or hate speech
- No NSFW content or offensive language

Reports of inappropriate behaviour will be reviewed by the project team and corrective action may ensue. This could be a warning, temporary ban or permanent ban from contributing to this project

## Bug Reports

If you find any bugs caused by the project code:

1. Search if the issue already exists in the [issue tracker](https://github.com/se310-Team4/KKDZ/issues).
2. If the issue doesn't exist, create a new issue.
3. Include a summary of the bug.
4. Describe the bug in detail. Include what you expect would happen and what actually happened.
5. Provide steps to reproduce the bug.
6. Add any notes on what you think the cause of the bug might be.

The team will review the bug as soon as possible.

## Feature Requests

If you would like to propose a feature for this project, please create a new issue through the [issue tracker](https://github.com/se310-Team4/KKDZ/issues). Include a description of the feature and why it is needed.

The team will review the feature request as soon as possible.

## Issue Approval Process

For new bug reports or feature requests that are not part of the initial set of tasks, at least 2 other members must approve the issue before it is worked on. These 2 members will comment on the issue with their approval.

## Make Changes

Any GitHub user can create a pull request. If you would like to contribute changes to this project, first fork and clone the main repository.

For each issue that you work on:

1. Assign yourself to the issue. Make sure no other user is an assignee unless you have communicated with them prior.
2. Create a new branch for the issue in your fork. Ensure that the branch name is descriptive.
3. Work on the changes, add or modify any tests as needed and commit to your fork branch.
4. Submit a pull request directly to the main repository. Include a reference to the issue number.

A team member will review the pull request as soon as possible.

Please assign yourself to a maximum of 1 issue at a time.

## Adding a new game

<details>
<summary>To add a new game, you need to follow these steps (<em>click to expand</em>)</summary>

1. Create a new subfolder for your game within the `src` folder. In this example we will call it `chess`
2. Create an `index.html` file containing this template code:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>Chess</title>
       <meta name="description" content="add your game description here" />

       <link
         rel="stylesheet"
         href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
       />
       <link rel="stylesheet" href="../brain-gain/main.css" />
       <link rel="icon" type="image/x-icon" href="../images/logo-favicon.png" />
     </head>

     <body>
       <core-navbar>Chess</core-navbar>

       <core-modal>
         <div class="modal-header">HOW TO PLAY CHESS</div>
         <p class="modal-text">This is the help modal</p>
       </core-modal>

       Hello world!
       <script type="module" src="../components/script/main.js"></script>
     </body>
   </html>
   ```

3. Edit the home page to add a link to your new game, by adding the following code to `src/index.html`:
   <!-- prettier-ignore -->
   ```html
   <a id="chess-btn" href="./chess/index.html" class="games-button" onmouseenter="chessDetails()" onmouseleave="titleShow()">
      <img alt="Chess logo" class="game-button-img" />
      <p id="chess-btn-text">Chess</p>
    </a>
   ```

4. Edit the home page to add a modal for your new game, by adding the following code to `src/index.html`:

   ```html
   <div id="chess-details" class="game-details">
     <p class="game-details-title">Chess</p>
     <br />
     <p class="game-details-text">The description of Chess goes here.</p>
     <img alt="Chess example gameplay" class="game-details-img" />
   </div>
   ```

5. Enable the home page modal for your new game, by adding the following code to `src/brain-gain/index.js`:
   ```js
   function chessDetails() {
     document.getElementById("title-img").style.opacity = "0%";
     document.getElementById("chess-details").style.opacity = "100%";
   }
   ```
6. Make changes to `src/brain-gain/main.css` as required to position the new button
7. To write your first test case, create a new subfolder within `cypress/e2e` called `chess`.
8. Create a test file within `cypress/e2e` called `example.cy.js` containing the following code:

   ```js
   /// <reference types="cypress" />

   describe("e2e tests for chess", () => {
     beforeEach(() => {
       cy.visit("http://localhost:1234/chess/index.html");
       cy.get("[id=close-btn]").click(); // close the help modal
     });

     it("loads without crashing", () => {
       // this is a very basic example
       cy.get("body").should("contain.text", "Hello world");
     });
   });
   ```

9. To test that the link you added in step 3 works, you should consider adding a new test case in `cypress/e2e/homepage.cy.js`. Only [these 3 lines](https://github.com/se310-Team4/KKDZ/blob/66430ef/cypress/e2e/homepage.cy.js#L2-L4) need changing.
10. Replace `chess` in the template code with the name of your game
11. Follow the instructions in the [README](README.md) to start the app. Then open http://localhost:1234/chess in your web browser.

> ✨ To see a full example of these steps, [click here](https://github.com/se310-team4/KKDZ/commit/4ace5d).

</details>

## Pull Request Approval Process

Each pull request requires a review from at least 1 other team member. Once it is approved, you can merge and squash your pull request into the main repository. All team members have permissions to review, approve and merge contributions.

## Becoming a Collaborator

A collaborator can review and merge pull requests. To become a collaborator, please email [dli393@aucklanduni.ac.nz](mailto:dli393@aucklanduni.ac.nz).

## License

By submitting a contribution, you agree that your contributions to this project will be licensed under the [MIT License](https://github.com/se310-Team4/KKDZ/blob/main/LICENSE).
