/**
 *
 * Active Charts using Highcharts demonstration
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */
var anneeRef;
var consommation2050;

function majChartAvecAnneeRef(chart, series) {
    for (var i = 0; i < series.length; i++) {
        chart_Scenario.series[i].data[0].name = "Consommation de "+anneeRef;
        chart_Scenario.series[i].data[0].x = parseInt(anneeRef);
        chart_Scenario.render();
    }
}

function validerHorizon(){
    //Récupération des données entrées
    anneeRef=document.getElementById("anneeRef").value;

    if(parseInt(anneeRef)>=2011 && parseInt(anneeRef)<=2012){
        //Affichage du contenu suivant
        document.getElementById('scenario').style.display = "block";

        //alert(anneeRef);
        //console.log(chart_Scenario.series[0].data[0].name);

        //MaJ de titleHorizon
        document.getElementById("titleHorizon").style.cssText ="color:green";

        //MaJ du nom du premier point de chart_Scenario par rapport à la donnée anneeRef
        majChartAvecAnneeRef(chart_Scenario, chart_Scenario.series);
        var label =document.getElementById('labelHorizon');
        label.innerHTML='<div style="text-align:center; color:green">Année '+anneeRef+' est prise en compte <i class="icon-thumbs-up"></i></div>';

        //Reset other elements
            //cacher le bouton Suivant du contenu "Scenario"
        document.getElementById("buttonValiderScenario").setAttribute("disabled","disabled");
            //cacher le contenu "MonMIxELectrique"
        document.getElementById('monmix').style.display = "none";
    }else{
        var label =document.getElementById('labelAnneeRef');
        label.innerHTML="<div style=\"color:red\">"+"Valeur "+anneeRef+" n'est pas supportée</div></br>Indiquer l'année de Référence entre 2011 et 2012";
    }
}

function validerScenario(){
    //Affichage du contenu suivant
    document.getElementById('monmix').style.display = "block";

    //MaJ de titleHorizon
    document.getElementById("titleScenario").style.cssText ="color:green";

    // MaJ de lable
    var label =document.getElementById('labelScenario');
    label.innerHTML='<div style="text-align:center; color:green">La quantité de la consommation en 2050 est de '+consommation2050+' <i class="icon-thumbs-up"></i></div>';

}

function chartScenarioHandlerOver() {
    //console.log(this);

    //MaJ du tableau de la quantité choisie en Gwh
    document.getElementById("tab_chart_Scenario.id").innerHTML = anneeRef;
    document.getElementById("tab_chart_Scenario.qu").innerHTML = this.y;

}

function chartScenarioHandlerClick() {
    //console.log(this);

    //Permettre le click sur le bouton "suivant"
    document.getElementById("buttonValiderScenario").removeAttribute("disabled");

    //MaJ du tableau de la quantité choisie en Gwh
    document.getElementById("tab_chart_Scenario.id").innerHTML = anneeRef;
    document.getElementById("tab_chart_Scenario.qu").innerHTML = this.y;
    document.getElementById("etatScenario").innerHTML = '<div style="color:green">VALIDE</div>';
    consommation2050 = this.y;

}

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
            type: 'line',
            backgroundColor: 'rgba(255,255,255,0.5)',
            style: {
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
                fontSize: '50px'
            },
            animation: false
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
            text: 'Consommation énergétique',
            style: {
                color: '#3E576F',
                fontSize: '16px'
            }
        },
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
                text: 'Quantité (GWh)',
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
                name: 'Quatité 1',
                data: [{
                    name: anneeRef, //Change au moment du choix de l'année de Référence
                    color: '#00FF00',
                    'id': 'point1',
                    x: 2010, //Change au moment du choix de l'année de Référence
                    y: 500,
                    events:{
                        click: null,
                        mouseOver: null
                    }
                }, {
                    name: 'Consommation en 2050 (CLIQUER pour choisir)',
                    color: '#FF00FF',
                    'id': 'point2',
                    x: 2050,
                    y: 1000
                }]
            },
            {
                name: 'Quantité 2',
                data: [{
                    name: anneeRef, //Change au moment du choix de l'année de Référence
                    color: '#00FF00',
                    'id': 'point1',
                    x: 2010, //Change au moment du choix de l'année de Référence
                    y: 500,
                    events:{
                        click: null,
                        mouseOver: null
                    }
                }, {//Prévention de la consommation énergétique
                    name: 'Consommation en 2050 (CLIQUER pour choisir)',
                    color: '#FF00FF',
                    'id': 'point2',
                    x: 2050,
                    y: 200
                }]
            }],
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        //mouseOver: chartScenarioHandlerOver,
                        click: chartScenarioHandlerClick
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