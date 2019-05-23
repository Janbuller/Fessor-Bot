// ==UserScript==
// @name         afrundingAfTalBot
// @namespace    http://tampermonkey.net/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @version      1.0
// @description  Løse Gang med 0 Opgaver
// @author       LaZZe ( https://github.com/Janbuller )
// @match        https://www.matematikfessor.dk/adaptive_test/index/*
// @grant        none
// @require      https://smtpjs.com/smtp.js
// @require      https://unpkg.com/mathjs@4.1.1/dist/math.min.js
// ==/UserScript==

var Opgave;
function init() {
    Opgave = SkafOpgave();
    switch(Opgave) {
        case "topic:afrunding-af-tal-96":
            setInterval(function() {Afrunding()}, 100);
            break;
    }
}

function SkafOpgave() {

    return window.location.pathname.slice(21, window.location.pathname.length);
}

function Afrunding() {
    var Afrund = document.getElementsByClassName("questionText")[0].children[0].innerText.slice(0, -11).match(/[\d,]*\d+/g).join("").slice(0, -1);
    var AfrundMed = document.getElementsByClassName("questionText")[0].children[0].innerText.slice(0, -11).match(/[\d,]*\d+/g).join();
    AfrundMed = AfrundMed[AfrundMed.length -1];

    var Afrundet = Afrund.replace(",", ".");

    Afrundet = parseFloat(Afrundet).toFixed(AfrundMed);
    Afrundet = Afrundet.replace(".", ",");

    if (document.getElementsByClassName("questionText")[0].parentNode.children[1] != "[object HTMLUListElement]") {
        document.getElementsByClassName("answerInput")[0].value = Afrundet;
    } else if (document.getElementsByClassName("questionText")[0].parentNode.children[1] == "[object HTMLUListElement]") {
        for (var i = 0; i < document.getElementsByClassName("questionText")[0].parentNode.children[1].children.length; i++) {
            if (document.getElementsByClassName("questionText")[0].parentNode.children[1].children[i].innerText.slice(0, -10) == Afrundet) {
                document.getElementsByClassName("questionText")[0].parentNode.children[1].children[i].click();
            } else if (i == document.getElementsByClassName("questionText")[0].parentNode.children[1].children.length) {
                document.getElementsByClassName("questionText")[0].parentNode.children[1].children[0].click();
            }
        }
    }

    try {
        document.getElementsByClassName("big primary")[0].click()
    } catch(error) {
    }
}
init();
