// import trends from "./trends";





// let song=document.querySelector('.song');
// console.log(song);



// trends.map((idx)=>{
//     const div=document.createElement('div');
//     div.innerHTML=`
//      <div class="song-card">
//           <img class="w-full h-40 object-cover image" src="${idx.img}"
//             alt="Song Image">
//           <div class="inner-song">
//             <h2 class="heading">${idx.name}</h2>
//             <p class="para">${idx.artistName}</p>
//           </div>
//         </div>
//     `
// })


console.log("Let's write JavaScript");

async function getsongs() {
    // Fetch the HTML directory listing
    let response = await fetch("http://127.0.0.1:5500/songs/");
    let html = await response.text();

    // Parse the HTML into a DOM element
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Get all anchor tags (<a>)
    let links = tempDiv.getElementsByTagName("a");

    // Extract only the .mp3 file links
    let songs = [];
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        if (element.href.endsWith(".mp3")) {
            songs.push("http://127.0.0.1:5500/songs/" + element.href.split('/songs/')[1]);
        }
    }
    return songs;
}

async function main() {
    let songs = await getsongs();
    console.log(songs);

    let songListElement = document.querySelector('.songlist').getElementsByTagName('ul')[0];
    songListElement.innerHTML = "";

    const audio = new Audio();
    const timeElement = document.querySelector('.time');

    for (const song of songs) {
        let li = document.createElement('li');
        let text = document.createElement('p');
        text.innerText = decodeURIComponent(song.split("/").pop());
        li.appendChild(text);
        li.style.fontSize = '14px';
        li.style.overflowX = 'auto';
        li.style.fontStyle = 'bold';
        li.style.border = '2px solid white';
        li.style.borderRadius = '20px';
        li.style.paddingLeft = '5px';
        li.style.paddingRight = '5px';
        li.style.paddingTop = '20px';
        li.style.paddingBottom = '20px';
        li.style.height = '100px'
        li.style.display = 'flex';
        li.style.flexDirection = 'column'
        // li.style.justifyContent='between'
        li.style.gap = '10px';
        // li.style.textOverflow=""    
        li.style.alignItems = 'center';

        // Create play button
        let playBtn = document.createElement('button');
        playBtn.style.backgroundColor = "";
        playBtn.style.color = "#fff";
        // playBtn.style.border = "2px solid green";
        playBtn.style.cursor = "pointer";
        playBtn.style.width = "50px";
        playBtn.style.height = "50px";
        playBtn.style.borderRadius = "50%";
        playBtn.style.boxSizing = "border-box";
        // Optional: Add icon instead of text
        playBtn.innerHTML = "▶"; // use an icon or a short symbol
        playBtn.style.fontSize='15px';
        document.body.appendChild(playBtn);


        playBtn.addEventListener('click', () => {
            audio.src = song;
            audio.play();
        });

        li.appendChild(playBtn);
        songListElement.appendChild(li);
    }

    // Update time continuously while song is playing
    audio.addEventListener('timeupdate', () => {
        let current = audio.currentTime.toFixed(1);
        let duration = audio.duration ? audio.duration.toFixed(1) : '...';
        timeElement.innerHTML = `⏱ ${current} / ${duration} sec`;
    });
}

main();
