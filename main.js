import { CustomSelect } from "./custom-select.js";

/**
 * Usage sample for CustomSelect component.
 */

const customSelect = new CustomSelect("custom-select", {
  placeholder: "Select your favourite ice cream flavour",
  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "spanish-delight", label: "Spanish Delight" },
    { value: "butter-scotch", label: "Butter Scotch" },
  ],
  classes: {
    // Provide corresponding classes if required to alter default styling
    // menuTitleClass: "",
    // menuListClass: "",
    // menuListItemClass: "",
  },
});

// Register callback for onchange.
customSelect.onChange((ev) => {
  console.log(`From onchange callback: Label: ${ev.label}`);
});

document.getElementById("set-value").addEventListener("click", () => {
  // Set selection value.
  customSelect.setValue("vanilla");

  // Get selected value.
  customSelect.getValue();
});
