var longUrlBox = document.getElementById('longUrlInput');
var makeBtn = document.getElementById('shortenButton');
var resultBox = document.getElementById('shortUrlDisplay');
var resultLink = document.getElementById('shortUrlLink');
var doCopyBtn = document.getElementById('copyButton');
var messageArea = document.getElementById('messageDisplay');

var savedUrls = {};

function makeShortCode() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function checkUrl(address) {
    return address.startsWith('http://') || address.startsWith('https://');
}

function displayMessage(text, isGood) {
    messageArea.textContent = text;
    messageArea.classList.remove('hidden', 'success', 'error');
    if (isGood) {
        messageArea.classList.add('success');
    } else {
        messageArea.classList.add('error');
    }
}

makeBtn.addEventListener('click', function() {
    messageArea.classList.add('hidden');
    var enteredUrl = longUrlBox.value;

    if (!enteredUrl) {
        displayMessage('Type a URL first.', false);
        return;
    }

    if (!checkUrl(enteredUrl)) {
        displayMessage('Not a valid URL. Try again.', false);
        return;
    }

    var newCode;
    do {
        newCode = makeShortCode();
    } while (savedUrls[newCode]);

    savedUrls[newCode] = enteredUrl;

    var finalShortUrl = 'https://short.url/' + newCode;

    resultLink.textContent = finalShortUrl;
    resultLink.href = enteredUrl;
    resultBox.classList.remove('hidden');
    displayMessage('URL shortened!', true);
});

doCopyBtn.addEventListener('click', function() {
    var linkToCopy = resultLink.textContent;

    if (linkToCopy) {
        navigator.clipboard.writeText(linkToCopy)
            .then(function() {
                displayMessage('Copied!', true);
            })
            .catch(function() {
                displayMessage('Could not copy. Copy manually.', false);
            });
    } else {
        displayMessage('Nothing to copy yet.', false);
    }
});
