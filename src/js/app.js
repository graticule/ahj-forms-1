import "../css/style.css";

import Popover from "./popover/popover";

let openPopovers = [];
const popoverFactory = new Popover();

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const holder = e.target.closest(".popover-holder");
    if (holder) {
      const openPopover = openPopovers.find((el) =>
        el.holder.isEqualNode(holder)
      );
      if (openPopover) {
        popoverFactory.removePopover(openPopover.id);
        openPopovers = openPopovers.filter(el => el.id != openPopover.id);
      } else {
        const id = popoverFactory.showPopover(
          holder.getAttribute("title"),
          holder.dataset.content,
          holder
        );
        openPopovers.push({
          id,
          holder,
        });
      }
    }
    return;
  })

});
