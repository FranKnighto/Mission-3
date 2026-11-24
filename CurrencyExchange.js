
/* Currency Exchange Module */

import { updatePrivateText } from "./privacy.js";

export function formatMoney(number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function setupCurrencyExchange(getBalanceInfo) {

  const toCurrency = document.getElementById("toCurrency");
  const conversionResult = document.getElementById("conversionResult");

  document.getElementById("convertBtn").addEventListener("click", exchangeCurrency);

  async function exchangeCurrency() {

    const { balance, currency: inputCurr } = getBalanceInfo();
    const outputCurr = toCurrency.value;

    if (balance === null) {
      updatePrivateText(conversionResult,"Please calculate your net balance first.");
      return;
    }

    if (inputCurr === outputCurr) {
      updatePrivateText(conversionResult,`${outputCurr} ${formatMoney(balance)}`);
      return;
    }

    try {
      const response = await fetch(`https://api.frankfurter.dev/v2/rate/${inputCurr}/${outputCurr}`);
      if (!response.ok) {
        throw new Error("Unable to retrieve exchange rate.");
      }

      const data = await response.json();
      if (!Number.isFinite(data.rate)) {
        throw new Error("Invalid exchange rate received.");
      }

      updatePrivateText(
        conversionResult,
        `${inputCurr} ${formatMoney(balance)} = ${outputCurr} ${formatMoney(balance * data.rate)}`
      );

    } catch {
      updatePrivateText(
        conversionResult,
        "Unable to retrieve exchange rate. Please try again."
      );

    }

  }

}
