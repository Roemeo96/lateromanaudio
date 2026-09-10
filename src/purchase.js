export function initializePurchaseControls() {
  const quantityInput = document.querySelector(
    "#weltgeist-quantity",
  );

  const addToCartButton = document.querySelector(
    "#weltgeist-add-to-cart",
  );

  if (!quantityInput || !addToCartButton) {
    return;
  }

  const updateCartQuantity = () => {
    const minimum = Number(quantityInput.min) || 1;
    const maximum = Number(quantityInput.max) || Infinity;

    const enteredQuantity = Number.parseInt(
      quantityInput.value,
      10,
    );

    const validQuantity = Number.isFinite(enteredQuantity)
      ? Math.min(
          maximum,
          Math.max(minimum, enteredQuantity),
        )
      : minimum;

    quantityInput.value =
      String(validQuantity);

    addToCartButton.dataset.itemQuantity =
      String(validQuantity);
  };

  quantityInput.addEventListener(
    "input",
    updateCartQuantity,
  );

  quantityInput.addEventListener(
    "change",
    updateCartQuantity,
  );

  updateCartQuantity();
}