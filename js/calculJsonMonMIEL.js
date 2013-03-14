var dataJSON = null;

var valeur="MW";
/*---------------Total-du-parc-final--------------------*/
var totalParcPower;
var totalParcTargetPower;
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
var parcTargetStep;
var parcFinalStep;
var parcTargetImport;
var parcFinalImport;
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
var perParcTargetStep;
var perParcFinalStep;
var perParcTargetImport;
var perParcFinalImport;

/*---------------Total MonMix Target--------------------*/
var totalMixTarget;
/*---------------Total MonMix Final--------------------*/
var totalMixFinal;
/*------------------------Id-Mix--------------------*/
var mixTargetNuke;
var mixFinalNuke;
var mixTargetFlame;
var mixFinalFlame;
var mixTargetEol;
var mixFinalEol;
var mixTargetHydrau;
var mixFinalHydrau;
var mixTargetPhoto;
var mixFinalPhoto;
/*------------------------Percentage-Mix--------------------*/
var perMixTargetNuke;
var perMixFinalNuke;
var perMixTargetFlame;
var perMixFinalFlame;
var perMixTargetEol;
var perMixFinalEol;
var perMixTargetHydrau;
var perMixFinalHydrau;
var perMixTargetPhoto;
var perMixFinalPhoto;
/*------------------------Diff PercMix--------------------*/
var diffPerMixNuke;
var diffPerMixFlame;
var diffPerMixEol;
var diffPerMixHydrau;
var diffPerMixPhoto;


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
    //Ordre : eNucTwh, ePhotoTwh, eEolTwh, nbPoints
        manipulerCalculMonMIEL(
            nuc_gwh,
            pho_gwh,
            eol_gwh,
            nbPoints,
            consommation2050);
};

