function ping(url,onSuccess,onFailure) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                onSuccess(xhr.responseText);
            } else {
                onFailure(xhr.status);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

var RetronetWebButton = document.getElementById('Button-RetroNetWeb');
var RetronetWebStatus = document.getElementById('RetronetWeb-StatusText');
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

ping('//web.retronet.win/example.json',
    function success(data) {
        assignText(RetronetWebStatus,'Online');
    },
    function failure(status) {
        assignText(RetronetWebStatus,'Offline');
        RetronetWebButton.removeAttribute("href");
    }
);

ping('//chat.retronet.win/example.json',
    function success(data) {
        assignText(RetronetChatStatus,'Online');
    },
    function failure(status) {
        assignText(RetronetChatStatus,'Offline');
        RetronetChatButton.removeAttribute("href");
    }
);
