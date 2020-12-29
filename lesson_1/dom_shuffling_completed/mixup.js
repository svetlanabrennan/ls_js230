document.body.childNodes[3].setAttribute("id", "menu");
let nav = document.getElementById("menu");
document.body.insertAdjacentElement("afterbegin", nav);
document.getElementById("menu").insertAdjacentElement("afterbegin", document.querySelector("h1"));

document.getElementById("content").childNodes[3].setAttribute("id", "first-figure");
document.getElementById("content").childNodes[5].setAttribute("id", "second-figure");

document.getElementById("first-figure").insertAdjacentElement("afterbegin", document.getElementById("second-figure").querySelector("img"));

document.getElementById("second-figure").insertAdjacentElement("afterbegin", document.getElementById("first-figure").childNodes[2]);


document.getElementById("content").childNodes[1].insertAdjacentElement("beforeend", document.getElementById("first-figure"));

document.getElementById("content").childNodes[1].insertAdjacentElement("beforeend", document.getElementById("second-figure"));