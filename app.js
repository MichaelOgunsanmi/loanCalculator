//UI Variables

const loanAmount = document.getElementById('amount')
const interest = document.getElementById('interest')
const yearsToPay = document.getElementById('years')
const calculate = document.getElementById('loan-form')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')
const results = document.getElementById('results')
const loader = document.getElementById('loading')

loadEventListeners()

function loadEventListeners() {
  calculate.addEventListener('submit', PreCalculateResults)
  
}

function PreCalculateResults(e) {
  results.style.display = 'none'
  loader.style.display = 'block'
  setTimeout(calculateResults, 2000)
  e.preventDefault()
}

function calculateResults() {
  const principal = parseFloat(loanAmount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(yearsToPay.value) * 12

  // Monthly Payments
  const x = Math.pow(1 + calculatedInterest , calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x-1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
    results.style.display = 'block'
    loader.style.display = 'none'
  } else {
    showError('Please check your numbers')
  }

}

function showError(error) {
  results.style.display = 'none'
  loader.style.display = 'none'

  const errorDiv = document.createElement('div')
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  errorDiv.className = 'alert alert-danger'
  errorDiv.appendChild(document.createTextNode(error))
  card.insertBefore(errorDiv, heading)
  setTimeout(clearError, 2000)
  
}

function clearError() {
  document.querySelector('.alert').remove()
  
}