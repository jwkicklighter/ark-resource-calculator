var itemTotals = {};
var currentRow = 0;
rows = {};

var craftingObjects = {
  'ladder': {
  	"title": "Wooden Ladder",
  	"modelDate": "06.21.2015",
  	"materials": [
  		{
  			"name": "wood",
  			"quantity": 4
  		},
  		{
  			"name": "thatch",
  			"quantity": 7
  		},
  		{
  			"name": "fiber",
  			"quantity": 4
  		}
  	]
  },
	'woodFoundation': {
  	"title": "Wooden Foundation",
  	"modelDate": "06.21.2015",
  	"materials": [
  		{
  			"name": "wood",
  			"quantity": 80
  		},
  		{
  			"name": "thatch",
  			"quantity": 20
  		},
  		{
  			"name": "fiber",
  			"quantity": 15
  		}
  	]
  },
  'woodRamp': {
  	"title": "Wooden Ramp",
  	"modelDate": "06.21.2015",
  	"materials": [
  		{
  			"name": "wood",
  			"quantity": 60
  		},
  		{
  			"name": "thatch",
  			"quantity": 15
  		},
  		{
  			"name": "fiber",
  			"quantity": 10
  		}
  	]
  },
  'woodRoof': {
  	"title": "Wooden Roof",
  	"modelDate": "06.21.2015",
  	"materials": [
  		{
  			"name": "wood",
  			"quantity": 60
  		},
  		{
  			"name": "thatch",
  			"quantity": 15
  		},
  		{
  			"name": "fiber",
  			"quantity": 10
  		}
  	]
  },
  'woodWall': {
  	"title": "Wooden Wall",
  	"modelDate": "06.21.2015",
  	"materials": [
  		{
  			"name": "wood",
  			"quantity": 40
  		},
  		{
  			"name": "thatch",
  			"quantity": 10
  		},
  		{
  			"name": "fiber",
  			"quantity": 7
  		}
  	]
  }
};

function getCraftingObject(modelName) {
	var base = "models/";
	$.getJSON(base + modelName + ".json", function(json) {
		craftingObjects[modelName] = json;
	});
}

// _.each(craftingObjects, function(n, modelName) {
// 	getCraftingObject(modelName);
// });

function addRow() {
	console.log('addRow()');
	currentRow++;
	rows[currentRow] = true;
	var html = '<div class="row col" id="inputRow-' + currentRow + '">' +
								'<div class="btn-flat btn-large waves-effect col s1 removeBtn" onClick="removeRow(' + currentRow + ')">' +
								'<i class="mdi-action-delete"></i>' +
								'</div>' +
								'<div class="input-field col s4">' +
									'<select id="item-' + currentRow + '">' +
                    '<option value="ladder">Ladder</option>' +
										'<option value="woodFoundation">Wooden Foundation</option>' +
                    '<option value="woodRamp">Wooden Ramp</option>' +
                    '<option value="woodRoof">Wooden Roof</option>' +
                    '<option value="woodWall">Wooden Wall</option>' +
									'</select>' +
									'<label>Crafting Item</label>' +
								'</div>' +
								'<div class="input-field col s1">' +
									'<input type="text" id="quantity-' + currentRow + '" value="1" class="">' +
									'<label for="quantity" class="active">Quantity</label>' +
								'</div>' +
                // '<div class="col s5">' +
                //   '<p class="range-field">' +
                //     '<input type="range" id="quantity-' + currentRow + '" min="0" max="500" value="1" />' +
                //   '</p>' +
                // '</div>' +
							'</div>';

	$('#formRows').append(html);
	setTimeout(function() {
		$('#item-' + currentRow).material_select();
	}, 0);
}

function removeRow(row) {
	console.log('removeRow(' + row + ')');
	rows[row] = false;
	$('#inputRow-' + row).remove();
}

function clearCalculation() {
	itemTotals = {};
}

function adjustCalculation(item, quantity) {
	console.log(item, quantity);
	if (itemTotals[item])
		itemTotals[item] += quantity;
	else
		itemTotals[item] = quantity;

	console.log(item, itemTotals[item]);
}

function displayCalculation() {
	var html = '';

	_.each(itemTotals, function(n, item) {
		if (n > 0)
			html += '<tr><td>' + item + '</td><td>' + n + '</td></tr>';
	});

	$('#output').html(html);
}

function calculate() {
	clearCalculation();
	_.each(rows, function(exists, row) {
		if (exists) {
			var itemName = $('#item-' + row).val();
			var item = craftingObjects[itemName];
			var itemQuantity = $('#quantity-' + row).val();

			_.each(item.materials, function(material) {
				adjustCalculation(material.name, material.quantity * itemQuantity);
			});
		}
	});
	displayCalculation();
}


// Button Listeners
$('#calculateBtn').click(function() {
	calculate();
});

$('#addRowBtn').click(function() {
	addRow();
});
