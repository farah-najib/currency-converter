const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const request = require('request');

//setting middleware
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get('/symbols', function (req, res) {
   
    const options = {
        url: 'https://api.apilayer.com/exchangerates_data/symbols',
        headers: {
            "apikey": process.env.APIKEY
          
        }
    };

    request(options, function (error, response, body) {
        res.json(JSON.parse(response.body))
    });
})

app.get('/currency', function (req, res) {
   
    const options = {
        url: 'https://api.apilayer.com/exchangerates_data/convert?to='+req.query.to+'&from='+req.query.from+'&amount='+req.query.amount ,
        headers: {
            "apikey": process.env.APIKEY
        }
    };

    request(options, function (error, response, body) {
        res.json(JSON.parse(response.body))
    });
})

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000')
})