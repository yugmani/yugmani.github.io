const formEl = document.querySelector(".contact-form");
const nameEl = document.querySelector(".name");
const emailEl = document.querySelector(".email");
const messageEl = document.querySelector(".message");

//Submit Form Event Listener
formEl.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  //checking validity
  validInput(name, email, message);

  let success = 0;

  const listFormControl = document.querySelectorAll(".form-control");

  listFormControl.forEach((form) => {
    if (form.classList.contains("success")) {
      success++;
    }
  });

  // If all fields are valid send message else return
  if (success === 3) {
    sendEmail(name, email, message);
  } else return;

  //Reset the form
  formEl.reset();
  formReset(name);
  formReset(email);
  formReset(message);
}

//To remove class name 'success'
function formReset(element) {
  const formControl = element.parentElement;
  formControl.classList.remove("success");
}

//validating name, email and message
function validInput(name, email, message) {
  //validate name
  if (name === "" || name.length < 3) {
    sendErrorFor(nameEl, "Name must be at least 3 characters long.");
  } else {
    sendSuccessFor(nameEl);
  }

  //validate email
  if (email === "") {
    sendErrorFor(emailEl, "Email cannot be blank");
  } else if (!isEmail(email)) {
    sendErrorFor(emailEl, "Input the valid email");
  } else {
    sendSuccessFor(emailEl);
  }

  //validate message
  if (message === "" || message.length < 5) {
    sendErrorFor(messageEl, "Message must be at least 5 characters long.");
  } else {
    sendSuccessFor(messageEl);
  }
}

//Sending Error Message
function sendErrorFor(element, alertText) {
  const formControl = element.parentElement;

  const small = formControl.querySelector("small");
  small.innerText = alertText;
  formControl.className = "form-control error";
}

//Adding class success if the input is valid
function sendSuccessFor(element) {
  const formControl = element.parentElement;

  formControl.className = "form-control success";
}

//validating email format through regex.
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

//Sending email after validation.
function sendEmail(name, email, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "yugmani.grg@gmail.com",
    Password: "pdgtldiapnhtbbor",
    To: "yugmani.grg@gmail.com",
    From: "yugmani.grg@gmail.com",
    Subject: `${name} has sent you a message!`,
    Body: `<p>Name:<h1>${name}</h1></p>
            <p>Email:<h2>${email}</h2></p>
            <p> Message: <h3>${message}</h3></p>`,
  }).then((message) => alert("Your message has been sent successfully!"));
}

//Toggling menu
document.querySelector(".toggle").addEventListener("click", function () {
  const menuItem = document.querySelectorAll(".bar");
  console.log(menuItem);
  for (let i = 0; i < menuItem.length; i++) {
    if (menuItem[i].classList.contains("active")) {
      menuItem[i].classList.remove("active");
    } else menuItem[i].classList.add("active");
  }
});
