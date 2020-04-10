const THREE = window.THREE = require("three");

/*
THREE.js 3D Background System
*/
var vars = {
    fov: 75,
    cameraZ: 0
}

vars.width=2*(Math.tan(vars.fov/2 * Math.PI / 180)*vars.cameraZ)

var loader = new THREE.TextureLoader();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(vars.fov, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z= vars.cameraZ

var light = new THREE.AmbientLight(0x000000)
scene.add(light)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
renderer.domElement.className="viewport"

const run = () => {
    requestAnimationFrame(run)

    renderer.render(scene, camera)
}
var mesh = undefined;
loader.load( 'https://comcloudway.github.io/suchtmitwucht/public/res/pan.jpg', function ( texture ) {

    var geometry = new THREE.SphereGeometry( vars.width, 20, 20 );

    var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );
     mesh = new THREE.Mesh( geometry, material );
     mesh.rotation.y=2+window.scrollY/400-2

    scene.add(mesh)
    run()
} );

window.addEventListener("scroll",()=>{
    if(mesh!=undefined) {
        mesh.rotation.y=2+window.scrollY/400-2
    }
    
})
window.addEventListener("resize",()=>{
    location.reload()
})

/*
News system 
*/
const loadNews = () => {

    fetch("public/database/news.json")
    .then(res=>res.json())
    .then(json=>{

        for(let i of json.news) {
        let el = document.createElement("div")
        el.className="item"

        let icon = document.createElement("div")
        icon.style.backgroundImage=`url(${i.icon})`;
        icon.className="icon"

        let title = document.createElement("p")
        title.innerText=i.title;
        title.className="title"

        let cont = document.createElement("p")
        cont.innerText=i.content;
        cont.className="cont"

        el.appendChild(icon)
        el.appendChild(title)
        el.appendChild(cont)

        document.getElementById("slide2").appendChild(el)
        }
    })

    setInterval(this,15*1000*60)

}
loadNews()

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