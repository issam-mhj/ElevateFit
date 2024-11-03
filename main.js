document.addEventListener("DOMContentLoaded", function() {
    const categorySelector = document.getElementById("productCategory");
    const rangePrice = document.getElementById("rangePrice");
    const updatedRangeValue = document.getElementById("updatedRange");

    rangePrice.addEventListener('input', function() {
        updatedRangeValue.textContent = rangePrice.value;
        listedProducts();
    });

    categorySelector.addEventListener('change', listedProducts);

    function listedProducts() {
        const cat = categorySelector.value;
        const rang = parseInt(rangePrice.value);

        document.querySelectorAll('.product').forEach(function(product) {
            const product_price = parseInt(product.getAttribute("data-price"));
            const product_cat = product.getAttribute("data-category");

            if ((cat === "all" || cat === product_cat) && product_price <= rang) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

});

document.getElementById("butt").onclick = function() {
    alert("You clicked the button!");
  };

  document.querySelectorAll(".butt").forEach(button => {
    button.addEventListener("click", function() {
        const current = this.closest(".col-4"); 
        const name = current.querySelector(".pro1").innerText;
        const price = current.querySelector(".pro1pr").innerText;
        const priceValue = parseFloat(price.replace('$', '')); // Convert price string to number

        const productKey = `${name}Data`;
        
        let existingQuantity = localStorage.getItem(`${productKey}_quantity`);
        
        if (existingQuantity) {
            existingQuantity = parseInt(existingQuantity) + 1;
            localStorage.setItem(`${productKey}_quantity`, existingQuantity);
        } else {
            localStorage.setItem(`${productKey}_name`, name);
            localStorage.setItem(`${productKey}_price`, price);
            localStorage.setItem(`${productKey}_quantity`, 1); 
        }

        // Update the header total
        updateHeaderTotal(priceValue);
    });
});

// Function to update header total
function updateHeaderTotal(price) {
    let currentTotal = localStorage.getItem('headerTotal') || 0;
    currentTotal = parseFloat(currentTotal);
    const newTotal = currentTotal + price;
    localStorage.setItem('headerTotal', newTotal);
    
    // Update the display
    const headerTotal = document.getElementById('rangesold');
    headerTotal.innerHTML = `$${newTotal.toFixed(2)}`;
}

// Initialize header total when page loads
document.addEventListener('DOMContentLoaded', function() {
    const headerTotal = document.getElementById('rangesold');
    const savedTotal = localStorage.getItem('headerTotal') || 0;
    headerTotal.innerHTML = `$${parseFloat(savedTotal).toFixed(2)}`;
});