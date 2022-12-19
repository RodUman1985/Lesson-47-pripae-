const baseURL='http://127.0.0.1:8080'
 function Format(t){
this.t=t;
let t1;
let t2;
if (Math.floor(this.t/60)<10){
     t1='0'+ String(Math.floor(this.t/60));
} else {
    t1= String(Math.floor(this.t/60));
}
if (this.t%60<10){
     t2='0'+String (this.t%60);
} else {
    t2=String (this.t%60);
}

return t1+':'+ t2;
 }

async function loadVideos() {
    const resp=await fetch(`${baseURL}/video`);
    const videos= await resp.json();
    showVideos (videos);

}
/*<div class="overlay">
        <div class="dialog">
            <video controls src="http://127.0.0.1:8080/stream/1.mp4"></video>
            <div>Video</div>
            <div>55555</div>
            <button>Закрыть</button>
        </div>
        
    </div>
    `${Math.floor( v.duration/60)} : ${v.duration%60}`;
    */ 
function showVideos (videos){
    console.log(videos);
    videos.forEach((v) => {
        const card=document.createElement('div');
        card.addEventListener('click',()=>{
            openPlayer(v.id,v.name);
        })
        card.classList.add('card');

        const img=document.createElement('img');
        img.src=v.preview;
        const name=document.createElement('div');
        name.classList.add('name');
        name.innerText=v.name;
        const dur=document.createElement('div');
        dur.classList.add('duration');
        //TODO: перевести секунды в формат минуты: секунды
        dur.innerText= Format(v.duration);
        card.append(img,name,dur);
        document.body.appendChild(card);
    });
}
loadVideos();

async function openPlayer(id,name){
const resp= await fetch(`${baseURL}/video/${id}`);
const info= await resp.json();
const overlay=document.createElement('div');
overlay.classList.add('overlay');

const viewCount=document.createElement('div');
viewCount.classList.add('viewCount');
viewCount.innerText= info.viewCount;

const name1=document.createElement('div');
name1.classList.add('name1');
name1.innerText=name;

const dop=document.createElement('div');
dop.classList.add('dop');
dop.innerText='Название:';

const dop1=document.createElement('div');
dop1.classList.add('dop');
dop1.innerText='Количество просмотров:';

const dialog=document.createElement('div');
dialog.classList.add('dialog');

const video=document.createElement('video');
video.src=info.url;
video.controls=true;

const closeBtn=document.createElement('button');
closeBtn.classList.add('buttom');
closeBtn.innerText='close';
closeBtn.addEventListener('click',()=>{
    overlay.remove();
});
// todo добавить теги для названия и количества просмотров 
dialog.append(video,dop,name1,dop1,viewCount,closeBtn);
overlay.append(dialog);
document.body.append(overlay);
}
