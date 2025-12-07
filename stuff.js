function pingRetronetWeb() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', '//www.retronet.win/', true);
    xhr.send();
}

function pingRetronetChat() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', '//chat.retronet.win/', true);
    xhr.send();
}

pingRetronetWeb();
pingRetronetChat();
