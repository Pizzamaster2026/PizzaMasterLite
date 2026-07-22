const pizzas = document.getElementById("pizzas");
const weight = document.getElementById("weight");
const hydration = document.getElementById("hydration");
const salt = document.getElementById("salt");

const flourOut = document.getElementById("flour");
const waterOut = document.getElementById("water");
const saltOut = document.getElementById("saltResult");
const totalOut = document.getElementById("total");

function calculate() {

    const total = Number(pizzas.value) * Number(weight.value);
    const hyd = Number(hydration.value) / 100;
    const saltPct = Number(salt.value) / 100;

    const flour = total / (1 + hyd + saltPct);
    const water = flour * hyd;
    const saltGr = flour * saltPct;

    flourOut.textContent = flour.toFixed(1) + " g";
    waterOut.textContent = water.toFixed(1) + " g";
    saltOut.textContent = saltGr.toFixed(1) + " g";
    totalOut.textContent = total.toFixed(1) + " g";
}

calculate();

[pizzas, weight, hydration, salt].forEach(input => {
    input.addEventListener("input", calculate);
});
