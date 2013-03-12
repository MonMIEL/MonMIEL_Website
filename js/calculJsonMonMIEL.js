var dataJSON = null;

function calculerMonMIEL(){
    // 
    manipulerCalculMonMIEL(
    //Ordre : anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh
        anneeRef,
        anneeCible,
        consommation2050,
        nuc_gwh,
        pho_gwh,
        eol_gwh);

};

function postActionsJSON(){
    document.getElementById("parc").style.display = "";
	document.getElementById("calcul").style.display = "";
	
    console.log(dataJSON);

}