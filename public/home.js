let season;


function sendToHomePage() {
    $('.container').remove();
    $('.home-page').html(homePageContent);
    watchSeasonClick();
    watchMenuIconClick();
    watchSpringClick();
    watchSummerClick();
    watchAutumnClick();
    watchWinterClick();
};

function watchLogoClick() {
    $('header').on("click", "#logo", function() {
        sendToHomePage();
    });
};

function homePageContent() {
    return `
        <header role="banner" id="sticky-header">
            <a id="logo" href="#"><img src="images/leaf-logo.png" height="60" width="auto">
            </a>

            <div class="menuIcon">
                <i class="fas fa-bars"></i>
            </div>

            <nav role="navigation" visible>
                <ul class = "main-nav">
                    <li class = "spring">SPRING</li>
                    <li class = "summer">SUMMER</li>
                    <li class = "autumn">AUTUMN</li>
                    <li class = "winter">WINTER</li>
                </ul>
            </nav>
        </header>
        
        <div class = "by-season-content" >
        </div>

        <div class = "home-page-content">
        <main role="main">
            <div id="gardeningBlurb">
                <p> From A Small Seed, A Mighty Garden May Grow </p>
            </div>

            <div id="about">
                <p>I have dreams of growing a beautiful garden. I research produce I want to grow, how to grow it, and when to grow it. 
                Come the appropriate season, I have forgotten what I was going to plant!</p>
                <p> Seedsonal is a site to help people rememeber and take action on their gardening dreams.</p>
                <p><b> Select one of the seasons above to start building your list.</b></p>
                <p>Happy Gardening!</p>
            </div>

            <div class="container1">
                <div class="col-6">
                    <div class="quotes">
                        <blockquote class="bq3" cite="https://www.brainyquote.com/authors/liberty_hyde_bailey">
                            <p>A garden requires patient labor and attention. Plants do not grow merely to satisfy ambitions or to fulfill good intentions. They thrive because someone expended effort on them.</p>
                        </blockquote>
                            <cite>– Liberty Hyde Bailey</cite>
                        <br>
                        <br>
                        <blockquote  class="bq3" cite="https://www.daviddomoney.com/35-inspirational-gardening-quotes-and-famous-proverbs/#.W9e4r2hKjIU">
                            <p>The glory of gardening: hands in the dirt, head in the sun, heart with nature. To nurture a garden is to feed not just on the body, but the soul.</p>
                        </blockquote>
                            <cite>– Alfred Austin</cite>
                    </div>
                </div>

                <div class="col-6">
                    <div class="quotes">
                        <blockquote class="bq3" cite="https://www.brainyquote.com/quotes/thomas_jefferson_157214?src=t_gardening">
                            <p>No occupation is so delightful to me as the culture of the earth, and no culture comparable to that of the garden.</p>
                        </blockquote>
                            <cite>– Thomas Jefferson</cite>
                        <br>
                        <br>
                    </div>
                </div>
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

function watchMenuIconClick() {
    $('.menuIcon').on('click', function(event) {
        event.preventDefault();
        $('nav').prop("visible", true);
    });
};

// DISPLAYING COMMON PRODUCE
function watchSpringClick() {
    $('.main-nav').on('click', '.spring', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        $('.common-items').html(springCommon);
    });
};

function springCommon() {
    return `
        <h2 class="excitedCommon">Commonly Grown Produce</h2>
            <div class="commonList">
            <div class="region-produce">
                <p>High Rainfall</p>
                    <ul>
                        <li>Eggplant</li>
                        <li>Vegetable fern</li>
                        <li>Pumpkin</li>
                        <li>Bamboo shoots</li>
                        <li>Scarlet ivy gourd</li>
                    </ul>
                    <br>
            </div>
            <div class="region-produce">
                <p>Average rainfall</p>
                    <ul>
                        <li>Sweet potatoes</li>
                        <li>Peppers</li>
                        <li>Tomatoes</li>
                        <li>Kidney beans</li>
                        <li>Honeydew</li>
                    </ul>
                    <br>
            </div>
            <div class="region-produce">
                <p>Dry Weather</p>
                    <ul>
                        <li>Asparagus</li>
                        <li>Rhubarb</li>
                        <li>Bitter gourd melon</li>
                        <li>Cucumbers</li>
                        <li>Woody stemmed herbs</li>
                    </ul>
                    <br>
            </div>
                <a href="https://www.gardeningknowhow.com/edible/herbs/hgen/try-something-new-this-spring-grow-your-own-herbs.htm" target="_blank">See Spring Herbs </a>
            </div>
    `;
};

function watchSummerClick() {
    $('.main-nav').on('click', '.summer', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        $('.common-items').html(summerCommon);
    });
};

function summerCommon() {
    return `
        <h2 class="excitedCommon">Commonly Grown Produce</h2>
            <div class="commonList">
                <div class="region-produce">
                    <p>Zones 3 & 4</p>
                        <ul>
                            <li>Kale</li>
                            <li>Broccoli</li>
                            <li>Spinach</li>
                            <li>Carrots</li>
                            <li>Tomatoes</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                <p>Zones 6 & 7</p>
                        <ul>
                            <li>Corn</li>
                            <li>Cabbage</li>
                            <li>Onions</li>
                            <li>Peppers</li>
                            <li>Cucumbers</li>
                            <li>Tomatoes</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                    <p>Zone 9</p>
                        <ul>
                            <li>Cucumber</li>
                            <li>Corn</li>
                            <li>Peppers</li>
                            <li>Olives</li>
                            <li>Raspberries</li>
                        </ul>
                        <br>
                </div>            
                    <a href="https://www.ufseeds.com/learning/planting-schedules/Zone-9-Planting-Calendar" target="_blank">See More Zones</a>
            </div>`
        ;
};

function watchAutumnClick() {
    $('.main-nav').on('click', '.autumn', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        $('.common-items').html(autumnCommon);
    });
};

function autumnCommon() {
    return `
        <h2 class="excitedCommon">Commonly Grown Produce</h2>
            <div class="commonList">
                <div class="region-produce">
                    <p>Northern U.S. and Southern Canada</p>
                        <ul>
                            <li>Arugula</li>
                            <li>Collard greens</li>
                            <li>Lettuce</li>
                            <li>Mustard greens</li>
                            <li>Peas</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                    <p>Mid-Atlantic Region</p>
                        <ul>
                            <li>Bok Choy</li>
                            <li>Mache</li>
                            <li>Radishes</li>
                            <li>Spinach</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                    <p>Southeast/Gulf Coast Region</p>
                        <ul>
                            <li>Beets</li>
                            <li>Kale</li>
                            <li>Cauliflower (Transplants)</li>
                            <li>Carrots</li>
                            <li>Broccoli (Transplants)</li>
                        </ul>
                        <br>
                </div>
                    <a href="https://www.thespruce.com/vegetables-to-plant-in-september-2540001" target="_blank">See More Regions</a>
            </div>
    `;
};

function watchWinterClick() {
    $('.main-nav').on('click', '.winter', function(event) {
        event.preventDefault();
        $('.home-page-content').remove();
        $('.common-items').html(winterCommon);
    });
};

function winterCommon() {
    return `
        <h2 class="excitedCommon">Commonly Grown Produce</h2>
            <div class="commonList">
                <div class="region-produce">
                    <p>In a Greenhouse/ Indoors</p>
                        <ul>
                            <li>Asparagus Pea</li>
                            <li>Basil</li>
                            <li>Leeks</li>
                            <li>Sweet Peppers</li>
                            <li>Early potatoes</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                    <p>In a Cold Frame/ Under Cloches</p>
                        <ul>
                            <li>Beetroot</li>
                            <li>Spring onions</li>
                            <li>Radishes</li>
                            <li>Chicory</li>
                            <li>lettuce</li>
                        </ul>
                        <br>
                </div>
                <div class="region-produce">
                    <p>Direct Sow Outdoors</p>
                        <ul>
                            <li>Hardy broad beans</li>
                        </ul>
                        <br>
                </div>
                    <a href="https://www.thompson-morgan.com/what-to-sow-and-grow-in-february" target="_blank">See More Produce or Flowers</a>
            </div>
    `;
};

