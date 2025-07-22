// Global variables
let currentCalculator = ""

// DOM elements
const modal = document.getElementById("modal")
const modalTitle = document.getElementById("modal-title")
const calculatorContent = document.getElementById("calculator-content")
const closeBtn = document.querySelector(".close")
const tabBtns = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const calcCards = document.querySelectorAll(".calc-card")

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Calculator card clicks
  calcCards.forEach((card) => {
    card.addEventListener("click", function () {
      const calcType = this.getAttribute("data-calc")
      openCalculator(calcType)
    })
  })

  // Close modal
  closeBtn.addEventListener("click", closeModal)
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")
      switchTab(tabName)
    })
  })
})

// Modal functions
function openCalculator(calcType) {
  currentCalculator = calcType
  const calcData = getCalculatorData(calcType)

  modalTitle.textContent = calcData.title
  calculatorContent.innerHTML = calcData.html

  modal.style.display = "block"
  modal.classList.add("show")

  // Switch to calculator tab
  switchTab("calculator")

  // Add event listeners for the specific calculator
  addCalculatorEventListeners(calcType)
}

function closeModal() {
  modal.style.display = "none"
  modal.classList.remove("show")
}

function switchTab(tabName) {
  // Remove active class from all tabs and contents
  tabBtns.forEach((btn) => btn.classList.remove("active"))
  tabContents.forEach((content) => content.classList.remove("active"))

  // Add active class to selected tab and content
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")
  document.getElementById(`${tabName}-content`).classList.add("active")
}

