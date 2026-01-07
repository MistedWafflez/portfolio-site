
// MistedWafflez@RetroNet/SpaceHey/GitHub (2025-2026)

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

function fetchJSON(url, onSuccess, onFailure) {
    try {
        var xhr = getXHR();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    var json = JSON.parse(xhr.responseText);
                    onSuccess(json);
                } catch (e) {
                    onFailure(xhr.status);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.withCredentials = true;
        xhr.send();
    } catch (e) {
        onFailure(0);
    }
};

var RetronetWebButton = document.getElementById('Button-RetroNetWeb');
var RetronetWebStatus = document.getElementById('RetronetWeb-StatusText');

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

var RetronetLunaroButton = document.getElementById('Button-RetroNetLunaro');
var RetronetLunaroStatus = document.getElementById('RetronetLunaro-StatusText');

ping(protocol + '//lunaro.retronet.win/status.txt',
    function success(data) {
        assignText(RetronetLunaroStatus, data || 'Online');
    },
    function failure(status) {
        assignText(RetronetLunaroStatus, 'Offline');
        RetronetLunaroButton.href = "javascript:void(0)";
    }
);

function fetchUserProfile(userId) {
    fetchJSON(protocol + '//retronet.win/api/integration/getProfile?userId=' + encodeURIComponent(userId),
        function success(profileData) {
            if (!profileData || !profileData.profile) return;
            var displayName = profileData.profile.displayName || "traveler";
            var greet = document.getElementById("projectsGreeting");
            if (greet) {
                greet.textContent = `(hi ${displayName}!!)`;
                greet.classList.add("shown");
            }
        },
        function failure(status) {
            console.log("getProfile failed", status);
        }
    );
};

function doGreeting() {
    fetchJSON(protocol + '//retronet.win/api/integration/getSelf',
        function success(selfData) {
            if (!selfData || !selfData.loggedIn) {
                hideGreeting();
                return;
            }
            fetchUserProfile(selfData.userId);
        },
        function failure(status) {
            hideGreeting();
            console.log("getSelf failed", status);
        }
    );
}

function hideGreeting() {
    var greet = document.getElementById("projectsGreeting");
    if (greet) greet.classList.remove("shown");
}

ping(protocol + '//retronet.win/status.txt',
    function success(data) {
        assignText(RetronetWebStatus, data || 'Online');
        doGreeting();
    },
    function failure(status) {
        assignText(RetronetWebStatus, 'Offline');
        RetronetWebButton.href = "javascript:void(0)";
    }
);
