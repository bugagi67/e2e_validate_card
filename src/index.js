import "./js/app";
import "./css/style.css";
import {
  detectCardType,
  disabledImage,
  activeImage,
  validateLuhn,
} from "./js/app";

const inputNumberCard = document.querySelector(".input_card_number");
const imageCards = document.querySelectorAll(".card");
const btn = document.querySelector(".button_valid");

async function main() {
  const cardNumber = inputNumberCard;
  btn.addEventListener("click", () => {
    activeImage(imageCards);
    if (validateLuhn(cardNumber.value)) {
      const type = detectCardType(cardNumber.value);
      disabledImage(imageCards, type);
    }
  });
}

main();
