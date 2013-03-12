var dataJSON = null;

function calculerMonMIEL(){
    dataJSON = manipulerCalculMonMIEL(
    //Ordre : anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh
        anneeRef,
        anneeCible,
        consommation2050,
        nuc_gwh,
        pho_gwh,
        eol_gwh);

    if(dataJSON==null){
        console.log("informations JSON ne sont pas corrects");
    }
};
