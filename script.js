const pizzas = document.getElementById("pizzas");
const weight = document.getElementById("weight");
const hydration = document.getElementById("hydration");
const salt = document.getElementById("salt");

const flourOut = document.getElementById("flour");
const waterOut = document.getElementById("water");
const saltOut = document.getElementById("saltResult");
const totalOut = document.getElementById("total");

// Referenzrezept
const BASE_FLOUR = 668;
const BASE_WATER = 436;
const BASE_SALT = 20;
const BASE_YEAST = 2;
const BASE_TOTAL = BASE_FLOUR + BASE_WATER + BASE_SALT + BASE_YEAST;

function calculate() {

    const totalWeight =
        Number(pizzas.value) *
        Number(weight.value);

    const factor = totalWeight / BASE_TOTAL;

    let flour = BASE_FLOUR * factor;

    // Hydration anpassen
    let water = flour * (Number(hydration.value) / 100);

    // Salz anpassen
    let saltGram = flour * (Number(salt.value) / 100);

    flourOut.textContent =
        flour.toFixed(1) + " g";

    waterOut.textContent =
        water.toFixed(1) + " g";

    saltOut.textContent =
        saltGram.toFixed(1) + " g";

    totalOut.textContent =
        totalWeight.toFixed(1) + " g";
}

calculate();

[pizzas, weight, hydration, salt].forEach(el=>{
    el.addEventListener("input", calculate);
});
