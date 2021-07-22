/**
 * New way of using Promise, instead of awaiting within async function, let return a chain of Promise
 * @function augAwait
 * @async
 * @param timerObject - contain callback functions for test and resolve case.
 * The timerObject contains properties as follow:
 * + testFunc - function that return a boolean to decide whether a waiting conditiong has met.
 * + callbackFunc - function that executed a task after testFunc return true.
 * For example, the augSetDelayTask will await periodically <delaytimer> ms. Then it runs the testFunc.
 * If testFunc return true, augSetDelayTask will continue to run callbackFunc.
 * @return {Promise}
 */
async function augAwait(delayTimer, numberOfLoop, timerObject) {
    let _loopCounter = 0; // <= Local variable to counter loop

    while(_loopCounter <= numberOfLoop) {
        console.log({_loopCounter});
        if(timerObject.testFunc()) {
            timerObject.callbackFunc();
            return "Success!";
        }
        await new Promise(r => setTimeout(r, delayTimer));
        _loopCounter++;
    }
    console.warn("Something goes wrong, please check with network administrator.");
    return "Something goes wrong, please check with network administrator."; 
}
