
// ==UserScript==
// @name         Better-Fessor
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Gøre matematikfessor.dk bedre
// @author       LaZZe ( https://github.com/Janbuller )
// @match        https://www.matematikfessor.dk/test/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Janbuller/Better-Fessor/master/BetterFessor.user.js
// @downloadURL  https://raw.githubusercontent.com/Janbuller/Better-Fessor/master/BetterFessor.user.js
// ==/UserScript==

function init() {
    setInterval(update, 100);
    loadCheck = setInterval(function () {
        if (document.getElementsByClassName("nextButton")[0] && !document.getElementsByClassName("nextButton disabled")[0]) {
            clearInterval(loadCheck);
            addCounter();
        }
    }, 100);
}

function update() {
}

function addCounter() {
    var activeQuestion = $(".questionThumb active:first-child").text();
    //$("#breadcrumbs").append ( `
    //    <div id="Question Counter">
    //    <p style="font-size: 24px;">` + $(activeQuestion) + `</p>
    //    </div>
    //    ` );
    $("#breadcrumbs").append ( `
        <div id="Question Counter">
        <p style="font-size: 16px;">Allahu Akbar, Motherfuckers.</p>
        </div>
        ` );
}
init();
