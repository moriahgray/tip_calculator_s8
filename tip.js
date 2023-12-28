document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("tipCalculatorForm");
    const nameInput = document.getElementById("nameInput");
    const passwordInput = document.getElementById("passwordInput");
    const billAmountInput = document.getElementById("billAmount");

    // Regex patterns
    const namePattern = /^[A-Za-z\s]{4,}$/;
    const passwordPattern = /^[0-9A-Za-z]{12}$/;
    const billAmountPattern = /^(?!0\.00)[1-9]\d*(\.\d+)?$/;

    function setValidStyles(input, errorElementId) {
        input.classList.remove('error');
        input.classList.add('success');
        document.getElementById(errorElementId).textContent = '';
    }

    function setInvalidStyles(input, errorElementId, errorMessage) {
        input.classList.remove('success');
        input.classList.add('error');
        document.getElementById(errorElementId).textContent = errorMessage;
        document.getElementById(errorElementId).style.color = 'red';
    }

    nameInput.addEventListener('input', () => {
        if (namePattern.test(nameInput.value)) {
            setValidStyles(nameInput, 'nameError');
        } else {
            setInvalidStyles(nameInput, 'nameError', "Name must be at least 4 characters and can contain uppercase, lowercase letters, and spaces.");
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordPattern.test(passwordInput.value)) {
            setValidStyles(passwordInput, 'passwordError');
        } else {
            setInvalidStyles(passwordInput, 'passwordError', "Password must be exactly 12 alphanumeric characters.");
        }
    });

    billAmountInput.addEventListener('input', () => {
        if (billAmountPattern.test(billAmountInput.value)) {
            setValidStyles(billAmountInput, 'billAmountError');
        } else {
            setInvalidStyles(billAmountInput, 'billAmountError', "Bill Amount must be a valid number greater than zero.");
        }
    });

    form.addEventListener("submit", e => {
        e.preventDefault();

        let hasErrors = false;

        if (!namePattern.test(nameInput.value)) {
            hasErrors = true;
            setInvalidStyles(nameInput, 'nameError', "Name must be at least 4 characters and can contain uppercase, lowercase letters, and spaces.");
        } else {
            setValidStyles(nameInput, 'nameError');
        }

        if (!passwordPattern.test(passwordInput.value)) {
            hasErrors = true;
            setInvalidStyles(passwordInput, 'passwordError', "Password must be exactly 12 alphanumeric characters.");
        } else {
            setValidStyles(passwordInput, 'passwordError');
        }

        if (!billAmountPattern.test(billAmountInput.value)) {
            hasErrors = true;
            setInvalidStyles(billAmountInput, 'billAmountError', "Bill Amount must be a valid number greater than zero.");
        } else {
            setValidStyles(billAmountInput, 'billAmountError');
        }    

        if (!hasErrors) {
            let mealCost = parseFloat(billAmountInput.value);
            let tipPercentage = parseFloat(document.querySelector('input[name="tip"]:checked').value) / 100;
            let tipAmount = mealCost * tipPercentage;
            let totalCost = mealCost + tipAmount;

            document.getElementById('mealCost').textContent = mealCost.toFixed(2);
            document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
            document.getElementById('totalCost').textContent = totalCost.toFixed(2);

            document.querySelector('.results').classList.remove('hidden');
        }
    });
});