// Calculator data and HTML
function getCalculatorData(calcType) {
  const calculators = {
    bmi: {
      title: "BMI Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="weight">Weight (kg):</label>
                        <input type="number" id="weight" placeholder="Enter your weight">
                    </div>
                    <div class="calc-group">
                        <label for="height">Height (cm):</label>
                        <input type="number" id="height" placeholder="Enter your height">
                    </div>
                    <button class="calc-btn" onclick="calculateBMI()">Calculate BMI</button>
                    <div id="bmi-result" class="result" style="display: none;">
                        <h3>Your BMI Result</h3>
                        <div class="result-value" id="bmi-value"></div>
                        <p id="bmi-category"></p>
                    </div>
                </div>
            `,
    },
    age: {
      title: "Age Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="birthdate">Birth Date:</label>
                        <input type="date" id="birthdate">
                    </div>
                    <div class="calc-group">
                        <label for="currentdate">Current Date:</label>
                        <input type="date" id="currentdate">
                    </div>
                    <button class="calc-btn" onclick="calculateAge()">Calculate Age</button>
                    <div id="age-result" class="result" style="display: none;">
                        <h3>Your Age</h3>
                        <div class="result-value" id="age-value"></div>
                        <p id="age-details"></p>
                    </div>
                </div>
            `,
    },
    discount: {
      title: "Discount Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="original-price">Original Price:</label>
                        <input type="number" id="original-price" placeholder="Enter original price">
                    </div>
                    <div class="calc-group">
                        <label for="discount-percent">Discount Percentage:</label>
                        <input type="number" id="discount-percent" placeholder="Enter discount %">
                    </div>
                    <button class="calc-btn" onclick="calculateDiscount()">Calculate Discount</button>
                    <div id="discount-result" class="result" style="display: none;">
                        <h3>Discount Calculation</h3>
                        <p>Discount Amount: <span class="result-value" id="discount-amount"></span></p>
                        <p>Final Price: <span class="result-value" id="final-price"></span></p>
                        <p>You Save: <span class="result-value" id="savings"></span></p>
                    </div>
                </div>
            `,
    },
    loan: {
      title: "Loan Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="loan-amount">Loan Amount:</label>
                        <input type="number" id="loan-amount" placeholder="Enter loan amount">
                    </div>
                    <div class="calc-group">
                        <label for="interest-rate">Annual Interest Rate (%):</label>
                        <input type="number" id="interest-rate" step="0.01" placeholder="Enter interest rate">
                    </div>
                    <div class="calc-group">
                        <label for="loan-term">Loan Term (years):</label>
                        <input type="number" id="loan-term" placeholder="Enter loan term">
                    </div>
                    <button class="calc-btn" onclick="calculateLoan()">Calculate Loan</button>
                    <div id="loan-result" class="result" style="display: none;">
                        <h3>Loan Calculation</h3>
                        <p>Monthly Payment: <span class="result-value" id="monthly-payment"></span></p>
                        <p>Total Payment: <span class="result-value" id="total-payment"></span></p>
                        <p>Total Interest: <span class="result-value" id="total-interest"></span></p>
                    </div>
                </div>
            `,
    },
    gst: {
      title: "GST Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="amount">Amount:</label>
                        <input type="number" id="amount" placeholder="Enter amount">
                    </div>
                    <div class="calc-group">
                        <label for="gst-rate">GST Rate (%):</label>
                        <select id="gst-rate">
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18" selected>18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>
                    <div class="calc-group">
                        <label for="calc-type">Calculation Type:</label>
                        <select id="calc-type">
                            <option value="exclusive">Add GST (Exclusive)</option>
                            <option value="inclusive">Remove GST (Inclusive)</option>
                        </select>
                    </div>
                    <button class="calc-btn" onclick="calculateGST()">Calculate GST</button>
                    <div id="gst-result" class="result" style="display: none;">
                        <h3>GST Calculation</h3>
                        <p>Original Amount: <span class="result-value" id="original-amount"></span></p>
                        <p>GST Amount: <span class="result-value" id="gst-amount"></span></p>
                        <p>Total Amount: <span class="result-value" id="total-amount"></span></p>
                    </div>
                </div>
            `,
    },
    percentage: {
      title: "Percentage Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="calc-mode">Calculation Mode:</label>
                        <select id="calc-mode" onchange="updatePercentageForm()">
                            <option value="percent-of">What is X% of Y?</option>
                            <option value="is-what-percent">X is what % of Y?</option>
                            <option value="percent-change">Percentage change from X to Y</option>
                        </select>
                    </div>
                    <div id="percentage-inputs">
                        <div class="calc-group">
                            <label for="percent-value">Percentage:</label>
                            <input type="number" id="percent-value" placeholder="Enter percentage">
                        </div>
                        <div class="calc-group">
                            <label for="base-value">Base Value:</label>
                            <input type="number" id="base-value" placeholder="Enter base value">
                        </div>
                    </div>
                    <button class="calc-btn" onclick="calculatePercentage()">Calculate</button>
                    <div id="percentage-result" class="result" style="display: none;">
                        <h3>Result</h3>
                        <div class="result-value" id="percentage-answer"></div>
                    </div>
                </div>
            `,
    },
    date: {
      title: "Date Difference Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="start-date">Start Date:</label>
                        <input type="date" id="start-date">
                    </div>
                    <div class="calc-group">
                        <label for="end-date">End Date:</label>
                        <input type="date" id="end-date">
                    </div>
                    <button class="calc-btn" onclick="calculateDateDifference()">Calculate Difference</button>
                    <div id="date-result" class="result" style="display: none;">
                        <h3>Date Difference</h3>
                        <p>Total Days: <span class="result-value" id="total-days"></span></p>
                        <p>Years: <span id="years"></span>, Months: <span id="months"></span>, Days: <span id="days"></span></p>
                        <p>Total Hours: <span id="total-hours"></span></p>
                        <p>Total Minutes: <span id="total-minutes"></span></p>
                    </div>
                </div>
            `,
    },
    emi: {
      title: "EMI Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="principal">Principal Amount:</label>
                        <input type="number" id="principal" placeholder="Enter principal amount">
                    </div>
                    <div class="calc-group">
                        <label for="rate">Annual Interest Rate (%):</label>
                        <input type="number" id="rate" step="0.01" placeholder="Enter interest rate">
                    </div>
                    <div class="calc-group">
                        <label for="tenure">Tenure (months):</label>
                        <input type="number" id="tenure" placeholder="Enter tenure in months">
                    </div>
                    <button class="calc-btn" onclick="calculateEMI()">Calculate EMI</button>
                    <div id="emi-result" class="result" style="display: none;">
                        <h3>EMI Calculation</h3>
                        <p>Monthly EMI: <span class="result-value" id="emi-amount"></span></p>
                        <p>Total Amount: <span class="result-value" id="total-emi-amount"></span></p>
                        <p>Total Interest: <span class="result-value" id="total-emi-interest"></span></p>
                    </div>
                </div>
            `,
    },
    area: {
      title: "Area Calculator",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="shape">Select Shape:</label>
                        <select id="shape" onchange="updateAreaForm()">
                            <option value="rectangle">Rectangle</option>
                            <option value="circle">Circle</option>
                            <option value="triangle">Triangle</option>
                            <option value="square">Square</option>
                        </select>
                    </div>
                    <div id="area-inputs">
                        <div class="calc-group">
                            <label for="length">Length:</label>
                            <input type="number" id="length" placeholder="Enter length">
                        </div>
                        <div class="calc-group">
                            <label for="width">Width:</label>
                            <input type="number" id="width" placeholder="Enter width">
                        </div>
                    </div>
                    <button class="calc-btn" onclick="calculateArea()">Calculate Area</button>
                    <div id="area-result" class="result" style="display: none;">
                        <h3>Area Result</h3>
                        <div class="result-value" id="area-value"></div>
                    </div>
                </div>
            `,
    },
    length: {
      title: "Length Converter",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="length-value">Value:</label>
                        <input type="number" id="length-value" placeholder="Enter value">
                    </div>
                    <div class="calc-group">
                        <label for="from-unit">From:</label>
                        <select id="from-unit">
                            <option value="mm">Millimeter</option>
                            <option value="cm">Centimeter</option>
                            <option value="m" selected>Meter</option>
                            <option value="km">Kilometer</option>
                            <option value="in">Inch</option>
                            <option value="ft">Foot</option>
                            <option value="yd">Yard</option>
                            <option value="mi">Mile</option>
                        </select>
                    </div>
                    <div class="calc-group">
                        <label for="to-unit">To:</label>
                        <select id="to-unit">
                            <option value="mm">Millimeter</option>
                            <option value="cm" selected>Centimeter</option>
                            <option value="m">Meter</option>
                            <option value="km">Kilometer</option>
                            <option value="in">Inch</option>
                            <option value="ft">Foot</option>
                            <option value="yd">Yard</option>
                            <option value="mi">Mile</option>
                        </select>
                    </div>
                    <button class="calc-btn" onclick="convertLength()">Convert</button>
                    <div id="length-result" class="result" style="display: none;">
                        <h3>Conversion Result</h3>
                        <div class="result-value" id="length-converted"></div>
                    </div>
                </div>
            `,
    },
    time: {
      title: "Time Converter",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="time-value">Value:</label>
                        <input type="number" id="time-value" placeholder="Enter value">
                    </div>
                    <div class="calc-group">
                        <label for="from-time-unit">From:</label>
                        <select id="from-time-unit">
                            <option value="ms">Millisecond</option>
                            <option value="s" selected>Second</option>
                            <option value="min">Minute</option>
                            <option value="h">Hour</option>
                            <option value="d">Day</option>
                            <option value="w">Week</option>
                            <option value="mo">Month</option>
                            <option value="y">Year</option>
                        </select>
                    </div>
                    <div class="calc-group">
                        <label for="to-time-unit">To:</label>
                        <select id="to-time-unit">
                            <option value="ms">Millisecond</option>
                            <option value="s">Second</option>
                            <option value="min" selected>Minute</option>
                            <option value="h">Hour</option>
                            <option value="d">Day</option>
                            <option value="w">Week</option>
                            <option value="mo">Month</option>
                            <option value="y">Year</option>
                        </select>
                    </div>
                    <button class="calc-btn" onclick="convertTime()">Convert</button>
                    <div id="time-result" class="result" style="display: none;">
                        <h3>Conversion Result</h3>
                        <div class="result-value" id="time-converted"></div>
                    </div>
                </div>
            `,
    },
    currency: {
      title: "Currency Converter",
      html: `
                <div class="calculator">
                    <div class="calc-group">
                        <label for="currency-amount">Amount:</label>
                        <input type="number" id="currency-amount" placeholder="Enter amount">
                    </div>
                    <div class="calc-group">
                        <label for="from-currency">From Currency:</label>
                        <select id="from-currency">
                            <option value="USD" selected>USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                    </div>
                    <div class="calc-group">
                        <label for="to-currency">To Currency:</label>
                        <select id="to-currency">
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR" selected>EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                    </div>
                    <button class="calc-btn" onclick="convertCurrency()">Convert</button>
                    <div id="currency-result" class="result" style="display: none;">
                        <h3>Conversion Result</h3>
                        <div class="result-value" id="currency-converted"></div>
                        <p><small>*Rates are approximate and for demonstration purposes</small></p>
                    </div>
                </div>
            `,
    },
    calorie: {
      title: "Calorie Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="gender">Gender:</label>
        <select id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="cal-age">Age:</label>
        <input type="number" id="cal-age" placeholder="Enter your age">
      </div>
      <div class="calc-group">
        <label for="cal-weight">Weight (kg):</label>
        <input type="number" id="cal-weight" placeholder="Enter your weight">
      </div>
      <div class="calc-group">
        <label for="cal-height">Height (cm):</label>
        <input type="number" id="cal-height" placeholder="Enter your height">
      </div>
      <div class="calc-group">
        <label for="activity">Activity Level:</label>
        <select id="activity">
          <option value="1.2">Sedentary (little/no exercise)</option>
          <option value="1.375">Light (light exercise 1-3 days/week)</option>
          <option value="1.55">Moderate (moderate exercise 3-5 days/week)</option>
          <option value="1.725">Active (hard exercise 6-7 days/week)</option>
          <option value="1.9">Very Active (very hard exercise, physical job)</option>
        </select>
      </div>
      <button class="calc-btn" onclick="calculateCalorie()">Calculate Calories</button>
      <div id="calorie-result" class="result" style="display: none;">
        <h3>Daily Calorie Needs</h3>
        <p>BMR: <span class="result-value" id="bmr-value"></span> calories</p>
        <p>Daily Calories: <span class="result-value" id="daily-calories"></span> calories</p>
      </div>
    </div>
  `,
    },

    grade: {
      title: "Grade Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="total-points">Total Points Earned:</label>
        <input type="number" id="total-points" placeholder="Enter points earned">
      </div>
      <div class="calc-group">
        <label for="max-points">Total Possible Points:</label>
        <input type="number" id="max-points" placeholder="Enter maximum points">
      </div>
      <button class="calc-btn" onclick="calculateGrade()">Calculate Grade</button>
      <div id="grade-result" class="result" style="display: none;">
        <h3>Grade Result</h3>
        <p>Percentage: <span class="result-value" id="grade-percentage"></span>%</p>
        <p>Letter Grade: <span class="result-value" id="letter-grade"></span></p>
      </div>
    </div>
  `,
    },

    profit: {
      title: "Profit Margin Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="cost-price">Cost Price:</label>
        <input type="number" id="cost-price" placeholder="Enter cost price">
      </div>
      <div class="calc-group">
        <label for="selling-price">Selling Price:</label>
        <input type="number" id="selling-price" placeholder="Enter selling price">
      </div>
      <button class="calc-btn" onclick="calculateProfit()">Calculate Profit</button>
      <div id="profit-result" class="result" style="display: none;">
        <h3>Profit Analysis</h3>
        <p>Profit: <span class="result-value" id="profit-amount"></span></p>
        <p>Profit Margin: <span class="result-value" id="profit-margin"></span>%</p>
        <p>Markup: <span class="result-value" id="markup"></span>%</p>
      </div>
    </div>
  `,
    },

    tip: {
      title: "Tip Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="bill-amount">Bill Amount:</label>
        <input type="number" id="bill-amount" placeholder="Enter bill amount">
      </div>
      <div class="calc-group">
        <label for="tip-percent">Tip Percentage:</label>
        <input type="number" id="tip-percent" value="15" placeholder="Enter tip %">
      </div>
      <div class="calc-group">
        <label for="people-count">Number of People:</label>
        <input type="number" id="people-count" value="1" placeholder="Enter number of people">
      </div>
      <button class="calc-btn" onclick="calculateTip()">Calculate Tip</button>
      <div id="tip-result" class="result" style="display: none;">
        <h3>Tip Calculation</h3>
        <p>Tip Amount: <span class="result-value" id="tip-amount"></span></p>
        <p>Total Bill: <span class="result-value" id="total-bill"></span></p>
        <p>Per Person: <span class="result-value" id="per-person"></span></p>
      </div>
    </div>
  `,
    },

    compound: {
      title: "Compound Interest Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="principal-amount">Principal Amount:</label>
        <input type="number" id="principal-amount" placeholder="Enter principal amount">
      </div>
      <div class="calc-group">
        <label for="annual-rate">Annual Interest Rate (%):</label>
        <input type="number" id="annual-rate" step="0.01" placeholder="Enter annual rate">
      </div>
      <div class="calc-group">
        <label for="compound-frequency">Compound Frequency:</label>
        <select id="compound-frequency">
          <option value="1">Annually</option>
          <option value="2">Semi-annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="time-period">Time Period (years):</label>
        <input type="number" id="time-period" placeholder="Enter time in years">
      </div>
      <button class="calc-btn" onclick="calculateCompound()">Calculate</button>
      <div id="compound-result" class="result" style="display: none;">
        <h3>Compound Interest Result</h3>
        <p>Final Amount: <span class="result-value" id="final-amount"></span></p>
        <p>Interest Earned: <span class="result-value" id="interest-earned"></span></p>
      </div>
    </div>
  `,
    },
    mortgage: {
      title: "Mortgage Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="home-price">Home Price:</label>
        <input type="number" id="home-price" placeholder="Enter home price">
      </div>
      <div class="calc-group">
        <label for="down-payment">Down Payment:</label>
        <input type="number" id="down-payment" placeholder="Enter down payment">
      </div>
      <div class="calc-group">
        <label for="mortgage-rate">Interest Rate (%):</label>
        <input type="number" id="mortgage-rate" step="0.01" placeholder="Enter interest rate">
      </div>
      <div class="calc-group">
        <label for="loan-years">Loan Term (years):</label>
        <input type="number" id="loan-years" placeholder="Enter loan term">
      </div>
      <button class="calc-btn" onclick="calculateMortgage()">Calculate Mortgage</button>
      <div id="mortgage-result" class="result" style="display: none;">
        <h3>Mortgage Calculation</h3>
        <p>Monthly Payment: <span class="result-value" id="mortgage-payment"></span></p>
        <p>Total Interest: <span class="result-value" id="mortgage-interest"></span></p>
        <p>Total Cost: <span class="result-value" id="mortgage-total"></span></p>
      </div>
    </div>
  `,
    },

    retirement: {
      title: "Retirement Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="current-age">Current Age:</label>
        <input type="number" id="current-age" placeholder="Enter current age">
      </div>
      <div class="calc-group">
        <label for="retirement-age">Retirement Age:</label>
        <input type="number" id="retirement-age" placeholder="Enter retirement age">
      </div>
      <div class="calc-group">
        <label for="current-savings">Current Savings:</label>
        <input type="number" id="current-savings" placeholder="Enter current savings">
      </div>
      <div class="calc-group">
        <label for="monthly-contribution">Monthly Contribution:</label>
        <input type="number" id="monthly-contribution" placeholder="Enter monthly contribution">
      </div>
      <div class="calc-group">
        <label for="expected-return">Expected Annual Return (%):</label>
        <input type="number" id="expected-return" step="0.1" placeholder="Enter expected return">
      </div>
      <button class="calc-btn" onclick="calculateRetirement()">Calculate Retirement</button>
      <div id="retirement-result" class="result" style="display: none;">
        <h3>Retirement Projection</h3>
        <p>Years to Retirement: <span class="result-value" id="years-to-retirement"></span></p>
        <p>Total at Retirement: <span class="result-value" id="retirement-total"></span></p>
        <p>Monthly Income (4% rule): <span class="result-value" id="monthly-income"></span></p>
      </div>
    </div>
  `,
    },

    investment: {
      title: "Investment Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="initial-investment">Initial Investment:</label>
        <input type="number" id="initial-investment" placeholder="Enter initial amount">
      </div>
      <div class="calc-group">
        <label for="monthly-investment">Monthly Investment:</label>
        <input type="number" id="monthly-investment" placeholder="Enter monthly amount">
      </div>
      <div class="calc-group">
        <label for="investment-return">Annual Return (%):</label>
        <input type="number" id="investment-return" step="0.1" placeholder="Enter annual return">
      </div>
      <div class="calc-group">
        <label for="investment-years">Investment Period (years):</label>
        <input type="number" id="investment-years" placeholder="Enter investment period">
      </div>
      <button class="calc-btn" onclick="calculateInvestment()">Calculate Investment</button>
      <div id="investment-result" class="result" style="display: none;">
        <h3>Investment Projection</h3>
        <p>Total Invested: <span class="result-value" id="total-invested"></span></p>
        <p>Final Value: <span class="result-value" id="investment-value"></span></p>
        <p>Total Gain: <span class="result-value" id="investment-gain"></span></p>
      </div>
    </div>
  `,
    },

    tax: {
      title: "Income Tax Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="annual-income">Annual Income:</label>
        <input type="number" id="annual-income" placeholder="Enter annual income">
      </div>
      <div class="calc-group">
        <label for="filing-status">Filing Status:</label>
        <select id="filing-status">
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="deductions">Standard Deduction:</label>
        <input type="number" id="deductions" value="12950" placeholder="Enter deductions">
      </div>
      <button class="calc-btn" onclick="calculateTax()">Calculate Tax</button>
      <div id="tax-result" class="result" style="display: none;">
        <h3>Tax Calculation</h3>
        <p>Taxable Income: <span class="result-value" id="taxable-income"></span></p>
        <p>Federal Tax: <span class="result-value" id="federal-tax"></span></p>
        <p>After-Tax Income: <span class="result-value" id="after-tax-income"></span></p>
      </div>
    </div>
  `,
    },

    lease: {
      title: "Car Lease Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="car-price">Car Price (MSRP):</label>
        <input type="number" id="car-price" placeholder="Enter car price">
      </div>
      <div class="calc-group">
        <label for="residual-value">Residual Value (%):</label>
        <input type="number" id="residual-value" value="60" placeholder="Enter residual value %">
      </div>
      <div class="calc-group">
        <label for="lease-term">Lease Term (months):</label>
        <input type="number" id="lease-term" value="36" placeholder="Enter lease term">
      </div>
      <div class="calc-group">
        <label for="money-factor">Money Factor:</label>
        <input type="number" id="money-factor" step="0.00001" value="0.00125" placeholder="Enter money factor">
      </div>
      <div class="calc-group">
        <label for="down-payment-lease">Down Payment:</label>
        <input type="number" id="down-payment-lease" placeholder="Enter down payment">
      </div>
      <button class="calc-btn" onclick="calculateLease()">Calculate Lease</button>
      <div id="lease-result" class="result" style="display: none;">
        <h3>Lease Calculation</h3>
        <p>Monthly Payment: <span class="result-value" id="lease-payment"></span></p>
        <p>Total Lease Cost: <span class="result-value" id="total-lease-cost"></span></p>
        <p>Depreciation: <span class="result-value" id="depreciation"></span></p>
      </div>
    </div>
  `,
    },

    unit: {
      title: "Unit Converter",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="unit-category">Category:</label>
        <select id="unit-category" onchange="updateUnitOptions()">
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
          <option value="area">Area</option>
          <option value="volume">Volume</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="unit-value">Value:</label>
        <input type="number" id="unit-value" placeholder="Enter value">
      </div>
      <div class="calc-group">
        <label for="from-unit-type">From:</label>
        <select id="from-unit-type">
          <option value="m">Meter</option>
          <option value="cm">Centimeter</option>
          <option value="ft">Foot</option>
          <option value="in">Inch</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="to-unit-type">To:</label>
        <select id="to-unit-type">
          <option value="m">Meter</option>
          <option value="cm">Centimeter</option>
          <option value="ft">Foot</option>
          <option value="in">Inch</option>
        </select>
      </div>
      <button class="calc-btn" onclick="convertUnit()">Convert</button>
      <div id="unit-result" class="result" style="display: none;">
        <h3>Conversion Result</h3>
        <div class="result-value" id="unit-converted"></div>
      </div>
    </div>
  `,
    },

    scientific: {
      title: "Scientific Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="sci-display">Display:</label>
        <input type="text" id="sci-display" readonly placeholder="0">
      </div>
      <div class="sci-buttons">
        <div class="sci-row">
          <button onclick="clearSci()">C</button>
          <button onclick="appendSci('(')">(</button>
          <button onclick="appendSci(')')">)</button>
          <button onclick="appendSci('/')">/</button>
        </div>
        <div class="sci-row">
          <button onclick="appendSci('7')">7</button>
          <button onclick="appendSci('8')">8</button>
          <button onclick="appendSci('9')">9</button>
          <button onclick="appendSci('*')">*</button>
        </div>
        <div class="sci-row">
          <button onclick="appendSci('4')">4</button>
          <button onclick="appendSci('5')">5</button>
          <button onclick="appendSci('6')">6</button>
          <button onclick="appendSci('-')">-</button>
        </div>
        <div class="sci-row">
          <button onclick="appendSci('1')">1</button>
          <button onclick="appendSci('2')">2</button>
          <button onclick="appendSci('3')">3</button>
          <button onclick="appendSci('+')">+</button>
        </div>
        <div class="sci-row">
          <button onclick="appendSci('0')">0</button>
          <button onclick="appendSci('.')">.</button>
          <button onclick="calculateSci()">=</button>
          <button onclick="appendSci('Math.sqrt(')">√</button>
        </div>
      </div>
    </div>
  `,
    },

    binary: {
      title: "Binary Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="number-system">Input Type:</label>
        <select id="number-system">
          <option value="decimal">Decimal</option>
          <option value="binary">Binary</option>
          <option value="hexadecimal">Hexadecimal</option>
          <option value="octal">Octal</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="input-number">Number:</label>
        <input type="text" id="input-number" placeholder="Enter number">
      </div>
      <button class="calc-btn" onclick="convertNumber()">Convert</button>
      <div id="binary-result" class="result" style="display: none;">
        <h3>Number Conversions</h3>
        <p>Decimal: <span class="result-value" id="decimal-result"></span></p>
        <p>Binary: <span class="result-value" id="binary-result-val"></span></p>
        <p>Hexadecimal: <span class="result-value" id="hex-result"></span></p>
        <p>Octal: <span class="result-value" id="octal-result"></span></p>
      </div>
    </div>
  `,
    },

    gpa: {
      title: "GPA Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="gpa-system">GPA System:</label>
        <select id="gpa-system">
          <option value="4.0">4.0 Scale</option>
          <option value="5.0">5.0 Scale</option>
          <option value="10.0">10.0 Scale</option>
        </select>
      </div>
      <div id="courses-container">
        <div class="course-entry">
          <div class="calc-group">
            <label>Course 1:</label>
            <input type="text" placeholder="Course name" class="course-name">
            <input type="number" placeholder="Credits" class="course-credits">
            <select class="course-grade">
              <option value="4.0">A (4.0)</option>
              <option value="3.7">A- (3.7)</option>
              <option value="3.3">B+ (3.3)</option>
              <option value="3.0">B (3.0)</option>
              <option value="2.7">B- (2.7)</option>
              <option value="2.3">C+ (2.3)</option>
              <option value="2.0">C (2.0)</option>
              <option value="1.7">C- (1.7)</option>
              <option value="1.3">D+ (1.3)</option>
              <option value="1.0">D (1.0)</option>
              <option value="0.0">F (0.0)</option>
            </select>
          </div>
        </div>
      </div>
      <button onclick="addCourse()">Add Course</button>
      <button class="calc-btn" onclick="calculateGPA()">Calculate GPA</button>
      <div id="gpa-result" class="result" style="display: none;">
        <h3>GPA Calculation</h3>
        <p>Total Credits: <span class="result-value" id="total-credits"></span></p>
        <p>GPA: <span class="result-value" id="calculated-gpa"></span></p>
      </div>
    </div>
  `,
    },

    "body-fat": {
      title: "Body Fat Calculator",
      html: `
    <div class="calculator">
      <div class="calc-group">
        <label for="bf-gender">Gender:</label>
        <select id="bf-gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="calc-group">
        <label for="bf-age">Age:</label>
        <input type="number" id="bf-age" placeholder="Enter age">
      </div>
      <div class="calc-group">
        <label for="bf-height">Height (cm):</label>
        <input type="number" id="bf-height" placeholder="Enter height">
      </div>
      <div class="calc-group">
        <label for="bf-weight">Weight (kg):</label>
        <input type="number" id="bf-weight" placeholder="Enter weight">
      </div>
      <div class="calc-group">
        <label for="waist">Waist Circumference (cm):</label>
        <input type="number" id="waist" placeholder="Enter waist measurement">
      </div>
      <div class="calc-group">
        <label for="neck">Neck Circumference (cm):</label>
        <input type="number" id="neck" placeholder="Enter neck measurement">
      </div>
      <div class="calc-group" id="hip-group" style="display: none;">
        <label for="hip">Hip Circumference (cm):</label>
        <input type="number" id="hip" placeholder="Enter hip measurement">
      </div>
      <button class="calc-btn" onclick="calculateBodyFat()">Calculate Body Fat</button>
      <div id="body-fat-result" class="result" style="display: none;">
        <h3>Body Fat Analysis</h3>
        <p>Body Fat Percentage: <span class="result-value" id="body-fat-percentage"></span>%</p>
        <p>Category: <span class="result-value" id="body-fat-category"></span></p>
      </div>
    </div>
  `,
    },
  }

  return calculators[calcType] || calculators.bmi
}

// Add event listeners for specific calculators
function addCalculatorEventListeners(calcType) {
  // Set current date for age calculator
  if (calcType === "age") {
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("currentdate").value = today
  }

  // Set today's date for date calculator
  if (calcType === "date") {
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("end-date").value = today
  }
}

// Calculator Functions
function calculateBMI() {
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const height = Number.parseFloat(document.getElementById("height").value) / 100 // Convert cm to m

  if (!weight || !height) {
    alert("Please enter valid weight and height values")
    return
  }

  const bmi = weight / (height * height)
  let category = ""

  if (bmi < 18.5) category = "Underweight"
  else if (bmi < 25) category = "Normal weight"
  else if (bmi < 30) category = "Overweight"
  else category = "Obese"

  document.getElementById("bmi-value").textContent = bmi.toFixed(1)
  document.getElementById("bmi-category").textContent = `Category: ${category}`
  document.getElementById("bmi-result").style.display = "block"
}

function calculateAge() {
  const birthDate = new Date(document.getElementById("birthdate").value)
  const currentDate = new Date(document.getElementById("currentdate").value)

  if (!birthDate || !currentDate) {
    alert("Please select both dates")
    return
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear()
  let months = currentDate.getMonth() - birthDate.getMonth()
  let days = currentDate.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24))

  document.getElementById("age-value").textContent = `${years} years, ${months} months, ${days} days`
  document.getElementById("age-details").textContent = `Total days lived: ${totalDays}`
  document.getElementById("age-result").style.display = "block"
}

function calculateDiscount() {
  const originalPrice = Number.parseFloat(document.getElementById("original-price").value)
  const discountPercent = Number.parseFloat(document.getElementById("discount-percent").value)

  if (!originalPrice || !discountPercent) {
    alert("Please enter valid values")
    return
  }

  const discountAmount = (originalPrice * discountPercent) / 100
  const finalPrice = originalPrice - discountAmount

  document.getElementById("discount-amount").textContent = `$${discountAmount.toFixed(2)}`
  document.getElementById("final-price").textContent = `$${finalPrice.toFixed(2)}`
  document.getElementById("savings").textContent = `$${discountAmount.toFixed(2)} (${discountPercent}%)`
  document.getElementById("discount-result").style.display = "block"
}

function calculateLoan() {
  const principal = Number.parseFloat(document.getElementById("loan-amount").value)
  const annualRate = Number.parseFloat(document.getElementById("interest-rate").value)
  const years = Number.parseFloat(document.getElementById("loan-term").value)

  if (!principal || !annualRate || !years) {
    alert("Please enter valid values")
    return
  }

  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

  const totalPayment = monthlyPayment * numPayments
  const totalInterest = totalPayment - principal

  document.getElementById("monthly-payment").textContent = `$${monthlyPayment.toFixed(2)}`
  document.getElementById("total-payment").textContent = `$${totalPayment.toFixed(2)}`
  document.getElementById("total-interest").textContent = `$${totalInterest.toFixed(2)}`
  document.getElementById("loan-result").style.display = "block"
}

function calculateGST() {
  const amount = Number.parseFloat(document.getElementById("amount").value)
  const gstRate = Number.parseFloat(document.getElementById("gst-rate").value)
  const calcType = document.getElementById("calc-type").value

  if (!amount) {
    alert("Please enter a valid amount")
    return
  }

  let originalAmount, gstAmount, totalAmount

  if (calcType === "exclusive") {
    originalAmount = amount
    gstAmount = (amount * gstRate) / 100
    totalAmount = amount + gstAmount
  } else {
    totalAmount = amount
    originalAmount = amount / (1 + gstRate / 100)
    gstAmount = amount - originalAmount
  }

  document.getElementById("original-amount").textContent = `$${originalAmount.toFixed(2)}`
  document.getElementById("gst-amount").textContent = `$${gstAmount.toFixed(2)}`
  document.getElementById("total-amount").textContent = `$${totalAmount.toFixed(2)}`
  document.getElementById("gst-result").style.display = "block"
}

function updatePercentageForm() {
  const mode = document.getElementById("calc-mode").value
  const inputsDiv = document.getElementById("percentage-inputs")

  let html = ""

  switch (mode) {
    case "percent-of":
      html = `
                <div class="calc-group">
                    <label for="percent-value">Percentage:</label>
                    <input type="number" id="percent-value" placeholder="Enter percentage">
                </div>
                <div class="calc-group">
                    <label for="base-value">Of Value:</label>
                    <input type="number" id="base-value" placeholder="Enter base value">
                </div>
            `
      break
    case "is-what-percent":
      html = `
                <div class="calc-group">
                    <label for="part-value">Part Value:</label>
                    <input type="number" id="part-value" placeholder="Enter part value">
                </div>
                <div class="calc-group">
                    <label for="whole-value">Whole Value:</label>
                    <input type="number" id="whole-value" placeholder="Enter whole value">
                </div>
            `
      break
    case "percent-change":
      html = `
                <div class="calc-group">
                    <label for="old-value">Old Value:</label>
                    <input type="number" id="old-value" placeholder="Enter old value">
                </div>
                <div class="calc-group">
                    <label for="new-value">New Value:</label>
                    <input type="number" id="new-value" placeholder="Enter new value">
                </div>
            `
      break
  }

  inputsDiv.innerHTML = html
}

function calculatePercentage() {
  const mode = document.getElementById("calc-mode").value
  let result = ""

  switch (mode) {
    case "percent-of":
      const percent = Number.parseFloat(document.getElementById("percent-value").value)
      const baseValue = Number.parseFloat(document.getElementById("base-value").value)
      if (!percent || !baseValue) {
        alert("Please enter valid values")
        return
      }
      result = `${percent}% of ${baseValue} = ${((percent * baseValue) / 100).toFixed(2)}`
      break

    case "is-what-percent":
      const partValue = Number.parseFloat(document.getElementById("part-value").value)
      const wholeValue = Number.parseFloat(document.getElementById("whole-value").value)
      if (!partValue || !wholeValue) {
        alert("Please enter valid values")
        return
      }
      result = `${partValue} is ${((partValue / wholeValue) * 100).toFixed(2)}% of ${wholeValue}`
      break

    case "percent-change":
      const oldValue = Number.parseFloat(document.getElementById("old-value").value)
      const newValue = Number.parseFloat(document.getElementById("new-value").value)
      if (!oldValue || !newValue) {
        alert("Please enter valid values")
        return
      }
      const change = ((newValue - oldValue) / oldValue) * 100
      result = `Change: ${change.toFixed(2)}% ${change >= 0 ? "increase" : "decrease"}`
      break
  }

  document.getElementById("percentage-answer").textContent = result
  document.getElementById("percentage-result").style.display = "block"
}

function calculateDateDifference() {
  const startDate = new Date(document.getElementById("start-date").value)
  const endDate = new Date(document.getElementById("end-date").value)

  if (!startDate || !endDate) {
    alert("Please select both dates")
    return
  }

  const timeDiff = endDate.getTime() - startDate.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

  const years = Math.floor(daysDiff / 365)
  const months = Math.floor((daysDiff % 365) / 30)
  const days = daysDiff % 30

  const hours = daysDiff * 24
  const minutes = hours * 60

  document.getElementById("total-days").textContent = daysDiff
  document.getElementById("years").textContent = years
  document.getElementById("months").textContent = months
  document.getElementById("days").textContent = days
  document.getElementById("total-hours").textContent = hours.toLocaleString()
  document.getElementById("total-minutes").textContent = minutes.toLocaleString()
  document.getElementById("date-result").style.display = "block"
}

function calculateEMI() {
  const principal = Number.parseFloat(document.getElementById("principal").value)
  const rate = Number.parseFloat(document.getElementById("rate").value)
  const tenure = Number.parseFloat(document.getElementById("tenure").value)

  if (!principal || !rate || !tenure) {
    alert("Please enter valid values")
    return
  }

  const monthlyRate = rate / 100 / 12
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)

  const totalAmount = emi * tenure
  const totalInterest = totalAmount - principal

  document.getElementById("emi-amount").textContent = `$${emi.toFixed(2)}`
  document.getElementById("total-emi-amount").textContent = `$${totalAmount.toFixed(2)}`
  document.getElementById("total-emi-interest").textContent = `$${totalInterest.toFixed(2)}`
  document.getElementById("emi-result").style.display = "block"
}

function updateAreaForm() {
  const shape = document.getElementById("shape").value
  const inputsDiv = document.getElementById("area-inputs")

  let html = ""

  switch (shape) {
    case "rectangle":
      html = `
                <div class="calc-group">
                    <label for="length">Length:</label>
                    <input type="number" id="length" placeholder="Enter length">
                </div>
                <div class="calc-group">
                    <label for="width">Width:</label>
                    <input type="number" id="width" placeholder="Enter width">
                </div>
            `
      break
    case "circle":
      html = `
                <div class="calc-group">
                    <label for="radius">Radius:</label>
                    <input type="number" id="radius" placeholder="Enter radius">
                </div>
            `
      break
    case "triangle":
      html = `
                <div class="calc-group">
                    <label for="base">Base:</label>
                    <input type="number" id="base" placeholder="Enter base">
                </div>
                <div class="calc-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" placeholder="Enter height">
                </div>
            `
      break
    case "square":
      html = `
                <div class="calc-group">
                    <label for="side">Side Length:</label>
                    <input type="number" id="side" placeholder="Enter side length">
                </div>
            `
      break
  }

  inputsDiv.innerHTML = html
}

function calculateArea() {
  const shape = document.getElementById("shape").value
  let area = 0
  const unit = "square units"

  switch (shape) {
    case "rectangle":
      const length = Number.parseFloat(document.getElementById("length").value)
      const width = Number.parseFloat(document.getElementById("width").value)
      if (!length || !width) {
        alert("Please enter valid values")
        return
      }
      area = length * width
      break

    case "circle":
      const radius = Number.parseFloat(document.getElementById("radius").value)
      if (!radius) {
        alert("Please enter a valid radius")
        return
      }
      area = Math.PI * radius * radius
      break

    case "triangle":
      const base = Number.parseFloat(document.getElementById("base").value)
      const height = Number.parseFloat(document.getElementById("height").value)
      if (!base || !height) {
        alert("Please enter valid values")
        return
      }
      area = 0.5 * base * height
      break

    case "square":
      const side = Number.parseFloat(document.getElementById("side").value)
      if (!side) {
        alert("Please enter a valid side length")
        return
      }
      area = side * side
      break
  }

  document.getElementById("area-value").textContent = `${area.toFixed(2)} ${unit}`
  document.getElementById("area-result").style.display = "block"
}

function convertLength() {
  const value = Number.parseFloat(document.getElementById("length-value").value)
  const fromUnit = document.getElementById("from-unit").value
  const toUnit = document.getElementById("to-unit").value

  if (!value) {
    alert("Please enter a valid value")
    return
  }

  // Convert to meters first
  const toMeters = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  }

  const fromMeters = {
    mm: 1000,
    cm: 100,
    m: 1,
    km: 0.001,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    mi: 0.000621371,
  }

  const meters = value * toMeters[fromUnit]
  const result = meters * fromMeters[toUnit]

  const unitNames = {
    mm: "millimeters",
    cm: "centimeters",
    m: "meters",
    km: "kilometers",
    in: "inches",
    ft: "feet",
    yd: "yards",
    mi: "miles",
  }

  document.getElementById("length-converted").textContent =
    `${value} ${unitNames[fromUnit]} = ${result.toFixed(6)} ${unitNames[toUnit]}`
  document.getElementById("length-result").style.display = "block"
}

function convertTime() {
  const value = Number.parseFloat(document.getElementById("time-value").value)
  const fromUnit = document.getElementById("from-time-unit").value
  const toUnit = document.getElementById("to-time-unit").value

  if (!value) {
    alert("Please enter a valid value")
    return
  }

  // Convert to seconds first
  const toSeconds = {
    ms: 0.001,
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    mo: 2629746,
    y: 31556952,
  }

  const fromSeconds = {
    ms: 1000,
    s: 1,
    min: 1 / 60,
    h: 1 / 3600,
    d: 1 / 86400,
    w: 1 / 604800,
    mo: 1 / 2629746,
    y: 1 / 31556952,
  }

  const seconds = value * toSeconds[fromUnit]
  const result = seconds * fromSeconds[toUnit]

  const unitNames = {
    ms: "milliseconds",
    s: "seconds",
    min: "minutes",
    h: "hours",
    d: "days",
    w: "weeks",
    mo: "months",
    y: "years",
  }

  document.getElementById("time-converted").textContent =
    `${value} ${unitNames[fromUnit]} = ${result.toFixed(6)} ${unitNames[toUnit]}`
  document.getElementById("time-result").style.display = "block"
}

function convertCurrency() {
  const amount = Number.parseFloat(document.getElementById("currency-amount").value)
  const fromCurrency = document.getElementById("from-currency").value
  const toCurrency = document.getElementById("to-currency").value

  if (!amount) {
    alert("Please enter a valid amount")
    return
  }

  // Sample exchange rates (in real app, you'd fetch from an API)
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, INR: 74, CAD: 1.25, AUD: 1.35 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, INR: 87, CAD: 1.47, AUD: 1.59 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 151, INR: 101, CAD: 1.71, AUD: 1.85 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.67, CAD: 0.011, AUD: 0.012 },
    INR: { USD: 0.014, EUR: 0.011, GBP: 0.0099, JPY: 1.49, CAD: 0.017, AUD: 0.018 },
    CAD: { USD: 0.8, EUR: 0.68, GBP: 0.58, JPY: 88, INR: 59, AUD: 1.08 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81, INR: 55, CAD: 0.93 },
  }

  let result
  if (fromCurrency === toCurrency) {
    result = amount
  } else {
    const rate = exchangeRates[fromCurrency][toCurrency] || 1
    result = amount * rate
  }

  document.getElementById("currency-converted").textContent = ` || 1;
        result = amount * rate;
    }
    
    document.getElementById('currency-converted').textContent = 
        \`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`
  document.getElementById("currency-result").style.display = "block"
}

// Initialize percentage form on load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize forms that need setup
  setTimeout(() => {
    if (document.getElementById("calc-mode")) {
      updatePercentageForm()
    }
    if (document.getElementById("shape")) {
      updateAreaForm()
    }
  }, 100)
})

