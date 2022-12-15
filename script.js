const baseURL='http://127.0.0.1:8080'
 

async function loadVideos() {
    const resp=await fetch(`${baseURL}/video`);
    const videos= await resp.json();
    showVideos (videos);

}

function showVideos (videos){
    console.log(videos);
    videos.forEach((v) => {
        const card=document.createElement('div');
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