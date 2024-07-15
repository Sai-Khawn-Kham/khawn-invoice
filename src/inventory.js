import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import {
   newProductName,
   newProductPrice,
   productCardTemplate,
   productGroup,
   productSelect,
} from "./selectors";
import { products } from './state';

export const addNewProductBtnHandler = () => {
   console.log("add new product");
   //  console.log(newProductName.value, newProductPrice.valueAsNumber);
   //  console.log(createProduct(newProductName.value,newProductPrice.valueAsNumber));
   const createId = uuidv4();
   productGroup.append(
      createProductCard(createId, newProductName.value, newProductPrice.valueAsNumber)
   );

   productSelect.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`, createId));

   products.push({
      id: createId,
      name: newProductName.value,
      price: newProductPrice.valueAsNumber,
   });
   // console.log(products);

   newProductName.value = null;
   newProductPrice.value = null;
};

export const productRender = (products) => {
   products.forEach(({id,name,price}) => {
      productGroup.append(createProductCard(id,name,price));
      productSelect.append(new Option(`${name} - ${price}`, id))
   });
};

export const createProductCard = (id,name, price) => {
   const productCard = productCardTemplate.content.cloneNode(true);
   const currentProductCard = productCard.querySelector(".product-card");
   const productName = productCard.querySelector(".product-name");
   const productPrice = productCard.querySelector(".product-price");

   // console.log(uuidv4());
   // console.log(currentProductCard);
   currentProductCard.id = id;

   productName.innerText = name;
   productPrice.innerText = price;

   // if (newProductName.value != "") {
   //    productName.innerText = name;
   //    productPrice.innerText = price;

   //    newProductName.value = null;
   //    newProductPrice.value = null;
   // } else {
   //    Swal.fire({
   //       title: "Require input",
   //       text: "Please fill out this field",
   //       icon: "error",
   //       // showCancelButton: true,
   //       confirmButtonColor: "rgb(41,37,36)",
   //       // cancelButtonColor: "d33",
   //       confirmButtonText: "Okay",
   //    });
   // }
   //  console.log(productCard);
   return productCard;
};
