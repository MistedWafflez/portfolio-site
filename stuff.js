
// MistedWafflez@RetroNet/SpaceHey/GitHub (2025)

var protocol = "";

if (location.protocol === "https:") {
    protocol = "https:";
} else {
    protocol = "http:";
};

function getXHR() {
    if (window.XMLHttpRequest) return new XMLHttpRequest();
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) { }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { }
    return null;
};

function ping(url, onSuccess, onFailure) {
    try {
        var xhr = getXHR();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.responseText && xhr.responseText.length > 0) {
                    onSuccess(xhr.responseText);
                } else {
                    onFailure(xhr.status);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    } catch (e) {
        onFailure(0);
    };
};

var RetronetWebButton = document.getElementById('Button-RetroNetWeb');
var RetronetWebStatus = document.getElementById('RetronetWeb-StatusText');
var RetronetChatButton = document.getElementById('Button-RetroNetChat');
var RetronetChatStatus = document.getElementById('RetronetM-StatusText');

function assignText(element, value) {
    if (!element) return;
    if (element.textContent !== undefined) {
        element.textContent = value;
    } else if (element.innerText !== undefined) {
        element.innerText = value;
    } else {
        element.innerHTML = value;
    }
}


ping(protocol + '//web.retronet.win/status.txt',
    function success(data) {
        assignText(RetronetWebStatus, data || 'Online');
    },
    function failure(status) {
        assignText(RetronetWebStatus, 'Offline');
        RetronetWebButton.href = "javascript:void(0)";
    }
);

ping(protocol + '//chat.retronet.win/status.txt',
    function success(data) {
        assignText(RetronetChatStatus, data || 'Online');
    },
    function failure(status) {
        assignText(RetronetChatStatus, 'Offline');
        RetronetChatButton.href = "javascript:void(0)";
    }
);
