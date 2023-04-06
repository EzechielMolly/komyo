// Ajoutez cette ligne au début de votre fichier JS
const response = await fetch('http://brahamizakaria.pythonanywhere.com/')


var question = "Hello! How can I assist you today?";


document.addEventListener("DOMContentLoaded", function () {
  var output = document.getElementById('AutoMessage'); // stocke l'ID "AutoMessage" dans la variable output
  output.innerHTML = question; // affiche la première question

  var mes = document.getElementById('request');

  function bot() {
    var input = document.getElementById("mesbox").value;
    console.log(input);

    // Affichez le message de l'utilisateur dans la #chatBox
    $("#chatBox").append(
      '<div class="user-message"><strong>Vous:</strong><br>' + input + "</div>"
    );

     // Ajoutez cette partie pour envoyer une requête AJAX à votre API Flask
     $.ajax({
      url: "/get",
      method: "POST",
      data: { msg: input },
      success: function (data) {
        var response = data.response;
        // Affichez la réponse du chatbot dans la #chatBox
        $("#chatBox").append(
          '<div class="response"><strong>bot:</strong><br>' + response + "</div>"
        );
        // Videz la zone de saisie
        document.getElementById("mesbox").value = "";
      },
    });

    questionNum++;
  }

  function timedQuestion() {
    output.innerHTML = question;
  }

  // Ajoutez cette fonction pour gérer l'appui sur la touche Entrée
  function handleKeyPress(e) {
    if (e.which == 13) {
      bot();
      e.preventDefault(); // Empêchez le comportement par défaut lors de l'appui sur la touche Entrée
    }
  }

  document.querySelector(".chatbox-open").addEventListener("click", function () {
    document.querySelector(".chatbox-popup").style.display = "block";
    document.querySelector(".chatbox-open").style.display = "none";
  });

  document.querySelector(".chatbox-close").addEventListener("click", function () {
    document.querySelector(".chatbox-popup").style.display = "none";
    document.querySelector(".chatbox-open").style.display = "block";
  });

  // Attachez l'événement "keypress" à l'élément "mesbox"
  document.getElementById("mesbox").addEventListener("keypress", handleKeyPress);
});

function sendRequestToAPI() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText); // Affiche la réponse de l'API dans la console du navigateur
    }
  };
  xhttp.open("POST", "/get", true); // Remplacez l'URL de l'API par l'endpoint de votre API
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("msg=" + encodeURIComponent("Votre message")); // Remplacez "Votre message" par le message que vous souhaitez envoyer à l'API
}

function sendMessage(userText) {
  $.ajax({
    url: '/get',
    method: 'POST',
    data: {
      msg: userText,
    },
    success: function (data) {
      // Ajoutez ici le code pour afficher la réponse de l'API dans votre interface de chat
      console.log(data.response);
    },
    error: function (error) {
      console.error('Erreur lors de la récupération de la réponse :', error);
    },
  });
}

function klikaj(i) {
  console.log("klikaj() called");
  const text = document.getElementById("chat-bot-input").value;
  const parentNode = document.getElementById("chat-body");
  const textNode = document.createTextNode(text);
  const childNode = document.createElement("div");
  childNode.className = "chat-bubble me";
  childNode.appendChild(textNode);
  parentNode.appendChild(childNode);
  document.getElementById("chat-bot-input").value = "";

  const waitingNode = document.createElement("div");
  waitingNode.className = "chat-bubble you";
  waitingNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="0" cy="44.1678" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate></circle> <circle cx="45" cy="43.0965" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate></circle> <circle cx="90" cy="52.0442" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate></circle></svg>' ;
  parentNode.appendChild(waitingNode);

  // Create an XMLHttpRequest object
  const xhttp = new XMLHttpRequest();

  // Define a callback function
  xhttp.onload = function () {
    console.log("onload called");
    console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    parentNode.childNodes[parentNode.childNodes.length - 1].remove();
    const textResponseNode = document.createTextNode(data.response);
    const responseNode = document.createElement("div");
    responseNode.className = "chat-bubble you";
    responseNode.appendChild(textResponseNode);
    parentNode.appendChild(responseNode);
  };

  xhttp.onerror = function () {
    console.log("An error occurred during the request");
  };

  xhttp.open("POST", "/get", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ msg: text }));
  console.log("Request sent");
}

console.log(document.getElementById("AutoMessage"));
console.log(document.getElementById("request"));
console.log(document.getElementById("mesbox"));

function sendMessageFromInput() {
  const userText = document.getElementById("chat-bot-input").value;
  if (userText.trim() === "") {
    return;
  }
  displayUserMessage(userText);
  document.getElementById("chat-bot-input").value = "";
  sendMessage(userText);
}

function displayUserMessage(userText) {
  const parentNode = document.getElementById("chat-body");
  const textNode = document.createTextNode(userText);
  const childNode = document.createElement("div");
  childNode.className = "chat-bubble me";
  childNode.appendChild(textNode);
  parentNode.appendChild(childNode);
}

function sendMessage(userText) {
  const parentNode = document.getElementById("chat-body");

  const waitingNode = document.createElement("div");
  waitingNode.className = "chat-bubble you";
  waitingNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="0" cy="44.1678" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate></circle> <circle cx="45" cy="43.0965" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate></circle> <circle cx="90" cy="52.0442" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"  repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate></circle> <circle cx="90" cy="52.0442" r="15" fill="#ffffff"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate></circle></svg>';
  parentNode.appendChild(waitingNode);
  
  $.ajax({
  url: '/get',
  method: 'POST',
  data: {
  msg: userText,
  },
  success: function (data) {
    parentNode.childNodes[parentNode.childNodes.length - 1].remove();
    const textResponseNode = document.createTextNode(data.response);
    const responseNode = document.createElement("div");
    responseNode.className = "chat-bubble you";
    responseNode.appendChild(textResponseNode);
    parentNode.appendChild(responseNode);
  },
  error: function (error) {
    console.error('Erreur lors de la récupération de la réponse :', error);
  },
  });
}

document.getElementById("chat-bot-input").addEventListener("keypress", function (e) {
  if (e.which == 13) {
    sendMessageFromInput();
    e.preventDefault();
  }
});

document.getElementById("chat-bot-submit").addEventListener("click", function () {
  sendMessageFromInput();
});
