const previous = document.querySelector('#pre');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const title = document.querySelector('#title');
const recent_volume= document.querySelector('#volume');
const volume_show = document.querySelector('#volume_show');
const slider = document.querySelector('#duration_slider');
const show_duration = document.querySelector('#show_duration');
const track_image = document.querySelector('#track_image');
const auto_play = document.querySelector('#auto');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const artist = document.querySelector('#artist');

//задаем переменные 
let timer;
let autoplay = 0;
let index_no = 0;
let playing_track = false;
let track = document.createElement('audio');

//список всех песен
let all_tracks = [
   {
     name: "first song",
     path: "music/hey.mp3",
     img: "images/hey.jpg",
     singer: "1"
   },
   {
     name: "second song",
     path: "music/summer.mp3",
     img: "images/summer.jpg",
     singer: "2"
   },
   {
     name: "third song",
     path: "music/ukulele.mp3",
     img: "images/ukulele.jpg",
     singer: "3"
   }
];

//загружаем песни
function load_track(index_no){
	clearInterval(timer);
	reset_slider();
	title.innerHTML = all_tracks[index_no].name;
	track.src = all_tracks[index_no].path;
	track_image.src = all_tracks[index_no].img;
    artist.innerHTML = all_tracks[index_no].singer;
    track.load();
	timer = setInterval(range_slider, 1000);
	total.innerHTML = all_tracks.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);

//кнопка выключения звука
function mute_track(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

//включаем песню
function playtrack(){
  track.play();
  playing_track = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//ставим на паузу
function pausetrack(){
	track.pause();
	playing_track = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

//следующая песня
function next_track(){
	if(index_no < all_tracks.length - 1){
		index_no += 1;
		load_track(index_no);
		playtrack();
	}else{
		index_no = 0;
		load_track(index_no);
		playtrack();
	}
}

// предыдущая песня
function previous_track(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playtrack();
	}else{
		index_no = all_tracks.length;
		load_track(index_no);
		playtrack();
	}
}

// проверяем включена ли песня
 function justplay(){
 	if(playing_track==false){
 		playtrack();
 	}else{
 		pausetrack();
 	}
 }

// переключаем песню
 function reset_slider(){
 	slider.value = 0;
 }

// громкость
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// перемотка песни
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// автоматические проигрывание 
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}

//слайдер переключения
function range_slider(){
	let position = 0;
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      } if (track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playtrack();
           }
	    }
     }

       