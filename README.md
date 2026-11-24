# Ledger Balance System

Ledger Balance System is a simple budgeting tool for allocating the salary of the user on the daily expenses and saving goals. Any remaining balance can be converted into a foreign currency for other purposes (such as travelling or investment).

## How to Use the Calculator & Currency Exchange

1. User can input his or her salary, food expenses, rental, others and saving goals (all in positive value).
2. Click on the button "Calculate Net Balance".
3. The calculator tool will calculate the net balance with the percentage of the balance over the salary.
    - if the balance shows in **green**, the disposable income of the user has surplus!
    - if the balance shows in **red**, the disposable income of the user is in deficit and user is encourage to improve his or her personal finances.
4. With the calculated Net Balance, user can then select the input currency (From) and output currency (To) and click on the button "Convert Net Balance".
5. The system will then using API requesting the exchange rate data and convert the net balance into the foreign currency.

## Extra feature: Privacy using bi-eye (Source Bootstrap Icon)

1. It is a sensitive topic when we talk about finances and money.
2. This tool is enchanced with a hide/unhide button using bi-eye locating at the top right of the webpage.
3. When the bi-eye is open, it stated that the numbers are revealed.
4. Click on the bi-eye, it will turned into bi-eye-slashed. All the numbers and results will be masked by ***
5. Click again on the bi-eye-slashed, all the numbesr and results will now revealed again!

Below are the magic of this feature:-

```
toggleBtn.addEventListener("click", () => {
    amountsHidden = !amountsHidden;

    inputIds.forEach(id => {
      const input = document.getElementById(id);

      if (amountsHidden) {
        input.dataset.actualValue = input.value;
        input.type = "text";
        input.value = "***";
      } else {
        input.type = "number";
        input.value = input.dataset.actualValue || "";
      }
      input.readOnly = amountsHidden;
    });

    outputIds.forEach(id => {
      const element = document.getElementById(id);
      element.textContent = amountsHidden ? "***" : element.dataset.visibleText || "";
    });

    const label = amountsHidden ? "Show amounts" : "Hide amounts";
    icon.className = amountsHidden ? "bi bi-eye-slash" : "bi bi-eye";
    toggleBtn.title = label;
  });
```

**Copy right (c) 2026**
This is solely for education purpose only. All rights to the original content, images, or any proprietary rights belong to their respective copyright owners. 