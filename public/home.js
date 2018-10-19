function sendToHomePage() {
    $('.container').remove();
    return `
        <div class = "home-page">
        <header role="banner">
            <a href="home.html"><h1>this will be a logo(leaf icon?) top left</h1></a>
            <nav role="navigation">
                <a href="spring.html">Spring</a> |
                <a href="summer.html">Summer</a> |
                <a href="autumn.html">Autumn</a> |
                <a href="winter.html">Winter</a> 
            </nav>
        </header>
        
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
         </div>
};