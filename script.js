document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');

    const buttons = [
        '7', '8', '9', '/', 'C',
        '4', '5', '6', '*', '←',
        '1', '2', '3', '-', '%',
        '0', '.', '=', '+', '√',
        '+/-', '^', '(', ')', 'End'
    ];

    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('button');

        if (buttonText === 'End') {
            button.classList.add('end');
        } else if (buttonText === 'C') {
            button.classList.add('clear');
        } else if (buttonText === '←') {
            button.classList.add('backspace');
        } else if (buttonText === '+/-') {
            button.classList.add('special');
        } else if (buttonText === '^' || buttonText === '(' || buttonText === ')') {
            button.classList.add('grey');
        } else if (buttonText === '%' || buttonText === '√') {
            button.classList.add('operator');
        }

        button.addEventListener('click', () => {
            onButtonClick(buttonText);
        });

        buttonsContainer.appendChild(button);
    });

    function onButtonClick(buttonText) {
        if (buttonText === '=') {
            try {
                let currentText = display.value;
                currentText = currentText.replace('^', '**');
                currentText = currentText.replace('%', '*0.01');
                const result = eval(currentText);
                display.value = result;
            } catch (error) {
                display.value = 'Error';
            }
        } else if (buttonText === 'C') {
            display.value = '';
        } else if (buttonText === '←') {
            display.value = display.value.slice(0, -1);
        } else if (buttonText === '+/-') {
            display.value = display.value.startsWith('-') ? display.value.slice(1) : '-' + display.value;
        } else if (buttonText === 'End') {
            window.close();
        } else {
            display.value += buttonText;
        }
    }
});
