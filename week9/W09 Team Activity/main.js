init();

function init() {
    addEventListener("keypress", (event) => { keyPressed(event); });
    let audioList = document.querySelectorAll("audio");
    audioList.forEach( (audio) => {
        audio.addEventListener("ended", () => {
            let button = document.querySelector(`div[data-key="${audio.dataset.key}"]`);
            button.classList.remove("playing");
        });
    });
}

function removePlayingClass(audio) {
    
}

function keyPressed(event) {
    let kbdList = document.querySelectorAll("kbd");
    kbdList.forEach( (kbd) => {
        if (event.key === kbd.innerHTML.toLowerCase()) {
            let button = kbd.parentElement;
            button.classList.add("playing");

            let keyNum = button.dataset.key;
            playSound(keyNum);
        }
    });
}

function playSound(keyNum) {
    let audioList = document.querySelectorAll("audio");
    audioList.forEach( (audio) => {
        if(keyNum === audio.dataset.key) {
            console.dir(audio);
            audio.currentTime = 0;
            audio.play();
        }
    });
}