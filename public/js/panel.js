//let panel = {};
$(document).ready(function() {
    localStorage.setItem("login", "true");
    HideNameField();
    getList(CtrlListeners);
    ShowDownloadBtn();
    setTimeout(Listeners, 0);
    //Listeners();
});