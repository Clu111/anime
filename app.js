const express = require("express");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/anime_bd.db');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.listen(8000, () => {
    console.log("Server start" + 8000);
});
app.get("/", (req, res) => {
    res.json("gqg")
})
app.get("/anime/seasons/:seasons", (req, res) => {
    const {seasons} = req.params
    db.all(`SELECT * FROM ANIME WHERE seasons = $seasons`, {$seasons: seasons} ,(err, rows) =>{
        res.json(rows)
    })
})
app.post('/anime', (req, res) => {
    const data = req.body
    const request = `INSERT INTO ANIME VALUES (
        null,
        '${data.name}',
        '${data.duration}',
        '${data.seasons}',
        '${data.creator}',
        '${data.year}',
        '${data.category}')`
        console.log(request)
        db.run(request, (err) => {
            if (err) {
                res.json(err)
            }
            res.json('Запись добавлена')
        })
})
app.get("/anime", (req, res) => {
    const {duration, year} = req.query
    db.all(`SELECT * FROM ANIME WHERE duration = ${duration} AND year = ${year}`,(err, rows) =>{
        res.json(rows)
    })
})
app.put('/anime', (req, res) => {
    db.put(`UPDATE FROM ANIME SET Name = 'HxH' WHERE Name = 'HunterXHunter'`, (err, rows) =>{
        res.json(rows)
    })
})
app.delete('/anime:id', (req, res) => {
    const {id} = req.params
    db.delete(`DELETE FROM ANIME WHERE id = ${id}`, (err, rows) =>{
        res.json(rows)
    })
})