// simple and pointless javascript to test that code coverage works
window.addEventListener("load", () => {
  document.body.innerHTML += "This app has no content yet";
});

// this function will never run. It is here to test the code coverage tool
function hello() {
  console.log("Hello World");
}
