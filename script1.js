// JavaScript source code
// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
    // Hide Results
    document.getElementById("result").style.display = "none";

    // Show Loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


// Calculate Results
function calculateResults() {
    // UI Vars
    const startDate = new Date(document.getElementById("datepicker").value);
    const interval = document.getElementById("interval").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    const paymentSize = parseFloat(document.getElementById("paymentSize").value);

    let table = document.querySelector('table');

    var totalInterest = document.getElementById("total-interest"); 
    var totalPayment = document.getElementById("total-payment");
    var numOfPayments = document.getElementById("num-of-payments");
    var paymentSched = document.getElementById("payment-schedule");

    //basic calculations
    var calcInterest = amount * (interestRate / 100).toFixed(2);
    var total = (calcInterest + amount);
    totalInterest.value = calcInterest;
    totalPayment.value = total;
    numOfPayments.value = (total / paymentSize).toFixed(0);

    var dueDate = startDate;
    var holidays = [
        new Date("01/01/2023"),
        new Date("01/16/2023"),
        new Date("02/20/2023"),
        new Date("04/29/2023"),
        new Date("06/19/2023"),
        new Date("07/4/2023"),
        new Date("09/04/2023"),
        new Date("10/9/2023"),
        new Date("11/11/2023"),
        new Date("11/23/2023"),
        new Date("12/25/2023")
    ];

    // creates the table based on the chosen interval
    switch (interval) {
        case "daily":
            paymentSched.value = "daily"
            for (let i = 1; i <= parseInt(numOfPayments.value); i++) {

                let sum = paymentSize * i;
                let tbl = table.insertRow(-1);
                let a = tbl.insertCell(0);
                let b = tbl.insertCell(1);
                let c = tbl.insertCell(2);

                a.innerHTML = 'Payment Date: ' + dueDate.toLocaleDateString();
                b.innerHTML = '$' + paymentSize;
                c.innerHTML = '$' + sum;

                //bank no open on weekends 
                dueDate.setDate(dueDate.getDate() + 1);
                if (dueDate.getDay() == 0) {
                    dueDate.setDate(dueDate.getDate() + 1);
                }
                if (dueDate.getDay() == 6) {
                    dueDate.setDate(dueDate.getDate() + 2);
                }

                // bank no open on holidays
                for (var h = 0; h < holidays.length; h++) {
                    if (holidays[h].toLocaleDateString() == dueDate.toLocaleDateString()) {
                        dueDate.setDate(dueDate.getDate() + 1);
                        break;
                    }
                }
            }
            break;
        case "weekly":
            paymentSched.value = "weekly"
            for (let i = 1; i <= parseInt(numOfPayments.value); i++) {

                let sum = paymentSize * i;

                let tbl = table.insertRow(-1);

                let a = tbl.insertCell(0);
                let b = tbl.insertCell(1);
                let c = tbl.insertCell(2);

                a.innerHTML = 'Payment Date: ' + dueDate.toLocaleDateString();
                b.innerHTML = '$' + paymentSize;
                c.innerHTML = '$' + sum;

                dueDate.setDate(dueDate.getDate() + 7);

                for (var h = 0; h < holidays.length; h++) {
                    if (holidays[h].toLocaleDateString() == dueDate.toLocaleDateString()) {
                        dueDate.setDate(dueDate.getDate() + 1);
                        break;
                    }
                }
            }
            break;
        default:
            paymentSched.value = "monthly"
            for (let i = 1; i <= parseInt(numOfPayments.value); i++) {

                let sum = paymentSize * i;

                let tbl = table.insertRow(-1);

                let a = tbl.insertCell(0);
                let b = tbl.insertCell(1);
                let c = tbl.insertCell(2);

                a.innerHTML = 'Payment Date: ' + dueDate.toLocaleDateString();
                b.innerHTML = '$' + paymentSize;
                c.innerHTML = '$' + sum;

                dueDate.setMonth(dueDate.getMonth() + 1);

                for (var h = 0; h < holidays.length; h++) {
                    if (holidays[h].toLocaleDateString() == dueDate.toLocaleDateString()) {
                        dueDate.setDate(dueDate.getDate() + 1);
                        break;
                    }
                }
            }
    }

    // Show Results
    document.getElementById("result").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
}

// Show Error
function showError(error) {
    // Hide Results
    document.getElementById("result").style.display = "none";

    // Hide Loader
    document.getElementById("loading").style.display = "none";

    // Create a div
    const errorDiv = document.createElement("div");

    // Get Elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // Add class
    errorDiv.className = "alert alert-danger";

    // Create text node and append div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000);

    // Clear Error
    function clearError() {
        document.querySelector(".alert").remove();
    }
}
