/**
 * This class creates custom select elements for the selected DOM.
 * Accepts two params:
 *  selector: Wrapper element's ID
 *  config: {
 *    placeholder: Placeholder text
 *    options: List of select options
 *    classes: {
 *      menuTitleClass,
 *      menuListClass,
 *      menuListItemClass,
 *    }
 *  }
 */
export class CustomSelect {
  constructor(selector, { placeholder, options, classes }) {
    this._options = [{ value: "", label: placeholder }, ...options];
    this._selectedOption = {};
    this._open = false;

    this._renderSelectUI(selector, placeholder, classes);

    window.addEventListener("click", this._toggleSelectList.bind(this, false));
  }

  /**
   * Opens/closes the select list.
   * @param {Boolean} shouldOpen Flag to check if the menu should be opened or not.
   */
  _toggleSelectList(shouldOpen) {
    const list = document.getElementsByClassName("select-list")[0];
    if (shouldOpen) {
      list.classList.remove("d-none");
    } else {
      list.classList.add("d-none");
    }
    this._open = shouldOpen;
  }

  /**
   * Renders custom select UI initially,
   * with all the event handlers.
   */
  _renderSelectUI(selector, placeholder, classes) {
    // Gets wrapper and adds class to it.
    const wrapper = document.getElementById(selector);
    wrapper.classList.add("select-wrapper");

    // Creates DOM element for title and adds required attributes.
    this._titleEl = document.createElement("div");
    this._titleEl.classList.add("select-title", classes.menuTitleClass);
    this._updateTitle(placeholder || "Select");

    this._titleEl.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this._toggleSelectList(!this._open);
    });
    wrapper.appendChild(this._titleEl);

    // Creates list and add it to the wrapper.
    const ul = document.createElement("ul");
    ul.classList.add("select-list", "d-none", classes.menuListClass);
    for (let option of this._options) {
      const li = document.createElement("li");
      li.setAttribute("id", option.value);
      li.classList.add("select-list__item", classes.menuListItemClass);
      li.setAttribute("value", option.value);
      li.innerHTML = option.label;
      li.addEventListener("click", this._onSelectOption.bind(this, li));
      ul.appendChild(li);
    }
    wrapper.appendChild(ul);
  }

  _onSelectOption(li) {
    this._selectedOption = {
      value: li.value,
      label: li.innerHTML,
    };

    /**
     * Remove selected item highlight from previous selected item
     * and add highlight to the current selection.
     */
    const prevSelection = document.getElementsByClassName("selected-item")[0];
    if (prevSelection) {
      prevSelection.classList.remove("selected-item");
    }
    li.classList.add("selected-item");

    this._updateTitle(this._selectedOption.label);

    this._toggleSelectList(false);

    if (this.callbackFn) {
      this.callbackFn(this._selectedOption);
    }
  }

  /**
   * Update select title on init and selecting an option
   */
  _updateTitle(title) {
    this._titleEl.innerHTML = title;

    const iconEl = document.createElement("i");
    iconEl.classList.add("material-icons", "select-icon");
    iconEl.innerHTML = "arrow_drop_down";
    this._titleEl.appendChild(iconEl);
  }

  /**
   * Registers the callback function which will be called
   * when the user selects an option.
   * @param {Function} fn Callback function
   */
  onChange(fn) {
    this.callbackFn = fn;
  }

  // Returns the current selected value.
  getValue() {
    return this._selectedOption;
  }

  // Selects a option from the list.
  setValue(value) {
    this._selectedOption = this._options.find((opt) => opt.value === value);
    const selectedLi = document.getElementById(value);
    this._onSelectOption(selectedLi);
    return this._selectedOption;
  }
}