// Add these functions at the end of the file

// Function to open modal with specific tab
function openModal(tabName) {
  // Open a generic modal for legal pages
  modalTitle.textContent = getTabTitle(tabName)
  calculatorContent.innerHTML = "<p>Please use the tabs above to navigate to the desired section.</p>"

  modal.style.display = "block"
  modal.classList.add("show")

  // Switch to the specified tab
  switchTab(tabName)
}

// Function to get tab titles
function getTabTitle(tabName) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    disclaimer: "Disclaimer",
    about: "About Us",
    contact: "Contact Us",
  }
  return titles[tabName] || "Information"
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to navigation links that have hash targets
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]:not([onclick])')
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

function calculateCalorie() {
  const gender = document.getElementById("gender").value
  const age = Number.parseFloat(document.getElementById("cal-age").value)
  const weight = Number.parseFloat(document.getElementById("cal-weight").value)
  const height = Number.parseFloat(document.getElementById("cal-height").value)
  const activity = Number.parseFloat(document.getElementById("activity").value)

  if (!age || !weight || !height) {
    alert("Please enter valid values")
    return
  }

  let bmr
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }

  const dailyCalories = bmr * activity

  document.getElementById("bmr-value").textContent = Math.round(bmr)
  document.getElementById("daily-calories").textContent = Math.round(dailyCalories)
  document.getElementById("calorie-result").style.display = "block"
}

