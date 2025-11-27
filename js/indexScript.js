intervals = [false, false, false, false, false, false, false, false, false, false, false, false, false]
intervalsNames = ['1', '2>', '2', '3>', '3', '4', 'tryton', '5', '6>', '6', '7', '7<', '8'];
actualInterval = "";
lowestNoteIndex = 1;
highestNoteIndex = 37;
up = true;
down = false;
harm = false;
upharm = false;
downharm = false;
audioPlayer = document.getElementById("player");
audioPlayer2 = document.getElementById("player2");
audioPlayer3 = document.getElementById("player3");
audioPlayer4 = document.getElementById("player4");
firstNote = 0
endNote = 0
userGuess = "";
goodCounter = 0;
badCounter = 0;

counterFix = true;

function intervalToggle(intervalIndex, imgId, boxId, buttonBox) {
    box = document.getElementById(boxId);
    box.classList.toggle('unableToClick');

    btnBox= document.getElementById(buttonBox);
    btnBox.classList.toggle('backgroundChange');

    

    if (intervals[intervalIndex - 1]) {
        intervals[intervalIndex - 1] = false;
        document.getElementById(imgId).src = "imgs/acceptIcon.svg";
    }
    else { 
        intervals[intervalIndex - 1] = true;
        document.getElementById(imgId).src = "imgs/cancelIcon.svg";
    }

    console.log(intervals);
}

function getInterval() {
    let info = document.getElementById("badInfo");
    counterFix = false;
    intervalsToPick = []

    for (let index in intervals) {
        if (!intervals[index]) {
            intervalsToPick.push(intervalsNames[index])
        }
    }

    random = Math.floor(Math.random() * intervalsToPick.length);

    actualInterval = intervalsToPick[random]

    semitones = 0
    switch (actualInterval) {
        case '1':
            semitones = 0;
            badInfo.innerHTML = "To była pryma (1)";
            break;
        case '2>':
            semitones = 1;
            badInfo.innerHTML = "To była sekunda mała (2>)";
            break;
        case '2':
            semitones = 2;
            badInfo.innerHTML = "To była sekunda wielka (2)";
            break;
        case '3>':
            semitones = 3;
            badInfo.innerHTML = "To była tercja mała (3>)";
            break;
        case '3':
            semitones = 4;
            badInfo.innerHTML = "To była tercja wielka (3)";
            break;
        case '4':
            semitones = 5;
            badInfo.innerHTML = "To była kwarta (4)";
            break;
        case 'tryton':
            semitones = 6;
            badInfo.innerHTML = "To był tryton (4< lub 5>)";
            break;
        case '5':
            semitones = 7;
            badInfo.innerHTML = "To była kwinta (5)";
            break;
        case '6>':
            semitones = 8;
            badInfo.innerHTML = "To była seksta mała (6>)";
            break;
        case '6':
            semitones = 9;
            badInfo.innerHTML = "To była seksta wielka (6)";
            break;
        case '7':
            semitones = 10;
            badInfo.innerHTML = "To była septyma mała (7)";
            break;
        case '7<':
            semitones = 11;
            badInfo.innerHTML = "To była septyma wielka (7<)";
            break;
        case '8':
            semitones = 12;
            badInfo.innerHTML = "To była oktawa (8)";
            break;
    }

    let min = semitones + 1;
    let max = 37;

    firstNote = Math.floor(Math.random() * (max - min + 1)) + min;
    endNote = firstNote - semitones;

    console.log(firstNote + " : " + endNote);

    // audioPlayer.src = `notes/${endNote}.mp3`;
    // audioPlayer.play();

    // setTimeout(() => {
    //     audioPlayer2.src = `notes/${firstNote}.mp3`;
    //     audioPlayer2.play();
    // }, 1000);

    playInterval();

    console.log(actualInterval);
}

function playInterval() {
    if (firstNote <= 0) {
        return;
    }

    

    if (up) {
        audioPlayer.src = `notes/${endNote}.mp3`;
        audioPlayer.play();

        setTimeout(() => {
            audioPlayer2.src = `notes/${firstNote}.mp3`;
            audioPlayer2.play();
        }, 1000);
    }
    if (down) {
        audioPlayer.src = `notes/${firstNote}.mp3`;
        audioPlayer.play();

        setTimeout(() => {
            audioPlayer2.src = `notes/${endNote}.mp3`;
            audioPlayer2.play();
        }, 1000);
    }
    if (harm) {
        audioPlayer.src = `notes/${firstNote}.mp3`;
        audioPlayer.play();

        
        audioPlayer2.src = `notes/${endNote}.mp3`;
        audioPlayer2.play();
        
    }
    if (upharm) {
        audioPlayer.src = `notes/${endNote}.mp3`;
        audioPlayer.play();

        setTimeout(() => {
            audioPlayer2.src = `notes/${firstNote}.mp3`;
            audioPlayer2.play();
            setTimeout(() => {
                audioPlayer3.src = `notes/${firstNote}.mp3`;
                audioPlayer3.play();

                audioPlayer4.src = `notes/${endNote}.mp3`;
                audioPlayer4.play();
            }, 1000)
        }, 1000);
    }
    if (downharm){
        audioPlayer.src = `notes/${firstNote}.mp3`;
        audioPlayer.play();

        setTimeout(() => {
            audioPlayer2.src = `notes/${endNote}.mp3`;
            audioPlayer2.play();
            setTimeout(() => {
                audioPlayer3.src = `notes/${firstNote}.mp3`;
                audioPlayer3.play();

                audioPlayer4.src = `notes/${endNote}.mp3`;
                audioPlayer4.play();
            }, 1000)
        }, 1000);
    }
}

function selectMode() {
    select = document.getElementById("mode").value;

    up = false;
    down = false;
    harm = false;
    upharm = false;
    downharm = false;

    switch (select) {
        case 'up':
            up = true;
            break;
        case 'down':
            down = true;
            break;
        case 'harm':
            harm = true;
            break;
        case 'upharm':
            upharm = true;
            break;
        case 'downharm':
            downharm = true;
            break;
    }

    console.log(`${up} ${down} ${harm} ${upharm} ${downharm}`)
}

function getUserInterval(id) {
    if (!counterFix) {
        counterFix = true;

        userGuess = document.getElementById(id).innerText;

        if (userGuess == actualInterval) {
            goodCounter += 1;
            document.getElementById('goodCounter').innerHTML = goodCounter;
            setTimeout(getInterval(), 2000)
        }
        else {
            badCounter += 1;
            document.getElementById('badCounter').innerHTML = badCounter;
            document.getElementById('popup').style.visibility = "visible";
            document.getElementById('overlay').style.display = "block";
        }
        
    }

    
}

function restart() {
    firstNote = 0
    endNote = 0
    userGuess = "";
    goodCounter = 0;
    badCounter = 0;
    counterFix = true;
    
    document.getElementById('goodCounter').innerHTML = goodCounter;
    document.getElementById('badCounter').innerHTML = badCounter;
}

function goBack() {
    document.getElementById('popup').style.visibility = "hidden";
    document.getElementById('overlay').style.display = "none";
    getInterval();
}