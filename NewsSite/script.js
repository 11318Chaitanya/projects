const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
} 

function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-image');
    const newsHeading = cardClone.querySelector('#news-heading');
    const newsSourceTime = cardClone.querySelector('#news-time');
    const newsDes = cardClone.querySelector('#news-description');


    newsImage.src = article.urlToImage;
    newsHeading.innerHTML = article.title;
    newsDes.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    })

    newsSourceTime.innerHTML = `${article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    })

}
let curNavItem = null;
function navItemClick(id){
    fetchNews(id);
    const navItem  = document.getElementById(id);
    curNavItem?.classList.remove('active');
    curNavItem = navItem;
    curNavItem.classList.add('active');
}

const searchInput = document.getElementById('search-input');
const serachButton =document.getElementById('search-button');

serachButton.addEventListener('click', ()=>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    curNavItem.classList.remove('active');
    curNavItem = null;
})

function reload(){
    window.location.reload();
}