function sendToHomePage() {
    $('.container').remove();
    $('.home-page').html(homePageContent);
    watchSeasonClick();
};

function homePageContent() {
    return `
        <header role="banner" id="sticky-header">
            <a id="logo" href="home.js"><img src="https://st2.depositphotos.com/8257864/11152/v/950/depositphotos_111524438-stock-illustration-sprout-cute-icon-vector-tree.jpg" height="40" width="auto">
            </a>
                <nav role="navigation">
                    <ul class = "main-nav">
                        <li class = "spring">Spring |</li>
                        <li class = "summer">Summer |</li>
                        <li class = "autumn">Autumn |</li>
                        <li class = "winter">Winter</li>
                    </ul>
                </nav>
        </header>
        
        <div class = "by-season-content" >
        </div>

        <div class = "home-page-content">
        <main role="main">
            
            <div id="gardeningBlurb">
                <p> some long content to fill up this page </p>
            </div>

            <div id="quotes">
                <blockquote cite="https://www.huxley.net/bnw/four.html">
                    <p>Words can be like X-rays, if you use them properly – they'll go through anything. You read and you're pierced.</p>
                </blockquote>
                    <cite>– Aldous Huxley, Brave New World</cite>
                <br>
                <br>
                <blockquote cite="https://www.huxley.net/bnw/four.html">
                    <p>Words can be like X-rays, if you use them properly – they'll go through anything. You read and you're pierced.</p>
                </blockquote>
                    <cite>– Aldous Huxley, Brave New World</cite>
            </div>

        </main>
        
        </div> `;
};

function watchSeasonClick() {
    $('.main-nav').on('click', 'li', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        const season = $(this).attr("class");
        getSeasonData(season);
        // generateCommonProduce(season);
        $('.by-season-content').html(seasonContent(season));
        onAddItemClick();
        onSubmitItemClick();
        
    });
};
