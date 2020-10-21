
module.exports = {
    consoleValues,
    CleanLocalStorage,
    refreshValues,
    userIsLogged
}

var values = {
    userIsLogged :  null ,
    userId : ''
}

function refreshValues(){
    values.userIsLogged = localStorage.getItem("userId") != undefined ? true : false;
    values.userId = localStorage.getItem('userId');
    console.log('values refreshed');
}

function consoleValues(){
    refreshValues();
    console.log(values);
}

function userIsLogged(){
    refreshValues();
    return values.userIsLogged;
}

function CleanLocalStorage(){
    localStorage.removeItem('userId');
    console.log("cleaning local");
    values.userId = null;
}