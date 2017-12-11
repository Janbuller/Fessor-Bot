
// ==UserScript==
// @name         Better-Fessor
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Gøre matematikfessor.dk bedra
// @author       LaZZe ( https://github.com/Janbuller )
// @match        https://www.matematikfessor.dk/test/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Janbuller/Better-Fessor/master/BetterFessor.user.js
// @downloadURL  https://raw.githubusercontent.com/Janbuller/Better-Fessor/master/BetterFessor.user.js
// ==/UserScript==

function init() {
  addCounter();
}

function addCounter() {
  var activeQuestion = document.getElementByClassName("questionThumb active");
  var questionNum = activeQuestion.getAttributeName("data-index");
  var questionDisp = document.createElement("p");
  var questionText = document.getElementByClassName("questionText");
  questionText..appendChild(questionDisp);
}
init()
