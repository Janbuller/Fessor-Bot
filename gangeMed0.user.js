// ==UserScript==
// @name         fessorBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Lav XP i MatematikFessor
// @author       HarshWombat ( https://github.com/HarshWombat )
// @match        *www.matematikfessor.dk/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/HarshWombat/fessorBot/master/gangeMed0.user.js
// @downloadURL  https://raw.githubusercontent.com/HarshWombat/fessorBot/master/gangeMed0.user.js
// ==/UserScript==

(function () {
    'use strict';
    var pathName = window.location.pathname,
        loadCheck;
    if (pathName.match(/^\/test\/fivesharp\/$/)) { //Hvis vi er ved en "fivesharp" test
        loadCheck = setInterval(function () {
            if (document.getElementsByClassName("nextButton")[0] && !document.getElementsByClassName("nextButton disabled")[0]) {
                testLoaded();
                clearInterval(loadCheck);
            }
        }, 100);
    } else if (pathName.match(/^\/test\/result\/\d+$/)) { //Hvis vi er ved en "fivesharp" test
        loadCheck = setInterval(function () {
            if (document.getElementById("recreateTestBtn") && document.getElementsByClassName("evaluateAnswer")[0]) {
                resultLoaded();
                clearInterval(loadCheck);
            }
        }, 100);
    }
})();

function testLoaded() {
    var i,
        isTarget = false,
        loadCheck;
    for (i = 0; i < document.getElementsByClassName("no-link").length; i += 1) {
        if (document.getElementsByClassName("no-link")[i].innerHTML === "Gange med 0") {
            isTarget = true;
        }
    }
    if (isTarget) {
        console.log(document.getElementsByClassName("nextButton disabled")[0]);
        while (!document.getElementsByClassName("nextButton disabled")[0]) {
            document.getElementsByClassName("nextButton")[0].click();
        }
        for (i = 0; i < document.getElementsByClassName("answerInput").length; i += 1) {
            document.getElementsByClassName("answerInput")[i].value = 0;
        }
        while (!document.getElementsByClassName("prevButton disabled")[0]) {
            document.getElementsByClassName("prevButton")[0].click();
        }
        document.getElementsByClassName("nextButton")[0].click();
        document.getElementsByClassName("big actionButton primary")[0].click();
        loadCheck = setInterval(function () {
            if (document.getElementsByClassName("big actionButton primary")[1]) {
                document.getElementsByClassName("big actionButton primary")[1].click();
                clearInterval(loadCheck);
            }
        }, 100);
    }
}

function resultLoaded() {
    var i,
        isTarget = false,
        loadCheck;
    for (i = 0; i < document.getElementsByClassName("no-link").length; i += 1) {
        if (document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: Gange med 0") {
            isTarget = true;
        }
    }
    if (isTarget) {
        document.getElementById("recreateTestBtn").click();
        loadCheck = setInterval(function () {
            document.getElementById("recreateTestBtn").click();
            if (document.getElementsByClassName("big actionButton primary")[0]) {
                document.getElementsByClassName("big actionButton primary")[0].click();
                clearInterval(loadCheck);
            }
        }, 100);
    }
}
