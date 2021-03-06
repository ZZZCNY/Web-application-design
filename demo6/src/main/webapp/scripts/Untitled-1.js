var httpRequest = null;

function createXHR() {
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
                httpRequest = null;
            }
        }
    }
    if (!httpRequest) {
        alert("fail to create httpRequest");
    }
}

function sendRequest(url, parameter, method, handler) {
    createXHR();
    if (!httpRequest)
        return false;
    httpRequest.onreadystatechange = handler;
    if (method == "GET") {
        httpRequest.open(method, url + "?" + parameter, true);
        httpRequest.send(null);
    }
    if (method == "POST") {
        httpRequest.open(method, url, true);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send(parameter);
    }
}

function formCheck() {
    var url = "FormCheck";
    var username = document.getElementById("username").value;
    var parameter = "username=" + username;
    sendRequest(url, parameter, "GET", showresult);
}

function login() {
    var url = "LoginServlet";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var parameter = "username=" + username + "&password=" + password;
    sendRequest(url, parameter, "POST", showresult);
}

function showresult() {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            var info = httpRequest.responseText;
            document.getElementById("result").innerHTML = info;
        }
    }
}