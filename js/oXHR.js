/* ---------------------------------------------------------------------------------- */
/* Script complet de gestion d'une requête de type XMLHttpRequest                     */
/* ---------------------------------------------------------------------------------- */

var lien;
var xhr = null;

/*Récupération des données de l'utilisateur
 * Création du lien vers le serveur
 * Appel à la fonction de l'appel au serveur
 * */
function createXhrRequestIhm1(anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh){
    var sVarConsommation2050 = encodeURIComponent(consommation2050);
    var sVarAnneRef = encodeURIComponent(anneeRef);
    var sVarAnneCible = encodeURIComponent(anneeCible);
    var sVarNucTwh = encodeURIComponent(eNucTwh);
    var sVarPhotoTwh = encodeURIComponent(ePhotoTwh);
    var sVarEolTwh = encodeURIComponent(eEolTwh);
    /* lien = "api.monmiel.fr/V1/" +
     sVarConsommation2050 +
     ".json?anneeRef="+sVarAnneRef +
     "&anneCible="+sVarAnneCible +
     "&nucleaire="+sVarNucTwh +
     "&photo="+sVarPhotoTwh +
     "&eol="+sVarEolTwh;*/
    lien="http://localhost:8888/api/v1/700.json";
    console.log("Lien : " + lien);
    request(readData);
}

/*Création de l'objet XMLHttpRequest
* La valeur de retour est cet objet
* */
function getXMLHttpRequest() {
    /*var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;*/
    var xdr = null;

    if (window.XDomainRequest) {
        xdr = new XDomainRequest();
    } else if (window.XMLHttpRequest) {
        xdr = new XMLHttpRequest();
    } else {
        alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
    }
    xdr.onload = function() {
        alert(xdr.responseText);
    }

    return xdr;
}

/*Fonction Request qui envoie des données au serveur
*
* */
function request(callback) {
    /*Annulation de la requete*/
    /*if (xhr && xhr.readyState != 0) {
        xhr.abort(); // On annule la requête en cours !
    }*/
    xhr = getXMLHttpRequest();
    if (xhr && xhr.readyState != 0) {
        alert("Attendez que la requête ait abouti avant de continuer");
        return;
    }

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
            /*
            var json = JSON.parse(xmlhttp.responseText);
            console.log(json);
             */
            document.getElementById("loaderIhm1").style.display = "none";
        } else if (xhr.readyState < 4) {
            document.getElementById("loaderIhm1").style.display = "inline";
        }
    };

    xhr.open("GET", lien);
    //xhr.send("IdEditor=" + value);
    xhr.send();
}

function readData(sData) {
    // On peut maintenant traiter les données sans encombrer l'objet XHR.
    alert("OK");
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