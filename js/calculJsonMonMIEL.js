var dataJSON = null;

function calculerMonMIEL(){
    // Appel au serveur qui remplit dataJSON avec la valeur retournée
    //Ordre : anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh
        manipulerCalculMonMIEL(
            anneeRef,
            anneeCible,
            consommation2050,
            nuc_gwh,
            pho_gwh,
            eol_gwh);
};

function postActionsJSON(){
    document.getElementById("parc").style.display = "";
    console.log(dataJSON);
}