function calculateGrade() {
  const totalPoints = Number.parseFloat(document.getElementById("total-points").value)
  const maxPoints = Number.parseFloat(document.getElementById("max-points").value)

  if (!totalPoints || !maxPoints) {
    alert("Please enter valid values")
    return
  }

  const percentage = (totalPoints / maxPoints) * 100
  let letterGrade

  if (percentage >= 97) letterGrade = "A+"
  else if (percentage >= 93) letterGrade = "A"
  else if (percentage >= 90) letterGrade = "A-"
  else if (percentage >= 87) letterGrade = "B+"
  else if (percentage >= 83) letterGrade = "B"
  else if (percentage >= 80) letterGrade = "B-"
  else if (percentage >= 77) letterGrade = "C+"
  else if (percentage >= 73) letterGrade = "C"
  else if (percentage >= 70) letterGrade = "C-"
  else if (percentage >= 67) letterGrade = "D+"
  else if (percentage >= 65) letterGrade = "D"
  else letterGrade = "F"

  document.getElementById("grade-percentage").textContent = percentage.toFixed(1)
  document.getElementById("letter-grade").textContent = letterGrade
  document.getElementById("grade-result").style.display = "block"
}

function calculateProfit() {
  const costPrice = Number.parseFloat(document.getElementById("cost-price").value)
  const sellingPrice = Number.parseFloat(document.getElementById("selling-price").value)

  if (!costPrice || !sellingPrice) {
    alert("Please enter valid values")
    return
  }

  const profit = sellingPrice - costPrice
  const profitMargin = (profit / sellingPrice) * 100
  const markup = (profit / costPrice) * 100

  document.getElementById("profit-amount").textContent = `$${profit.toFixed(2)}`
  document.getElementById("profit-margin").textContent = profitMargin.toFixed(2)
  document.getElementById("markup").textContent = markup.toFixed(2)
  document.getElementById("profit-result").style.display = "block"
}

