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
    parseCalculation(equationArr)
    res.sendStatus(201);
})

let inputArr = [];

function parseCalculation(arr){
    let string = arr[0].calculation;
    console.log(string);
    let value = '';
    for (const item of string) {
        if (item === '+') {
            inputArr.push(value)
            inputArr.push(item);
            value = '';
        }  else if (item === '-') {
            inputArr.push(value)
            inputArr.push(item);
            value = '';
        } else if (item === '/') {
            inputArr.push(value)
            inputArr.push(item);
            value = '';
        } else if (item === 'x') {
            inputArr.push(value)
            inputArr.push(item);
            value = '';
        } else if (item === '=') {
            inputArr.push(value)
            inputArr.push(item);
        } else {
            value += item;
        }
    }
   
    perfromCalculation(inputArr);
}

['7', '+', '7']

function perfromCalculation(arr) {
    let total = 0;
    let value = 0;
    console.log(arr);
    let counter = 0;
    for (const item of arr) {
        if(counter === 0){
            total = Number(item);
            } else if(item === '+') {
                total += Number(value);
                value = 0;
            } else if(item === '-') {
                total -= Number(value);
                value = 0;
            } else if(item === '*') {
                total -= Number(value);
                value = 0;
            } else if(item === '/') {
                total /= valNumber(value);
                value = 0;
            } else if(item === '%') {
                total -= Number(value);
                value = 0;
            } else if (item === '=') {
                break;
            } else {
                total += Number(item);
                console.log(value);
            }
            counter++;
    }

    console.log(total);
}


