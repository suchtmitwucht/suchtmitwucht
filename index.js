const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")
const cors = require('cors')
const fetch = require('node-fetch');

const app = express();

const port = 8080;

app.use(cors())

app.use('/public', express.static(path.join(__dirname, "/public")))

app.use(bodyParser.urlencoded({ extended: false }))

app.get(["/:id", "*"], (req, res) => {
    if (req.params.id == undefined) req.params.id = ""
    let buff = new Buffer(req.params.id, "base64");
    let text = buff.toString('ascii')
    var c = 0;
    fetch("https://comcloudway.github.io/suchtmitwucht-database/episodes.json")
    .then(res=>res.json())
    .then(json=> {
        let ep = json

     
    for (let episode of ep.episodes) {
        if (text == episode.id) {
            //episode found
            c = 1;

            //Do sth.

            fs.readFile(path.join(__dirname, "public/episode-template", "index.html"), "utf-8", (err, cont) => {
                if (err != undefined) {
                    res.send("Error")
                } else {
                    let parts = cont.split("!split!");

                    //Create html presets
                    let audio = ""
                    let main = "";
                    for (let file of episode.files) {
                        if (file.main) main = file.src
                        audio += `
    <div class="item" onclick="document.getElementById('player-src').src='${file.src}'">
    <p class="name">${file.name} </p><p class="play">ᐅ</p>
    </div>
    `
                    }

                    let team = ""
                    for (let memb of episode.team) {
                        let main = `
    <div class="item">
    <p class="name">${memb.name}</p>
    `
                        for (let task of memb.work) {
                            main += `
        <p class="task">${task}</p>
        `
                        }
                        team += main + "</div>"
                    }

                    let src = ""
                    for (let q of episode.src) {
                        src += `
    <div class="item">
    <p class="left">Name:</p>
    <p class="right">${q.name}</p>
    <p class="left">Typ: </p>
        <p class="right">${q.category}</p>
    <p class="left">Künstler:</p>
        <p class="right">${q.artist}</p>
    <p class="left link">Quelle:</p>
        <a class="right" href="${q.src}">${q.src}</a>
    <p class="left link">Lizenz:</p>
        <a href="${q.license}" class="right">${q.license}</a>
    <p class="left">Unser Nutzen:</p>
        <p class="right">${q.use}</p>
    </div>
    `
                    }

                    //inject html
                    let resp = ""
                    let data = [
                        episode.title,
                        episode.title,
                        episode.desc,
                        audio,
                        team,
                        src,
                        main,
                        episode.icon,
                        ""
                    ]
                    for (let p in parts) {
                        resp += parts[p] + data[p]


                    }
                    res.send(resp)
                }
            })

            break;
        }
    }
    if (c == 0) {
        //no episode found
        res.sendFile(path.join(__dirname, "public", "index.html"))
    }
});
})

app.listen(port, () => {
    console.log("Running...")
})