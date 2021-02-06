// main.js

// TODO
//get relevant values from HTML document
let aud = document.getElementById("horn-sound");
let fieldVolume = document.getElementById("volume-number");
let slideVolume = document.getElementById("volume-slider");
let volImage = document.getElementById("volume-image");
let soundImg = document.getElementById("sound-image");
let honkBtn = document.getElementById("honk-btn");
let partyForm = document.getElementById("party-horn-form");

//get array of all radio buttons by their common name
let radios = document.getElementsByName("radio-sound");

//add event Listeners
fieldVolume.addEventListener("input", setVolumeNumber);
slideVolume.addEventListener("input", setVolumeSlider);
partyForm.addEventListener("submit", playSound);

//loop through array of radio buttons
for(let i = 0; i < radios.length; ++i){
    radios[i].addEventListener("change", function(){
        //get the name of selected sound (airhorn, parthorn, etc.)
        let audName = radios[i].id.substring(6);

        //set audio and image source based on name of selected sound
        let newAudSrc = "./assets/media/audio/" + audName + ".mp3";
        let newImgSrc = "./assets/media/images/" + audName + ".svg";

        //handle special case where image name is not same as audio file name
        if(audName === "car-horn"){
            newImgSrc = "./assets/media/images/car.svg";
        }

        //change source tags
        aud.src = newAudSrc;
        soundImg.src = newImgSrc;
    });
}

//action methods
function setVolumeNumber(){
    let currNumVal = fieldVolume.value;
    aud.volume = currNumVal/100;
    slideVolume.value = currNumVal;
    honkBtn.disabled = false;
    updateVolumeIcon(currNumVal);
}

function setVolumeSlider(){
    let currSlideVal = slideVolume.value;
    aud.volume = currSlideVal/100;
    fieldVolume.value = currSlideVal;
    honkBtn.disabled = false;
    updateVolumeIcon(currSlideVal);

}

function updateVolumeIcon(currVolume){
    if(currVolume >= 67){
        volImage.src = "./assets/media/icons/volume-level-3.svg";
    }
    else if(currVolume >= 34 && currVolume <= 66){
        volImage.src = "./assets/media/icons/volume-level-2.svg";
    }
    else if(currVolume >= 1 && currVolume <= 33){
        volImage.src = "./assets/media/icons/volume-level-1.svg";
    }
    else{
        volImage.src = "./assets/media/icons/volume-level-0.svg";
        honkBtn.disabled = true;
    }
}

function playSound(event){
    event.preventDefault();
    aud.play();
}
