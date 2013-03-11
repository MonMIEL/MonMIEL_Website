var anneeRef;         //année de référence choisie par l'utilisateur dans la partie Horizon
var anneeCible;         //année de référence choisie par l'utilisateur dans la partie Horizon
var consommation2050 = 700; //consommation pour l'année 2050 choisie par l'utilisateur dans la partie Scenario

var validHorizonRef=0; //=1 si la partie Horizon est validée, =0 sinon
var validHorizonCible=0; //=1 si la partie Horizon est validée, =0 sinon
var validScenario=0;//=1 si la partie Scenario est validée, =0 sinon
var validMonMix=0;  //=1 si la partie MonMixElectrique est validée, =0 sinon

function majChartAvecAnneeRef(chart, series) {
    for (var i = 0; i < series.length; i++) {
        chart_Scenario.series[i].data[0].name = "Année : "+anneeRef;
        chart_Scenario.series[i].data[0].x = parseInt(anneeRef);
        chart_Scenario.series[i].data[1].name = "Année : "+anneeCible;
        chart_Scenario.series[i].data[1].x = parseInt(anneeCible);
        chart_Scenario.render();
    }
}
function majChartAvecConso2050(chart, series) {
    for (var i = 0; i < series.length; i++) {
        chart_Scenario.series[i].data[1].y = parseInt(consommation2050);
        chart_Scenario.render();
    }
}

/*--------------------------------------------------------------------------*/

function validerHorizonRef(){
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
}

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
var passe = false;
var chart_cam;
function validerScenario(){
    document.getElementById('monmix').style.display = "block";
    //mise en place du camembert
    Highcharts.setOptions({
        colors: ['#E81C0C', '#FF530D', '#E8C57A', '#1BAA8F', '#166877', '#FF9655', '#FFF263']
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
    var nuc = Math.round(parseInt(document.getElementById("nuc_txtfield").value));
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

// Change Chart type function
function ChangeChartType(chart, series, newType) {
    newType = newType.toLowerCase();
    for (var i = 0; i < series.length; i++) {
        var srs = series[0];
        try {
            srs.chart.addSeries({
                    type: newType,
                    stack: srs.stack,
                    yaxis: srs.yaxis,
                    name: srs.name,
                    color: srs.color,
                    data: srs.options.data
                },
                false);
            series[0].remove();
        } catch (e) {
        }
    }
}

// Two charts definition
var chart_Scenario, chart2, chart3;
// Once DOM (document) is finished loading
$(document).ready(function() {

    // First chart initialization
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
            }
        },
        events: {
            redraw: function() {
                alert ('The chart was just redrawn');
            }
        },
        series: [{
				visible: false,
                name: 'Consommation',
                data: [{
                    name: anneeRef, //Change au moment du choix de l'année de Référence
                    color: '#00FF00',
                    'id': 'point1',
                    x: 2010, //Change au moment du choix de l'année de Référence
                    y: 300,
                    events:{
                        click: null,
                        mouseOver: null
                    }
                }, {
                    name: 'Consommation en 2050)',
                    color: '#FF00FF',
                    'id': 'point2',
                    x: 2050,
                    y: consommation2050
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

    // Switchers (of the Chart1 type) - onclick handler
    $('.switcher').click(function () {
        var newType = $(this).attr('id');
        ChangeChartType(chart_Scenario, chart_Scenario.series, newType);
    });


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