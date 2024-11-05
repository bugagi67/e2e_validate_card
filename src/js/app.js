export function validateLuhn(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function detectCardType(cardNumber) {
  const patterns = {
    visa: /^4\d{12}(\d{3})?(\d{3})?$/,
    master:
      /^(5[1-5]\d{14}|2(2[2-9]\d{2}|[3-6]\d{3}|7[01]\d{2}|720\d{2})\d{10})$/,
    amex: /^3[47]\d{13}$/,
    mir: /^220[0-4]/,
    discover:
      /^(6011|65\d{2}|64[4-9]\d|622(1[2-9]|[2-8]\d|9[01])\d{3})\d{10,16}$/,
    jcb: /^(352[8-9]|35[3-8]\d)\d{12,19}$/,
    diners_club: /^(30[0-5]|36|38)\d{11}$/,
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return key;
    }
  }
}

export function disabledImage(arrImage, type) {
  const arr = Array.from(arrImage);
  arr.filter((image) => {
    if (!image.classList.contains(type)) {
      image.style.opacity = "0.3";
    }
  });
}

export function activeImage(arrImage) {
  arrImage.forEach((image) => (image.style.opacity = "1"));
}
