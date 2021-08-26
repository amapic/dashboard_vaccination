import DATA from '../data/france_geojson.js';
// import {liste_id_region,liste_nom_region} from 'fonction'
var _ = require('underscore');


var list_poly = []

DATA.features.forEach(function (item,i) {
	
  var Coords = item.geometry.coordinates;

  var dimensions = [
	Coords.length,
	Coords.reduce((x, y) => Math.max(x, y.length), 0)
  ];


  var paths_list = [];
  // var X=0;
//   if (item.properties.code==="52"){
  for (let pas = 0; pas <= dimensions[0] - 1; pas++) {

	var X;
	if (dimensions[0]===1){
		X=[[Coords][pas][0]];
	}else if (item.properties.code==="84"){
		X=[[Coords][0][pas]];
	}else if (item.properties.code==="94"){
		X=[Coords][0][pas];
	}else if (item.properties.code==="52"){
		X=[Coords][0][pas];
	}else{
		X=[Coords][0][pas];
	}
	
	var paths = _.map([
	 X // doit être un array avec une valeur
	], function (entry) {
	  return _.reduce(entry, function (list, polygon) {
		// This map() only transforms the data.
		_.each(_.map(polygon, function (point) {
		  return {"lat":point[1],"lng": point[0]};
		}), function (point) {
		  list.push(point);
		});

		return list;
	  }, []);
	});
	paths_list.push(paths[0]); //[0]iitialement
}		
// list_poly[item.properties.code]=paths_list;
	  if (paths_list.length === 1) {
		list_poly[item.properties.code]=paths_list[0];
	  }else{
		  list_poly[item.properties.code]=paths_list;
	  }
	// }
// }
});

export var liste_nom_region=[]
liste_nom_region["01"]="Guadeloupe"
liste_nom_region["02"]="Martinique"
liste_nom_region["03"]="Guyane"
liste_nom_region["04"]="La Réunion"
liste_nom_region["11"]="Ile-de-France"
liste_nom_region["24"]="Centre-Val de Loire"
liste_nom_region["27"]="Bourgogne-Franche-Comté"
liste_nom_region["28"]="Normandie"
liste_nom_region["32"]="Hauts-de-France"
liste_nom_region["44"]="Grand Est"
liste_nom_region["52"]="Pays de la Loire"
liste_nom_region["53"]="Bretagne"
liste_nom_region["75"]="Nouvelle-Aquitaine"
liste_nom_region["76"]="Occitanie"
liste_nom_region["84"]="Auvergne-Rhône-Alpes"
liste_nom_region["93"]="Provence-Alpes-Côte d’Azur"
liste_nom_region["94"]="Corse"

export var liste_id_region=[]
liste_id_region["Guadeloupe"]="01"
liste_id_region["Martinique"]="02"
liste_id_region["Guyane"]="03"
liste_id_region["La Réunion"]="04"
liste_id_region["Ile-de-France"]="11"
liste_id_region["Centre-Val de Loire"]="24"
liste_id_region["Bourgogne-Franche-Comté"]="27"
liste_id_region["Normandie"]="28"
liste_id_region["Hauts-de-France"]="32"
liste_id_region["Grand Est"]="44"
liste_id_region["Pays de la Loire"]="52"
liste_id_region["Bretagne"]="53"
liste_id_region["Nouvelle-Aquitaine"]="75"
liste_id_region["Occitanie"]="76"
liste_id_region["Auvergne-Rhône-Alpes"]="84"
liste_id_region["Provence-Alpes-Côte d’Azur"]="93"
liste_id_region["Corse"]="94"

// var new_poly=[]
// const keys = Object.keys(list_poly);
// keys.map((object, i) =>{
// 	new_poly[liste_nom_region[object.toString()]]=list_poly[object]
// })


export default list_poly