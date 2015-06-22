var itemTotals = {};
var currentRow = 0;
rows = {};

var craftingObjects = {
	'woodFoundation': {}
};

function getCraftingObject(modelName) {
	var base = "../models/";
	$.getJSON(base + modelName + ".json", function(json) {
		craftingObjects[modelName] = json;
	});
}

_.each(craftingObjects, function(n, modelName) {
	getCraftingObject(modelName);
});

function addRow() {
	console.log('addRow()');
	currentRow++;
	rows[currentRow] = true;
	var html = '<div class="row col" id="inputRow-' + currentRow + '">' +
								'<div class="btn-flat btn-large waves-effect col s1 removeBtn" onClick="removeRow(' + currentRow + ')">' +
								'<i class="mdi-action-delete"></i>' +
								'</div>' +
								'<div class="input-field col s5">' +
									'<select id="item-' + currentRow + '">' +
										'<option value="woodFoundation">Wooden Foundation</option>' +
									'</select>' +
									'<label>Crafting Item</label>' +
								'</div>' +
								'<div class="input-field col s5">' +
									'<input type="text" id="quantity-' + currentRow + '" value="" class="">' +
									'<label for="quantity">Quantity</label>' +
								'</div>' +
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

addRow();

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
