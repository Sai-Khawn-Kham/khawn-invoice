import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import {
   newProductName,
   newProductPrice,
   productCardTemplate,
   productGroup,
   productSelect,
} from "./selectors";
import { products } from "./state";

export const addNewProductBtnHandler = () => {
   //  console.log(newProductName.value, newProductPrice.valueAsNumber);

   if (newProductName.value != "" && newProductPrice.value != "") {
      const createId = uuidv4();
      const newPrice = parseFloat(newProductPrice.value);
      productGroup.append(
         createProductCard(
            createId,
            newProductName.value,
            newPrice
         )
      );
      productSelect.append(
         new Option(
            `${newProductName.value} - ${newPrice}`,
            createId
         )
      );
      products.push({
         id: createId,
         name: newProductName.value,
         price: newPrice,
      });
      console.log("add new product");
      // console.log(products);
   
      newProductName.value = null;
      newProductPrice.value = null;
   } else {
      Swal.fire({
         title: "Require input",
         text: "Please fill the input field",
         icon: "error",
      });
   }
};

export const productRender = (products) => {
   products.forEach(({ id, name, price }) => {
      productGroup.append(createProductCard(id, name, price));
      productSelect.append(new Option(`${name} - ${price}`, id));
   });
};

export const createProductCard = (id, name, price) => {
   const productCard = productCardTemplate.content.cloneNode(true);
   const currentProductCard = productCard.querySelector(".product-card");
   const productName = productCard.querySelector(".product-name");
   const productPrice = productCard.querySelector(".product-price");
   // console.log(currentProductCard);

   currentProductCard.id = id;
   productName.innerText = name;
   productPrice.innerText = price;

   //  console.log(productCard);
   return productCard;
};
