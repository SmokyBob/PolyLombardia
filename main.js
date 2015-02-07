var template = document.getElementById("mainContent");
var province = [];
var markers = [];
var tipologia = [];
var prezzo = [];

var origin = "EMPTY";

var gratis = false;

template.addEventListener('template-bound', function(e) {

	template.url_entry = 'https://www.dati.lombardia.it/resource/iu2c-9p5j.json';
	template.source_name = ['Musei','TODO1','TODO2'];
	template.source_url = ['https://www.dati.lombardia.it/resource/iu2c-9p5j.json','TODO','TODO'];
	template.origin = "";

	template.selectOrigin = function(e) {
		switch (e.detail.item.id) {
			case 'Musei': 
				origin = template.source_url[0];
				break;
			case 'TODO1': 
				origin = template.source_url[1];
				break;
			case 'TODO2': 
				origin = template.source_url[2];
				break;
		};

		console.log(origin);
		template.origin = origin;
	}

	template.select = function() {
		markers = [];
		template.items.forEach(function(item) {
			if (gratis){
				if ((template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia) && 
					(template.selectedTipo==null || template.selectedTipo==item.museo_tipologia) &&
					(item.museo_ingresso=="GRATUITO")) { 
					markers.push(item); 
				} 
			} else {
				if ((template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia) && 
					(template.selectedTipo==null || template.selectedTipo==item.museo_tipologia)) {
					markers.push(item);
				}
			}
		}) 
		template.markers = markers;
	}

	template.selectGratuiti = function() {
		gratis = !gratis;
		markers = [];
		template.items.forEach(function(item) {
			if (gratis) {
				if ((template.selectedTipo==null || template.selectedTipo==item.museo_tipologia) && 
					(template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia) &&
					(item.museo_ingresso=="GRATUITO")) {
					markers.push(item);
				} 
			} else {
				if ((template.selectedTipo==null || template.selectedTipo==item.museo_tipologia) && 
					(template.selectedProvincia==null || template.selectedProvincia==item.sede_provincia)) { 
					markers.push(item);
				}
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