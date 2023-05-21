const express = require('express');

const app = express();
const PORT = 5001;

app.use(express.static('server/public'));
app.use(express.json());


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})

let equationArr = [];


app.post('/answer', (req, res) => {
    console.log('Adding New Problem To Solve', req.body);
    equationArr.push(req.body);
    perfromCalculation(equationArr)
    res.sendStatus(201);
})

function perfromCalculation(){

}