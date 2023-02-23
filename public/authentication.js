// Author: Vrajesh Iyengar (58th Batch)

function authenticate() {
  var token = window.localStorage.getItem("joka_auth_token");
  if (token && token !== "null") {
    var formData = new URLSearchParams();
    formData.append("access_token", token);
    fetch("https://student.iimcal.ac.in/api/auth/verifyAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        joka_auth_token: token,
      },
      body: formData.toString(),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        if (body.error) {
          console.log("Cleared local joka_auth_token!!!");
          localStorage.removeItem("joka_auth_token");
          window.open(`?redirectUrl=${window.location.href}`, "_self");
        } else {
          console.log("User already logged in");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log("Cleared local joka_auth_token!!!");
    localStorage.removeItem("joka_auth_token");
    window.open(`?redirectUrl=${window.location.href}`, "_self");
  }
}

function addLogout() {
  var logoutDiv = document.getElementById("logout");
  if (logoutDiv) {
    let htmlString = `
       <button id="logoutButton" class="logout-button">Logout</button>
       `;

    let cssString = `
        #logout {
            position: fixed;
            right:10px;
            top: 10px;
        }
        .logout-button {
            background-color: #00000030;
            border: none;
            color: white;
            padding: 5px 10px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 15px;
        }
       `;

    let head = document.querySelector("head");
    let style = document.createElement("style");
    style.innerHTML = cssString;
    head.appendChild(style);
    logoutDiv.innerHTML = htmlString;
    document
      .getElementById("logoutButton")
      .addEventListener("click", function () {
        let logoutURL = "api/auth/logout";
        fetch(logoutURL)
          .then(function () {
            console.log("Cleared local joka_auth_token!!!");
            localStorage.removeItem("joka_auth_token");
            window.open(`/home?redirectUrl=${window.location.href}`, "_self");
          })
          .catch(function (err) {
            console.error(err);
          });
      });
  }
}

authenticate();
addLogout();