function initialiserVariablesMix(){
    /*Données sont recues en MWh -> on les transforment en Twh */
    mixTargetNuke = dataJSON.targetConso.nuclear        / 100000;
    mixFinalNuke = dataJSON.finalConso.nuclear          / 100000;
    mixTargetFlame = dataJSON.targetConso.flame         / 100000;
    mixFinalFlame = dataJSON.finalConso.flame           / 100000;
    mixTargetEol = dataJSON.targetConso.wind            / 100000;
    mixFinalEol = dataJSON.finalConso.wind              / 100000;
    mixTargetHydrau = dataJSON.targetConso.hydraulic    / 100000;
    mixFinalHydrau = dataJSON.finalConso.hydraulic      / 100000;
    mixTargetPhoto = dataJSON.targetConso.photovoltaic  / 100000;
    mixFinalPhoto = dataJSON.finalConso.photovoltaic    / 100000;
    console.log(" mixTargetNuke : "+mixTargetNuke);
    console.log(" mixTargetFlame : "+mixTargetFlame);
    console.log(" mixTargetEol : "+mixTargetEol);
    console.log(" mixTargetHydrau : "+mixTargetHydrau);
    console.log(" mixTargetPhoto : "+mixTargetPhoto);
    console.log(" mixFinalNuke : "+mixFinalNuke);
    console.log(" mixFinalFlame : "+mixFinalFlame);
    console.log(" mixFinalEol : "+mixFinalEol);
    console.log(" mixFinalHydrau : "+mixFinalHydrau);
    console.log(" mixFinalPhoto : "+mixFinalPhoto);
    totalMixTarget =
        mixTargetNuke +
        mixTargetFlame +
        mixTargetEol +
        mixTargetHydrau +
        mixTargetPhoto;
    totalMixFinal =
        mixFinalNuke +
        mixFinalFlame +
        mixFinalEol +
        mixFinalHydrau +
        mixFinalPhoto;

    perMixTargetNuke    = (mixTargetNuke     * 100 / totalMixTarget);
    perMixFinalNuke     = (mixFinalNuke      * 100 / totalMixFinal);
    perMixTargetFlame   = (mixTargetFlame    * 100 / totalMixTarget);
    perMixFinalFlame    = (mixFinalFlame     * 100 / totalMixFinal);
    perMixTargetEol     = (mixTargetEol      * 100 / totalMixTarget);
    perMixFinalEol      = (mixFinalEol       * 100 / totalMixFinal);
    perMixTargetHydrau  = (mixTargetHydrau   * 100 / totalMixTarget);
    perMixFinalHydrau   = (mixFinalHydrau    * 100 / totalMixFinal);
    perMixTargetPhoto   = (mixTargetPhoto    * 100 / totalMixTarget);
    perMixFinalPhoto    = (mixFinalPhoto     * 100 / totalMixFinal);

    var op="";
        diffPerMixNuke = perMixFinalNuke - perMixTargetNuke;
        op=""; if(diffPerMixNuke>0) op="+";
    diffPerMixNuke=op+diffPerMixNuke.toFixed(1);

        diffPerMixFlame = perMixFinalFlame.toFixed(1) - perMixTargetFlame.toFixed(1);
        op=""; if(diffPerMixFlame>0) op="+";
    diffPerMixFlame=op+diffPerMixFlame.toFixed(1);

        diffPerMixEol = perMixFinalEol.toFixed(1) - perMixTargetEol.toFixed(1);
        op=""; if(diffPerMixEol>0) op="+";
    diffPerMixEol=op+diffPerMixEol.toFixed(1);

        diffPerMixHydrau = perMixFinalHydrau.toFixed(1) - perMixTargetHydrau.toFixed(1);
        op=""; if(diffPerMixHydrau>0) op="+";
    diffPerMixHydrau=op+diffPerMixHydrau.toFixed(1);

        diffPerMixPhoto = perMixFinalPhoto.toFixed(1) - perMixTargetPhoto.toFixed(1);
        op=""; if(diffPerMixPhoto>0) op="+";
    diffPerMixPhoto=op+diffPerMixPhoto.toFixed(1);

    console.log(" perMixTargetNuke : "+perMixTargetNuke.toFixed(1));
    console.log(" perMixTargetFlame : "+perMixTargetFlame);
    console.log(" perMixTargetEol : "+perMixTargetEol);
    console.log(" perMixTargetHydrau : "+perMixTargetHydrau);
    console.log(" perMixTargetPhoto : "+perMixTargetPhoto);
    console.log(" perMixFinalNuke : "+perMixFinalNuke.toFixed(1));
    console.log(" perMixFinalFlame : "+perMixFinalFlame);
    console.log(" perMixFinalEol : "+perMixFinalEol);
    console.log(" perMixFinalHydrau : "+perMixFinalHydrau);
    console.log(" perMixFinalPhoto : "+perMixFinalPhoto);

    console.log(" diffPerMixNuke : "+diffPerMixNuke);
    console.log(" diffPerMixFlame : "+diffPerMixFlame);
    console.log(" diffPerMixEol : "+diffPerMixEol);
    console.log(" diffPerMixHydrau : "+diffPerMixHydrau);
    console.log(" diffPerMixPhoto : "+diffPerMixPhoto);
}

