const serverUrl = "http://127.0.0.1:5500/";
const itemPath = "mock/items.json";
const imagesPath = "img/";


window.onload = getData();

const items = document.querySelector(".items");


function getData() {
    fetch(serverUrl + itemPath)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                items.innerHTML += createDomElement(item);
                ;
            });
        }).catch(error => console.log(error));
}

function createDomElement(item){
    const itemHtml =  `
    <div class="item">
    <h3 class="item-title">${item.title}</h3>
    <img class="item-image" src="${imagesPath + item.image}">
    <div class="item-details">
        <h4 class="item-price">${item.price} $</h4>
        <div class="addToCart button "> AÑADIR AL CARRITO</div>
    </div>
    </div>`
    return itemHtml;
}