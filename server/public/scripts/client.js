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
            document.querySelector('#display-calculation').value = '';
        }).catch((error) => {
            console.log(error);
            alert('Something Went Wrong')
        })
    }

    return calculationString;

}

function perfromCalculation(arr) {
    // Fetch Post to server
}