function calculateTip() {
  const billAmount = Number.parseFloat(document.getElementById("bill-amount").value)
  const tipPercent = Number.parseFloat(document.getElementById("tip-percent").value)
  const peopleCount = Number.parseInt(document.getElementById("people-count").value)

  if (!billAmount || !tipPercent || !peopleCount) {
    alert("Please enter valid values")
    return
  }

  const tipAmount = (billAmount * tipPercent) / 100
  const totalBill = billAmount + tipAmount
  const perPerson = totalBill / peopleCount

  document.getElementById("tip-amount").textContent = `$${tipAmount.toFixed(2)}`
  document.getElementById("total-bill").textContent = `$${totalBill.toFixed(2)}`
  document.getElementById("per-person").textContent = `$${perPerson.toFixed(2)}`
  document.getElementById("tip-result").style.display = "block"
}

function calculateCompound() {
  const principal = Number.parseFloat(document.getElementById("principal-amount").value)
  const rate = Number.parseFloat(document.getElementById("annual-rate").value) / 100
  const frequency = Number.parseInt(document.getElementById("compound-frequency").value)
  const time = Number.parseFloat(document.getElementById("time-period").value)

  if (!principal || !rate || !time) {
    alert("Please enter valid values")
    return
  }

  const finalAmount = principal * Math.pow(1 + rate / frequency, frequency * time)
  const interestEarned = finalAmount - principal

  document.getElementById("final-amount").textContent = `$${finalAmount.toFixed(2)}`
  document.getElementById("interest-earned").textContent = `$${interestEarned.toFixed(2)}`
  document.getElementById("compound-result").style.display = "block"
}

