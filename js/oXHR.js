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

	// Chargement
    var opts = {
	  lines: 7, // The number of lines to draw
	  length: 17, // The length of each line
	  width: 9, // The line thickness
	  radius: 23, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 13, // The rotation offset
	  color: '#000', // #rgb or #rrggbb
	  speed: 0.9, // Rounds per second
	  trail: 84, // Afterglow percentage
	  shadow: true, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('loadCalculMonMIEL');
	var spinner = new Spinner(opts).spin(target);
	// !Chargement
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