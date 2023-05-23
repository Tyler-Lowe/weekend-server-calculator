const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(express.json());


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})

let equationArr = [];
let inputArr = [];
let finalAnswer = 0;
let historyArr = [];

app.post('/answer', (req, res) => {
    console.log('Adding New Problem To Solve', req.body);
    equationArr.push(req.body);
    parseCalculation(equationArr)
    res.sendStatus(201);
})

app.get('/answer', function(req, res) {
    console.log('GET Request for answer');
    res.send(201, finalAnswer);
})

app.get('/history', function(req, res) {
    // console.log('GET Request for answer');
    console.log('history ehre',historyArr);
    res.send(201, historyArr);
})

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

function perfromCalculation(arr) {
    let total = 0;
    let value = '';
    let num1 = 0;
    let num2 = 0;
    console.log('Is it here',arr);
    historyArr.push(arr);
    let counter = 0;

    for (const item of arr) {
        if((Number.isInteger(Number(item)) && (counter === 0)) || ((item.includes('.')) && (counter === 0))) {
            num1 = Number(item)
            counter ++;
        } else if (counter === 1 && (item === '+')) {
            value = '+';
            counter ++;
        } else if (counter === 1 && (item === '-')) {
            value = '-';
            counter ++;
        } else if (counter === 1 && (item === '/')) {
            value = '/';
            counter ++;
        } else if (counter === 1 && (item === 'x')) {
            value = 'x';
            counter ++;
        } else if ((item === '=')) {
            break;
        } else if (counter === 2 && (value === '+')) {
            num2 = Number(item)
            total += (num1 + num2)
            counter = 0;
        }  else if (counter === 2 && (value === '-')) {
            num2 = Number(item)
            total += (num1 - num2)
            counter = 0;
        }  else if (counter === 2 && (value === '/')) {
            num2 = Number(item)
            total += (num1 / num2)
            counter = 0;
        }  else if (counter === 2 && (value === 'x')) {
            num2 = Number(item)
            console.log('Am I here', num1, num2);
            total += (num1 * num2)
            counter = 0;
        } 

    }
    historyArr[0].push(total);
    finalAnswer = total;
    inputArr = [];
    equationArr = [];
}


