const prices = document.getElementsByClassName("cart-item__current-price");
const pluses = document.getElementsByClassName("cart-item__plus");
const minuses = document.getElementsByClassName("cart-item__minus");
const counters = document.getElementsByClassName("cart-item__count");
const shippingPrice = +document
  .getElementById("shipping-price")
  .innerHTML.replace("$", "");
console.log(shippingPrice);

const totalPriceHtml = document.getElementById("total-price");

let total = 0;
let items = [{}];

// Generating item object just in case and adding listeners
for (let i = 0; i < prices.length; i++) {
  items[i] = {
    price: prices[i],
    plus: pluses[i],
    minus: minuses[i],
    count: counters[i],
  };

  items[i].plus.addEventListener("click", (event) => {
    items[i].count.innerHTML = +items[i].count.innerHTML + 1;
    countTotalPrice();
  });

  items[i].minus.addEventListener("click", (event) => {
    if (items[i].count.innerHTML !== "0") {
      items[i].count.innerHTML = +items[i].count.innerHTML - 1;
    }
    countTotalPrice();
  });
}

// Counting total price everytime recounts every object.
// I know that it is not optimal, but I don't want to do observer pattern rn.
function countTotalPrice() {
  total = 0;
  for (let i = 0; i < items.length; i++) {
    total +=
      +items[i].count.innerHTML * +items[i].price.innerHTML.replace("$", "");
  }
  total = Math.round((total + shippingPrice) * 100) / 100;

  totalPriceHtml.innerHTML = `\$${total}`;
}
