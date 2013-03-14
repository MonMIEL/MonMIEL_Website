var anneeRef;         //année de référence choisie par l'utilisateur dans la partie Horizon
var anneeCible;         //année de référence choisie par l'utilisateur dans la partie Horizon
var consommation2050 = 700; //consommation pour l'année 2050 choisie par l'utilisateur dans la partie Scenario

var validHorizonRef=0; //=1 si la partie Horizon est validée, =0 sinon
var validHorizonCible=0; //=1 si la partie Horizon est validée, =0 sinon
var validScenario=0;//=1 si la partie Scenario est validée, =0 sinon
var validMonMix=0;  //=1 si la partie MonMixElectrique est validée, =0 sinon

/*
function majChartAvecAnneeRef(chart, series) {
    for (var i = 0; i < series.length; i++) {
        chart_Scenario.series[i].data[0].name = "Année : "+anneeRef;
        chart_Scenario.series[i].data[0].x = parseInt(anneeRef);
        chart_Scenario.series[i].data[1].name = "Année : "+anneeCible;
        chart_Scenario.series[i].data[1].x = parseInt(anneeCible);
        chart_Scenario.render();
    }
}
*/
/*
function majChartAvecConso2050(chart, series) {
    for (var i = 0; i < series.length; i++) {
        chart_Scenario.series[i].data[1].y = parseInt(consommation2050);
        chart_Scenario.render();
    }
}
*/
/*--------------------------------------------------------------------------*/

