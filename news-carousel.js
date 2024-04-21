
let divSlide = document.querySelector('.carousel-inner');
let slideChildren = divSlide.children;
// console.log(slideChildren[0]);

fetch('http://127.0.0.1:8000/newsapi/scrape/')
    .then(res=> res.json())
        .then(data=>{
            for(let i=0;i<slideChildren.length;i++){
                let headline= slideChildren[i].querySelector('.content').querySelector('.carousel-headline');
                let preview= slideChildren[i].querySelector('.content').querySelector('.carousel-preview');
                let image = slideChildren[i].querySelector('img');
                $(image).attr("src",data[i].img_link);
                headline.textContent = data[i].headlines;
                preview.textContent = data[i].content[0];
            }
        })

// let query = "?dataIndex=";
function visitPage(dataIndex){
    let url = "/news_page/indi_news_page.html?dataIndex=" + dataIndex;
    window.open(url,'_blank');
}