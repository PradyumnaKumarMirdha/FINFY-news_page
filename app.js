//Menu functioning part starts
function show() {
    document.querySelector('.hamburger').classList.toggle('open');
    document.querySelector('.navigation').classList.toggle('active');
}

const carousel_container = document.querySelector('.container');
const body = document.querySelector('.body');
let tap = 0;
function scrollJugad() {
    if (tap % 2 == 0) {
        body.style.overflow = 'hidden';
        tap = tap + 1;
    } else {
        body.style.overflowY = 'visible';
        body.style.overflowX = 'hidden';
        tap = tap + 1;
    }
}
//Menu functioning part ends

fetch('http://127.0.0.1:8000/newsapi/scrape/')
    .then(res => res.json())
    .catch(error => {
        console.log("Error has arrived");
    })
    .then(data => {
        // Iterate through the fetched data and populate news boxes
        for (let i = 1; i <= 12; i++) {
            let img_link = data[i + 7].img_link;
            let headline = data[i + 7].headlines;
            let content_preview = data[i + 7].content[0];
            document.getElementById("news" + i).innerHTML = `<a href="./indi_news_page.html?dataIndex=${i + 7}" target="_blank" class="fill-div"><img src=${img_link} alt="Image" class="img"><div class="preview"><span class="preview-head">${headline}</span><span class="preview-content">${content_preview.slice(0, 210)} ...</span></div></a>`;
        }
    });

let newsBox = 13;

let parentElement = document.querySelector('.grid-2');

function addNews() {
    for (let i = newsBox; i <= newsBox + 11; i++) {
        let divElement = document.createElement('div');
        divElement.setAttribute('id', "news" + i);
        divElement.classList.add('news');
        parentElement.appendChild(divElement);
        fetch('http://127.0.0.1:8000/newsapi/scrape/')
            .then(res => res.json())
            .then(data => {
                let img_link = data[i + 7].img_link;
                let headline = data[i + 7].headlines;
                let content_preview = data[i + 7].content[0];
                document.getElementById("news" + i).innerHTML = `<a href="./indi_news_page.html?dataIndex=${i + 7}" target="_blank" class="fill-div"><img src=${img_link} alt="Image" class="img"><div class="preview"><span class="preview-head">${headline}</span><span class="preview-content">${content_preview.slice(0, 210)} ...</span></div></a>`
            })
    }
    newsBox = newsBox + 12;
    if (newsBox >= 36) {
        document.querySelector('.see-more').style.display = "none"; /*This hides the see more button after two clicks or when the news boxes reach 36*/
    }
}