/* function validerHorizonRef(){
        //Récupération des données entrées
        anneeRef=document.getElementById("anneeRef").value;

        //MaJ du nom du premier point de chart_Scenario par rapport à la donnée anneeRef
        majChartAvecAnneeRef(chart_Scenario, chart_Scenario.series);

        var label =document.getElementById('labelHorizonRef');
        label.innerHTML='<div style="text-align:center; color:green">L\'année de référence '+anneeRef+' est prise en compte <i class="icon-ok"></i></div>';

        validHorizonRef=1;

        if (validHorizonCible == 1) {
		//MaJ de titleHorizon
		document.getElementById("titleHorizon").style.cssText ="color:green";
		
		//Affichage du contenu suivant
		document.getElementById('scenario').style.display = "block";
	}
} */
/*
function validerHorizonCible(){
    //Récupération des données entrées
    anneeCible=document.getElementById("anneeCible").value;

	//MaJ du nom du premier point de chart_Scenario par rapport à la donnée anneeRef
	majChartAvecAnneeRef(chart_Scenario, chart_Scenario.series);
	
	var label =document.getElementById('labelHorizonCible');
	label.innerHTML='<div style="text-align:center; color:green">L\'année cible '+anneeCible+' est prise en compte <i class="icon-ok"></i></div>';

	validHorizonCible=1;
	
	if (validHorizonRef == 1) {
		//MaJ de titleHorizon
		document.getElementById("titleHorizon").style.cssText ="color:green";
		
		//Affichage du contenu suivant
		document.getElementById('scenario').style.display = "block";
	}
}
*/
var ongletActif='RTE';
function changementOnglet(ongletClick){
    if(ongletActif==ongletClick) return;

    if(ongletClick=='Personnel'){
         document.getElementById('tab_chart_Scenario.qu').innerHTML="<input id='consoSaisie' type='text' onkeypress='validateNumber(event)' style='width :90%'  value='485' onchange='miseAjourGraphiquePersonnelConso()' />";
         document.getElementById('tab_chart_Scenario.id').innerHTML="<input id='anneeSaisie' maxlength='4' onkeypress='validateNumber(event)' type='text' style='width :80%' value='2050' onchange='miseAjourGraphiquePersonnelAnnee()'/>";
        document.getElementById('bouton_scenario').style.display="";
        ongletActif=ongletClick;
        passerChartPersonnel();
    }    else if(ongletClick=='RTE'){
        ongletActif=ongletClick;
        passerChartRte();
        document.getElementById('tab_chart_Scenario.qu').innerHTML="";
        document.getElementById('tab_chart_Scenario.id').innerHTML="";
        document.getElementById('bouton_scenario').style.display="none";
    }else if (ongletClick=='UFE'){
        ongletActif=ongletClick;
        passerChartUfe();
        document.getElementById('tab_chart_Scenario.qu').innerHTML="";
        document.getElementById('tab_chart_Scenario.id').innerHTML="";
        document.getElementById('bouton_scenario').style.display="none";
    }

}
function validateNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
function miseAjourGraphiquePersonnelConso(){
    var y =parseInt( document.getElementById('consoSaisie').value);
    if(parseInt(y)>700){
        y=700;
        document.getElementById('consoSaisie').value=700;
        document.getElementById('etatScenario').style.display="";
        document.getElementById('etatScenario').innerHTML="la consommation est comprise entre 300 et 700";
    }else if(parseInt(y)<300){
        y=300;
        document.getElementById('consoSaisie').value=300;
        document.getElementById('etatScenario').style.display="";
        document.getElementById('etatScenario').innerHTML="la consommation est comprise entre 300 et 700";
    }else
         document.getElementById('etatScenario').style.display="none";
    consommation2050=y;
    chart_Scenario.series[0].data[1].y=parseInt(y);
    chart_Scenario.render();
}
function miseAjourGraphiquePersonnelAnnee(){

    var x = document.getElementById('anneeSaisie').value;
    if(x>2050){
        x=2050;
        document.getElementById('anneeSaisie').value=2050;
        document.getElementById('etatScenario').style.display="";
        document.getElementById('etatScenario').innerHTML="L'année est comprise entre 2012 et 2050";
    }else if(x<2012){
        x=2012;
        document.getElementById('anneeSaisie').value=2012;
        document.getElementById('etatScenario').style.display="";
        document.getElementById('etatScenario').innerHTML="L'année est comprise entre 2012 et 2050";
    }else
         document.getElementById('etatScenario').style.display="none";
    anneeCible=x;
    chart_Scenario.series[0].data[1].x=x;
    chart_Scenario.series[0].data[1].name=x;
    chart_Scenario.render();
}
/*
function testerTwh() {
	var tempTwh = document.getElementById("valeurTwh").value;

	if (tempTwh > 700 || tempTwh < 300) {
		$('#boutonTwh').popover();
	} else {
		consommation2050 = tempTwh;

		//MaJ de la consommation dans le graph chart_Scenario
		majChartAvecConso2050(chart_Scenario, chart_Scenario.series);
		
		//MaJ du tableau de la quantité choisie en Gwh
		document.getElementById("tab_chart_Scenario.id").innerHTML = anneeCible;
		document.getElementById("tab_chart_Scenario.qu").innerHTML = consommation2050;
		
		chart_Scenario.series[0].show();
        document.getElementById("bouton_scenario").style.display="";
	}
}
*/
var passe = false;
var chart_cam;

