function validateLocal() {
    return localStorage.getItem('account');
}
function setLocal() {
    localStorage.setItem('account', true);
}
function clearLocal() {
    localStorage.clear();
}
