import { productSidebar } from "./selectors";

export const manageInventoryBtnHandler = () => {
   console.log("show sidebar");
   productSidebar.classList.remove("translate-x-full");
   productSidebar.classList.add("duration-300");
}

export const closeSidebarBtnHandler = () => {
   console.log("hide sidebar");
   productSidebar.classList.add("translate-x-full");
}

export const checkoutHandler = () => {
   console.log(checkout);
   window.print();
}