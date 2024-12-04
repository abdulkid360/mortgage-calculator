// A FUNCTION TO HANDLE FORM SUBMIT EVENT
document.getElementById('form').addEventListener('submit',
    (event) => {
        event.preventDefault();
        validation()
        if (errorObj.exist() != 0) {
            document.querySelector('.wrapper2').style.display = 'none';
            document.querySelector('.wrapper22').style.display = 'block';
        } else {
            let mortgageAmount = validateInput(document.querySelector("#amount").value);
            let mortgageTerm = validateInput(document.querySelector("#term").value);
            let mortgageRate = validateInput(document.querySelector("#rate").value);
            let mortgageType = document.querySelector('input[name="type"]:checked');
            
            // CALCLATIONS

            let mortgageInterestRate = mortgageRate / 1200;

            // BASED ON REPAYMENT
            let numberOfPayments = mortgageTerm * 12;
            let c = (1 + mortgageInterestRate) ** numberOfPayments
            let monthlyPayment1 = (mortgageAmount * mortgageInterestRate * c) / (c - 1);
            let totalRepayments1 = monthlyPayment1 * numberOfPayments
    
            // BASED ON INTEREST ONLY
            let monthlyPayment2 = mortgageInterestRate * mortgageAmount;
            let totalRepayment = monthlyPayment2 * numberOfPayments;
            let totalRepayments2 = mortgageAmount + totalRepayment;
    
            let monthlyPayment;
            let totalAmount;
            if(mortgageType.value === "repayment"){
                monthlyPayment = Number(monthlyPayment1.toFixed(2)).toLocaleString();
                totalAmount = Number(totalRepayments1.toFixed(2)).toLocaleString();
            }else if (mortgageType.value === "interest") {
                monthlyPayment = Number(monthlyPayment2.toFixed(2)).toLocaleString();
                totalAmount = Number(totalRepayments2.toFixed(2)).toLocaleString();
            }
            
            document.querySelector('.wrapper2').style.display = 'block';
            document.querySelector('.wrapper22').style.display = 'none';
    
            document.querySelector(".results").textContent = "£" + monthlyPayment;
            document.querySelector(".total").textContent = "£" + totalAmount;
            
        }
    }
) 

// A FUNCTION FOR DETERMINING THE NUMBER OF ERRORS
const errorObj = {
    exist : () => {
        let errors = 0;
        const errorClasses = document.querySelectorAll('.error-class');
        errorClasses.forEach(errorClass => {
            if (errorClass.style.display == 'block') {
                errors ++;
            }
        })
        
        return errors;
    }
}

// A FUNCTION FOR DISPLAYING ERROR MESSAGE
const setError = (element) => {
    const parentElement = element.parentElement;
    parentElement.querySelector('.error-class').style.display = 'block';
    parentElement.querySelector('input').classList.add('input-error');
    parentElement.querySelector('.unit-icon').classList.add('unit-error');
    console.log(element);
    
};

// A FUNCTION REMOVING ERROR MESSAGE 
const removeError = (element) => {
    const parentElement = element.parentElement;
    parentElement.querySelector('.error-class').style.display = 'none';
    parentElement.querySelector('input').classList.remove('input-error');
    parentElement.querySelector('.unit-icon').classList.remove('unit-error');
};

// FORM VALIDATIONS HANDLING
const validation = () => {
    const mortgageAmount = document.getElementById('amount');
    const mortgageTerm = document.getElementById('term');
    const mortgageRate = document.getElementById('rate');
    let mortgageTypes = document.getElementsByName('type');
    let mortgageType = [...mortgageTypes]
    mortgageType = mortgageType.filter(rad => rad.checked === true);
    
    const allInputs = [mortgageAmount, mortgageTerm, mortgageRate, mortgageTypes[0]]

    allInputs.forEach(inpt => {
        try {
            if (inpt.type != 'radio') {
                if (inpt.value === '') {
                    setError(inpt.parentElement);
                }else{
                    removeError(inpt.parentElement);
                }

            }else{
                if (mortgageType.length === 0) {
                    setError(mortgageTypes[0].parentElement.parentElement);
                }else{
                    removeError(mortgageTypes[0].parentElement.parentElement)
                }
            }
        } catch (error) {
            {};
        }
    })
}

const radioBtns = document.querySelectorAll('input[type="radio"]');

radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener('click', (e) => {
        labelClass = e.target.classList[0] + '-label';
        document.querySelector('.' + labelClass).classList.add('radio-label');

        radNumber = e.target.classList[0][3]
        const customCircle = document.querySelector('.rad-circle' + radNumber);
        const customDot = document.querySelector('.rad-dot' + radNumber);
        customCircle.classList.remove('rad-circle')
        customCircle.classList.add('rad-circle-active')
        customDot.classList.add('rad-dot-active')

        radioBtns.forEach((radBtn) => {
            if (radBtn != radioBtn) {
                labelClass = radBtn.classList[0] + '-label';
                document.querySelector('.' + labelClass).classList.remove('radio-label');

                radNumber = radBtn.classList[0][3]
                const customCircle = document.querySelector('.rad-circle' + radNumber);
                const customDot = document.querySelector('.rad-dot' + radNumber);
                customCircle.classList.add('rad-circle');
                customCircle.classList.remove('rad-circle-active');
                customDot.classList.remove('rad-dot-active');
            }
        })
    })
})


// FUNCTION THAT RESET ALL INPUTS TO THEIR DEFAULT STATE
document.querySelector(".reset").addEventListener('click', function () {
    document.querySelector("#amount").value = "";
    document.querySelector("#term").value = "";
    document.querySelector("#rate").value = "";
    document.querySelector('.wrapper2').style.display = 'none';
    document.querySelector('.wrapper22').style.display = 'block';

    var checkedBtn = document.querySelector('input[name="type"]:checked');
    if (checkedBtn) {
        checkedBtn.checked = false;
        var checkLabel = checkedBtn.classList[0] + '-label';
        document.querySelector('.' + checkLabel).classList.remove('radio-label');

        circleNumber = checkedBtn.classList[0][3];

        var circle = document.querySelector('.rad-circle-active');
        var dot = document.querySelector('.rad-dot-active');

        circle.classList.remove('rad-circle-active')
        circle.classList.add('rad-circle')

        dot.classList.remove('rad-dot-active')

    };

    let mortgageAmount = document.querySelector("#amount");
    let mortgageTerm = document.querySelector("#term");
    let mortgageRate = document.querySelector("#rate");
    let mortgageType = document.getElementsByName('type');

    document.getElementsByName('type')[0].parentElement.parentElement.parentElement.querySelector('.error-class').style.display = 'none'
    collectedClass = ["amount", "term", "rate", "type"]
    collectedInputs = [mortgageAmount, mortgageTerm, mortgageRate, mortgageType]
    for (let i = 0; i < collectedInputs.length; i++) {
        try {
            removeError(collectedInputs[i].parentElement)
        } catch (error) {
            console.log('Interface cleared successfully')
        }
    }
})

const formatInput = (input) => {

    var value = input.value.replace(/[^\d.]/g, '');

    var parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let integerPart;
    let decimalPart;
    if(parts.length > 2) {
        integerPart = parts[0]
        decimalPart = parts.slice(1).filter(num => num != '').join('')
        var number = integerPart + '.' + decimalPart
        input.value = number;
    }else if (parts.length == 1){
        input.value = parts[0]
    }
}

// A FUNCTION THAT REMOVE THE THOUSAND COMMA SEPARATOR AND CONVERT IT TO A NUMBER
const validateInput = (inp) => {
    var inputList = Number(inp.split(',').join(''))
    return inputList
}

const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
        if (e.type === 'focus') {
            
            let unitErrorClass = input.classList[1].slice(0, -10) + 'UnitError';
            if (!document.querySelector('.' + unitErrorClass).classList.contains('unit-error')) {
                document.querySelector('.' + unitErrorClass).classList.add('unit-focus');
            }
            
            inputs.forEach((inp) => {
                if (inp !== input) {
                    let unitErrorClass = inp.classList[1].slice(0, -10) + 'UnitError';
                    document.querySelector('.' + unitErrorClass).classList.remove('unit-focus')
                }
            })
        }
    })
})

document.addEventListener('click', (e) => {
    inputs.forEach(input => {
        if (e.target !== input) {
            let unitErrorClass = input.classList[1].slice(0, -10) + 'UnitError';
            document.querySelector('.' + unitErrorClass).classList.remove('unit-focus');
        }
    })
});
