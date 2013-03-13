var dataJSON = null;

var valeur="MW";
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
        console.log("Parc Nuke(Mw) : ["+parcTargetNuke+"]["+parcFinalNuke+"]");
        console.log("Parc Nuke(%) : ["+perParcTargetNuke+"]["+perParcFinalNuke+"]");

    //Calcul du parc Flame
    perParcTargetFlame      = parcTargetFlame   *100 / totalParcPower;
    perParcFinalFlame       = parcFinalFlame    *100 / totalParcPower;
        console.log("Parc Flammes(Mw) : ["+parcTargetFlame+"]["+parcFinalFlame+"]");
        console.log("Parc Flammes(%) : ["+perParcTargetFlame+"]["+perParcFinalFlame+"]");

    //Calcul du parc Eolien
    perParcTargetEol        = parcTargetEol    *100 / totalParcPower;
    perParcFinalEol         = parcFinalEol     *100 / totalParcPower;
    console.log("Parc Eol(Mw) : ["+parcTargetEol+"]["+parcFinalEol+"]");
    console.log("Parc Eol(%) : ["+perParcTargetEol+"]["+perParcFinalEol+"]");

    //Calcul du parc Hydraulique
    perParcTargetHydrau     = parcTargetHydrau *100   / totalParcPower;
    perParcFinalHydrau      = parcFinalHydrau  *100   / totalParcPower;
    console.log("Parc Hydro(Mw) : ["+parcTargetHydrau+"]["+parcFinalHydrau+"]");
    console.log("Parc Hydro(%) : ["+perParcTargetHydrau+"]["+perParcFinalHydrau+"]");

    //Calcul du parc Photovoltaique
    perParcTargetPhoto      = parcTargetPhoto *100 / totalParcPower;
    perParcFinalPhoto       = parcFinalPhoto  *100 / totalParcPower;
    console.log("Parc Photo(Mw) : ["+parcTargetPhoto+"]["+parcFinalPhoto+"]");
    console.log("Parc Photo(%) : ["+perParcTargetPhoto+"]["+perParcFinalPhoto+"]");
    console.log("-----------------------------------------------------------------");
}

function majBarresParcCalcule(){
    //MaJ des barres de l'IHM du Parc calculé
    $("#barParcTargetNuke .bar").css("width",""+perParcTargetNuke+"%");
    $("#barParcFinalNuke .bar").css("width",""+perParcFinalNuke+"%");
    $("#barParcTargetNuke").attr("title",""+parcTargetNuke+" "+valeur+" sur "+totalParcPower+" "+valeur);
    $("#barParcFinalNuke").attr("title",""+parcFinalNuke+" "+valeur+" sur "+totalParcPower+" "+valeur);

    $("#barParcTargetPhoto .bar").css("width",""+perParcTargetPhoto+"%");
    $("#barParcFinalPhoto .bar").css("width",""+perParcFinalPhoto+"%");
    $("#barParcTargetPhoto").attr("title",""+parcTargetPhoto+" "+valeur+" sur "+totalParcPower+" "+valeur);
    $("#barParcFinalPhoto").attr("title",""+parcFinalPhoto+" "+valeur+" sur "+totalParcPower+" "+valeur);

    $("#barParcTargetEol .bar").css("width",""+perParcTargetEol+"%");
    $("#barParcFinalEol .bar").css("width",""+perParcFinalEol+"%");
    $("#barParcTargetEol").attr("title",""+parcTargetEol+" "+valeur+" sur "+totalParcPower+" "+valeur);
    $("#barParcFinalEol").attr("title",""+parcFinalEol+" "+valeur+" sur "+totalParcPower+" "+valeur);

    $("#barParcTargetHydrau .bar").css("width",""+perParcTargetHydrau+"%");
    $("#barParcFinalHydrau .bar").css("width",""+perParcFinalHydrau+"%");
    $("#barParcTargetHydrau").attr("title",""+parcTargetHydrau+" "+valeur+" sur "+totalParcPower+" "+valeur);
    $("#barParcFinalHydrau").attr("title",""+parcFinalHydrau+" "+valeur+" sur "+totalParcPower+" "+valeur);

    $("#barParcTargetFlame .bar").css("width",""+perParcTargetFlame+"%");
    $("#barParcFinalFlame .bar").css("width",""+perParcFinalFlame+"%");
    $("#barParcTargetFlame").attr("title",""+parcTargetFlame+" "+valeur+" sur "+totalParcPower+" "+valeur);
    $("#barParcFinalFlame").attr("title",""+parcFinalFlame+" "+valeur+" sur "+totalParcPower+" "+valeur);
}

