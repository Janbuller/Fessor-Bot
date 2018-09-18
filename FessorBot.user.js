// ==UserScript==
// @name         fessorBot
// @namespace    http://tampermonkey.net/
// @version      12.0
// @description  Løse Gang med 0 Opgaver
// @author       LaZZe ( https://github.com/Janbuller )
// @match        https://www.matematikfessor.dk/test/*
// @grant        none
// @require      https://smtpjs.com/smtp.js
// @require      https://unpkg.com/mathjs@4.1.1/dist/math.min.js
// @updateURL    https://github.com/Janbuller/Fessor-Bot/raw/master/FessorBot.user.js
// @downloadURL  https://github.com/Janbuller/Fessor-Bot/raw/master/FessorBot.user.js
// ==/UserScript==

// Create testInfo variable for later
var testInfo;

// Run on script start
function init() {
    'use strict';
    // Create variables
    var loadCheck,
        pathName = window.location.pathname;

    // Check if it's a Five Sharp test
    if (pathName.match(/^\/test\/fivesharp\/$/)) {
        //Check if nextButton is clickable every 100 ms
        loadCheck = setInterval(function () {
            if (document.getElementsByClassName("nextButton")[0] && !document.getElementsByClassName("nextButton disabled")[0]) {
                // Run function testLoaded
                testLoaded();
                // Stop checking if button is clickable
                clearInterval(loadCheck);
            }
        }, 100);
    // Check if it's the result of a Five Sharp test
    } else if (pathName.match(/^\/test\/result\/\d+$/)) {
        //Check if recreateTestBtn is clickable every 100 ms
        loadCheck = setInterval(function () {
            if (document.getElementById("recreateTestBtn") && document.getElementsByClassName("evaluateAnswer")[0]) {
                // Run function resultLoaded
                resultLoaded();
                // Stop checking if button is clickable
                clearInterval(loadCheck);
            }
        }, 100);
    }

}

