var dataJSON = null;

function calculerMonMIEL(){

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

    // Appel au serveur qui remplit dataJSON avec la valeur retournée
    //Ordre : anneeRef, anneeCible, consommation2050, eNucTwh, ePhotoTwh, eEolTwh
        manipulerCalculMonMIEL(
            anneeRef,
            anneeCible,
            consommation2050,
            nuc_gwh,
            pho_gwh,
            eol_gwh,
            nbPoints);
};

function postActionsJSON(){
    var totalParcPower =
        dataJSON.finalParcPower.nuclear +
        dataJSON.finalParcPower.flame+
        dataJSON.finalParcPower.wind+
        dataJSON.finalParcPower.hydraulic+
        dataJSON.finalParcPower.photovoltaic
        /*+
        dataJSON.targetParcPower.import+
        dataJSON.targetParcPower.step*/
        ;
    console.log("Total Parc(Gw) : "+totalParcPower);

    var perParcTargetNuke       = dataJSON.targetParcPower.nuclear *100 / totalParcPower;
    var perParcFinalNuke        = dataJSON.finalParcPower.nuclear  *100 / totalParcPower;
        console.log("Parc Nuke(Gw) : ["+dataJSON.targetParcPower.nuclear+"]["+dataJSON.finalParcPower.nuclear+"]");
        console.log("Parc Nuke(%) : ["+perParcTargetNuke+"]["+perParcFinalNuke+"]");

    var perParcTargetFlame      = dataJSON.targetParcPower.flame   *100 / totalParcPower;
    var perParcFinalFlame       = dataJSON.finalParcPower.flame    *100 / totalParcPower;
    console.log("Parc Flammes(Gw) : ["+dataJSON.targetParcPower.flame+"]["+dataJSON.finalParcPower.flame+"]");
        console.log("Parc Flammes(%) : ["+perParcTargetFlame+"]["+perParcFinalFlame+"]");

    var perParcTargetEol        = dataJSON.targetParcPower.wind    *100 / totalParcPower;
    var perParcFinalEol         = dataJSON.finalParcPower.wind     *100 / totalParcPower;
    console.log("Parc Eol(Gw) : ["+dataJSON.targetParcPower.wind+"]["+dataJSON.finalParcPower.wind+"]");
    console.log("Parc Eol(%) : ["+perParcTargetEol+"]["+perParcFinalEol+"]");

    var perParcTargetHydrau     = dataJSON.targetParcPower.hydraulic *100   / totalParcPower;
    var perParcFinalHydrau      = dataJSON.finalParcPower.hydraulic  *100   / totalParcPower;
    console.log("Parc Hydro(Gw) : ["+dataJSON.targetParcPower.hydraulic+"]["+dataJSON.finalParcPower.hydraulic+"]");
    console.log("Parc Hydro(%) : ["+perParcTargetHydrau+"]["+perParcFinalHydrau+"]");

    var perParcTargetPhoto      = dataJSON.targetParcPower.photovoltaic *100 / totalParcPower;
    var perParcFinalPhoto       = dataJSON.finalParcPower.photovoltaic  *100 / totalParcPower;
    console.log("Parc Photo(Gw) : ["+dataJSON.targetParcPower.photovoltaic+"]["+dataJSON.finalParcPower.photovoltaic+"]");
    console.log("Parc Photo(%) : ["+perParcTargetPhoto+"]["+perParcFinalPhoto+"]");
    console.log("-----------------------------------------------------------------");

    document.getElementById("parc").style.display = "";
	document.getElementById("calcul").style.display = "";
	
    console.log(dataJSON);
}