function majChiffresParcCalcule(){
    /*Ajout des valeurs sans la vergule dans la case affichée*/
    /*Ajout des commentaires avec la valeur exacte dans les infos bulles*/


    var op;
    var diffParcNuke = parcFinalNuke - parcTargetNuke;
    op=""; if(diffParcNuke>0) op="+";
    $("#idDiffParcNuke").append(diffParcNuke.toFixed(0));
    $("#idDiffParcNuke").attr("title","Valeur exacte : "+diffParcNuke+" "+valeur);

    var diffParcPhoto = parcFinalPhoto - parcTargetPhoto;
    op=""; if(diffParcPhoto>0) op="+";
    $("#idDiffParcPhoto").append(diffParcPhoto.toFixed(0));
    $("#idDiffParcPhoto").attr("title","Valeur exacte : "+diffParcPhoto+" "+valeur);

    var diffParcEol = parcFinalEol - parcTargetEol;
    op=""; if(diffParcEol>0) op="+";
    $("#idDiffParcEol").append(diffParcEol.toFixed(0));
    $("#idDiffParcEol").attr("title","Valeur exacte : "+diffParcEol+" "+valeur);

    var diffParcHydrau = parcFinalHydrau - parcTargetHydrau;
    op=""; if(diffParcHydrau>0) op="+";
    $("#idDiffParcHydrau").append(diffParcHydrau.toFixed(0));
    $("#idDiffParcHydrau").attr("title","Valeur exacte : "+diffParcHydrau+" "+valeur);

    var diffParcFlame = parcFinalFlame - parcTargetFlame;
    op=""; if(diffParcFlame>0) op="+";
    $("#idDiffParcFlame").append(diffParcFlame.toFixed(0));
    $("#idDiffParcFlame").attr("title","Valeur exacte : "+diffParcFlame+" "+valeur);


    $("#idParcTargetNuke").append(parcTargetNuke.toFixed(0));
    $("#idParcFinalNuke").append(parcFinalNuke.toFixed(0));
    $("#idParcTargetNuke").attr("title","Valeur exacte : "+parcTargetNuke+" "+valeur);
    $("#idParcFinalNuke").attr("title","Valeur exacte : "+parcFinalNuke+" "+valeur);

    $("#idParcTargetPhoto").append(parcTargetPhoto.toFixed(0));
    $("#idParcFinalPhoto").append(parcFinalPhoto.toFixed(0));
    $("#idParcTargetPhoto").attr("title","Valeur exacte : "+parcTargetPhoto+" "+valeur);
    $("#idParcFinalPhoto").attr("title","Valeur exacte : "+parcFinalPhoto+" "+valeur);

    $("#idParcTargetEol").append(parcTargetEol.toFixed(0));
    $("#idParcFinalEol").append(parcFinalEol.toFixed(0));
    $("#idParcTargetEol").attr("title","Valeur exacte : "+parcTargetEol+" "+valeur);
    $("#idParcFinalEol").attr("title","Valeur exacte : "+parcFinalEol+" "+valeur);

    $("#idParcTargetHydrau").append(parcTargetHydrau.toFixed(0));
    $("#idParcFinalHydrau").append(parcFinalHydrau.toFixed(0));
    $("#idParcTargetHydrau").attr("title","Valeur exacte : "+parcTargetHydrau+" "+valeur);
    $("#idParcFinalHydrau").attr("title","Valeur exacte : "+parcFinalHydrau+" "+valeur);

    $("#idParcTargetFlame").append(parcTargetFlame.toFixed(0));
    $("#idParcFinalFlame").append(parcFinalFlame.toFixed(0));
    $("#idParcTargetFlame").attr("title","Valeur exacte : "+parcTargetFlame+" "+valeur);
    $("#idParcFinalFlame").attr("title","Valeur exacte : "+parcFinalFlame+" "+valeur);

}

function postActionsJSON(){

    initialiserVariablesParc();

    majBarresParcCalcule();

    majChiffresParcCalcule();

    document.getElementById("parc").style.display = "";
	document.getElementById("calcul").style.display = "";
	
    console.log(dataJSON);
}