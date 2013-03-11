
dataJSON = null;

function realiserCalculMonMIEL(){
    dataJSON = manipulerCalculMonMIEL(
        //Ordre : anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh
        anneeRef,
        anneeCible,
        consommation2050,
        document.getElementById("nuc_gwh").value,
        document.getElementById("pho_gwh").value,
        document.getElementById("eol_gwh").value);


    if(dataJSON==null){
        console.log("informations JSON ne sont pas corrects");
        return;
    }
}