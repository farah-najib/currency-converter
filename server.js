console.log('server start ...')

const express = require('express');
const app = express();
const bodyParser = require('body-parser')


//setting middleware
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('public')); 
var publicDir = require('path').join(__dirname,'/images');  
app.use('/images', express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})


app.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000')    
})