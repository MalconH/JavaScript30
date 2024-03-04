const cities = [];

function populateCities() {
  const endpoint = "https://apis.datos.gob.ar/georef/api/localidades?max=5000";

  // If it doesn't exist in local storage
  if (!localStorage.getItem("cities")) {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Extracting cities (localidades) and provinces (provincias)
        const mappedData = data.localidades.map((infoLocalidad) => {
          const {
            nombre: city,
            provincia: { nombre: province },
          } = infoLocalidad;

          return { city, province };
        });

        cities.push(...mappedData);

        // save to local storage
        localStorage.setItem("cities", JSON.stringify(mappedData));
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
    // check for coincidence in either city name or province name
    return cityRegex.test(cityObj.city) || cityRegex.test(cityObj.province);
  });

  return matches;
}

function showDefaultSuggestions() {
  const $suggestions = document.querySelector(".suggestions");
  $suggestions.innerHTML = `
    <li>Filtrá por ciudad</li>
    <li>o provincia</li>`;
}

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

function showMatches(max = 25) {
  const userInput = document.querySelector(".search").value;

  // Without this, it will match all the cities
  if (!userInput) {
    showDefaultSuggestions();
    return;
  }
  const $suggestions = document.querySelector(".suggestions");

  const matches = matchCities(userInput, cities);
  const html = matches
    .slice(0, max) // shows first 25 results by default
    .map((place) => {
      // Create a regex that will search for the input.value
      const placeRegex = new RegExp(userInput, "gi");

      // Replace every occurrence with a <span> containing the value the input.value
      const cityName = place.city.replace(placeRegex, `<span class="hl">${userInput}</span>`);
      const provinceName = place.province.replace(
        placeRegex,
        `<span class="hl">${userInput}</span>`
      );

      return `
      <li>
        <span>${cityName}, ${provinceName}</span>
      </li>`;
    }) // -> returns an array
    .join(""); // make it a string;

  $suggestions.innerHTML = html;

  // Generate "show more" button
  if (max < matches.length) {
    const $showMore = document.createElement("li");
    $showMore.textContent = "Mostrar más...";
    $showMore.className = "show-more";
    $showMore.addEventListener("click", () => {
      showMatches(1000);
    });

    $suggestions.appendChild($showMore);
  }
}

document.querySelector(".search").addEventListener("input", () => {
  showMatches();
});

populateCities();
