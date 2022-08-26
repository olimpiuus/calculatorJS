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
    if (b == 0) { return alert('Not allowed deleting to 0') }
    return a / b
}

function percent(a) {
    return a / 100
}

function deactiveteDotButton() {
    if (tempNumber.includes(['.'])) {
        dotButon.classList.add('deactiveted')
        dotButon.disabled = true

    } else {
        dotButon.classList.remove('deactiveted')
        dotButon.disabled = false

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

                tempNumber = ''

                switch (tempOperant) {
                    case '+':
                        numberOne = add(numberOne, numberTwo)
                        updateMonitor(numberOne)
                            // numberTwo = 0
                        break;
                    case '-':
                        numberOne = substract(numberOne, numberTwo)
                        updateMonitor(numberOne)
                            // numberTwo = 0
                        break;
                    case '*':
                        numberOne = multipl(numberOne, numberTwo)
                        updateMonitor(numberOne)
                            // numberTwo = 0
                        break;
                    case '/':
                        numberOne = divide(numberOne, numberTwo)
                        updateMonitor(numberOne)
                            // numberTwo = 0
                        break;


                }
                addToSubMonitor(numberTwo)
            }

            tempOperant = o.textContent


            if (!tempNumber == '' && numberOne == 0 && tempOperant != '=') {
                numberOne = parseInt(tempNumber)
                updateMonitor(numberOne)
                tempNumber = ''
                addToSubMonitor(numberOne)
            }

            if (tempOperant === '%') {
                numberOne = percent(numberOne)
                addToSubMonitor(numberOne)

            }

            if (tempNumber == '' && numberOne == 0) {
                return
            }

            if (tempOperant !== '=') { addToSubMonitor(tempOperant) }
            console.log(numberOne);
            console.log(numberTwo);
            console.log(tempOperant);



        })
    })
}

function keyListener() {

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

function simulateClickBypressKey(e) {
    if (document.querySelector(`button[data-key="${e.key}"]`)) { document.querySelector(`button[data-key="${e.key}"]`).click(); }

}
window.addEventListener('keydown', simulateClickBypressKey)

getNumber()
getOperational()
clearCalculator()