function initialiserVariablesParc(){
    //Calcul du total du parc final
    totalParcPower =
        dataJSON.finalParcPower.nuclear +
            dataJSON.finalParcPower.flame+
            dataJSON.finalParcPower.wind+
            dataJSON.finalParcPower.hydraulic+
            dataJSON.finalParcPower.photovoltaic+
			dataJSON.finalParcPower.import+
			dataJSON.finalParcPower.step
    ;
    totalParcTargetPower =
        dataJSON.targetParcPower.nuclear +
            dataJSON.targetParcPower.flame+
            dataJSON.targetParcPower.wind+
            dataJSON.targetParcPower.hydraulic+
            dataJSON.targetParcPower.photovoltaic+
			dataJSON.targetParcPower.import+
			dataJSON.targetParcPower.step
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
	parcTargetImport = dataJSON.targetParcPower.import;
    parcFinalImport = dataJSON.finalParcPower.import;
	parcTargetStep = dataJSON.targetParcPower.step;
    parcFinalStep = dataJSON.finalParcPower.step;

    //Calcul du parc Nuke
    perParcTargetNuke       = parcTargetNuke *100 / totalParcTargetPower;
    perParcFinalNuke        = parcFinalNuke  *100 / totalParcPower;
        console.log("Parc Nuke(Mw) : ["+parcTargetNuke+"]["+parcFinalNuke+"]");
        console.log("Parc Nuke(%) : ["+perParcTargetNuke+"]["+perParcFinalNuke+"]");

    //Calcul du parc Flame
    perParcTargetFlame      = parcTargetFlame   *100 / totalParcTargetPower;
    perParcFinalFlame       = parcFinalFlame    *100 / totalParcPower;
        console.log("Parc Flammes(Mw) : ["+parcTargetFlame+"]["+parcFinalFlame+"]");
        console.log("Parc Flammes(%) : ["+perParcTargetFlame+"]["+perParcFinalFlame+"]");

    //Calcul du parc Eolien
    perParcTargetEol        = parcTargetEol    *100 / totalParcTargetPower;
    perParcFinalEol         = parcFinalEol     *100 / totalParcPower;
    console.log("Parc Eol(Mw) : ["+parcTargetEol+"]["+parcFinalEol+"]");
    console.log("Parc Eol(%) : ["+perParcTargetEol+"]["+perParcFinalEol+"]");

    //Calcul du parc Hydraulique
    perParcTargetHydrau     = parcTargetHydrau *100   / totalParcTargetPower;
    perParcFinalHydrau      = parcFinalHydrau  *100   / totalParcPower;
    console.log("Parc Hydro(Mw) : ["+parcTargetHydrau+"]["+parcFinalHydrau+"]");
    console.log("Parc Hydro(%) : ["+perParcTargetHydrau+"]["+perParcFinalHydrau+"]");

    //Calcul du parc Photovoltaique
    perParcTargetPhoto      = parcTargetPhoto *100 / totalParcTargetPower;
    perParcFinalPhoto       = parcFinalPhoto  *100 / totalParcPower;
    console.log("Parc Photo(Mw) : ["+parcTargetPhoto+"]["+parcFinalPhoto+"]");
    console.log("Parc Photo(%) : ["+perParcTargetPhoto+"]["+perParcFinalPhoto+"]");
	
	//Calcul du parc Import
    perParcTargetImport      = parcTargetImport *100 / totalParcTargetPower;
    perParcFinalImport       = parcFinalImport  *100 / totalParcPower;
    console.log("Parc Import(Mw) : ["+parcTargetImport+"]["+parcFinalImport+"]");
    console.log("Parc Import(%) : ["+perParcTargetImport+"]["+perParcFinalImport+"]");
	
	//Calcul du parc STEP
    perParcTargetStep      = parcTargetStep *100 / totalParcTargetPower;
    perParcFinalStep       = parcFinalStep  *100 / totalParcPower;
    console.log("Parc STEP(Mw) : ["+parcTargetStep+"]["+parcFinalStep+"]");
    console.log("Parc STEP(%) : ["+perParcTargetStep+"]["+perParcFinalStep+"]");
    console.log("-----------------------------------------------------------------");
}

