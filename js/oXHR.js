/* ---------------------------------------------------------------------------------- */
/* Script complet de gestion d'une requête de type XMLHttpRequest                     */
/* ---------------------------------------------------------------------------------- */

var lien;

/*Récupération des données de l'utilisateur
 * Création du lien vers le serveur
 * Appel à la fonction de l'appel au serveur
 * */
function createXhrRequestIhm1(anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh){

/*
    $.ajax({
        type: "GET",
        url: "http://api.shoppingadventure.fr/store/v1/fr/stores/paris.json?rows=30&offset=0&partner-id=test-mobile",
        success: function(html){
            alert("here");
        }
    });
*/
    var url = 'http://api.shoppingadventure.fr/store/v1/fr/stores/paris.json?rows=30&offset=0&partner-id=test-mobile?callback=?';
   // $.getJSON(url, function() {console.log("LALA")});

    $.ajax({
        async:false,
        crossDomain:false,
        url:url,
        method:"GET",
        succss:function (data){
            console.log("DATA ok");
        },
        error:function (xhr, status, error){
            alert("Erreur de chargement du fichier '"+url+"' : "+xhr.responseText+" ("+status+" - "+error+")");
        },
        dataType:'text'
    });


    //
//    $.get("http://api.shoppingadventure.fr/store/v1/fr/stores/paris.json?rows=30&offset=0&partner-id=test-mobile",function(data){
//        console.log('je suis dans le get');
////
////            Force Paris Store
//        //$.get("/store/v1/fr/stores/48.8597987/2.3634236.json?rows=6&offset=0&q="+search+"&partner-id=public-website",function(stores){
////console.log(stores);
//        if(data != undefined) {
//            console.log("Data ok");
//
//            readData(data, true);
//        } else {callback(data, false)}
//    });



//    var sVarConsommation2050 = encodeURIComponent(consommation2050);
//    var sVarAnneRef = encodeURIComponent(anneeRef);
//    var sVarAnneCible = encodeURIComponent(anneeCible);
//    var sVarNucTwh = encodeURIComponent(eNucTwh);
//    var sVarPhotoTwh = encodeURIComponent(ePhotoTwh);
//    var sVarEolTwh = encodeURIComponent(eEolTwh);
//    /* lien = "api.monmiel.fr/V1/" +
//     sVarConsommation2050 +
//     ".json?anneeRef="+sVarAnneRef +
//     "&anneCible="+sVarAnneCible +
//     "&nucleaire="+sVarNucTwh +
//     "&photo="+sVarPhotoTwh +
//     "&eol="+sVarEolTwh;*/
//    lien="http://localhost:8888/api/v1/700.json";
//    lien="http://api.shoppingadventure.fr/store/v1/fr/stores/paris.json?rows=30&offset=0&partner-id=test-mobile";
//    //lien="http://localhost:8098/riak/test";
//    console.log("Lien : " + lien);
//    request(readData);
}

///*Création de l'objet XMLHttpRequest
//* La valeur de retour est cet objet
//* */
//function createCORSRequest(method, url) {
//    /*var xhr = null;
//
//    if (window.XMLHttpRequest || window.ActiveXObject) {
//        if (window.ActiveXObject) {
//            try {
//                xhr = new ActiveXObject("Msxml2.XMLHTTP");
//            } catch(e) {
//                xhr = new ActiveXObject("Microsoft.XMLHTTP");
//            }
//        } else {
//            xhr = new XMLHttpRequest();
//        }
//    } else {
//        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
//        return null;
//    }
//
//    return xhr;*/
//
//    /*
//    var xdr = null;
//
//    if (window.XDomainRequest) {
//        xdr = new XDomainRequest();
//        alert("XDomainRequest init !");
//    } else if (window.XMLHttpRequest) {
//        xdr = new XMLHttpRequest();
//        alert("XMLHttpRequest init !");
//    } else {
//        alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
//    }
//    xdr.onload = function() {
//        alert(xdr.responseText);
//    }
//
//    return xdr;*/
//
//    var xhr = new XMLHttpRequest();
//    if ("withCredentials" in xhr) {
//
//        // Check if the XMLHttpRequest object has a "withCredentials" property.
//        // "withCredentials" only exists on XMLHTTPRequest2 objects.
//        xhr.open(method, url, true);
//
//    } else if (typeof XDomainRequest != "undefined") {
//
//        // Otherwise, check if XDomainRequest.
//        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//        xhr = new XDomainRequest();
//        xhr.open(method, url);
//
//    } else {
//
//        // Otherwise, CORS is not supported by the browser.
//        xhr = null;
//
//    }
//    return xhr;
//}

/*Fonction Request qui envoie des données au serveur
*
* */
function request(callback) {
    /*Annulation de la requete*/
    /*if (xhr && xhr.readyState != 0) {
        xhr.abort(); // On annule la requête en cours !
    }*/
//    xhr = getXMLHttpRequest();
//    if (xhr && xhr.readyState != 0) {
//        alert("Attendez que la requête ait abouti avant de continuer");
//        return;
//    }
//
//    xhr.onreadystatechange = function() {
//
//        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
//            callback(xhr.responseText);
//            /*
//            var json = JSON.parse(xmlhttp.responseText);
//            console.log(json);
//             */
//            document.getElementById("loaderIhm1").style.display = "none";
//        } else if (xhr.readyState < 4) {
//            document.getElementById("loaderIhm1").style.display = "inline";
//        }
//    };
//
//    xhr.open("GET", lien);
//    //xhr.send("IdEditor=" + value);
//    xhr.send();

    // All HTML5 Rocks properties support CORS.
/*
    var xhr = createCORSRequest('GET', lien);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        alert('Response from CORS request to ' + url);
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();*/
/*
    $.getJSON(lien, function(json) {
        alert("JSON Data: " + json);
    });
*/
/*
    $.getJSON(lien, null, function (results) {
        alert('Cross domain JS call achieved. Have your implementation going in here!');
    });
*/
    /*
    var urlFlickr = "http://weather.yahooapis.com/forecastjson?jsoncallback=?&w=2295424";
    jQuery.ajax({
        async: false,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        url: lien,
        success: function(data){
            alert("OK3");
            // here you have to navigate the array

        },
        error: function(msg){
            console.debug("error contacting JSON server side component...");
            console.debug(msg);
        }
    });*/
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