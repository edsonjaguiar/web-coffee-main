const cardsContainer = document.querySelector('.cards');
const searchInput = document.querySelector('.search__form input');
const loading = document.querySelector('.loading');
const notFoundMessage = document.querySelector('.not-found-message');

async function getCoffesFromAPI() {
    try {
        loading.style.display = 'flex';
        const response = await fetch(
            'https://coffee-api-fn2g.onrender.com/coffees'
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error in API response: ${response.statusText}`);
        }

        renderResults(data);
        loading.style.display = 'none';
        searchInput.addEventListener('input', filterCards);
    } catch (error) {
        console.error(error);
    }
}

function renderResults(data) {
    let cardHTML = '';
    data.forEach((coffee) => {
        cardHTML += `
            <article class="cards__content" data-id="${coffee.id}">
                <img src="${coffee.image}" alt="${coffee.id}" />
                <span>${coffee.title}</span>
            </article>
        `;
    });

    cardsContainer.innerHTML = cardHTML;
    hasClickedOfArticle(data);
}

function filterCards() {
    const filterInput = searchInput.value.toUpperCase();
    const articles = document.querySelectorAll('.cards__content');

    let visibleArticles = 0;
    articles.forEach((article) => {
        const title = article.querySelector('span');
        const titleText = title.textContent.toUpperCase();

        if (titleText.includes(filterInput)) {
            article.style.display = 'block';
            visibleArticles += 1;
        } else {
            article.style.display = 'none';
        }
    });

    if (visibleArticles === 0) {
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }
}

function hasClickedOfArticle(data) {
    const articles = document.querySelectorAll('.cards__content');

    articles.forEach((article) => {
        article.addEventListener('click', (event) => {
            const articleId = event.currentTarget.getAttribute('data-id');
            const selectedCoffee = data.find(
                (coffee) => +coffee.id === +articleId
            );

            localStorage.setItem(
                'selectedCoffee',
                JSON.stringify(selectedCoffee)
            );

            window.location.href = 'details.html';
        });
    });
}

getCoffesFromAPI();
