document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            switch (button.id) {
                case 'clear':
                    currentOperand = '';
                    previousOperand = '';
                    operation = null;
                    updateDisplay();
                    break;
                case 'backspace':
                    currentOperand = currentOperand.toString().slice(0, -1);
                    updateDisplay();
                    break;
                case 'percent':
                    currentOperand = parseFloat(currentOperand) / 100;
                    updateDisplay();
                    break;
                case 'divide':
                case 'multiply':
                case 'subtract':
                case 'add':
                    if (currentOperand === '') return;
                    if (previousOperand !== '') {
                        calculate();
                    }
                    operation = button.id;
                    previousOperand = currentOperand;
                    currentOperand = '';
                    break;
                case 'equals':
                    if (operation === null || currentOperand === '' || previousOperand === '') return;
                    calculate();
                    operation = null;
                    break;
                case 'decimal':
                    if (currentOperand.includes('.')) return;
                    currentOperand += button.innerText;
                    updateDisplay();
                    break;
                default:
                    currentOperand += button.innerText;
                    updateDisplay();
            }
        });
    });

    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        previousOperand = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }
});
