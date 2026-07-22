const recipe = document.getElementById("recipe");

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
const BASE_PIZZAS = 4;
const BASE_WEIGHT = 280;
const BASE_FLOUR = 668;
const BASE_WATER = 436;
const BASE_SALT = 20;
const BASE_YEAST = 2;
const BASE_TOTAL = 1126;

const OFFSET = BASE_TOTAL - (BASE_PIZZAS * BASE_WEIGHT);

function loadStandardRecipe() {
    pizzas.value = BASE_PIZZAS;
    weight.value = BASE_WEIGHT;
    hydration.value = 65;
    salt.value = 3;
    yeastType.value = "fresh";
    hours.value = 24;
    temperature.value = 20;

    calculate();
}

function calculate() {

    const enteredTotal =
        Number(pizzas.value) *
        Number(weight.value);

    const calculationTotal =
        enteredTotal + OFFSET;

    const factor =
        calculationTotal / BASE_TOTAL;

    const flour = BASE_FLOUR * factor;

    let water;
    if (Number(hydration.value) === 65) {
        water = BASE_WATER * factor;
    } else {
        water = flour * (Number(hydration.value) / 100);
    }

    let saltGram;
    if (Number(salt.value) === 3) {
        saltGram = BASE_SALT * factor;
    } else {
        saltGram = flour * (Number(salt.value) / 100);
    }

    let yeast = BASE_YEAST * factor;

    yeast *= 24 / Number(hours.value);
    yeast *= Math.pow(1.08, Number(temperature.value) - 20);

    if (yeastType.value === "dry") {
        yeast /= 3;
    }

    flourOut.textContent = Math.round(flour) + " g";
    waterOut.textContent = Math.round(water) + " ml";
    saltOut.textContent = Math.round(saltGram) + " g";
    yeastOut.textContent = Math.round(yeast) + " g";
    totalOut.textContent = Math.round(enteredTotal) + " g";
}

function recipeChanged() {
    if (recipe.value === "standard") {
        loadStandardRecipe();
    } else {
        calculate();
    }
}

recipe.addEventListener("change", recipeChanged);
recipe.addEventListener("input", recipeChanged);

[
    pizzas,
    weight,
    hydration,
    salt,
    yeastType,
    hours,
    temperature
].forEach(input => {
    input.addEventListener("input", calculate);
    input.addEventListener("change", calculate);
});

// Standardrezept beim Start laden
loadStandardRecipe();