function passerChartUfe(){
    anneeCible="";
    consommation2050="";
    document.getElementById('etatScenario').style.display="none";
    chart_Scenario = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_Scenario',
            width: 700,
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0.5)',
            style: {
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
                fontSize: '50px'
            },
            animation: true
        },
        credits: {
            enabled: false
        },
        /*labels: {
         items: [{
         html: 'helloTest',
         style:{
         left: '100px',
         top: '100px'
         }
         }],
         style: null
         },*/
        title: {
            text: 'Consommation intérieure brute annuelle',
            style: {
                color: '#3E576F',
                fontSize: '16px'
            }
        },
        colors:['#2d6fb2'],
        subtitle: {
            text: 'Veuillez sélectionner un des profils/points du schéma',
            style: {
                color: '#3E576F'
            }
        },
        xAxis: {
            title: {
                text: 'Année',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold',
                    align: 'right'
                }
            }
            //categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Quantité (TWh)',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold'
                }
            },
            min:450,
            max:640

        },
        events: {
            redraw: function() {
                alert ('The chart was just redrawn');
            }
        },
        series: [{
            visible: true,
            name: 'Croissance PIB 2.5%',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click:  null,
                    mouseOver: null
                }
            }, {
                name: '2030',
                color: '#FF00FF',
                'id': 'point2',
                x: 2030,
                y: 625,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        },{
            visible: true,
            name: 'Croissance PIB 1.5%',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click:  null,
                    mouseOver: null
                }
            }, {
                name: '2030',
                color: '#FF00FF',
                'id': 'point2',
                x: 2030,
                y: 570,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        },{
            visible: true,
            name: 'Croissance PIB 1%',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click: null,
                    mouseOver: null
                }
            }, {
                name: '2030',
                color: '#FF00FF',
                'id': 'point2',
                x: 2030,
                y: 550,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        }],
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        //mouseOver: chartScenarioHandlerOver,
                        // click: chartScenarioHandlerClick
                    }
                }
            }
        }
    });
}
function passerChartPersonnel(){

    chart_Scenario = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_Scenario',
            width: 700,
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0.5)',
            style: {
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
                fontSize: '50px'
            },
            animation: true
        },
        credits: {
            enabled: false
        },
        /*labels: {
         items: [{
         html: 'helloTest',
         style:{
         left: '100px',
         top: '100px'
         }
         }],
         style: null
         },*/
        title: {
            text: 'Consommation intérieure brute annuelle',
            style: {
                color: '#3E576F',
                fontSize: '16px'
            }
        },
        colors:['#2d6fb2'],
        /*subtitle: {
         text: 'Indiquer la quantité de la consommation annuelle en 2050',
         style: {
         color: '#3E576F'
         }
         },*/
        xAxis: {
            title: {
                text: 'Année',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold',
                    align: 'right'
                }
            }
            //categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Quantité (TWh)',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold'
                }
            },
            max:800

        },
        events: {
            redraw: function() {
                alert ('The chart was just redrawn');
            }
        },
        series: [{
            visible: true,
            name: 'Personnel',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click: null,
                    mouseOver: null
                }
            },{
                name: '2050', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2050, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click: null,
                    mouseOver: null
                }
            }]
        }],
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            //mouseOver: chartScenarioHandlerOver,
                            // click: chartScenarioHandlerClick
                        }
                    }
                }
            }
        });

}
function passerChartRte(){
    anneeCible="";
    consommation2050="";
    document.getElementById('etatScenario').style.display="none";
    chart_Scenario = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_Scenario',
            width: 700,
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0.5)',
            style: {
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
                fontSize: '50px'
            },
            animation: true
        },
        credits: {
            enabled: false
        },
        /*labels: {
         items: [{
         html: 'helloTest',
         style:{
         left: '100px',
         top: '100px'
         }
         }],
         style: null
         },*/
        title: {
            text: 'Consommation intérieure brute annuelle',
            style: {
                color: '#3E576F',
                fontSize: '16px'
            }
        },
		colors:['#2d6fb2'],
        subtitle: {
            text: 'Veuillez sélectionner un des profils/points du schéma',
            style: {
                color: '#3E576F'
            }
        },
        xAxis: {
            title: {
                text: 'Année',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold',
                    align: 'right'
                }
            }
            //categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Quantité (TWh)',
                style: {
                    color: '#3E576F',
                    fontWeight: 'bold'
                }
            },
            min:450,
            max:510

        },
        events: {
            redraw: function() {
                alert ('The chart was just redrawn');
            }
        },
        series: [{
            visible: true,
            name: 'Haut',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click: null,
                    mouseOver: null
                }
            }, {
                name: '2014',
                color: '#FF00FF',
                'id': 'point2',
                x: 2014,
                y: 493.8,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2015',
                color: '#FF00FF',
                'id': 'point3',
                x: 2015,
                y: 499.7,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2016',
                color: '#FF00FF',
                'id': 'point4',
                x: 2016,
                y: 505.1,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2017',
                color: '#FF00FF',
                'id': 'point5',
                x: 2017,
                y: 509.7,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        },{
            visible: true,
            name: 'Référence',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click: null,
                    mouseOver: null
                }
            }, {
                name: '2014',
                color: '#FF00FF',
                'id': 'point2',
                x: 2014,
                y: 486.5,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2015',
                color: '#FF00FF',
                'id': 'point3',
                x: 2015,
                y: 490.9,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2016',
                color: '#FF00FF',
                'id': 'point4',
                x: 2016,
                y: 494.1,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2017',
                color: '#FF00FF',
                'id': 'point5',
                x: 2017,
                y: 497.4,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        },{
            visible: true,
            name: 'MDE renforcée',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485,
                events:{
                    click:  null,
                    mouseOver: null
                }
            }, {
                name: '2014',
                color: '#FF00FF',
                'id': 'point2',
                x: 2014,
                y: 478.9,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2015',
                color: '#FF00FF',
                'id': 'point3',
                x: 2015,
                y: 480.9,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2016',
                color: '#FF00FF',
                'id': 'point4',
                x: 2016,
                y: 482.4,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2017',
                color: '#FF00FF',
                'id': 'point5',
                x: 2017,
                y: 483.7,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        },{
            visible: true,
            name: 'Bas',
            data: [{
                name: '2011', //Change au moment du choix de l'année de Référence
                color: '#00FF00',
                'id': 'point1',
                x: 2011, //Change au moment du choix de l'année de Référence
                y: 485.0,
                events:{
                    click:  null,
                    mouseOver: null
                }
            }, {
                name: '2014',
                color: '#FF00FF',
                'id': 'point2',
                x: 2014,
                y: 471.4,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2015',
                color: '#FF00FF',
                'id': 'point3',
                x: 2015,
                y: 471.7,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2016',
                color: '#FF00FF',
                'id': 'point4',
                x: 2016,
                y: 470.8,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }, {
                name: '2017',
                color: '#FF00FF',
                'id': 'point5',
                x: 2017,
                y: 470.8,
                events : {
                    click:  function(event) {
                        affecterConsommation(this.x,this.y)}
                }
            }]
        }],
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        //mouseOver: chartScenarioHandlerOver,
                        // click: chartScenarioHandlerClick
                    }
                }
            }
        }
    });
}
function validerScenario(){
    document.getElementById('monmix').style.display = "block";
    //mise en place du camembert
    Highcharts.setOptions({
        colors: ['#166877', '#FF530D', '#E8C57A', '#1BAA8F', '#E81C0C', '#FF9655', '#FFF263']
    });

    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
    //Affichage du contenu suivant
    if(!passe){
    // First chart initialization
    chart_cam = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_cam',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height:350,
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        title: {
            text: 'Repartition'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b> - ',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    connectorColor: '#000000',

                    formatter: function() {
                        return  Math.floor(this.percentage) +' %';
                    }
                },
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true

            }
        },
        series: [{
            type: 'pie',
            name: 'Dev #1',
            data: [
                ['nucléaire', 50 ],
                ['Photovoltaïque', 10],
                ['Eolien', 5],
                ['Hydraulique', 5],
                ['Centrales à flammes', 30],
                ['STEP', 0],
                ['IMPORT', 0]
            ]
        }]
    });

         form_widget_amount_slider('slider_target1',document.forms[0].textfield1,200,0,100,"updateTextInput('nuc');","normal",30);
        form_widget_amount_slider('slider_target2',document.forms[0].textfield2,200,0,100,"updateTextInput('pho');","normal",10);
        form_widget_amount_slider('slider_target3',document.forms[0].textfield3,200,0,100,"updateTextInput('eol');","normal",20);
        form_widget_amount_slider('slider_target4',document.forms[0].textfield4,200,0,100,"updateTextInput('hyd');","auto",20);
        form_widget_amount_slider('slider_target5',document.forms[0].textfield5,200,0,100,"updateTextInput('cen');","auto",20);
        form_widget_amount_slider('slider_target6',document.forms[0].textfield6,200,0,100,"","disable",100);
        form_widget_amount_slider('slider_target7',document.forms[0].textfield7,200,0,100,"","disable",100);
    passe=true;
    }

    document.getElementById("hyd_gwh").value=50;
    initialiserValeur(4,50/consommation2050);
    var val = document.getElementById("nuc_txtfield").value;
    document.getElementById("nuc_gwh").value=(val/100)*consommation2050;
    val = document.getElementById("pho_txtfield").value;
    document.getElementById("pho_gwh").value=(val/100)*consommation2050;
    val = document.getElementById("eol_txtfield").value;
    document.getElementById("eol_gwh").value=(val/100)*consommation2050;
    val = document.getElementById("cen_txtfield").value;
    document.getElementById("cen_gwh").value=(val/100)*consommation2050;

    updateCamembert();
    //MaJ de titleHorizon
    document.getElementById("titleScenario").style.cssText ="color:green";
    document.getElementById("simuler").style.display="";
    // MaJ de lable
   // var label =document.getElementById('labelScenario');
    //label.innerHTML='<div style="text-align:center; color:green">La quantité de la consommation en 2050 est de '+consommation2050+' <i class="icon-ok"></i></div>';
    //validScenario = 1;



}

