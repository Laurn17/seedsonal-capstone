const token = localStorage.getItem('authToken');
const username = localStorage.getItem('username');
const currentSeason = localStorage.getItem('season');

function seasonContent(season) {
return `
	<main role="main">

		<div class ="container">
			<div class="col-6">
				<div class="common-items">
				</div>
			</div>

			<div class="col-6">
				<div class ="userData season">
				</div>
			</div>
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
		    	<input type="radio" id="seed" name="seedOrPlant" value="seed" required>
		    	<label for="seed">Seed</label>
		    	<input type="radio" id="plant" name="seedOrPlant" value="plant" required>
		   	 	<label for="plant">Plant</label><br/>

		   	 	<label for="plantBy">Plant By:</label>
		    	<input type="date" id="plantBy" required>
		    	<br>

		  		<label for="datePlanted">Date Planted:</label>
		    	<input type="date" id="datePlanted">  	

		    	<button id="newButton" type="submit">Submit</button>
			</fieldset>
		</form>
		</div>

		<div id = "add-item-icon">
			<i class="fas fa-plus"></i>
		</div>
		</div>
	</main> 

	<footer role="contentinfo"><div class="footer-img"></div></footer>`
};


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
 		console.log("Getting Produce Data");
 		displaySeasonProduce(results);
    })
    .fail(function(err) {
        console.error('Error: ${err.message}');
    });
};

function displaySeasonProduce(data) {
    $('.userData.season').html('');
    if (data.length === 0) {
        $('.userData.season').html(
            `<div class="noProduceMessage" aria-live="assertive">
                <p>Looks like you haven't chosen what to grow yet!<br><br>
                Click the "+" icon to add an item.</p>
            </div>`
            )}
    else {
    	$('.userData.season').html(displayProduceTitle);
        for (let i = 0; i < data.length; i++) {
            generateSeasonProduce(data[i]);

        };
        onArrowClick();
	    onEditItemClick();
	    onDeleteItemClick(data);
	    watchLogoClick();

    };
};


// ---- STILL NEED TO ADD EDIT/DELETE ICON TO WHOLE DIV CREATE EVENT LISTENERS FOR IT
function displayProduceTitle() {
	return ` <h2 id="excited">My ${season} Produce</h2>`
};

function generateSeasonProduce(data) {
	console.log("Displayed Season Produce");
	   $('.userData.season').append(
           ` <div id="${data.id}" class="indiv-produce">
                <h3 data="${data.id}">${data.name} 
                	<button class="delete">&#x2297</button>
                	<button class="arrow">&#9660;</button>               	
                </h3>
                <hr hidden>
                <div class="moreInfo" id="${data.id}" hidden>
                	<ul>
                		<li class = "germinateSection">
		                    <h4>Germinate Indoors:</h4> 
		                        <span>${data.germinateIndoors}
		                        	<button class="edit">&#9998</button>
		                        </span>
		                        <form class="germinate-edit" hidden>
		                            <input type="checkbox" id="editgerminate" aria-label="germinate">
		                            <label for="editgerminate">Checked = Yes</label>
		                            <button type="submit" class="submit-button">Save</button>
		                        </form>
		                    <br>
	                    </li>

	                    <li class = "seedOrPlantSection">
		                    <h4>Seed or Plant:</h3>
		                        <span >${data.seedOrPlant}
		                            <button class="edit">&#9998</button>
		                        </span>
		                        <form class="seedorplant-edit" hidden>
									<input type="radio" id="editseed" name="editseedOrPlant" value="seed">
				    				<label for="editseed">Seed</label>
				    				<input type="radio" id="editplant" name="editseedOrPlant" value="plant">
				   	 				<label for="editplant">Plant</label><br/>
				   	 				<button type="submit" class="submit-button">Save</button>
		                        </form>
	                        <br>
	                    </li>

	                    <li class = "plantBySection">
		                    <h4>Plant By:</h4>
		                        <span >${data.plantBy}
		                           	<button class="edit">&#9998</button>
		                        </span>
		                        <form class="plantBy-edit" hidden>
		                        	<label for="editplantBy"></label>
		    						<input type="date" id="editplantBy" required>
		    						<button type="submit" class="submit-button">Save</button>
		    					</form>
	                        <br>
	                    </li>

	                    <li class= "datePlantedSection">
		                    <h4>Date Planted:</h4>
		                        <span >${data.datePlanted}
		                           	<button class="edit">&#9998</button>
		                        </span>
		                        <form class= "datePlanted-edit" hidden>
		                        	<label for="editdatePlanted"></label>
		    						<input type="date" id="editdatePlanted">
		    						<button type="submit" class="submit-button">Save</button>	
		                        </form>
		                </li>
                    <ul>
                </div>
            </div>`);
};