function calculateMortgage() {
  const homePrice = Number.parseFloat(document.getElementById("home-price").value)
  const downPayment = Number.parseFloat(document.getElementById("down-payment").value)
  const rate = Number.parseFloat(document.getElementById("mortgage-rate").value) / 100 / 12
  const years = Number.parseFloat(document.getElementById("loan-years").value)

  if (!homePrice || !downPayment || !rate || !years) {
    alert("Please enter valid values")
    return
  }

  const loanAmount = homePrice - downPayment
  const numPayments = years * 12
  const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, numPayments)) / (Math.pow(1 + rate, numPayments) - 1)
  const totalPayment = monthlyPayment * numPayments
  const totalInterest = totalPayment - loanAmount

  document.getElementById("mortgage-payment").textContent = `$${monthlyPayment.toFixed(2)}`
  document.getElementById("mortgage-interest").textContent = `$${totalInterest.toFixed(2)}`
  document.getElementById("mortgage-total").textContent = `$${(totalPayment + downPayment).toFixed(2)}`
  document.getElementById("mortgage-result").style.display = "block"
}

function calculateRetirement() {
  const currentAge = Number.parseInt(document.getElementById("current-age").value)
  const retirementAge = Number.parseInt(document.getElementById("retirement-age").value)
  const currentSavings = Number.parseFloat(document.getElementById("current-savings").value)
  const monthlyContribution = Number.parseFloat(document.getElementById("monthly-contribution").value)
  const expectedReturn = Number.parseFloat(document.getElementById("expected-return").value) / 100

  if (!currentAge || !retirementAge || !currentSavings || !monthlyContribution || !expectedReturn) {
    alert("Please enter valid values")
    return
  }

  const yearsToRetirement = retirementAge - currentAge
  const monthlyReturn = expectedReturn / 12
  const totalMonths = yearsToRetirement * 12

  const futureValueCurrent = currentSavings * Math.pow(1 + expectedReturn, yearsToRetirement)
  const futureValueContributions =
    (monthlyContribution * (Math.pow(1 + monthlyReturn, totalMonths) - 1)) / monthlyReturn
  const totalAtRetirement = futureValueCurrent + futureValueContributions
  const monthlyIncome = (totalAtRetirement * 0.04) / 12

  document.getElementById("years-to-retirement").textContent = yearsToRetirement
  document.getElementById("retirement-total").textContent = `$${totalAtRetirement.toFixed(2)}`
  document.getElementById("monthly-income").textContent = `$${monthlyIncome.toFixed(2)}`
  document.getElementById("retirement-result").style.display = "block"
}

