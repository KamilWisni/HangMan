
let wisielec = document.getElementById('img');
let tries = 0;

let slogan = '';
let hiddenSlogan = '';

let ArrayOfSlogans = [
    'FootBall',
    'Coconut',
    'Random Number',
    'red currant',
    'television channels',
    'List of technology',
    'touchpad in the laptop',
    'learning language',
    'Made in china',
    'checking the password',
    'cactus wine',
];

for (let i = 0; i < ArrayOfSlogans.length; i++) {
    ArrayOfSlogans[i] = ArrayOfSlogans[i].toUpperCase();
}

slogan = ArrayOfSlogans[(drawNumber(1, 11) - 1)];
let lengthOfSlogan = slogan.length;

let board = document.getElementById('slogan');

window.onload = start;

function displayTries() {
    document.getElementById('overlay').innerHTML = '<span>Lost Tries: '+tries+'</span>';
}

function displayPass() {
    board.innerHTML = '<span>'+hiddenSlogan+'</span>';
}

function drawNumber(min, max) {
    return Math.floor((Math.random()*(max - min + 1))+min);
}

String.prototype.changeCharAt = function(pos, char) {
    if (pos > this.length - 1) return this.toString();
    else return this.substr(0, pos)+char+this.substr((pos+1));
}

function start() {
    for (let i = 0; i<lengthOfSlogan; i++) {
        if (slogan.charAt(i) == ' ') {
            hiddenSlogan += ' ';
        } else {
            hiddenSlogan += "-";
        }
    }

    displayPass();
    prepareLetters();

    wisielec.style.background = 'url(./data/img/w0.gif) no-repeat';
    displayTries();
}

let alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]

for (let i = 0; i < alphabet.length; i++) {
    alphabet[i] = alphabet[i].toUpperCase();
}

function prepareLetters() {
    
    let letterDiv = '';

    for (let i = 0; i < alphabet.length; i++) {
        letterDiv += '<div id="let'+i+'" class="letter" onclick="check('+i+')"><span>'+alphabet[i]+'</span></div>';

        if ((i+1) % 7 == 0) {
            letterDiv += '<div class="clear"></div>'
        }
    }

    document.getElementById('letters').innerHTML = letterDiv;

}

function check(nr) {
    let checked = false;
    let thend = document.getElementById('letters');
    
    for (let i = 0; i < lengthOfSlogan; i++) {
        if (slogan.charAt(i) == alphabet[nr]) {
            hiddenSlogan = hiddenSlogan.changeCharAt(i, alphabet[nr]);
            checked = true;
        }
    }

    if (checked == true) {
        displayPass();

        let e = document.getElementById('let'+nr);

        e.style.border = 'solid 1px #21da42';
        e.style.color = '#21da42';
        e.style.cursor = 'default';

        e.setAttribute('onclick',';');

        displayPass();

        if (hiddenSlogan == slogan) {
            let win = '<div class="thend"><span class="orspan">You Win! The Correct Password<br />of this game is: <br />"'+slogan+'"</span><span id="playagain-w" class="playagain">Play Again</span></div>'

            thend.innerHTML = win;
        }

    } else {
        let e = document.getElementById('let'+nr);

        e.style.border = 'solid 1px #da2121';
        e.style.color = '#da2121';
        e.style.cursor = 'default';

        e.setAttribute('onclick',';');

        tries += 1;

        displayTries();

        let url = './data/img/w'+tries+'.gif';
        wisielec.style.background = 'url('+url+') no-repeat';

        if (tries == 7) {
            let lose = '<div class="thend"><span class="orspan">You Lose! The Correct<br />Password is: <br />"'+slogan+'"</span><span id="playagain-l" class="playagain">Play Again</span></div>';
            thend.innerHTML = lose;
        }
    }

    let reloadl = document.getElementById('playagain-l');
    let reloadw = document.getElementById('playagain-w');


    if (reloadl) reloadl.addEventListener("click", function(){myReload()});
    if (reloadw) reloadw.addEventListener("click", function(){myReload()});

}

function myReload() {
    location.reload()
}