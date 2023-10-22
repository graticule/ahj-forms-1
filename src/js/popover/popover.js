import "./popover.css";

export default class Popover {
  constructor() {
    this._popovers = [];
  }

  static markup(title, message) {
    const popoverElement = document.createElement("div");
    popoverElement.classList.add("popover");
    popoverElement.innerHTML = `
      <div class="popover__title">
      ${title}
      </div>
      <div class="popover__message">
      ${message}
      </div>
    `;
    return popoverElement;
  }

  showPopover(title, message, parent) {
    const element = Popover.markup(title, message);

    const id = performance.now();

    this._popovers.push({
      id,
      element,
    });

    const { top, left, width, height } = parent.getBoundingClientRect();

    document.body.appendChild(element);
    
    const { width: elementWidth, height: elementHeight } = element.getBoundingClientRect();

    element.style.top = top - elementHeight - 5 +"px";
    element.style.left = left + width / 2 - elementWidth/2 + "px";

    return id;
  }

  removePopover(id) {
    const popover = this._popovers.find((el) => el.id === id);
    popover.element.remove();
    this._popovers = this._popovers.filter((el) => el.id !== id);
  }
}
