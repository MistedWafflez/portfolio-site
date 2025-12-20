
    // MistedWafflez@RetroNet/SpaceHey/GitHub (2025)

function getXHR() {
    if (window.XMLHttpRequest) return new XMLHttpRequest();
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
    return null;
};

function ping(url, onSuccess, onFailure) {
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
};

var RetronetWebButton  = document.getElementById('Button-RetroNetWeb');
var RetronetWebStatus  = document.getElementById('RetronetWeb-StatusText');
var RetronetChatButton = document.getElementById('Button-RetroNetChat');
var RetronetChatStatus = document.getElementById('RetronetM-StatusText');

function assignText(element, value) {
    if (!element) return;
    if ('textContent' in element) {
        element.textContent = value;
    } else {
        element.innerText = value;
    }
};

ping('//web.retronet.win/status.txt',
    function success(data) {
        assignText(RetronetWebStatus, data || 'Online');
    },
    function failure(status) {
        assignText(RetronetWebStatus, 'Offline');
        RetronetWebButton.href = "javascript:void(0)";
    }
);

ping('//chat.retronet.win/status.txt',
    function success(data) {
        assignText(RetronetChatStatus, data || 'Online');
    },
    function failure(status) {
        assignText(RetronetChatStatus, 'Offline');
        RetronetChatButton.href = "javascript:void(0)";
    }
);