function calculateInvestment() {
  const initialInvestment = Number.parseFloat(document.getElementById("initial-investment").value)
  const monthlyInvestment = Number.parseFloat(document.getElementById("monthly-investment").value)
  const annualReturn = Number.parseFloat(document.getElementById("investment-return").value) / 100
  const years = Number.parseFloat(document.getElementById("investment-years").value)

  if (!initialInvestment || !monthlyInvestment || !annualReturn || !years) {
    alert("Please enter valid values")
    return
  }

  const monthlyReturn = annualReturn / 12
  const totalMonths = years * 12
  const totalInvested = initialInvestment + monthlyInvestment * totalMonths

  const futureValueInitial = initialInvestment * Math.pow(1 + annualReturn, years)
  const futureValueMonthly = (monthlyInvestment * (Math.pow(1 + monthlyReturn, totalMonths) - 1)) / monthlyReturn
  const finalValue = futureValueInitial + futureValueMonthly
  const totalGain = finalValue - totalInvested

  document.getElementById("total-invested").textContent = `$${totalInvested.toFixed(2)}`
  document.getElementById("investment-value").textContent = `$${finalValue.toFixed(2)}`
  document.getElementById("investment-gain").textContent = `$${totalGain.toFixed(2)}`
  document.getElementById("investment-result").style.display = "block"
}

function calculateTax() {
  const income = Number.parseFloat(document.getElementById("annual-income").value)
  const deductions = Number.parseFloat(document.getElementById("deductions").value)

  if (!income || !deductions) {
    alert("Please enter valid values")
    return
  }

  const taxableIncome = Math.max(0, income - deductions)
  let federalTax = 0

  // Simplified tax brackets for demonstration
  if (taxableIncome > 0) {
    if (taxableIncome <= 10275) {
      federalTax = taxableIncome * 0.1
    } else if (taxableIncome <= 41775) {
      federalTax = 1027.5 + (taxableIncome - 10275) * 0.12
    } else if (taxableIncome <= 89450) {
      federalTax = 4807.5 + (taxableIncome - 41775) * 0.22
    } else {
      federalTax = 15213.5 + (taxableIncome - 89450) * 0.24
    }
  }

  const afterTaxIncome = income - federalTax

  document.getElementById("taxable-income").textContent = `$${taxableIncome.toFixed(2)}`
  document.getElementById("federal-tax").textContent = `$${federalTax.toFixed(2)}`
  document.getElementById("after-tax-income").textContent = `$${afterTaxIncome.toFixed(2)}`
  document.getElementById("tax-result").style.display = "block"
}

