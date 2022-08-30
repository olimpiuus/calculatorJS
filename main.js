const numbers = document.querySelectorAll('.number')
const operationals = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear-btn')
const monitor = document.querySelector('.monitor-main')
const monitorExpression = document.querySelector('.monitor-sub')
const dotButon = document.querySelector('.dot')
const btnChangeOperant = document.querySelector('#changeOperant')



let lastOperant = ''
let lastSecondVariable = ''
let monitorText = ''


let tempNumber = ''
let numberOne = undefined
let numberTwo = undefined
let tempOperant = ''
let temResult = 0

function add(a, b) {
    return a + b
}

function multipl(a, b) {
    const multi = a * b
    return round(multi)
}

function substract(a, b) {
    return round(a - b)
}

function divide(a, b) {
    if (b == 0) { return alert('Not allowed deleting to 0') }
    return round(a / b)
}

function percent(a) {
    return round(a / 100)
}

function round(a) {
    return Math.round(a * 1000) / 1000
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
            tempNumber = tempNumber.toString()

            if (tempNumber.length < 25) {
                tempNumber += n.textContent
                updateMonitor(tempNumber);
                clearBtn.textContent = 'C'
                deactiveteDotButton()
            }
        })
    })
}

function addToSubMonitor(value) {
    let monitorText = monitorExpression.textContent
    monitorText += ' '
    monitorText += value
    monitorExpression.textContent = monitorText

}

function getNumberTwo(value) {
    tempNumber = ''
    updateMonitor('')
    return parseFloat(value)
}

function getNumberOne(value) {
    tempNumber = ''
    addToSubMonitor(value)
    updateMonitor('')
    return parseFloat(value)
}

function updateMonitor(value) {
    monitor.textContent = value.toString()
}

function getOperational() {
    operationals.forEach((operationalBtn) => {
        operationalBtn.addEventListener('click', () => {

            if (tempNumber != '' && numberOne == undefined) {
                numberOne = getNumberOne(tempNumber)
            }

            if (tempOperant != '' && numberOne != undefined && tempNumber != '') {
                numberTwo = getNumberTwo(tempNumber)
            }

            if (numberTwo != undefined && numberOne != undefined) {
                addToSubMonitor(numberTwo)
                getFunction(tempOperant)
                lastSecondVariable = numberTwo
                numberTwo = undefined
                lastOperant = tempOperant
                tempOperant = ''
            }

            if (operationalBtn.textContent != '=') {
                tempOperant = operationalBtn.textContent

            } else {
                numberTwo = lastSecondVariable
                tempOperant = lastOperant
            }

            if (tempOperant != '=') {
                if (isNaN(monitorExpression.textContent[monitorExpression.textContent.length - 1])) {
                    let arr = monitorExpression.textContent.split('')
                    arr.pop()
                    monitorExpression.textContent = arr.join('')
                }
                addToSubMonitor(tempOperant)
            } //replace operant at sub monitor

            if (tempOperant === '%') {
                numberOne = percent(numberOne)
                updateMonitor(`result:${numberOne}%`)
            }

            if (tempNumber == '' && numberOne == 0) {
                return
            }

            console.log(numberOne);
            console.log(numberTwo);
        })
    })
}

function getFunction(operant) {
    switch (operant) {
        case '+':
            numberOne = add(numberOne, numberTwo)
            break;
        case '-':
            numberOne = substract(numberOne, numberTwo)
            break;
        case '*':
            numberOne = multipl(numberOne, numberTwo)
            break;
        case '/':
            numberOne = divide(numberOne, numberTwo)
            break
    }
    updateMonitor(`result:${numberOne}`)
}

function clearCalculator() {
    clearBtn.addEventListener('click', () => {
        if (tempNumber !== '') {
            let tempString = tempNumber.toString()
            tempNumber = tempString.substring(0, tempString.length - 1)
            updateMonitor(tempNumber)
            deactiveteDotButton()
            if (tempNumber == '') { clearBtn.textContent = 'AC' }
            return tempNumber
        } else {
            updateMonitor('')
            monitorExpression.textContent = ''
            clearBtn.textContent = 'C'
            numberOne = undefined
            numberTwo = undefined
            tempNumber = ''
            tempOperant = ''
        }
    })
}

function simulateClickBypressKey(e) {
    const key = document.querySelector(`button[data-key="${e.key}"]`)
    if (!key) { return }
    key.click();
    key.classList.add('active')
    setTimeout(() => key.classList.remove('active'), 150)
}

btnChangeOperant.addEventListener('click', () => {
    // console.log(monitorExpression.textContent);
    if (monitor.textContent.includes('result:')) {
        numberOne *= (-1)
        updateMonitor(`result:${numberOne}`)
        numberTwo = undefined
        return
    }
    if (tempNumber == '') { tempNumber = '-' } else { tempNumber === '-' ? tempNumber = '' : tempNumber *= (-1) }
    updateMonitor(tempNumber)
})

window.addEventListener('keydown', simulateClickBypressKey)

getNumber()
getOperational()
clearCalculator()