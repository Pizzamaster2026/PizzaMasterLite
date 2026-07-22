const pizzas = document.getElementById("pizzas");
const weight = document.getElementById("weight");
const hydration = document.getElementById("hydration");
const salt = document.getElementById("salt");
const yeastType = document.getElementById("yeastType");
const hours = document.getElementById("hours");
const temperature = document.getElementById("temperature");

const flourOut = document.getElementById("flour");
const waterOut = document.getElementById("water");
const saltOut = document.getElementById("saltResult");
const yeastOut = document.getElementById("yeast");
const totalOut = document.getElementById("total");

// Referenzrezept
const BASE_FLOUR = 668;
const BASE_WATER = 436;
const BASE_SALT = 20;
const BASE_YEAST = 2;

const BASE_TOTAL = 1126;
const BASE_PIZZAS = 4;
const BASE_WEIGHT = 280;

const OFFSET = BASE_TOTAL - (BASE_PIZZAS * BASE_WEIGHT);

function calculate() {

    const enteredTotal =
        Number(pizzas.value) * Number(weight.value);

    const calculationTotal =
        enteredTotal + OFFSET;

    const factor =
        calculationTotal / BASE_TOTAL;

    const flour =
        BASE_FLOUR * factor;

    const water =
        flour * (Number(hydration.value) / 100);

    const saltGram =
        flour * (Number(salt.value) / 100);

    // Referenz:
    // 2 g Frischhefe
    // 24 Stunden
    // 20°C

    let yeast =
        BASE_YEAST * factor;

    // Gärzeit
    yeast *= 24 / Number(hours.value);

    // Temperatur
    yeast *= Math.pow(1.08, Number(temperature.value) - 20);

    // Trockenhefe
    if (yeastType.value === "dry") {
        yeast /= 3;
    }

    flourOut.textContent = flour.toFixed(1) + " g";
    waterOut.textContent = water.toFixed(1) + " g";
    saltOut.textContent = saltGram.toFixed(1) + " g";
    yeastOut.textContent = yeast.toFixed(1) + " g";
    totalOut.textContent = enteredTotal.toFixed(1) + " g";
}

calculate();

[
    pizzas,
    weight,
    hydration,
    salt,
    yeastType,
    hours,
    temperature
].forEach(el => {
    el.addEventListener("input", calculate);
});
