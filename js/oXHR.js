/* ---------------------------------------------------------------------------------- */
/* Script complet de gestion d'une requête de type XMLHttpRequest                     */
/* ---------------------------------------------------------------------------------- */

var lien;

/*Récupération des données de l'utilisateur
 * Création du lien vers le serveur
 * Appel à la fonction de l'appel au serveur
 * */
function manipulerCalculMonMIEL(anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh){
    console.log("---------------------------------------------");
    console.log("Construction du lien avec des données :")
    var sVarConsommation2050 = encodeURIComponent(consommation2050);
    console.log("consommation2050 : "+sVarConsommation2050);
    var sVarAnneRef = encodeURIComponent(anneeRef);
    console.log("anneeRef : "+sVarAnneRef);
    var sVarAnneCible = encodeURIComponent(anneeCible);
    console.log("anneeCible : "+sVarAnneCible);
    var sVarNucTwh = encodeURIComponent(eNucTwh);
    console.log("eNucTwh : "+sVarNucTwh);
    var sVarPhotoTwh = encodeURIComponent(ePhotoTwh);
    console.log("ePhotoTwh : "+sVarPhotoTwh);
    var sVarEolTwh = encodeURIComponent(eEolTwh);
    console.log("eEolTwh : "+sVarEolTwh);
    /* lien = "http://localhost:8888/app_dev.php/api/v1/700.json?"+
     "anneeRef="+sVarAnneRef +
     "&anneCible="+sVarAnneCible +
     "&nucleaire="+sVarNucTwh +
     "&photo="+sVarPhotoTwh +
     "&eol="+sVarEolTwh;*/
    var url = "http://localhost:8888/app_dev.php/api/v1/700.json";
    console.log("URL : " + url);
    console.log("---------------------------------------------");

   // $.getJSON(url, function() {console.log("LALA")});

    var dataJSON = null;

    $.ajax({
        url:url,
        method:"GET",
        success:function (data){
            dataJSON=data;
            console.log("DATA-ok");
            console.log(dataJSON);
        },
        error:function (xhr, status, error){
            alert("Erreur de chargement du fichier '"+url+"' : "+xhr.responseText+" ("+status+" - "+error+")");
        },
        dataType:'json'
    });

    return dataJSON;

}

/*Création de l'objet XMLHttpRequest
* La valeur de retour est cet objet
* */
function createCORSRequest(method, url) {

}

function readData(sData, bool) {
    // On peut maintenant traiter les données sans encombrer l'objet XHR.
    if (bool==true){
        alert("OK");
    }else{
        alert("NOK");
    }
}