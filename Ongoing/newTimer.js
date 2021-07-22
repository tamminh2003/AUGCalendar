window.temp = false;

timerObject = {
    testFunc: (resolve, reject, rejectCount) => {
        if (window.temp) resolve();
        else reject(rejectCount + 1);
    },
    callbackFunc: () => {
        console.log("This is timerObject callback, the Promise is resolved");
    },
    arguments: []
}

var newPromise = (delay, rejectCount) => {
    console.log("newPromise");
    return new Promise((resolve, reject) => {
        console.log("setTimeout");
        setTimeout(timerObject.testFunc, delay, resolve, reject, rejectCount);
    }).then(resolveHandler, rejectHandler);
}
    

var resolveHandler = (resolveValue) => {
    console.log("resolveHandler");
    timerObject.callbackFunc.call(this, ...timerObject.arguments);
}


var rejectHandler = (rejectCount) => {
    console.log(rejectCount);
    console.log("rejectHandler");
    if (rejectCount > numberOfLoop) {
        console.log("rejectCount exceeded numberOfLoop");
    } else {
        newPromise(delayTimer, rejectCount);
    }
}


/**
 * New way of using Promise, instead of awaiting within async function, let return a chain of Promise
 * @param timerObject - contain callback functions for test and resolve case.
 * @return {Promise}
 */
function augSetDelayTask(delayTimer, numberOfLoop, timerObject) {
    // First Promise Run
    newPromise(0, 0);
}

augSetDelayTask(1000, 10, timerObject);