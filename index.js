let doing = false;
let audioEnabled = true;

const spinSounds = Array(7).fill(new Audio('res/sounds/spin.mp3'));
const coinSounds = Array(3).fill(new Audio('res/sounds/coin.mp3'));
const winSound = new Audio('res/sounds/win.mp3');
const loseSound = new Audio('res/sounds/lose.mp3');

const statusText = document.getElementById('status');
const audioIcon = document.getElementById('audio');

function startSpin() {
    if (doing) return;
    doing = true;
    statusText.innerHTML = 'SPINNING...';

    const stopPositions = [randomInt(1, 7), randomInt(1, 7), randomInt(1, 7)];
    spinReels(stopPositions);
}

function spinReels([slot1Pos, slot2Pos, slot3Pos]) {
    const reels = [
        { element: document.getElementById('slot1'), stopAt: slot1Pos, currentPos: 1, coin: coinSounds[0] },
        { element: document.getElementById('slot2'), stopAt: slot2Pos, currentPos: 1, coin: coinSounds[1] },
        { element: document.getElementById('slot3'), stopAt: slot3Pos, currentPos: 1, coin: coinSounds[2] }
    ];

    reels.forEach((reel, index) => {
        setTimeout(() => spinReel(reel), index * 300); // delay for each reel to simulate spinning
    });
}

function spinReel(reel) {
    const spinInterval = setInterval(() => {
        reel.currentPos = (reel.currentPos % 7) + 1; // Loop between 1 and 7
        reel.element.innerHTML = reel.currentPos;

        if (audioEnabled) {
            spinSounds[reel.currentPos % spinSounds.length].play();
        }

        if (reel.currentPos === reel.stopAt) {
            clearInterval(spinInterval);
            reel.coin.play();
            checkWinCondition();
        }
    }, 100);
}

function checkWinCondition() {
    const slot1 = document.getElementById('slot1').innerHTML;
    const slot2 = document.getElementById('slot2').innerHTML;
    const slot3 = document.getElementById('slot3').innerHTML;

    if (slot1 === slot2 && slot2 === slot3) {
        statusText.innerHTML = 'YOU WIN!';
        winSound.play();
    } else {
        statusText.innerHTML = 'YOU LOSE!';
        loseSound.play();
    }

    doing = false;
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const volume = audioEnabled ? 1 : 0;

    spinSounds.forEach(sound => (sound.volume = volume));
    coinSounds.forEach(sound => (sound.volume = volume));
    winSound.volume = volume;
    loseSound.volume = volume;

    audioIcon.src = `res/icons/audio${audioEnabled ? 'On' : 'Off'}.png`;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
