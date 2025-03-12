
const productForm = document.getElementById('product-form')
const productNameInput = document.getElementById('product-name')
const producPriceInput = document.getElementById('product-price')
const productCategories = document.getElementById('productCategories')
const productImage = document.getElementById('productImage')
const addProductBtn = document.getElementById('addProductBtn')
const tableHeader = document.getElementById('table-header')
const cartTableBody = document.getElementById('table-body')

let products = [];

//get for local storage
products = JSON.parse(localStorage.getItem('products'))|| [];



//save local storage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}


//Display Product
function displayProduct(products) {
    cartTableBody.innerHTML = '';
    products.forEach((product, index) => { // Correct forEach syntax
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td><img src="${product.image}"></td>
            <td><button class=deleteBtn data-index="${index}">Delete</button></td>
        `;
        cartTableBody.appendChild(row); // Append the row to the table body
    });
}

// ADD Product to local storage and render on screen
addProductBtn.addEventListener('click', () => {

    const product = {
        name: productNameInput.value,
        price: producPriceInput.value,
        category: productCategories.value,
        image: productImage.value.trim(),
    }
    if(product.name && !isNaN(product.price) && product.category && product.image) {
        products.push(product);
    } else {
        alert('Enter all data');
    }
           
    saveProductsToLocalStorage();
    displayProduct(products);

});

cartTableBody.addEventListener('click' , (event) => {

if(event.target.classList.contains('deleteBtn')){
    const index = parseInt(event.target.dataset.index);
    products.splice(index,1)
    saveProductsToLocalStorage();
    displayProduct(products);
}

});

displayProduct(products);