const pizzas = document.getElementById("pizzas");
const weight = document.getElementById("weight");
const hydration = document.getElementById("hydration");
const salt = document.getElementById("salt");

const flourOut = document.getElementById("flour");
const waterOut = document.getElementById("water");
const saltOut = document.getElementById("saltResult");
const totalOut = document.getElementById("total");

// ======================
// REFERENZREZEPT
// ======================

const BASE_PIZZAS = 4;
const BASE_WEIGHT = 280;

const BASE_FLOUR = 668;
const BASE_WATER = 436;
const BASE_SALT = 20;
const BASE_YEAST = 2;

const BASE_TOTAL =
    BASE_FLOUR +
    BASE_WATER +
    BASE_SALT +
    BASE_YEAST;

// Differenz zwischen 4x280g und dem Referenzteig
const OFFSET = BASE_TOTAL - (BASE_PIZZAS * BASE_WEIGHT);

// ======================

function calculate() {

    const enteredTotal =
        Number(pizzas.value) *
        Number(weight.value);

    // intern mit Referenzgewicht rechnen
    const calculationWeight =
        enteredTotal + OFFSET;

    const factor =
        calculationWeight / BASE_TOTAL;

    // Mehl aus Referenz
    const flour =
        BASE_FLOUR * factor;

    // Wasser nach gewünschter Hydration
    const water =
        flour * (Number(hydration.value) / 100);

    // Salz nach gewünschtem %
    const saltGram =
        flour * (Number(salt.value) / 100);

    flourOut.textContent =
        flour.toFixed(1) + " g";

    waterOut.textContent =
        water.toFixed(1) + " g";

    saltOut.textContent =
        saltGram.toFixed(1) + " g";

    // Benutzer soll sein eingegebenes Gewicht sehen
    totalOut.textContent =
        enteredTotal.toFixed(1) + " g";
}

calculate();

[pizzas, weight, hydration, salt].forEach(input => {
    input.addEventListener("input", calculate);
});
