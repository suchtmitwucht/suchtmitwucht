const THREE = window.THREE = require("three");

/*
THREE.js 3D Background System
*/
var vars = {
    fov: 75,
    cameraZ: 0
}

vars.width = 2 * (Math.tan(vars.fov / 2 * Math.PI / 180) * vars.cameraZ)

var loader = new THREE.TextureLoader();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(vars.fov, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = vars.cameraZ

var light = new THREE.AmbientLight(0x000000)
scene.add(light)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
renderer.domElement.className = "viewport"

const run = () => {
    requestAnimationFrame(run)

    renderer.render(scene, camera)
}
var mesh = undefined;
loader.load('https://comcloudway.github.io/suchtmitwucht/public/res/pan.jpg', function (texture) {

    var geometry = new THREE.SphereGeometry(vars.width, 20, 20);

    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 2 + window.scrollY / 400 - 2

    scene.add(mesh)
    run()
});

window.addEventListener("scroll", () => {
    if (mesh != undefined) {
        mesh.rotation.y = 2 + window.scrollY / 400 - 2
    }

})
window.addEventListener("resize", () => {
    location.reload()
})

/*
News system 
*/
const loadNews = () => {

    fetch("public/database/news.json")
        .then(res => res.json())
        .then(json => {

            for (let i of json.news) {
                let el = document.createElement("div")
                el.className = "item"

                let icon = document.createElement("div")
                icon.style.backgroundImage = `url(${i.icon})`;
                icon.className = "icon"

                let title = document.createElement("p")
                title.innerText = i.title;
                title.className = "title"

                let cont = document.createElement("p")
                cont.innerText = i.content;
                cont.className = "cont"

                el.appendChild(icon)
                el.appendChild(title)
                el.appendChild(cont)

                document.getElementById("slide2").appendChild(el)
            }
        })

    setInterval(this, 15 * 1000 * 60)

}
loadNews()

/*Episode List */
const loadEP = () => {
    fetch("public/database/episodes.json")
        .then(res => res.json())
        .then(json => {

            for (let episode of json.episodes) {

                let ep = document.createElement("div")
                ep.className = "episode"
                ep.addEventListener("click",(e)=>{
                    console.log(e)
                    if(e.toElement!=document.getElementById(`id-id-id:${episode.id}`)) {
                        window.location=document.getElementById(`id-id-id:${episode.id}`).value
                    }
                    
                },false)

                let cover = document.createElement("div")
                cover.style.backgroundImage = `url(${episode.icon})`
                cover.className = "cover"

                let title = document.createElement("p")
                title.className = "name"
                title.innerText = episode.title;

                let d = new Date();

                let v = ""
                let code = 0
                if (d.getFullYear() >= episode.release[2] && d.getFullYear() <= episode.expires[2]) {
                    //Year ok
                    code++
                    console.log(d.getMonth() <= episode.expires[1])
                    if (d.getMonth() >= episode.release[1] && d.getMonth() <= episode.expires[1]) {
                        //Month ok
                        code++
                        if (d.getDate() >= episode.release[0] && d.getDate() <= episode.expires[0]) {
                            //Day ok
                            code++
                            v = btoa(episode.id)
                        }
                    }
                }
                if(code!=3) {
                //expired or not released
                ep.className="episode unreleased"
                } 

                let inp = document.createElement("input")
                inp.value = v
                inp.placeholder="Zugangscode"
                inp.className = "url"
                inp.id=`id-id-id:${episode.id}`

                let re = document.createElement("div")
                re.className = "release-date"
                re.innerHTML = `<i class="material-icons-outlined">schedule</i><p>${(episode.release[0] < 10) ? "0" + episode.release[0] : episode.release[0]}.${(episode.release[1] < 10) ? "0" + episode.release[1] : episode.release[1]}.${episode.release[2]}`

                let ex = document.createElement("div")
                ex.className = "expire-date"
                ex.innerHTML = `<i class="material-icons-outlined">delete</i><p>${(episode.expires[0] < 10) ? "0" + episode.expires[0] : episode.expires[0]}.${(episode.expires[1] < 10) ? "0" + episode.expires[1] : episode.expires[1]}.${episode.expires[2]}`

                ep.appendChild(cover)
                ep.appendChild(title)
                ep.appendChild(inp)
                ep.appendChild(re)
                ep.appendChild(ex)

                document.getElementById("slide3").appendChild(ep)
            }

        })
    setInterval(this, 15 * 60 * 1000)
}
loadEP()
/*
Useless insider
*/
console.log(`%c ________________________________________
< mooooooooooooooooooooooooooooooooooooo >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace")