function sendToHomePage() {
    $('.container').remove();
    $('.home-page').html(homePageContent);
    watchSpringClick() 
};

function homePageContent() {
    return `
        <header role="banner" id="sticky-header">
            <a id="logo" href="home.js"><h1>this will be a logo(leaf icon?) top left</h1>
            </a>
                <nav role="navigation">
                    <ul class = "main-nav">
                        <li class = "click spring">Spring |</li>
                        <li class = "click summer">Summer |</li>
                        <li class = "click autumn">Autumn |</li>
                        <li class = "click winter">Winter</li>
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

function watchSpringClick() {
    $('.main-nav li').on('click', function(event) {
        $('.home-page-content').remove();
        getSpringData();
        $('.by-season-content').html(springContent);
    });
};