function updateCamembert(){
    var nuc = Math.round(parseInt(document.getElementById("nuc_ txtfield").value));
    var pho =  Math.round(parseInt(document.getElementById("pho_txtfield").value));
    var hyd = Math.round( parseInt(document.getElementById("hyd_txtfield").value));
    var cen =  Math.round(parseInt(document.getElementById("cen_txtfield").value));
    var eol =  Math.round(parseInt(document.getElementById("eol_txtfield").value));

    var data  =[
        ['nucléaire', nuc ],
        ['Photovoltaïque', pho],
        ['Eolien', eol],
        ['Hydraulique', hyd],
        ['Centrales à flammes', cen],
        ['STEP', 0],
        ['IMPORT', 0]
    ];
    chart_cam.series[0].setData(data);
}

// function chartScenarioHandlerOver() {
    // //console.log(this);

    // //MaJ du tableau de la quantité choisie en Gwh
    // document.getElementById("tab_chart_Scenario.id").innerHTML = anneeRef;
    // document.getElementById("tab_chart_Scenario.qu").innerHTML = this.y;

// }

// function chartScenarioHandlerClick() {
    // //console.log(this);

    // //Permettre le click sur le bouton "suivant"
    // document.getElementById("buttonValiderScenario").removeAttribute("disabled");

    // //MaJ du tableau de la quantité choisie en Gwh
    // document.getElementById("tab_chart_Scenario.id").innerHTML = anneeRef;
    // document.getElementById("tab_chart_Scenario.qu").innerHTML = this.y;
    // document.getElementById("etatScenario").innerHTML = '<div style="color:green">VALIDE</div>';
    // consommation2050 = this.y;

