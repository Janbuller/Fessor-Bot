/*jshint strict: true, evil: true, browser: true, jquery: true*/
var time = {
        "beforeStart": 0,
        "afterStart": 0,
        "betweenNumbers": 0,
        "beforeFinish": 0
    },
    func = {
        "getTable": function () {
            'use strict';
            return parseInt(document.getElementsByClassName("heading")[0].innerHTML, 10);
        },
        "getNum": function (currentPlace, table) {
            'use strict';
            return currentPlace * table + table;
        },
        "updateInfo": function (currentPlace, num) {
            'use strict';
            document.getElementById("sequenceInput_" + currentPlace).value = num;
        },
        "isDone": function (currentPlace, table) {
            'use strict';
            currentPlace += 1;
            if (currentPlace >= 10) {
                if (table === 20) {
                    setTimeout(function () {
                        document.getElementsByClassName("big ready")[0].click();
                        window.alert("Ayy lmao");
                    }, time.beforeFinish);
                } else {
                    setTimeout(function () {
                        document.getElementsByClassName("big ready")[0].click();
                        func.start();
                    }, time.beforeFinish);
                }
            } else {
                document.getElementById("sequence_" + (currentPlace)).click();
                setTimeout(function () {
                    func.main(currentPlace);
                }, time.betweenNumbers);
            }
        },
        "main": function (currentPlace) {
            'use strict';
            var table = func.getTable(),
                num = func.getNum(currentPlace, table);
            func.updateInfo(currentPlace, num);
            func.isDone(currentPlace, table);
        },
        "start": function (option) {
            'use strict';
            setTimeout(function () {
                document.getElementsByClassName("btContainer")[0].children[0].click();
                setTimeout(function () {
                    func.main(1);
                }, time.afterStart);
            }, time.beforeStart);
        },
        "firstStart": function (option) {
            'use strict';
            setTimeout(function () {
                document.getElementsByClassName("big actionButton primary")[0].click();
                setTimeout(function () {
                    func.main(1);
                }, time.afterStart);
            }, time.beforeStart);
        },
    };
func.firstStart();