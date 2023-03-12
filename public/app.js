const form = document.querySelector(".contact-form");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const phoneInput = document.querySelector(".telephone");
const terms = document.getElementById("term-input");
const errorMsg = document.querySelector(".error-msg");
const overlay = document.querySelector(".overlay");

const showErrMsg = (text) => {
  errorMsg.classList.remove("hide");
  errorMsg.innerHTML = text;
  setTimeout(() => {
    errorMsg.innerHTML = null;
    errorMsg.classList.add("hide");
  }, 2000);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!nameInput.value || !emailInput.value || !phoneInput.value) {
    showErrMsg("אנא מלאו את כל השדות הנדרשים");
  } else if (!terms.checked) {
    showErrMsg("אנא הסכימו לתנאי השירות");
  } else if (phoneInput.value !== Number) {
    showErrMsg("אנא הכניסו מספר טלפון תקין");
  } else {
    const response = await fetch("/client", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
      }),
    });
    if (response.status == 202) {
      showErrMsg("פרטיך קיימים במערכת");
    } else if ((response.status = 201)) {
      overlay.classList.remove("hide");
      const inputs = document
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
      setTimeout(() => {
        overlay.classList.add("hide");
      }, 1500);
    }
  }
});
