const recipe = document.getElementById("recipe");
const recipeName = document.getElementById("recipeName");
const saveRecipe = document.getElementById("saveRecipe");

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

const BASE_PIZZAS = 4;
const BASE_WEIGHT = 280;
const BASE_FLOUR = 668;
const BASE_WATER = 436;
const BASE_SALT = 20;
const BASE_YEAST = 2;
const BASE_TOTAL = 1126;

const OFFSET = BASE_TOTAL - (BASE_PIZZAS * BASE_WEIGHT);

function loadStandardRecipe() {
    pizzas.value = 4;
    weight.value = 280;
    hydration.value = 65;
    salt.value = 3;
    yeastType.value = "fresh";
    hours.value = 24;
    temperature.value = 20;
    calculate();
}

function calculate() {

    const enteredTotal = Number(pizzas.value) * Number(weight.value);
    const calculationTotal = enteredTotal + OFFSET;
    const factor = calculationTotal / BASE_TOTAL;

    const flour = BASE_FLOUR * factor;

    const water =
        Number(hydration.value) === 65
            ? BASE_WATER * factor
            : flour * Number(hydration.value) / 100;

    const saltGram =
        Number(salt.value) === 3
            ? BASE_SALT * factor
            : flour * Number(salt.value) / 100;

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

function loadRecipes() {

    while (recipe.options.length > 2) {
        recipe.remove(2);
    }

    const recipes =
        JSON.parse(localStorage.getItem("pizzaRecipes")) || [];

    recipes.forEach(r => {

        const option = document.createElement("option");
        option.value = r.name;
        option.textContent = "🍕 " + r.name;

        recipe.appendChild(option);

    });

}

saveRecipe.addEventListener("click", () => {

    if (recipeName.value.trim() === "") {
        alert("Bitte einen Rezeptnamen eingeben.");
        return;
    }

    const recipes =
        JSON.parse(localStorage.getItem("pizzaRecipes")) || [];

    recipes.push({

        name: recipeName.value,

        pizzas: pizzas.value,
        weight: weight.value,
        hydration: hydration.value,
        salt: salt.value,
        yeastType: yeastType.value,
        hours: hours.value,
        temperature: temperature.value

    });

    localStorage.setItem(
        "pizzaRecipes",
        JSON.stringify(recipes)
    );

    loadRecipes();

    recipe.value = recipeName.value;

    alert("Rezept gespeichert.");

});

recipe.addEventListener("change", () => {

    if (recipe.value === "standard") {

        loadStandardRecipe();
        return;

    }

    if (recipe.value === "custom") {
        return;
    }

    const recipes =
        JSON.parse(localStorage.getItem("pizzaRecipes")) || [];

    const r =
        recipes.find(x => x.name === recipe.value);

    if (!r) return;

    pizzas.value = r.pizzas;
    weight.value = r.weight;
    hydration.value = r.hydration;
    salt.value = r.salt;
    yeastType.value = r.yeastType;
    hours.value = r.hours;
    temperature.value = r.temperature;

    calculate();

});

[
    pizzas,
    weight,
    hydration,
    salt,
    yeastType,
    hours,
    temperature
].forEach(i => {

    i.addEventListener("input", calculate);
    i.addEventListener("change", calculate);

});

loadRecipes();
loadStandardRecipe();