function calculateLease() {
  const carPrice = Number.parseFloat(document.getElementById("car-price").value)
  const residualPercent = Number.parseFloat(document.getElementById("residual-value").value) / 100
  const leaseTerm = Number.parseInt(document.getElementById("lease-term").value)
  const moneyFactor = Number.parseFloat(document.getElementById("money-factor").value)
  const downPayment = Number.parseFloat(document.getElementById("down-payment-lease").value) || 0

  if (!carPrice || !residualPercent || !leaseTerm || !moneyFactor) {
    alert("Please enter valid values")
    return
  }

  const residualValue = carPrice * residualPercent
  const depreciation = (carPrice - residualValue) / leaseTerm
  const financeCharge = (carPrice + residualValue) * moneyFactor
  const monthlyPayment = depreciation + financeCharge
  const totalLeaseCost = monthlyPayment * leaseTerm + downPayment

  document.getElementById("lease-payment").textContent = `$${monthlyPayment.toFixed(2)}`
  document.getElementById("total-lease-cost").textContent = `$${totalLeaseCost.toFixed(2)}`
  document.getElementById("depreciation").textContent = `$${(carPrice - residualValue).toFixed(2)}`
  document.getElementById("lease-result").style.display = "block"
}

function updateUnitOptions() {
  const category = document.getElementById("unit-category").value
  const fromSelect = document.getElementById("from-unit-type")
  const toSelect = document.getElementById("to-unit-type")

  const options = {
    length: [
      { value: "m", text: "Meter" },
      { value: "cm", text: "Centimeter" },
      { value: "ft", text: "Foot" },
      { value: "in", text: "Inch" },
    ],
    weight: [
      { value: "kg", text: "Kilogram" },
      { value: "g", text: "Gram" },
      { value: "lb", text: "Pound" },
      { value: "oz", text: "Ounce" },
    ],
    temperature: [
      { value: "c", text: "Celsius" },
      { value: "f", text: "Fahrenheit" },
      { value: "k", text: "Kelvin" },
    ],
  }

  const categoryOptions = options[category] || options.length

  fromSelect.innerHTML = ""
  toSelect.innerHTML = ""

  categoryOptions.forEach((option) => {
    fromSelect.innerHTML += `<option value="${option.value}">${option.text}</option>`
    toSelect.innerHTML += `<option value="${option.value}">${option.text}</option>`
  })
}

function convertUnit() {
  const value = Number.parseFloat(document.getElementById("unit-value").value)
  const category = document.getElementById("unit-category").value
  const fromUnit = document.getElementById("from-unit-type").value
  const toUnit = document.getElementById("to-unit-type").value

  if (!value) {
    alert("Please enter a valid value")
    return
  }

  let result = value

  // Simple conversion logic (expand as needed)
  if (category === "length") {
    const conversions = { m: 1, cm: 0.01, ft: 0.3048, in: 0.0254 }
    result = (value * conversions[fromUnit]) / conversions[toUnit]
  }

  document.getElementById("unit-converted").textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`
  document.getElementById("unit-result").style.display = "block"
}

function clearSci() {
  document.getElementById("sci-display").value = ""
}

function appendSci(value) {
  document.getElementById("sci-display").value += value
}

function calculateSci() {
  try {
    const result = eval(document.getElementById("sci-display").value)
    document.getElementById("sci-display").value = result
  } catch (error) {
    document.getElementById("sci-display").value = "Error"
  }
}

function convertNumber() {
  const inputType = document.getElementById("number-system").value
  const inputNumber = document.getElementById("input-number").value

  if (!inputNumber) {
    alert("Please enter a number")
    return
  }

  let decimal

  try {
    switch (inputType) {
      case "decimal":
        decimal = Number.parseInt(inputNumber, 10)
        break
      case "binary":
        decimal = Number.parseInt(inputNumber, 2)
        break
      case "hexadecimal":
        decimal = Number.parseInt(inputNumber, 16)
        break
      case "octal":
        decimal = Number.parseInt(inputNumber, 8)
        break
    }

    document.getElementById("decimal-result").textContent = decimal
    document.getElementById("binary-result-val").textContent = decimal.toString(2)
    document.getElementById("hex-result").textContent = decimal.toString(16).toUpperCase()
    document.getElementById("octal-result").textContent = decimal.toString(8)
    document.getElementById("binary-result").style.display = "block"
  } catch (error) {
    alert("Invalid number format")
  }
}

function addCourse() {
  const container = document.getElementById("courses-container")
  const courseCount = container.children.length + 1

  const courseEntry = document.createElement("div")
  courseEntry.className = "course-entry"
  courseEntry.innerHTML = `
    <div class="calc-group">
      <label>Course ${courseCount}:</label>
      <input type="text" placeholder="Course name" class="course-name">
      <input type="number" placeholder="Credits" class="course-credits">
      <select class="course-grade">
        <option value="4.0">A (4.0)</option>
        <option value="3.7">A- (3.7)</option>
        <option value="3.3">B+ (3.3)</option>
        <option value="3.0">B (3.0)</option>
        <option value="2.7">B- (2.7)</option>
        <option value="2.3">C+ (2.3)</option>
        <option value="2.0">C (2.0)</option>
        <option value="1.7">C- (1.7)</option>
        <option value="1.3">D+ (1.3)</option>
        <option value="1.0">D (1.0)</option>
        <option value="0.0">F (0.0)</option>
      </select>
    </div>
  `

  container.appendChild(courseEntry)
}

function calculateGPA() {
  const courses = document.querySelectorAll(".course-entry")
  let totalCredits = 0
  let totalPoints = 0

  courses.forEach((course) => {
    const credits = Number.parseFloat(course.querySelector(".course-credits").value)
    const grade = Number.parseFloat(course.querySelector(".course-grade").value)

    if (credits && grade >= 0) {
      totalCredits += credits
      totalPoints += credits * grade
    }
  })

  if (totalCredits === 0) {
    alert("Please enter valid course information")
    return
  }

  const gpa = totalPoints / totalCredits

  document.getElementById("total-credits").textContent = totalCredits
  document.getElementById("calculated-gpa").textContent = gpa.toFixed(2)
  document.getElementById("gpa-result").style.display = "block"
}

function calculateBodyFat() {
  const gender = document.getElementById("bf-gender").value
  const age = Number.parseFloat(document.getElementById("bf-age").value)
  const height = Number.parseFloat(document.getElementById("bf-height").value)
  const weight = Number.parseFloat(document.getElementById("bf-weight").value)
  const waist = Number.parseFloat(document.getElementById("waist").value)
  const neck = Number.parseFloat(document.getElementById("neck").value)
  const hip = Number.parseFloat(document.getElementById("hip").value) || 0

  if (!age || !height || !weight || !waist || !neck) {
    alert("Please enter valid measurements")
    return
  }

  let bodyFatPercentage

  if (gender === "male") {
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
  } else {
    if (!hip) {
      alert("Please enter hip measurement for female calculation")
      return
    }
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
  }

  let category
  if (gender === "male") {
    if (bodyFatPercentage < 6) category = "Essential Fat"
    else if (bodyFatPercentage < 14) category = "Athletes"
    else if (bodyFatPercentage < 18) category = "Fitness"
    else if (bodyFatPercentage < 25) category = "Average"
    else category = "Obese"
  } else {
    if (bodyFatPercentage < 14) category = "Essential Fat"
    else if (bodyFatPercentage < 21) category = "Athletes"
    else if (bodyFatPercentage < 25) category = "Fitness"
    else if (bodyFatPercentage < 32) category = "Average"
    else category = "Obese"
  }

  document.getElementById("body-fat-percentage").textContent = bodyFatPercentage.toFixed(1)
  document.getElementById("body-fat-category").textContent = category
  document.getElementById("body-fat-result").style.display = "block"
}

// Show/hide hip measurement based on gender selection
document.addEventListener("DOMContentLoaded", () => {
  const genderSelect = document.getElementById("bf-gender")
  if (genderSelect) {
    genderSelect.addEventListener("change", function () {
      const hipGroup = document.getElementById("hip-group")
      if (this.value === "female") {
        hipGroup.style.display = "block"
      } else {
        hipGroup.style.display = "none"
      }
    })
  }
})
