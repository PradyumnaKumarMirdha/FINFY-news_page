let urn = window.location.href;
try {
    let dataIndex = parseInt(urn.split('?')[1].split('=')[1]);
    console.log(dataIndex);

    if (dataIndex == 43) {
        document.getElementById('next-switch').style.display = "none";
        $(".news-switches").css({"justify-content":"flex-start"});
    } else if (dataIndex == 0) {
        document.getElementById('previous-switch').style.display = "none";
        $('.news-switches').css({"justify-content":"flex-end"});
    }

    let newsContainer = document.querySelector('.news-content-container');

    fetch('http://127.0.0.1:8000/newsapi/scrape/')
        .then(res => res.json())
        .then(data => {
            try {
                $('.headline-container').html(`<h1>${data[dataIndex].headlines}</h1>`);
                document.querySelector('title').textContent = data[dataIndex].headlines;
                $('.image-container').html(`<img src=${data[dataIndex].img_link} alt="image of related to this news" id="news-image">`);

                data[dataIndex].content.forEach(item => {
                    newsContainer.insertAdjacentHTML('beforeend', `<div>${item}</div>&nbsp;`);
                });
            } catch(err) {
                console.error(err);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    $('.news-switches').html(`<img src="./assets/icons8-backward-96.png" alt="previous" id="previous-switch">`);
    $('.news-switches').append(`<img src="./assets/icons8-forward-96.png" alt="next" id="next-switch">`);

    $(document).ready(function() {
        $('#previous-switch').click(function() {
            if (dataIndex > 0) {
                window.location.assign(`indi_news_page.html?dataIndex=${dataIndex - 1}`);
            }
        }); 

        $('#next-switch').click(function() {
            if (dataIndex < 43) {
                window.location.assign(`indi_news_page.html?dataIndex=${dataIndex + 1}`);
            }
        });
    });
} catch(err) {
    console.error(err);
    window.open(window.location.href + "?dataIndex=0", "_self");
}
