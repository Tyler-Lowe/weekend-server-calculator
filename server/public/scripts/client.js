let calculationString = '';
let stringQuery = {

};

function addToDisplay(event) {
    if(calculationString.length === 0) {
        let displayScreen = document.querySelector('#display-calculation')
        displayScreen.innerHTML = ''
    }
    let value = event.target.innerHTML;
    calculationString += value;
    console.log(calculationString);
    
    let displayScreen = document.querySelector('#display-calculation')
    displayScreen.innerHTML += `${value}`

    if (value === '=' && calculationString.length !== 0) {
        stringQuery.calculation = calculationString;
        console.log(stringQuery);
        fetch('/answer', {
            method: 'POST',
            body: JSON.stringify(stringQuery),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('POST Response', response);

            // Clear display container
            calculationString = '';
            stringQuery = {};
            document.querySelector('#display-calculation').innerHTML = '';
            getFinalAnswer()
            getHistory()
        }).catch((error) => {
            console.log(error);
            alert('Something Went Wrong')
        })
    }

    return calculationString;

}
 
function getFinalAnswer() {
    // Get calculation from Server
    fetch('/answer')
    .then((response) => {
        console.log('Response', response);
        return response.json();
    })
    .then((json) => {
        console.log('Response JSON', json);
        console.log(json);
        addFinalAnswerToDisplay(json);
    })
    .catch((error) => {
        console.log(error);
        alert('Something Went Wrong')
    });
}


function addFinalAnswerToDisplay(answer){
    let contentDiv = document.querySelector('#display-calculation');
    contentDiv.innerHTML = `${answer}`
    console.log('did this fire?');
}

function getHistory() {
    // Get calculation from Server
    fetch('/history')
    .then((response) => {
        console.log('Response', response);
        return response.json();
    })
    .then((json) => {
        console.log('Response JSON', json);
        console.log('history',json);
        displayHistory(json);
    })
    .catch((error) => {
        console.log(error);
    });
}

function displayHistory(answer){
    let historyAnswer = answer.toString().replaceAll(',', ' ')
    let contentDiv = document.querySelector('#history-content');
    contentDiv.innerHTML += `<p>${historyAnswer}</p>`
    console.log('did this fire?');
}

function allClear(event) {
    console.log(event.target.parentElement.querySelector('#display-calculation').innerHTML = '0')
    calculationString = '';

    
}

getHistory();