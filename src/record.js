import Swal from "sweetalert2";
import {
   createRecordForm,
   productCardTemplate,
   recordGroup,
   recordNetTotal,
   recordTax,
   recordTotal,
} from "./selectors";
import { products } from "./state";
import { v4 as uuidv4 } from "uuid";

export const createRecordFormHandler = (event) => {
   event.preventDefault();
   console.log("submit form");
   const formData = new FormData(createRecordForm);
   // console.log(formData.get("product_select"));
   // console.log(formData.get("quantity"));

   // console.log(products.find(({ id }) => id == formData.get("product_select")));

   const currentProduct = products.find(
      ({ id }) => id == formData.get("product_select")
   );

   const isExitedRecord = document.querySelector(
      `[product-id="${currentProduct.id}"]`
   );

   if (isExitedRecord === null) {
      recordGroup.append(
         createRecordRow(currentProduct, formData.get("quantity"))
      );
   }
   else {
      Swal.fire({
         title: "Already selected",
         text: `Do you want to add quantity to ${currentProduct.name}`,
         icon: "question",
         showCancelButton: true,
         confirmButtonColor: "rgb(41,37,36)",
         cancelButtonColor: "rgb(150,150,150)",
         confirmButtonText: "Yes, add quantity!",
         background: "rgb(100,100,100)",
         color: "rgb(41,37,36)",
      }).then((result) => {
         if (result.isConfirmed) {
            console.log("add quantity");
            updateRecordQuantity(isExitedRecord.id,parseInt(formData.get("quantity")));
         }
      });
   }

   createRecordForm.reset();
};

export const createRecordRow = ({ id, name, price }, quantity) => {
   const recordRow = recordRowTemplate.content.cloneNode(true);
   const recordProductName = recordRow.querySelector(".record-product-name");
   const recordProductPrice = recordRow.querySelector(".record-product-price");
   const recordProductQuantity = recordRow.querySelector(
      ".record-product-quantity"
   );
   const recordProductCost = recordRow.querySelector(".record-product-cost");
   const currentRecordRow = recordRow.querySelector(".record-row");

   currentRecordRow.setAttribute("product-id", id);
   let recordRowId = "row" + uuidv4();
   // console.log(recordRowId);
   currentRecordRow.setAttribute("id", recordRowId);

   recordProductName.innerText = name;
   recordProductPrice.innerText = price;
   recordProductQuantity.innerText = quantity;
   recordProductCost.innerText = price * quantity;

   return recordRow;
};

export const calculateRecordCostTotal = () => {
   let total = 0;
   // console.log(recordGroup.querySelectorAll(".record-product-cost").forEach((el) => console.log(el.innerText)));
   recordGroup.querySelectorAll(".record-product-cost").forEach((el) => {
      total += parseFloat(el.innerText);
   });
   return total;
};

export const calculateTax = (amount, percentage = 5) =>
   (amount / 100) * percentage;

export const removeRecord = (rowId) => {
   // console.log(rowId);
   const deleteRow = recordGroup.querySelector(`#${rowId}`);
   // console.log(deleteRow);
   Swal.fire({
      title: "Are you sure to Delete?",
      text: "You won't be able to revert this",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(41,37,36)",
      cancelButtonColor: "rgb(150,150,150)",
      confirmButtonText: "Yes, delete it!",
      background: "rgb(100,100,100)",
      color: "rgb(41,37,36)",
   }).then((result) => {
      if (result.isConfirmed) {
         console.log("delete row");
         deleteRow.remove();
         Swal.fire({
            title: "Deleted",
            text: "Your file has been deleted.",
            icon: "success",
            background: "rgb(100,100,100)",
            color: "rgb(41,37,36)",
         });
      }
   });
};

// export const quantityAdd = (rowId) => {
//    console.log("quantity increase");
//    const currentRecordRow = recordGroup.querySelector(`#${rowId}`);
//    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
//    const recordProductQuantity = currentRecordRow.querySelector(
//       ".record-product-quantity"
//    );
//    const recordProductCost = currentRecordRow.querySelector(".record-product-cost");

//    recordProductQuantity.innerText = parseInt(recordProductQuantity.innerText)+1;
//    recordProductCost.innerText = recordProductPrice.innerText * recordProductQuantity.innerText;

// }

// export const quantitySub = (rowId) => {
//    console.log("quantity decrease");
//    const currentRecordRow = recordGroup.querySelector(`#${rowId}`);
//    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
//    const recordProductQuantity = currentRecordRow.querySelector(
//       ".record-product-quantity"
//    );
//    const recordProductCost = currentRecordRow.querySelector(".record-product-cost");

//    if(recordProductQuantity.innerText>1){
//       recordProductQuantity.innerText = parseInt(recordProductQuantity.innerText)-1;
//    recordProductCost.innerText = recordProductPrice.innerText * recordProductQuantity.innerText;
//    }

// }

export const updateRecordQuantity = (rowId, updaterecord) => {
   console.log("update product quantity");
   const currentRecordRow = recordGroup.querySelector(`#${rowId}`);
   const recordProductPrice = currentRecordRow.querySelector(
      ".record-product-price"
   );
   const recordProductQuantity = currentRecordRow.querySelector(
      ".record-product-quantity"
   );
   const recordProductCost = currentRecordRow.querySelector(
      ".record-product-cost"
   );

   if (updaterecord > 0 || recordProductQuantity.innerText > 1) {
      recordProductQuantity.innerText =
         parseInt(recordProductQuantity.innerText) + updaterecord;
      recordProductCost.innerText =
         recordProductPrice.innerText * recordProductQuantity.innerText;
   }

   // console.log(recordProductQuantity.innerText);
   // console.log(recordProductQuantity.innerText>1);
};

export const recordGroupHandler = (e) => {
   const currentRecordRow = e.target.closest(".record-row");
   // const currentRecordRow = e.target.parentElement.parentElement;
   // console.log(currentRecordRow.id);
   if (e.target.classList.contains("record-remove")) {
      removeRecord(currentRecordRow.id);
   } else if (e.target.classList.contains("quantity-add")) {
      // quantityAdd(currentRecordRow.id);
      updateRecordQuantity(currentRecordRow.id, 1);
   } else if (e.target.classList.contains("quantity-sub")) {
      // quantitySub(currentRecordRow.id);
      updateRecordQuantity(currentRecordRow.id, -1);
   }
};

export const recordGroupObserver = () => {
   const observerOptions = {
      childList: true,
      subtree: true,
      attributes: true,
   };
   const updateTotal = () => {
      const total = calculateRecordCostTotal();
      recordTotal.innerText = total;
      recordTax.innerText = calculateTax(total);
      recordNetTotal.innerText = total + calculateTax(total);
   };
   const observer = new MutationObserver(updateTotal);
   observer.observe(recordGroup, observerOptions);
};
