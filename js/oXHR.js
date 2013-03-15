/* ---------------------------------------------------------------------------------- */
/* Script complet de gestion d'une requête de type XMLHttpRequest                     */
/* ---------------------------------------------------------------------------------- */

var lien;

/*Récupération des données de l'utilisateur
 * Création du lien vers le serveur
 * Appel à la fonction de l'appel au serveur
 * */
function manipulerCalculMonMIEL(eNucTwh, ePhotoTwh, eEolTwh, nbPoints, consommation2050){
        console.log("---------------------------------------------");
        console.log("Construction du lien avec des données :")
    var sVarNucTwh = encodeURIComponent(eNucTwh);
        console.log("eNucTwh : "+sVarNucTwh);
    var sVarPhotoTwh = encodeURIComponent(ePhotoTwh);
        console.log("ePhotoTwh : "+sVarPhotoTwh);
    var sVarEolTwh = encodeURIComponent(eEolTwh);
        console.log("eEolTwh : "+sVarEolTwh);
    var sVarNBPoints = encodeURIComponent(nbPoints);

    var url = "http://localhost:8888/app_dev.php/api/v1/"+consommation2050+".json?"+
     "nuke="+sVarNucTwh +
     "&photo="+sVarPhotoTwh +
     "&eol="+sVarEolTwh +
     "&point="+sVarNBPoints +
     "&hydro=50";
    alert(url);
    console.log("URL : " + url);
        console.log("---------------------------------------------");

    $.ajax({
        url:url,
        method:"GET",
        success:function (data){
            dataJSON=data;
            console.log("DATA-reçu");
            document.getElementById("loadCalculMonMIEL").style.display = "none";
            postActionsJSON();
        },
        error:function (xhr, status, error){
            window.location = "ihm1.php?error=erreurChargementRendu1";
        },
        complete:function(){
            alert(url);},
        dataType:'json'
    });
}