function testLoaded() {
    'use strict';
    // Get testType
    var testType = document.getElementsByClassName("no-link")[0].innerHTML;

    // Set testInfo for later
    testInfo = JSON.parse(loadJsPage.toString(10).match(/{"questions":\[{"Question":[\s\S]*?}}\);/)[0].replace(/\);/, ""));

    // Check if the testType is supported and if so save the correct answers
    switch (testType) {
        case "Gang med 0":
            saveAnswers([0, 0, 0, 0, 0]);
            break;
        case "Gang med 0 (flere faktorer)":
            saveAnswers([0, 0, 0, getMultAnswers(3, 0), getMultAnswers(4, 0)]);
            break;
        case "4281 + 346 (4-cifret plus 3-cifret)":
            saveAnswers([getMathAnswer(0), getMathAnswer(1), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "5 + 23 (1-cifret plus 2-cifret uden mente)":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMultAnswers(1, getMathAnswer(1)), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "1-cifret gange 1-cifret":
            saveAnswers([getMathAnswer(0), getMathAnswer(1), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "31 + 56 (2-cifret plus 2-cifret uden mente)":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMultAnswers(1, getMathAnswer(1)), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "37 + 28 (2-cifret plus 2-cifret med mente)":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMultAnswers(1, getMathAnswer(1)), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "10 + 39 + 51 + 24 (Sum med fire 2-cifrede tal)":
            saveAnswers([getMathAnswer(0), getMathAnswer(1), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "Gangemetode 1 (12 gange 34)":
            saveAnswers([getMathAnswer(0), getMathAnswer(1), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "7 + 46 (1-cifret plus 2-cifret med mente)":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMultAnswers(1, getMathAnswer(1)), getMathAnswer(2), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "1034 - 80 (4-cifret minus 2-cifret)":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMathAnswer(1), getMultAnswers(2, getMathAnswer(2)), getMathAnswer(3), getMathAnswer(4)]);
            break;
        case "12 - 5 med prikker":
            saveAnswers([getMultAnswers(0, getMathAnswer(0)), getMultAnswers(1, getMathAnswer(1)), getMultAnswers(2, getMathAnswer(2)), getMultAnswers(3, getMathAnswer(3)), getMultAnswers(4, getMathAnswer(4))])
        break;
        default:
            window.alert(testType + " er ikke understøttet af fessorBot");
            break;
    }
}

// Gets the text for the questionNumber and evaluate the equation
function getMathAnswer(questionNumber) {
    // Gets the text for the questionNumber
    var question = testInfo.questions[questionNumber].Question;
    // Gets only the math parts
    var Results = question.question.replace(/[^\d+,⋅-]/g, '');
    // Replaces the character used by the website with a *
    Results = Results.replace(/⋅/g, "*");
    // Evaluates the equation
    Results = math.eval(Results).toString();
    // Returns the results
    return Results
}

// Finds the id of the answer in multiple choice questions
function getMultAnswers(questionNumber, lookFor) {
    // Creates correctAnswer var for later
    var correctAnswer;

    // Goes through all the different possible answers
    for (var i = 0; i < testInfo.questions[questionNumber].answers.length; i++) {
        // Creates variable lookAt and sets it to the text of the current answer
        var lookAt = testInfo.questions[questionNumber].answers[i].Answer.answer;
        // Looks at if the text to lookFor is in the text to lookAt
        if (lookAt.indexOf(lookFor) > -1) {
            // Changes correctAnswer to the current answer
            correctAnswer = i;
        }
    }
    // Returns the correct answers id
    return testInfo.questions[questionNumber].answers[correctAnswer].Answer.id;
}

function saveAnswers(answers) {
    'use strict';
    var userInfo = JSON.parse(loadJsPage.toString(10).match(/{"reloadUserData":[\s\S]*?}}\);/)[0].replace(/\);/, "")),
        xhr,
        returned = [];
    for (let i = 0; i < answers.length; i += 1) {
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.matematikfessor.dk/test/save_answer', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.setRequestHeader("X-User-Id", userInfo.userData.id);
        xhr.setRequestHeader("X-Timestamp-Sent", new Date().getTime());
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onloadend = function () {
            returned[i] = true;
            if (returned.indexOf(false) === -1) {
                finishTest();
            }
        }
        returned[i] = false;
        xhr.send("data%5Bquestion_id%5D=" + testInfo.questions[i].Question.id + "&data%5Banswer%5D=" + answers[i] + "&data%5Btest_id%5D=" + testInfo.testSettings.Test.id + "&data%5Bmodel%5D=" + testInfo.testSettings.model);
    }
}

// Automatically presses the finishTest button
function finishTest() {
    'use strict';
    // Create loadCheck variable for later
    var loadCheck;
    // Click the first button to finish the test
    document.getElementsByClassName("big actionButton primary")[0].click();
    // Check (every 100 ms) if the next button to finish the test is loaded and if so click it and stop checking
    loadCheck = setInterval(function () {
        // Check if the button is loaded
        if (document.getElementsByClassName("big actionButton primary")[1]) {
            // Click the next button
            document.getElementsByClassName("big actionButton primary")[1].click();
            // Stop checking if the button is loaded
            clearInterval(loadCheck);
        }
    }, 100);
}

// Restart the test if result screen is loaded
function resultLoaded() {
    // Create some variables for later
    var i,
        isTarget = false,
        loadCheck;
    
    // Check if the result screen is for any of the supported tests and if so set isTarget to true
    for (i = 0; i < document.getElementsByClassName("no-link").length; i += 1) {
        if (document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: Gang med 0" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: Gang med 0 (flere faktorer)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 4281 + 346 (4-cifret plus 3-cifret)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: Gang med 0 (flere faktorer)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 5 + 23 (1-cifret plus 2-cifret uden mente)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 1-cifret gange 1-cifret" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 31 + 56 (2-cifret plus 2-cifret uden mente)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 37 + 28 (2-cifret plus 2-cifret med mente)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 10 + 39 + 51 + 24 (Sum med fire 2-cifrede tal)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: Gangemetode 1 (12 gange 34)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 3,4 + 2,5 (plus med decimaltal)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 7 + 46 (1-cifret plus 2-cifret med mente)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 1034 - 80 (4-cifret minus 2-cifret)" ||
            document.getElementsByClassName("no-link")[i].innerHTML === "Resultat for: 12 - 5 med prikker") {
            isTarget = true;
        }
    }

    // If isTarget is true (You're on the result screen of a supported test)
    if (isTarget) {
        // Clicks the first button to restart the test
        document.getElementById("recreateTestBtn").click();
        // Clicks the first button to restart the test and checks if the next button is there and if so click it and stop checking
        loadCheck = setInterval(function () {
            // Clicks the first button to restart the test
            document.getElementById("recreateTestBtn").click();
            // Checks if the next button is there
            if (document.getElementsByClassName("big actionButton primary")[0]) {
                // Click the next button
                document.getElementsByClassName("big actionButton primary")[0].click();
                // Stop Checking
                clearInterval(loadCheck);
            }
        }, 100);
    }
}

// Call the init function
init();
