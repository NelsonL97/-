// const serial = require('serialport');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

/***********************************/
// // DATABASE SETUP
mongoose.connect('mongodb://db');
const Schema = mongoose.Schema;
const record = new Schema({
    name: { type: String, default: 'boi' },
    score: { type: Number},
    date: { type: Date, default: Date.now }
});

const Model = mongoose.model('Leaderboard', record);
/***********************************/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

// let sp = new serial("/dev/ttyACM0", { baudRate: 9600 });
// sp.on("open", function(){
//     sp.write("255,100,100,255", function(err, res) {
//         if (err) return console.log(err);
//     });
// });

app.post('/storeNewRecord', async function(req, res){
    const instance = new Model();
    instance.name = req.body.name;
    instance.score = req.body.score;

    instance.save(function (err) {
    if(!err){
        console.log(`${req.body.name} was successfully stored in the db`);
    }
    else{
        console.log(err);
    }
    });

    res.send("done");
});

app.get('/getLeaderboard', async function(req, res){
    Model.find({}).sort({score: 'descending'}).find(function (err, posts) {
        res.send(posts);
    });
})

app.listen(9090);