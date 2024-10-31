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