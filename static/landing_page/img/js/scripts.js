/*!
* Start Bootstrap - Coming Soon v6.0.5 (https://startbootstrap.com/theme/coming-soon)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-coming-soon/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const form = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitButton');
const submitSuccessMessage = document.getElementById('submitSuccessMessage');

// Listeners
form.addEventListener('submit', submitForm);
emailInput.addEventListener("input", validateEmail);

// Example POST method implementation:
async function postData() {
  // Default options are marked with *
  const response = await fetch(form.action, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      "X-CSRFToken": CSRF_TOKEN,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({'email': emailInput.value}) // body data type must match "Content-Type" header
  });

  if(!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json(); // parses JSON response into native JavaScript objects
}

function submitForm(event) {
  event.preventDefault();

  postData()
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    if(data) {
      submitSuccessMessage.classList.remove("d-none");
    } else {
        if(!submitSuccessMessage.classList.contains('d-none')) {
            submitSuccessMessage.classList.add("d-none");
        }
    }
  });
}

function validateEmail() {
  var email = emailInput.value;
  validEmail = false;
  validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
  if(validEmail) {
      submitBtn.classList.remove("disabled");
  } else {
      if(!submitBtn.classList.contains('disabled')) {
          submitBtn.classList.add("disabled");
      }
  }
}