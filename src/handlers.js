import { productSidebar, recordGroup } from "./selectors";

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
   // console.log(recordGroup);
   const productList = document.querySelectorAll(".record-row");
   // console.log(productList.length);

   if(productList.length>0){
      console.log(checkout);
      window.print();
   }
}