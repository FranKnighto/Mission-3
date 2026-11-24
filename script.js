/* Ledger Balance System */

import User from './user.js'

import {
  setupPrivacyToggle,
  updatePrivateText,
  getPrivateInputValue
} from "./privacy.js";

import { setupCurrencyExchange, formatMoney } from "./CurrencyExchange.js";

const person = new User("Muhamad Abu Bakar", "Bin Rashid");
document.getElementById("greeting").textContent = `Welcome, ${person.fullname}!`;

const fromCurrency = document.getElementById("fromCurrency");
const result = document.getElementById("result");
const conversionResult = document.getElementById("conversionResult");

const expenses = ["food", "rent", "others", "saving"];
const inputIds = ["salary", ...expenses];
const outputIds = ["result", "conversionResult"];

const errorMsg = document.getElementById('error-msg');

inputIds.forEach(id => document.getElementById(id).addEventListener("beforeinput",(event) => {
  if (event.data && !/^[0-9]+$/.test(event.data)){
    event.preventDefault();
    errorMsg.style.display = 'inline'
  }else{
    errorMsg.style.display = 'none'
  }
}))

let balance = null;

function getAmount (id) {
  return Number(getPrivateInputValue(id)) || 0;
}

function calculate() {
  const salary = getAmount("salary");

  let totalExpenses = 0
  for (let i = 0; i < expenses.length; i++) {
    const value = getAmount(expenses[i]);
    totalExpenses += value;
  }

  balance = salary - totalExpenses;

  let percent = "N/A";
  if (salary !== 0) {
    percent = ((balance / salary) * 100).toFixed(2) + "%";
  }

  updatePrivateText(
    result, 
    `Net Balance: ${fromCurrency.value} ${formatMoney(balance)} (${percent} of income)`);

  result.className = balance >= 0
    ? "text-success fw-bold"
    : "text-danger fw-bold";
}

function resetResults() {
  balance = null;
  updatePrivateText(result, "");
  updatePrivateText(conversionResult, "");
}

document.getElementById("calcBtn").addEventListener("click", calculate);
inputIds.forEach(id => document.getElementById(id).addEventListener("input", resetResults));
fromCurrency.addEventListener("change", resetResults);

setupPrivacyToggle(inputIds, outputIds);

setupCurrencyExchange(() => ({
  balance,
  currency: fromCurrency.value
}));
  


