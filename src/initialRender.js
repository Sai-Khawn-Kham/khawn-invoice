import { productRender } from "./inventory";
import { productSidebar } from "./selectors";
import { products } from "./state";

const initialRender = () => {
   console.log("initial render");
   // productSidebar.classList.remove("translate-x-full");
   productRender(products);
}

export default initialRender;