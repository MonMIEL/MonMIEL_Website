var dataJSON = null;

/*---------------Total-du-parc-final--------------------*/
var totalParcPower;
/*------------------------Id-du-parc--------------------*/
var parcTargetNuke;
var parcFinalNuke;
var parcTargetFlame;
var parcFinalFlame;
var parcTargetEol;
var parcFinalEol;
var parcTargetHydrau;
var parcFinalHydrau;
var parcTargetPhoto;
var parcFinalPhoto;
/*---------------Pourcentage-du-parc--------------------*/
var perParcTargetNuke;
var perParcFinalNuke;
var perParcTargetFlame;
var perParcFinalFlame;
var perParcTargetEol;
var perParcFinalEol;
var perParcTargetHydrau;
var perParcFinalHydrau;
var perParcTargetPhoto;
var perParcFinalPhoto;

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

function initialiserVariablesParc(){
    //Calcul du total du parc final
    totalParcPower =
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

    parcTargetNuke = dataJSON.targetParcPower.nuclear;
    parcFinalNuke = dataJSON.finalParcPower.nuclear;
    parcTargetFlame = dataJSON.targetParcPower.flame;
    parcFinalFlame = dataJSON.finalParcPower.flame;
    parcTargetEol = dataJSON.targetParcPower.wind;
    parcFinalEol = dataJSON.finalParcPower.wind;
    parcTargetHydrau = dataJSON.targetParcPower.hydraulic;
    parcFinalHydrau = dataJSON.finalParcPower.hydraulic;
    parcTargetPhoto = dataJSON.targetParcPower.photovoltaic;
    parcFinalPhoto = dataJSON.finalParcPower.photovoltaic;

    //Calcul du parc Nuke
    perParcTargetNuke       = parcTargetNuke *100 / totalParcPower;
    perParcFinalNuke        = parcFinalNuke  *100 / totalParcPower;
        console.log("Parc Nuke(Gw) : ["+parcTargetNuke+"]["+parcFinalNuke+"]");
        console.log("Parc Nuke(%) : ["+perParcTargetNuke+"]["+perParcFinalNuke+"]");

    //Calcul du parc Flame
    perParcTargetFlame      = parcTargetFlame   *100 / totalParcPower;
    perParcFinalFlame       = parcFinalFlame    *100 / totalParcPower;
        console.log("Parc Flammes(Gw) : ["+parcTargetFlame+"]["+parcFinalFlame+"]");
        console.log("Parc Flammes(%) : ["+perParcTargetFlame+"]["+perParcFinalFlame+"]");

    //Calcul du parc Eolien
    perParcTargetEol        = parcTargetEol    *100 / totalParcPower;
    perParcFinalEol         = parcFinalEol     *100 / totalParcPower;
    console.log("Parc Eol(Gw) : ["+parcTargetEol+"]["+parcFinalEol+"]");
    console.log("Parc Eol(%) : ["+perParcTargetEol+"]["+perParcFinalEol+"]");

    //Calcul du parc Hydraulique
    perParcTargetHydrau     = parcTargetHydrau *100   / totalParcPower;
    perParcFinalHydrau      = parcFinalHydrau  *100   / totalParcPower;
    console.log("Parc Hydro(Gw) : ["+parcTargetHydrau+"]["+parcFinalHydrau+"]");
    console.log("Parc Hydro(%) : ["+perParcTargetHydrau+"]["+perParcFinalHydrau+"]");

    //Calcul du parc Photovoltaique
    perParcTargetPhoto      = parcTargetPhoto *100 / totalParcPower;
    perParcFinalPhoto       = parcFinalPhoto  *100 / totalParcPower;
    console.log("Parc Photo(Gw) : ["+parcTargetPhoto+"]["+parcFinalPhoto+"]");
    console.log("Parc Photo(%) : ["+perParcTargetPhoto+"]["+perParcFinalPhoto+"]");
    console.log("-----------------------------------------------------------------");
}

function majBarresParcCalcule(){
    //MaJ des barres de l'IHM du Parc calculé
    $("#barParcTargetNuke .bar").css("width",""+perParcTargetNuke+"%");
    $("#barParcFinalNuke .bar").css("width",""+perParcFinalNuke+"%");


    $("#barParcTargetPhoto .bar").css("width",""+perParcTargetPhoto+"%");
    $("#barParcFinalPhoto .bar").css("width",""+perParcFinalPhoto+"%");

    $("#barParcTargetEol .bar").css("width",""+perParcTargetEol+"%");
    $("#barParcFinalEol .bar").css("width",""+perParcFinalEol+"%");

    $("#barParcTargetHydrau .bar").css("width",""+perParcTargetHydrau+"%");
    $("#barParcFinalHydrau .bar").css("width",""+perParcFinalHydrau+"%");

    $("#barParcTargetFlame .bar").css("width",""+perParcTargetFlame+"%");
    $("#barParcFinalFlame .bar").css("width",""+perParcFinalFlame+"%");
}

function majChiffresParcCalcule(){

    $("#idParcTargetNuke").append(parcTargetNuke.toFixed(0));
    $("#idParcFinalNuke").append(parcFinalNuke.toFixed(0));

    $("#idParcTargetPhoto").append(parcTargetPhoto.toFixed(0));
    $("#idParcFinalPhoto").append(parcFinalPhoto.toFixed(0));

    $("#idParcTargetEol").append(parcTargetEol.toFixed(0));
    $("#idParcFinalEol").append(parcFinalEol.toFixed(0));

    $("#idParcTargetHydrau").append(parcTargetHydrau.toFixed(0));
    $("#idParcFinalHydrau").append(parcFinalHydrau.toFixed(0));

    $("#idParcTargetFlame").append(parcTargetFlame.toFixed(0));
    $("#idParcFinalFlame").append(parcFinalFlame.toFixed(0));

    var op;
    var diffParcNuke = parcFinalNuke - parcTargetNuke;
    op=""; if(diffParcNuke>0) op="+";
    document.getElementById("idDiffParcNuke").innerHTML = op + diffParcNuke.toFixed(0);

    var diffParcPhoto = parcFinalPhoto - parcTargetPhoto;
    op=""; if(diffParcPhoto>0) op="+";
    document.getElementById("idDiffParcPhoto").innerHTML = op + diffParcPhoto.toFixed(0);

    var diffParcEol = parcFinalEol - parcTargetEol;
    op=""; if(diffParcEol>0) op="+";
    document.getElementById("idDiffParcEol").innerHTML = op + diffParcEol.toFixed(0);

    var diffParcHydrau = parcFinalHydrau - parcTargetHydrau;
    op=""; if(diffParcHydrau>0) op="+";
    document.getElementById("idDiffParcHydrau").innerHTML = op + diffParcHydrau.toFixed(0);

    var diffParcFlame = parcFinalFlame - parcTargetFlame;
    op=""; if(diffParcFlame>0) op="+";
    document.getElementById("idDiffParcFlame").innerHTML = op + diffParcFlame.toFixed(0);
}

function postActionsJSON(){

    initialiserVariablesParc();

    majBarresParcCalcule();

    majChiffresParcCalcule();

    document.getElementById("parc").style.display = "";
	document.getElementById("calcul").style.display = "";
	
    console.log(dataJSON);
}