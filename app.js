const express = require('express');
const path = require('path');

const app = express();



//Middleware
app.use(express.static('public'))

app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'temp/index.html'));


})

const port = 3000;

app.listen(port, () => {
    console.log(`Servis ${port} 'unda dinleniyor.`)
})