function majBarresParcCalcule(){
    //MaJ des barres de l'IHM du Parc calculé
    $("#barParcTargetNuke .bar").css("width",""+perParcTargetNuke+"%");
    $("#barParcFinalNuke .bar").css("width",""+perParcFinalNuke+"%");
    $("#barParcTargetNuke").attr("title","Ciblé : "+parcTargetNuke.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalNuke").attr("title","Calculé : "+parcFinalNuke.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);

    $("#barParcTargetPhoto .bar").css("width",""+perParcTargetPhoto+"%");
    $("#barParcFinalPhoto .bar").css("width",""+perParcFinalPhoto+"%");
    $("#barParcTargetPhoto").attr("title","Ciblé : "+parcTargetPhoto.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalPhoto").attr("title","Calculé : "+parcFinalPhoto.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);

    $("#barParcTargetEol .bar").css("width",""+perParcTargetEol+"%");
    $("#barParcFinalEol .bar").css("width",""+perParcFinalEol+"%");
    $("#barParcTargetEol").attr("title","Ciblé : "+parcTargetEol.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalEol").attr("title","Calculé : "+parcFinalEol.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);

    $("#barParcTargetHydrau .bar").css("width",""+perParcTargetHydrau+"%");
    $("#barParcFinalHydrau .bar").css("width",""+perParcFinalHydrau+"%");
    $("#barParcTargetHydrau").attr("title","Ciblé : "+parcTargetHydrau.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalHydrau").attr("title","Calculé : "+parcFinalHydrau.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);

    $("#barParcTargetFlame .bar").css("width",""+perParcTargetFlame+"%");
    $("#barParcFinalFlame .bar").css("width",""+perParcFinalFlame+"%");
    $("#barParcTargetFlame").attr("title","Ciblé : "+parcTargetFlame.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalFlame").attr("title","Calculé : "+parcFinalFlame.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);
	
	$("#barParcTargetImport .bar").css("width",""+perParcTargetImport+"%");
    $("#barParcFinalImport .bar").css("width",""+perParcFinalImport+"%");
    $("#barParcTargetImport").attr("title","Ciblé : "+parcTargetImport.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalImport").attr("title","Calculé : "+parcFinalImport.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);
	
	$("#barParcTargetStep .bar").css("width",""+perParcTargetStep+"%");
    $("#barParcFinalStep .bar").css("width",""+perParcFinalStep+"%");
    $("#barParcTargetStep").attr("title","Ciblé : "+parcTargetStep.toFixed(0)+" "+valeur+" sur "+totalParcTargetPower.toFixed(0)+" "+valeur);
    $("#barParcFinalStep").attr("title","Calculé : "+parcFinalStep.toFixed(0)+" "+valeur+" sur "+totalParcPower.toFixed(0)+" "+valeur);
}

function majPourcentageDansBarres(){
//MaJ des barres de l'IHM du Parc calculé
    $("#barParcTargetNuke .value").append(perParcTargetNuke.toFixed(1)+"%");
    $("#barParcFinalNuke .value").append(perParcFinalNuke.toFixed(1)+"%");

    $("#barParcTargetPhoto .value").append(perParcTargetPhoto.toFixed(1)+"%");
    $("#barParcFinalPhoto .value").append(perParcFinalPhoto.toFixed(1)+"%");

    $("#barParcTargetEol .value").append(perParcTargetEol.toFixed(1)+"%");
    $("#barParcFinalEol .value").append(perParcFinalEol.toFixed(1)+"%");

    $("#barParcTargetHydrau .value").append(perParcTargetHydrau.toFixed(1)+"%");
    $("#barParcFinalHydrau .value").append(perParcFinalHydrau.toFixed(1)+"%");

    $("#barParcTargetFlame .value").append(perParcTargetFlame.toFixed(1)+"%");
    $("#barParcFinalFlame .value").append(perParcFinalFlame.toFixed(1)+"%");
	
	$("#barParcTargetImport .value").append(perParcTargetImport.toFixed(1)+"%");
    $("#barParcFinalImport .value").append(perParcFinalImport.toFixed(1)+"%");
	
	$("#barParcTargetStep .value").append(perParcTargetStep.toFixed(1)+"%");
    $("#barParcFinalStep .value").append(perParcFinalStep.toFixed(1)+"%");
}

function majChiffresParcCalcule(){
    /*Ajout des valeurs sans la vergule dans la case affichée*/
    /*Ajout des commentaires avec la valeur exacte dans les infos bulles*/


    var op;
    var diffParcNuke = parcFinalNuke - parcTargetNuke;
    op=""; if(diffParcNuke>0) op="+";
    $("#idDiffParcNuke").append(op+diffParcNuke.toFixed(0));
    $("#idDiffParcNuke").attr("title","Valeur exacte : "+diffParcNuke+" "+valeur);

    var diffParcPhoto = parcFinalPhoto - parcTargetPhoto;
    op=""; if(diffParcPhoto>0) op="+";
    $("#idDiffParcPhoto").append(op+diffParcPhoto.toFixed(0));
    $("#idDiffParcPhoto").attr("title","Valeur exacte : "+diffParcPhoto+" "+valeur);

    var diffParcEol = parcFinalEol - parcTargetEol;
    op=""; if(diffParcEol>0) op="+";
    $("#idDiffParcEol").append(op+diffParcEol.toFixed(0));
    $("#idDiffParcEol").attr("title","Valeur exacte : "+diffParcEol+" "+valeur);

    var diffParcHydrau = parcFinalHydrau - parcTargetHydrau;
    op=""; if(diffParcHydrau>0) op="+";
    $("#idDiffParcHydrau").append(op+diffParcHydrau.toFixed(0));
    $("#idDiffParcHydrau").attr("title","Valeur exacte : "+diffParcHydrau+" "+valeur);

    var diffParcFlame = parcFinalFlame - parcTargetFlame;
    op=""; if(diffParcFlame>0) op="+";
    $("#idDiffParcFlame").append(op+diffParcFlame.toFixed(0));
    $("#idDiffParcFlame").attr("title","Valeur exacte : "+diffParcFlame+" "+valeur);
	
	var diffParcImport = parcFinalImport - parcTargetImport;
    op=""; if(diffParcImport>0) op="+";
    $("#idDiffParcImport").append(op+diffParcImport.toFixed(0));
    $("#idDiffParcImport").attr("title","Valeur exacte : "+diffParcImport+" "+valeur);
	
	var diffParcStep = parcFinalStep - parcTargetStep;
    op=""; if(diffParcStep>0) op="+";
    $("#idDiffParcStep").append(op+diffParcStep.toFixed(0));
    $("#idDiffParcStep").attr("title","Valeur exacte : "+diffParcStep+" "+valeur);


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
	
	$("#idParcTargetImport").append(parcTargetImport.toFixed(0));
    $("#idParcFinalImport").append(parcFinalImport.toFixed(0));
    $("#idParcTargetImport").attr("title","Valeur exacte : "+parcTargetImport+" "+valeur);
    $("#idParcFinalImport").attr("title","Valeur exacte : "+parcFinalImport+" "+valeur);
	
	$("#idParcTargetStep").append(parcTargetStep.toFixed(0));
    $("#idParcFinalStep").append(parcFinalStep.toFixed(0));
    $("#idParcTargetStep").attr("title","Valeur exacte : "+parcTargetStep+" "+valeur);
    $("#idParcFinalStep").attr("title","Valeur exacte : "+parcFinalStep+" "+valeur);

}


function majLegende(){
    totalParcPower
	$("#idLegendeRef .bar").append(totalParcTargetPower.toFixed(0)+"MW");
    $("#idLegendeCible .bar").append(totalParcPower.toFixed(0)+"MW");

}


function postActionsJSON(){

    /*Parc*/
    initialiserVariablesParc();
    majBarresParcCalcule();
    majPourcentageDansBarres();
    majChiffresParcCalcule();
	majLegende();

    document.getElementById("parc").style.display = "";
	document.getElementById("calcul").style.display = "";

    /*Mix*/
    initialiserVariablesMix();

    console.log(dataJSON);
}