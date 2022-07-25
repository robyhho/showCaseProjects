let bill = document.querySelector(".bill-input");
const tip_btns = document.querySelectorAll(".tip-btn");
const custom_tip_section = document.querySelector(".custom-tip-section");
const custom_tip_input = document.querySelector("#custom-section-input");
const custom_tip_section_btn = document.querySelector(".custom-section-btn");
const people_input = document.querySelector(".people-input");
const calc_btn = document.querySelector(".calc");
const reset_btn = document.querySelector(".reset");
const tip_per_person = document.querySelector("#tip-per-person");
const cost_per_person = document.querySelector("#cost-per-person");

let tip_percent = 0;

function removeHighlightBtns() {
  for (let j = 0; j < tip_btns.length; j++) {
    if (tip_btns[j].classList.contains("highlight-btn")) {
      tip_btns[j].classList.remove("highlight-btn");
    }
  }
}

function setUp() {
  //Setup event listeners on the Tip Buttons
  custom_tip_section_btn.addEventListener("click", () => {
    tip_percent = custom_tip_input.value;
    for (let i = 0; i < tip_btns.length; i++) {
      tip_btns[i].classList.remove("visually-hidden");
    }
    custom_tip_section.classList.add("visually-hidden");
    calculateCosts();
  });

  bill.addEventListener("keyup", calculateCosts);
  people_input.addEventListener("keyup", calculateCosts);
  reset_btn.addEventListener("click", () => {
    resetCalculator();
  });

  for (let i = 0; i < tip_btns.length; i++) {
    tip_btns[i].addEventListener("click", () => {
      removeHighlightBtns();
      tip_btns[i].classList.add("highlight-btn");
      tip_percent = tip_btns[i].textContent.replace("%", "");
      calculateCosts();
      if (tip_percent == "Custom") {
        displayCustomTipAmountSection();
        return;
      }
    });
  }
}

function resetCalculator() {
  bill.value = "";
  tip_percent = 0;
  people_input.value = "";
  removeHighlightBtns();
  tip_per_person.textContent = `$0.00`;
  cost_per_person.textContent = `$0.00`;
}

function calculateTipAmount(bill, tip) {
  return +bill * (+tip / 100);
}

function checkCustomSectionInput() {
  if (custom_tip_input.value === "") {
    custom_tip_section_btn.disabled = true;
  } else {
    custom_tip_section_btn.disabled = false;
  }
}

function displayCustomTipAmountSection() {
  for (let i = 0; i < tip_btns.length; i++) {
    tip_btns[i].classList.add("visually-hidden");
    custom_tip_section.classList.remove("visually-hidden");
  }
}

function calculateCosts() {
  let totalCost = +bill.value + calculateTipAmount(bill.value, tip_percent);
  let tipPerPerson =
    calculateTipAmount(bill.value, tip_percent) / people_input.value;
  let totalPerPerson = +totalCost / +people_input.value;

  tip_per_person.textContent = `$${Math.round(tipPerPerson * 100) / 100}`;
  cost_per_person.textContent = `$${Math.round(totalPerPerson * 100) / 100}`;
}

setUp();
