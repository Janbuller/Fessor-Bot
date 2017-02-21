/*jshint strict: true, evil: true, browser: true, jquery: true*/
var func = {
    "findSol": function () {
        'use strict';
        var question = document.getElementsByClassName("preview")[0].innerHTML.replace(":", "/").replace("=", "").replace("·", "*").replace(/[,]/g, ".");
        return Math.round(eval(question) * 100) / 100;
    },
    "findWriteTarget": function () {
        'use strict';
        return document.getElementsByClassName("empty hilite")[0].children[0];
    },
    "valChange": function (target, str) {
        'use strict';
        target.value = str;
    },
    "submit": function () {
        'use strict';
        document.getElementsByClassName("cssButton")[0].click();
    },
    "main": function () {
        'use strict';
        var sol = func.findSol(),
            numberString = sol.toString(10),
            target = func.findWriteTarget();
        func.valChange(target, numberString);
        func.submit();
    },
    "start": function () {
        'use strict';
        var i = 0,
            int = setInterval(function () {
                func.main();
                i += 1;
                if (i === document.getElementsByClassName("empty").length) {
                    setTimeout(function () {
                        document.getElementsByClassName("big")[0].click();
                        func.start();
                    }, 1000);
                    clearInterval(int);
                }
            }, 100);
    }
};
document.getElementsByClassName("big actionButton primary")[0].click();
func.start();