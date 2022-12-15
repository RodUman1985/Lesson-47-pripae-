const baseURL='http://127.0.0.1:8080'
 

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
        
    </div>*/ 
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
        dur.innerText= v.duration;
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

const dialog=document.createElement('div');
dialog.classList.add('dialog');
const video=document.createElement('video');
video.src=info.url;
video.controls=true;

const closeBtn=document.createElement('button');
closeBtn.innerText='close';
closeBtn.addEventListener('click',()=>{
    overlay.remove();
});
// todo добавить теги для названия и количества просмотров 
dialog.append(video,closeBtn);
overlay.append(dialog);
document.body.append(overlay);
}
