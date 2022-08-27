const numbers = document.querySelectorAll('.number')
const operationals = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear-btn')
const monitor = document.querySelector('.monitor-main')
const monitorExpression = document.querySelector('.monitor-sub')
const dotButon = document.querySelector('.dot')
console.log(dotButon);

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
            tempNumber += n.textContent
            updateMonitor(tempNumber);
            clearBtn.textContent = 'C'
            deactiveteDotButton()
        })
    })
}



function addToSubMonitor(value) {

    monitorExpression.textContent += value

}

function getNumberTwo(value) {

    // addToSubMonitor(value)
    let result = parseInt(value)
    tempNumber = ''
    updateMonitor('')
    return result
}

function getNumberOne(value) {


    addToSubMonitor(value)
    let result = parseInt(value)
    tempNumber = ''
    updateMonitor('')
    return result
}

function getOperant(params) {

}


function updateMonitor(value) {
    monitor.textContent = value
}

function getOperational() {
    operationals.forEach((operationalBtn) => {
        operationalBtn.addEventListener('click', () => {

            updateMonitor('')
            if (tempNumber != '' && numberOne == undefined) {
                numberOne = getNumberOne(tempNumber)

            }
            if (operationalBtn.textContent != '=') {
                tempOperant = operationalBtn.textContent
                numberTwo = undefined
            }




            if (tempNumber != '' && numberOne != 0) {
                numberTwo = getNumberTwo(tempNumber)
            }

            if (tempOperant != '=') {
                if (isNaN(monitorExpression.textContent[monitorExpression.textContent.length - 1])) {
                    let arr = monitorExpression.textContent.split('')
                    arr.pop()
                    monitorExpression.textContent = arr.join('')
                }
                addToSubMonitor(tempOperant)
            } //replace operant


            if (numberTwo != undefined && numberOne != undefined) {
                addToSubMonitor(numberTwo)
                switch (tempOperant) {
                    case '+':
                        numberOne = add(numberOne, numberTwo)
                        updateMonitor(`result:${numberOne}`)
                        break;
                    case '-':
                        numberOne = substract(numberOne, numberTwo)
                        updateMonitor(`result:${numberOne}`)
                        break;
                    case '*':
                        numberOne = multipl(numberOne, numberTwo)
                        updateMonitor(`result:${numberOne}`)
                        break;
                    case '/':
                        numberOne = divide(numberOne, numberTwo)
                        updateMonitor(`result:${numberOne}`)
                        break;


                }

                // if (tempOperant != '=') { addToSubMonitor(numberTwo) }
            }






            // if (tempOperant === '%') {
            //     numberOne = percent(numberOne)
            //     addToSubMonitor(numberOne)

            // }

            if (tempNumber == '' && numberOne == 0) {
                return
            }
            console.log(numberOne);
            console.log(numberTwo);



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

        } else {
            updateMonitor('')
            monitorExpression.textContent = ''
            clearBtn.textContent = 'C'
            numberOne = undefined
            numberTwo = undefined
        }
    })
}


// function clearCalculator() {
//     clearBtn.addEventListener('click', () => {
//         if (monitor.textContent !== '') {
//             monitor.textContent = monitor.textContent.substring(0, monitor.textContent.length - 1)
//                 // updateMonitor(tempNumber)
//             deactiveteDotButton()
//             if (monitor.textContent == '') { clearBtn.textContent = 'AC' }


//         } else {
//             updateMonitor('')
//             monitorExpression.textContent = ''
//             clearBtn.textContent = 'C'
//             numberOne = undefined
//             numberTwo = undefined
//         }
//     })
// }

function simulateClickBypressKey(e) {
    if (document.querySelector(`button[data-key="${e.key}"]`)) { document.querySelector(`button[data-key="${e.key}"]`).click(); }

}
window.addEventListener('keydown', simulateClickBypressKey)

getNumber()
getOperational()
clearCalculator()