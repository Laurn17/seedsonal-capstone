let season;


function sendToHomePage() {
    $('.container').remove();
    $('.home-page').html(homePageContent);
    watchSeasonClick();
};

function homePageContent() {
    return `
        <header role="banner" id="sticky-header">
            <a id="logo" href="home.js"><img src="images/leaf-logo.png" height="60" width="auto">
            </a>
                <nav role="navigation">
                    <ul class = "main-nav">
                        <li class = "spring">SPRING |</li>
                        <li class = "summer">SUMMER |</li>
                        <li class = "autumn">AUTUMN |</li>
                        <li class = "winter">WINTER</li>
                    </ul>
                </nav>
        </header>
        
        <div class = "by-season-content" >
        </div>

        <div class = "home-page-content">
        <main role="main">
            <div id="gardeningBlurb">
                <p> From a small seed, a mighty garden may grow </p>
            </div>

            <div id="quotes">
                <blockquote cite="https://www.brainyquote.com/authors/liberty_hyde_bailey">
                    <p>"A garden requires patient labor and attention. Plants do not grow merely to satisfy ambitions or to fulfill good intentions. They thrive because someone expended effort on them."</p>
                </blockquote>
                    <cite>– Liberty Hyde Bailey</cite>
                <br>
                <br>
                <blockquote cite="https://www.daviddomoney.com/35-inspirational-gardening-quotes-and-famous-proverbs/#.W9e4r2hKjIU">
                    <p>"The glory of gardening: hands in the dirt, head in the sun, heart with nature. To nurture a garden is to feed not just on the body, but the soul."</p>
                </blockquote>
                    <cite>– Alfred Austin</cite>
                <br>
                <br>
                <blockquote cite="https://www.brainyquote.com/quotes/thomas_jefferson_157214?src=t_gardening">
                    <p>"No occupation is so delightful to me as the culture of the earth, and no culture comparable to that of the garden."</p>
                </blockquote>
                    <cite>– Thomas Jefferson</cite>
            </div>
        </main>
        
        </div> `;
};

function watchSeasonClick() {
    $('.main-nav').on('click', 'li', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        season = $(this).attr("class");
        getSeasonData(season);
        $('.by-season-content').html(seasonContent(season));
        onAddItemClick();
        onSubmitItemClick();

    });
};


