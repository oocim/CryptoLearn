const express = require("express");
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/caesar', express.static(path.join(__dirname, 'client/src')));

app.get('/caesar/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/src', 'main.tsx'));
})

app.listen(PORT, function(req, res) {
    console.log("Port 3000 is running.");
});