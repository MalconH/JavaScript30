const cities = [];

function populateCities() {
  const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  // If it doesn't exist in local storage
  if (!localStorage.getItem("cities")) {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        cities.push(...data);
        // save to local storage
        localStorage.setItem("cities", JSON.stringify(cities));
      });
  } else {
    // retrieve from local storage
    const data = JSON.parse(localStorage.getItem("cities"));
    cities.push(...data);
  }
}

function matchCities(wordToMatch, cities) {
  const cityRegex = new RegExp(wordToMatch, "i");
  const matches = cities.filter((cityObj) => {
    // check for coincidence in either city name or state name
    return cityRegex.test(cityObj.city) || cityRegex.test(cityObj.state);
  });

  return matches;
}

function showDefaultSuggestions() {
  const $suggestions = document.querySelector(".suggestions");
  $suggestions.innerHTML = `
    <li>Filter for a city</li>
    <li>or a state</li>`;
}

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

function showMatches() {
  const userInput = this.value; // this => input.search

  // Without this, it will match all the cities
  if (!userInput) {
    showDefaultSuggestions();
    return;
  }
  const $suggestions = document.querySelector(".suggestions");

  const places = matchCities(userInput, cities);

  const html = places
    .map((place) => {
      // Create a regex that will search for the input.value
      const placeRegex = new RegExp(userInput, "gi");

      // Replace every occurrence with a <span> containing the value the input.value
      const cityName = place.city.replace(placeRegex, `<span class="hl">${userInput}</span>`);
      const stateName = place.state.replace(placeRegex, `<span class="hl">${userInput}</span>`);
      const population = formatNumber(place.population);

      return `
      <li>
        <span>${cityName}, ${stateName}</span>
        <span class="population">${population}</span>
      </li>`;
    }) // -> returns an array
    .join(""); // make it a string;

  $suggestions.innerHTML = html;
}

document.querySelector(".search").addEventListener("input", showMatches);

populateCities();
