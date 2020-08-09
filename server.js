console.log('May Node be with you')

const express = require('express');
const app = express();
const bodyParser = require('body-parser')





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