var time = {
    "beforeStart": 500,
    "afterStart": 100,
    "betweenNumbers": 100,
    "beforeFinish": 0
  },
  func = {
    "findSol": function() {
      'use strict';
      var question = document.getElementsByClassName("preview")[0].innerHTML.replace(":", "/").replace("=", "").replace("·", "*").replace(/[,]/g, ".");
      return Math.round(eval(question) * 100) / 100;
    },
    "findWriteTarget": function() {
      'use strict';
      return document.getElementsByClassName("empty hilite")[0].children[0];
    },
    "valChange": function(target, str) {
      'use strict';
      target.value = str;
    },
    "submit": function() {
      'use strict';
      document.getElementsByClassName("cssButton")[0].click();
    },
    "continueOrEnd": function() {
      'use strict';
      if (document.getElementsByClassName("empty hilite").length === 0) {
        setTimeout(function() {
          func.restart();
        }, time.beforeFinish);
      } else {
        func.main();
      }
    },
    "main": function() {
      'use strict';
      var sol = func.findSol(),
        numberString = sol.toString(10),
        target = func.findWriteTarget();
      setTimeout(function() {
        func.valChange(target, numberString);
        func.submit();
        func.continueOrEnd();
      }, time.betweenNumbers);
    },
    "restart": function() {
      'use strict';
      setTimeout(function () {
      document.getElementsByClassName("big")[0].click();
      setTimeout(function () {
      	func.main();
      }, time.afterStart)
      }, time.beforeStart)
    },
    "firstStart": function(option) {
      'use strict';
      setTimeout(function() {
        document.getElementsByClassName("big actionButton primary")[0].click();
        setTimeout(function() {
          func.main();
        }, time.afterStart);
      }, time.beforeStart);
    }
  };
func.firstStart();
