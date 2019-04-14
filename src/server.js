const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect(
    "mongodb+srv://thomaslnx:senhapadrao@cluster0-lxpj1.mongodb.net/test?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thomaslnx:senhapadrao@cluster0-lxpj1.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);