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
     "&consommation2050="+sVarConsommation2050+
     "&nucleaire="+sVarNucTwh +
     "&photo="+sVarPhotoTwh +
     "&eol="+sVarEolTwh;*/
    var url = "http://localhost:8888/app_dev.php/api/v1/700.json";
        console.log("URL : " + url);
        console.log("---------------------------------------------");

    document.getElementById("loadCalculMonMIEL").innerHTML = "LOADING..";
    $.ajax({
        url:url,
        method:"GET",
        success:function (data){
            dataJSON=data;
            console.log("DATA-reçu");
            postActionsJSON();
        },
        error:function (xhr, status, error){
            window.location = "ihm1.php?error=erreurChargementRendu1";
        },
        complete:function(){
            document.getElementById("loadCalculMonMIEL").style.display = "none";
        },
        dataType:'json'
    });
}