
export var liste_nom_region=[]
liste_nom_region["1"]="Guadeloupe"
liste_nom_region["2"]="Martinique"
liste_nom_region["3"]="Guyane"
liste_nom_region["4"]="La Réunion"
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
liste_id_region["Guadeloupe"]="1"
liste_id_region["Martinique"]="2"
liste_id_region["Guyane"]="3"
liste_id_region["La Réunion"]="4"
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


export function conversionkey(obj){
    var new_obj=[]
    const keys = Object.keys(obj);
    keys.map((object) =>{
        new_obj[liste_nom_region[object.toString()]]=obj[object]
    })

    return new_obj
}

function createData(time, amount) {
    return {
        time,
        amount
    };
}

export function setDataLim(){

}

export async function getdata(url) {
    const response = await fetch(url,{mode:'cors'})
    const responseData = await response.json()
    if (response.ok) {
        var data = [];
    var arrayTime = [];
    var arrayAmount = [];
        
        for (let key in responseData.datetime){
            let value = responseData.datetime[key];
            arrayTime.push(value);
        }
        for (let key in responseData.n_cum_dose1){
            let value = responseData.n_cum_dose1[key];
            arrayAmount.push(value);
        }
         arrayAmount.forEach((x, i) => data.push(createData(arrayTime[i].toString(), i,i/2)));
         var ff=data.slice(1,10);
         return ff
    } else {
        alert(JSON.stringify(responseData))
        return {responseData, loading: false}
    }
}

