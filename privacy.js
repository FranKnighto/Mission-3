/* Privacy Feature */

let amountsHidden = false;

export function updatePrivateText(element, text) {
  element.dataset.visibleText = text;
  element.textContent = amountsHidden ? "***" : text;
}

export function getPrivateInputValue(id) {
  const input = document.getElementById(id);
  return amountsHidden ? input.dataset.actualValue || "" : input.value;
}

export function setupPrivacyToggle(inputIds, outputIds) {
  const toggleBtn = document.getElementById("toggleVisibilityBtn");
  const icon = document.getElementById("visibilityIcon");

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

}
