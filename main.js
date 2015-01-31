var template = document.getElementById("mainContent");
var province = [];
var markers = [];
var tipologia = [];

template.addEventListener('template-bound', function(e) {
	//template.dataList = [{'url': 'https://www.dati.lombardia.it/resource/iu2c-9p5j.json'}]
	template.selectProvincia = function() {
		markers = [];
		template.items.forEach(function(item) {
			if ((template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia) && (template.selectedTipo==null || template.selectedTipo==item.museo_tipologia)) {
					markers.push(item); 
				} 
		}) 
		template.markers = markers;
	}

	template.selectTipologia = function() {
		markers = [];
		template.items.forEach(function(item) {
			if ((template.selectedTipo==null || template.selectedTipo==item.museo_tipologia) && (template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia)) {
					markers.push(item);
				} 
		}) 
		template.markers = markers;
	}



	template.itemsChanged = function() {
		template.items.forEach(function(item) {
			var found = false;
			province.some(function (prv) {
					if (prv==item.sede_provincia) {
					found=true;
				} return found;
			})
		if (!found) province.push(item.sede_provincia);

		found = false;

		tipologia.some(function (tipo) {
					if (tipo==item.museo_tipologia) {
					found=true;
				} return found;
			})
		if (!found) tipologia.push(item.museo_tipologia);

		markers.push(item);
		})

	template.province = province;
	template.markers = markers;
	template.tipologia = tipologia;



	}

});


