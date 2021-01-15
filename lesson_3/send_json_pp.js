// #1

/*
POST /books HTTP/1.1
Host: ls-230-book-catalog.herokuapp.com
Content-Type: application/json; charset=utf-8
Accept:

{"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
*/

// #2

function createProduct(productData) {
  let json = JSON.stringify(productData);
  let request = new XMLHttpRequest();

  request.open("POST", "https://ls-230-web-store-demo.herokuapp.com/v1/products");
  request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  request.setRequestHeader("Authorization", "token AUTH_TOKEN");

  request.addEventListener("load", () => {
    console.log(`This product was added: ${request.responseText}`);
  });
  request.send();
}


createProduct({
  name: "some item",
  sku: "smt100",
  price: 200
});