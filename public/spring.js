const token = localStorage.getItem('authToken');
const username = localStorage.getItem('username');

function springContent() {
return `
	<main role="main">

		<div class="common-items">
			<p> Commonly Grown Produce </p>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
			</ul>
		</div>

		<div class = "userData spring">

// DATA FROM generateSpringProduce WILL BE APPENDED HERE ////////////////////////

		</div>

		<div class="new-Item" hidden>
		<form id="newItemForm" >
			<fieldset>
		    	<legend></legend>
		    	<label for="item-name">Item Name:</label>
		    	<input type="text" id="item-name" required>
		    	<br>

		    	<label for="germinate">Germinate Indoors:</label>
		    	<input type="checkbox" id="germinate">
		    	<br>

		    	<p>Grow From A:</p>
		    	<input type="radio" id="seed" name="seedOrPlant">
		    	<label for="seed">Seed</label>
		    	<input type="radio" id="plant" name="seedOrPlant">
		   	 	<label for="plant">Plant</label><br/>

		   	 	<label for="plantBy">Plant By:</label>
		    	<input type="date" id="plantBy">
		    	<br>

		  		<label for="datePlanted">Date Planted:</label>
		    	<input type="date" id="datePlanted">  	
			</fieldset>
		</form>
		</div>

		<div class = "add-item-icon">
			<i class="fas fa-plus"></i>
		</div>
	</main> `
};

function getSpringData(displayProduce) {
    
    $.ajax({
    	url: '/spring/ + username',
    	contentType: 'application/json',
        dataType: 'json',
        method: 'GET'  	
    })
    .done(function(results) {
 		console.log("success");
 		displaySpringProduce(results);
    })
    .fail(function(err) {
        console.error('Error: ${err.message}');
    });
};

function displaySpringProduce(data) {
    $('.userData.spring').html('');
    if (data.length === 0) {
        $('.userData.spring').html(
            `<div class="noProduceMessage">
                <p>Looks like you haven't chosen what to grow yet!<br>
                Click the "+" icon to add an item.</p>
            </div>`
            )}
    else {
        for (let i = 0; i < data.length; i++) {
            generateSpringProduce(data[i]);
        };
    };
};

// STILL NEED TO ADD EDIT/DELETE ICONS EITHER TO WHOLE DIV OR INDIVIDUAL P DATA AND CREATE EVENT LISTENERS FOR THEM
function generateSpringProduce(data) {
	   $('.userData.spring').append(
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

// generateSpringProduce data is based off the returned serialized GET results from the my-produce model:
	// id: this._id,
 //    name: this.name,
 //    germinateIndoors: this.germinateIndoors,
 //    seedorPlant: this.seedorPlant,
 //    plantBy: this.plantBy.toDateString(),
 //    datePlanted: this.datePlanted.toDateString()