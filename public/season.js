const token = localStorage.getItem('authToken');
const username = localStorage.getItem('username');

function seasonContent(season) {
return `
	<main role="main">

		<div class="common-items">
		</div>

		<div class = "userData season">
		</div>

		<div class="iconAndForm">
		<div class="new-Item" hidden>
		<form id="newItemForm" role="login" action="/server/my-produce/season" method ="post">
			<fieldset>
		    	<legend></legend>

		    	<input type="hidden" id="season" name="season" value="${season}">

		    	<label for="name">Item Name:</label>
		    	<input type="text" id="name" required>
		    	<br>

		    	<label for="germinateIndoors">Germinate Indoors:</label>
		    	<input type="checkbox" id="germinateIndoors">
		    	<br>

		    	<p>Grow From A:</p>
		    	<input type="radio" id="seedOrPlant" name="seedOrPlant">
		    	<label for="seedOrPlant">Seed</label>
		    	<input type="radio" id="seedOrplant" name="seedOrPlant">
		   	 	<label for="seedOrPlant">Plant</label><br/>

		   	 	<label for="plantBy">Plant By:</label>
		    	<input type="date" id="plantBy">
		    	<br>

		  		<label for="datePlanted">Date Planted:</label>
		    	<input type="date" id="datePlanted">  	

		    	<button type="submit">Submit</button>
			</fieldset>
		</form>
		</div>

		<div id = "add-item-icon">
			<i class="fas fa-plus"></i>
		</div>
		</div>
	</main> `
};

// function generateCommonProduce(season) {
// 	   $('.common-items').html(
//            ` <div>
				// ${commonItems.season}
//             </div>`);
// };

// ------------ FUNCTIONS TO RETRIEVE CURRENT LISTS OF PRODUCE -------------
function getSeasonData(season) {
    
    $.ajax({
    	url: `/${season}`,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function(results) {
 		console.log("success");
 		displaySeasonProduce(results);
    })
    .fail(function(err) {
        console.error('Error: ${err.message}');
    });
};

function displaySeasonProduce(data) {
    $('.userData.season').html('');
    onAddItemClick();
    if (data.length === 0) {
        $('.userData.season').html(
            `<div class="noProduceMessage">
                <p>Looks like you haven't chosen what to grow yet!<br>
                Click the "+" icon to add an item.</p>
            </div>`
            )}
    else {
        for (let i = 0; i < data.length; i++) {
            generateSeasonProduce(data[i]);
        };
    };
};

// ---- STILL NEED TO ADD EDIT/DELETE ICON TO WHOLE DIV CREATE EVENT LISTENERS FOR IT
function generateSeasonProduce(data) {
	   $('.userData.season').append(
           ` <div class="indiv-produce">
                <h2 data="${data.id}">${data.name} &#9660;</h2> 

                // THE BELOW SECTION WILL BE SHOWN WHEN A DROP-DOWN TRIANGLE IS HIT
                <div class="${data.name}" id="${data.id}" hidden>
                    <h3>Name:</h3>
                        <p>${data.name}</p>
                    <h3>Germinate Indoors:</h3> 
                        <p>${data.germinateIndoors}</p> 
                    <h3>Seed or Plant</h3>
                        <P>${data.seedorPlant}</p>
                    <h3>Plant By:</h3>
                        <p>${data.plantBy}</p>
                    <h3>Date Planted:</h3>
                        <p>${datePlanted}</p>
                </div>
            </div>`);
};

// --------------- FUNCTIONS FOR ADDING A NEW PRODUCE ITEM --------------
function onAddItemClick() {
	$('div').on('click', '#add-item-icon', function(event) {
		// event.preventDefault();
		$('.new-Item').prop('hidden', false);
	});
	onSubmitItemClick();
}

function onSubmitItemClick() {
	$('#newItemForm').on('submit', function(event) {
		event.preventDefault();
		$('.new-Item').prop('hidden', true);
		 	
		 	const newProduce = {
		 		username: username,
		 		season: $('#season').val(),
		 		name: $('#name').val(),
		 		germinateIndoors:  $('#germinateIndoors').val(),
		 		seedOrPlant: $('#seedOrplant').val(),
		 		plantBy: new Date($('#plantBy').val()),
		 		datePlanted: new Date($('#datePlanted').val())
		 	};

		$('#name').val('');
        $('#germinateIndoors').val('');
        $('#seedOrplant').val('');
        $('#plantBy').val('');
        
        $('#add-plant-form').prop('hidden', true);
        postNewProduce(newProduce);
	});
}

function postNewProduce(season) {
	const season = $(this).attr("class");
	
 	 $.ajax({
    	url: `/${season}`,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function(results) {
 		console.log("success");
 		getSeasonData(season);
    })
    .fail(function(err) {
        console.error('Error: ${err.message}');
    });
};