function onArrowClick() {
	$('.arrow').on('click', function(event) {
		event.preventDefault();
		const plant = $(this).parents(".indiv-produce").find(".moreInfo");
		plant.toggle();
		const lineBreak = $(this).parents(".indiv-produce").find("hr");
		lineBreak.toggle();
	});
};

// --------------- FUNCTIONS FOR ADDING A NEW PRODUCE ITEM --------------
function onAddItemClick() {
	$('.iconAndForm').on('click', '#add-item-icon', function(event) {
		event.preventDefault();
		$('.new-Item').toggle();
	});
}

function onSubmitItemClick() {
	$('#newItemForm').on('submit', function(event) {
		console.log("Submitted a New Item");
		event.preventDefault();
		$('.new-Item').toggle();

		 	const newProduce = {
		 		username: username,
		 		season: $('#season').val(),
		 		name: $('#name').val(),
		 		germinateIndoors: $('#germinateIndoors').prop("checked"),
		 		seedOrPlant: $('[name="seedOrPlant"]:checked').val(),
		 		plantBy: new Date($('#plantBy').val()),
		 		datePlanted: $('#datePlanted').val()
		 	};
		$('#name').val('');
        $('#germinateIndoors').val('');
        $('#seedOrplant').val('');
        $('#plantBy').val('');
        
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
 		console.log("Created a New Item");
 		getSeasonData(newProduce.season);
    })
    .fail(function(err) {
        console.error(err);
    });
};

// -------------- FUNCTIONS TO DELETE A PRODUCE ITEM -----------

function onDeleteItemClick(season) {
	$('.delete').on('click', function(event) {
		event.preventDefault();
		alert("This item will be deleted forever");
		const target = $(this).parents('.indiv-produce').attr("id");
		deleteProduceItem(target);
	});
};

function deleteProduceItem(_id) {

 	$.ajax({
    	url: `/${_id}/`,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function() {
    	console.log("Deleted An Item");
    	getSeasonData(season);
    })
    .fail(function(err) {
        console.error(err);
    });
};
// -------------- FUNCTIONS TO EDIT A PRODUCE ITEM -----------

function onEditItemClick() {
$('.indiv-produce').on('click', '.edit', function(event) {
		event.preventDefault();
		const produceId = event.target.closest('div').id;
		const formTarget = event.target.closest('li').className;
		const target = $('.userData.season').find(`#${produceId}`).find(`.${formTarget}`);
        target.children('form').toggle();
		editSubmit(target);
	});
};

function editSubmit(data) {
	$('.indiv-produce').on('submit', '.germinate-edit', function(event) {
		event.preventDefault();
		const produceId = event.target.closest('div').id;
		const formTarget = event.target.closest('li').className;
		const updateInfo = $('.userData.season').find(`#${produceId}`).find(`.${formTarget}`).children('form').children('input').prop("checked");
		
		const newProduceInfo = {
			id: produceId,
			germinateIndoors: updateInfo
		};
		putEditProduce(produceId, newProduceInfo);
	});
	$('.indiv-produce').on('submit', '.seedorplant-edit', function(event) {
		event.preventDefault();
		const produceId = event.target.closest('div').id;
		const formTarget = event.target.closest('li').className;
		const updateInfo = $(`#${produceId} .${formTarget} input:checked`).val();
		
		const newProduceInfo = {
			id: produceId,
			seedOrPlant: updateInfo
		};
		putEditProduce(produceId, newProduceInfo);
	});
	$('.indiv-produce').on('submit', '.plantBy-edit', function(event) {
		event.preventDefault();
		const produceId = event.target.closest('div').id;
		const formTarget = event.target.closest('li').className;
		const updateInfo = $('.userData.season').find(`#${produceId}`).find(`.${formTarget}`).children('form').children('input').val();
		
		const newProduceInfo = {
			id: produceId,
			plantBy: updateInfo
		};
		putEditProduce(produceId, newProduceInfo);
	});
		$('.indiv-produce').on('submit', '.datePlanted-edit', function(event) {
		event.preventDefault();
		const produceId = event.target.closest('div').id;
		const formTarget = event.target.closest('li').className;
		const updateInfo = $('.userData.season').find(`#${produceId}`).find(`.${formTarget}`).children('form').children('input').val();
		
		const newProduceInfo = {
			id: produceId,
			datePlanted: updateInfo
		};
		putEditProduce(produceId, newProduceInfo);
	});
};

// function onEditProduceSave() {

// };

function putEditProduce(_id, newProduceInfo) {

 	$.ajax({
    	url: `/${_id}/`,
    	contentType: 'application/json',
        dataType: 'json',
        method: 'PUT',
		data: JSON.stringify(newProduceInfo),
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function(results) {
 		console.log("Item Updated");
 		getSeasonData(season);
    })
    .fail(function(err) {
        console.error(err);
    });
};