// }


function affecterConsommation(X,Y){
    consommation2050=Y;
    anneeCible=X;
    document.getElementById('tab_chart_Scenario.qu').innerHTML=Y;
    document.getElementById('tab_chart_Scenario.id').innerHTML=X;
    document.getElementById('bouton_scenario').style.display="";
}

// Two charts definition
var chart_Scenario, chart2, chart3;
// Once DOM (document) is finished loading
$(document).ready(function() {

    // First chart initialization
    passerChartRte();

    // Second chart initialization (pie chart)
    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 350
        },
        title: {
            text: 'Pie chart diagram for the first developer'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Dev #1',
            data: [
                ['Processing.js', 5],
                ['Impact.js', 10],
                ['Other', 20],
                ['Ease.js', 22],
                ['Box2D.js', 25],
                ['WebGL', 28],
                ['DOM', 30],
                ['CSS', 40],
                ['Canvas', 80],
                ['Javascript', 90]
            ]
        }]
    });

    chart3 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_3',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 350
        },
        title: {
            text: 'Pie chart diagram for the first developer'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Dev #1',
            data: [
                ['Nucléaire', 15],
                ['Photovoltaïque', 10],
                ['Other', 20],
                ['Ease.js', 22],
                ['Box2D.js', 25],
                ['WebGL', 28],
                ['DOM', 30],
                ['CSS', 40],
                ['Canvas', 80],
                ['Javascript', 90]
            ]
        }]
    });


});