const plays = document.getElementById('plays');
const audio = document.querySelector('audio');
const imgi = document.querySelector('img');
const title = document.querySelector('#title');
const pre = document.querySelector('#pre');
const nex = document.querySelector('#nex');
isplaying = false;

const playmusic = () =>{
    isplaying = true;
    audio.play();
    plays.classList.replace("fa-play","fa-pause");
    imgi.classList.add('anime');
}
const pausemusic = () =>{
    isplaying = false;
    audio.pause();
    plays.classList.replace("fa-pause","fa-play");
    imgi.classList.remove('anime');
}
plays.addEventListener('click',()=>{
    // if(isplaying){
    //     pausemusic();
    // }
    // else{
    //     playmusic();
    // }
    isplaying ? pausemusic() : playmusic();
});

// songs add in list 
const songs = [
    {
        name : "golmaal",
        title : "Golmaal Again",
    },
    {
        name : "humsafar",
        title : "Humsafar",
    },
    {
        name : "airlift",
        title : "soch na sakhe",
    },
    {
        name : "maharaj",
        title : "Shodhu Kuthe r",
    },
    {
        name : "sairat",
        title : "Zingaat",
    }
];
// images\sairat.jpg
// music\Golmaal Again.mpeg
const loadsongs = (songs) =>{
    title.textContent = songs.title;
    audio.src = "music/"+songs.title+".mpeg";
    imgi.src = "images/"+songs.name+".jpg";
    
}
songindex = 0;
// loadsongs(songs[4]);

const nextsong = () =>{
    songindex = (songindex + 1) % songs.length;
    loadsongs(songs[songindex]);
    playmusic();
}
const prevsong = () =>{
    songindex = (songindex - 1 + songs.length) % songs.length;
    loadsongs(songs[songindex]);
    playmusic();
}
const progress = document.getElementById('progress');
const startd = document.getElementById('startd');
const endd = document.getElementById('endd');
const progress_div = document.querySelector('#progress_div');

audio.addEventListener('timeupdate',(event)=>{
    const { currentTime , duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // current time 

    let cmintime = Math.floor(currentTime / 60 );
    let csectime = Math.floor(currentTime % 60 );
    
    if(csectime < 10){
        csectime = `0${csectime}`;
    }
    let strctime = `${cmintime}:${csectime}`;
    if(currentTime){
        startd.textContent = strctime;
    }

    // duration

    let dmintime = Math.floor(duration / 60);
    let dsectime = Math.floor(duration % 60);
    let setst = `${dmintime}:${dsectime}`;
    if(duration){
    endd.textContent = setst;
    }
});

audio.addEventListener('ended', nextsong);

nex.addEventListener('click',nextsong);
pre.addEventListener('click',prevsong);

progress_div.addEventListener('click',(event)=>{
    const { duration } = audio;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = move_progress;
});

window.addEventListener('keydown', e=>{
    switch (e.key) {

        case "ArrowLeft":
            console.log("ArrowLeft");
            prevsong();
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            nextsong();
            break;
    }
});


