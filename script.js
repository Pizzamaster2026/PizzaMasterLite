const pizzas = document.getElementById("pizzas");
const weight = document.getElementById("weight");
const hydration = document.getElementById("hydration");
const salt = document.getElementById("salt");

const flour = document.getElementById("flour");
const water = document.getElementById("water");
const saltResult = document.getElementById("saltResult");
const total = document.getElementById("total");

function calculate() {

    const dough = Number(pizzas.value) * Number(weight.value);

    total.textContent = dough.toFixed(0) + " g";

}

calculate();

pizzas.addEventListener("input", calculate);
weight.addEventListener("input", calculate);
hydration.addEventListener("input", calculate);
salt.addEventListener("input", calculate);
