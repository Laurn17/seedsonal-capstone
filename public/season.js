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
		<form id="newItemForm" role="login" method ="post">
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
		    	<input type="radio" id="seed" name="seedOrPlant" value="seed">
		    	<label for="seed">Seed</label>
		    	<input type="radio" id="plant" name="seedOrPlant" value="plant">
		   	 	<label for="plant">Plant</label><br/>

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
function displayProduceTitle() {
	return ` <h2 id="excited">I'm excited to grow:</h2>`
};

function generateSeasonProduce(data) {
	   $('.userData.season').html(displayProduceTitle);
	   $('.userData.season').append(
           ` <div id="${data.id}" class="indiv-produce">
                <h3 data="${data.id}">${data.name} 
                	<div id="arrow">&#9660;</div>
                	<div id="edit">&#9998</div>
                	<div id="delete">&#10062</div>
                </h3>
                <hr hidden>
                <div class="moreInfo" id="${data.id}" hidden>
                	
                    <h4>Germinate Indoors:</h4> 
                        <span>${data.germinateIndoors}</span>
                        <br>
                    <h4>Seed or Plant:</h3>
                        <span>${data.seedorPlant}</span>
                        <br>
                    <h4>Plant By:</h4>
                        <span>${data.plantBy}</span>
                        <br>
                    <h4>Date Planted:</h4>
                        <span>${datePlanted}</span>
                </div>
            </div>`);
	   onArrowClick();
	   onDeleteItemClick();
};

function onArrowClick() {
	$('#arrow').on('click', function(event) {
		event.preventDefault();
		$('.moreInfo').toggle("slide");
		$('hr').toggle();
	});
};

// --------------- FUNCTIONS FOR ADDING A NEW PRODUCE ITEM --------------
function onAddItemClick() {
	$('div').on('click', '#add-item-icon', function(event) {
		event.preventDefault();
		$('.new-Item').toggle();
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
		 		germinateIndoors: $('#germinateIndoors').prop("checked"),
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

function postNewProduce(newProduce) {

 	 $.ajax({
    	url: `/${newProduce.season}`,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
         data: JSON.stringify(newProduce)
    })
    .done(function(results) {
 		console.log("success");
 		getSeasonData(newProduce.season);
    })
    .fail(function(err) {
        console.error(err);
    });
};

// -------------- FUNCTIONS TO DELETE A PRODUCE ITEM -----------

function onDeleteItemClick() {
	$('#delete').on('click', function(event) {
		event.preventDefault();
		alert("Are you sure you want to delete this item?");
		const target = $(this).parents('.indiv-produce').attr("id");
		deleteProduceItem(target);
		console.log(target.season)
	});
};

function deleteProduceItem(_id) {
	// Do I need to target a season to delete something?
	// how do i get the season from having the produce id?
	// const season = ObjectId.season;

 	$.ajax({
    	url: `/${season}/` + _id,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function() {
 		console.log("item deleted");
 		getSeasonData();
    })
    .fail(function(err) {
        console.error(err);
    });
};
