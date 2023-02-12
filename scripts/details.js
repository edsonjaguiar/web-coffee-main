const selectedCoffee = JSON.parse(localStorage.getItem('selectedCoffee'));
const ingredients = document.querySelector('.ingredients');
const imageDetails = document.querySelector('.image-details');
const loading = document.querySelector('.loading');

if (selectedCoffee) {
    loading.style.display = 'flex';

    ingredients.innerHTML = `
        <h1>${selectedCoffee.title}</h1>
        <p>${selectedCoffee.description}</p>

        <ul>
            ${selectedCoffee.ingredients
                .map(
                    (ingredient) => `
                    <div class="list">
                        <img src="images/icon-check.png" />
                        <li>${ingredient}</li>
                    </div>
                `
                )
                .join('')}
        </ul>

        <a href="index.html">
            <button type="button">All Coffees</button>
        </a>
    `;

    imageDetails.innerHTML = `
        <img src=${selectedCoffee.image} />
        `;

    loading.style.display = 'none';
} else {
    ingredientsContainer.innerHTML = `
            <p>Selected coffee not found.</p>
    `;
}
