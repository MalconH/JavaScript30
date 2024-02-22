function saveVariable(variableName, value) {
  localStorage.setItem(variableName, value);
}

function loadVariables() {
  // Obtains variables saves in localStorage
  const variables = {};
  variables.spacing = localStorage.getItem("spacing");
  variables.blur = localStorage.getItem("blur");
  variables.base = localStorage.getItem("base");

  Object.keys(variables).forEach((variable) => {
    const value = variables[variable];
    // Applies variable to corresponding input
    const $input = document.querySelector(`#${variable}`);
    $input.value = value;

    // Triggers the event manually to update variable
    $input.dispatchEvent(new Event("input"));
  });
}

function handleUpdate() {
  const variable = this.name;
  const suffix = this.dataset.sizing || "";
  const value = this.value;
  document.body.style.setProperty(`--${variable}`, value + suffix);

  saveVariable(variable, value);
}

const $inputs = document.querySelectorAll("input");
// Listens to every value update on input
$inputs.forEach((input) => input.addEventListener("input", handleUpdate));

loadVariables();
