// //
const firebaseConfig = {
  apiKey: "AIzaSyBVHDva0972e85i1cVLr-LDyDaJhpIRz-M",
  authDomain: "login-and-sign-in-6c629.firebaseapp.com",
  databaseURL: "https://login-and-sign-in-6c629-default-rtdb.firebaseio.com",
  projectId: "login-and-sign-in-6c629",
  storageBucket: "login-and-sign-in-6c629.appspot.com",
  messagingSenderId: "609204425026",
  appId: "1:609204425026:web:8055826bad56bd900678db",
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let form = document.querySelector("#registration-form");

// submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (
    emailPattern.test(email) &&
    document.getElementById("password").value.length >= 8
  ) {
    console.log("Valid email:");
    let formData = {
      name: name,
      email: email,
      password: password,
    };
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.push(formData);

    localStorage.setItem("userData", JSON.stringify(userData));

    database
      .ref("form-data")
      .push(formData)
      .then(function () {
        form.reset();
        console.log("Form data saved successfully");
        alert("Form data saved successfully");
        window.location.href = "home.htm";
      })
      .catch(function (error) {
        console.error("Error saving form data:", error);
      });
    form.reset();
  } else {
    alert("invalid input");
  }
});

