const numbers = document.querySelectorAll('.number')
const operationals = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear-btn')
const monitor = document.querySelector('.monitor-main')
const monitorExpression = document.querySelector('.monitor-sub')
const dotButon = document.querySelector('.dot')
console.log(dotButon);




let tempNumber = ''
let numberOne = 0
let numberTwo = 0
let tempOperant = ''
let temResult = 0

function add(a, b) {
    return a + b
}

function multipl(a, b) {
    const multi = a * b
    return multi
}

function substract(a, b) {
    return a - b
}

function divide(a, b) {
    return a / b
}

function percent(a) {
    return a / 100
}

function deactiveteDotButton() {
    if (tempNumber.includes(['.'])) {
        dotButon.classList.add('deactiveted')
        dotButon.disabled = true
        console.log('true');
    } else {
        dotButon.classList.remove('deactiveted')
        dotButon.disabled = false
        console.log('false');
    }
}

function getNumber() {
    numbers.forEach((n) => {
        n.addEventListener('click', () => {
            tempNumber += n.textContent
            updateMonitor(tempNumber);
            clearBtn.textContent = 'C'
            deactiveteDotButton()
        })
    })
}

function updateMonitor(value) {
    monitor.textContent = value
}

function addToSubMonitor(value) {
    monitorExpression.textContent += value
}

function getOperational() {
    operationals.forEach((o) => {
        o.addEventListener('click', () => {

            if (!tempNumber == '' && !numberOne == 0) {
                numberTwo = parseInt(tempNumber)
                addToSubMonitor(numberTwo)
                tempNumber = ''

                switch (tempOperant) {
                    case '+':
                        numberOne = add(numberOne, numberTwo)
                        updateMonitor(numberOne)
                        numberTwo = 0
                        break;
                    case '-':
                        numberOne = substract(numberOne, numberTwo)
                        updateMonitor(numberOne)
                        numberTwo = 0
                        break;
                    case '*':
                        numberOne = multipl(numberOne, numberTwo)
                        updateMonitor(numberOne)
                        numberTwo = 0
                        break;
                    case '/':
                        numberOne = divide(numberOne, numberTwo)
                        updateMonitor(numberOne)
                        numberTwo = 0
                        break;


                }
            }
            if (!tempNumber == '' && numberOne == 0) {
                numberOne = parseInt(tempNumber)
                updateMonitor(numberOne)
                tempNumber = ''
                addToSubMonitor(numberOne)
            }
            tempOperant = o.textContent
            if (tempOperant !== '=') { addToSubMonitor(tempOperant) }

            if (tempOperant === '%') {
                numberOne = percent(numberOne)
                addToSubMonitor(numberOne)

            }

            console.log(numberOne);
            console.log(numberTwo);
            console.log(tempOperant);



        })
    })
}

function clearCalculator() {
    clearBtn.addEventListener('click', () => {
        if (tempNumber !== '') {
            tempNumber = tempNumber.substring(0, tempNumber.length - 1)
            updateMonitor(tempNumber)
            deactiveteDotButton()
            if (tempNumber == '') { clearBtn.textContent = 'AC' }
            return tempNumber

        }
        if (numberOne !== 0) {

            updateMonitor('')
            monitorExpression.textContent = ''
            clearBtn.textContent = 'C'
            return numberOne = 0
        }
    })
}

getNumber()
getOperational()
clearCalculator()

window.addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    document.querySelector(`button[data-key="${e.keyCode}"]`).click();


})