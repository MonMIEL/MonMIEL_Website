/* ---------------------------------------------------------------------------------- */
/* Script complet de gestion d'une requête de type XMLHttpRequest                     */
/* ---------------------------------------------------------------------------------- */

var lien;

/*Récupération des données de l'utilisateur
 * Création du lien vers le serveur
 * Appel à la fonction de l'appel au serveur
 * */
function createXhrRequestIhm1(anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh){

    var url = 'json_test.php';
   // $.getJSON(url, function() {console.log("LALA")});

    $.ajax({
        url:url,
        method:"GET",
        success:function (data){
            console.log("DATA ok");
            console.log(data);
        },
        error:function (xhr, status, error){
            alert("Erreur de chargement du fichier '"+url+"' : "+xhr.responseText+" ("+status+" - "+error+")");
        },
        dataType:'json'
    });

}

/*Création de l'objet XMLHttpRequest
* La valeur de retour est cet objet
* */
function createCORSRequest(method, url) {

}

/*Fonction Request qui envoie des données au serveur
*
* */
function request(callback) {

}

function readData(sData, bool) {
    // On peut maintenant traiter les données sans encombrer l'objet XHR.
    if (bool==true){
        alert("OK");
    }else{
        alert("NOK");
    }
}

/*function callback(oJson) {
    var tree = "", nbItems;

    for (sItem in oJson) {
        tree += sItem + "\n";
        nbItems = oJson[sItem].length;

        for (var i=0; i<nbItems; i++) {
            tree += "\t" + oSoftwares[sItem][i] + "\n";
        }
    }
    alert(tree);
}*/