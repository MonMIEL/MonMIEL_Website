
// Change Chart type function

var colorNuke = '#450051';
var colorPhoto = '#EAE73E';
var colorEol = 'white';
var colorHydrau = '#008188';
var colorFlammes = '#E10000';
var colorSTEP = 'black';
var colorIMPORT = 'black';

var chart1, chart2,chart;

function chartselect( chart, index){
    chart.series[0].data[index].select(true);
}

var passer=false;
function passerEnergetique(){
    document.getElementById('ariane').innerHTML="<img src='img/ariane3.png' />";
    document.getElementById("rendue2").style.display="";
    document.getElementById("parc").style.display="none";
    document.getElementById("bouttonMix").innerHTML="<a onclick='passerParc()'><span class='but-icon' style=\"background: url('../img/icon_arrow2.png')\"></span>Parc et consommation</a>"
    if(!passer){
    miseEnPlaceHighChart();
    passer=true;
    }
}
function passerParc(){
    document.getElementById('ariane').innerHTML="<img src='img/ariane2.png' />";
    document.getElementById("parc").style.display="";
    document.getElementById("rendue2").style.display="none";
    document.getElementById("bouttonMix").innerHTML=" <a onclick='passerEnergetique()'><span class='but-icon'></span>Mix énergétique</a>"
}

// the button handler
function exporterChartConso() {
    chart.exportChart(null, {
        chart: {
            backgroundColor: '#FFFFFF'
        }
    });
}

var afficherPieChart1 = function(){ chart1.series[0].data[this.x].select(true);}; //utilisé dans Chart2
var afficherPieChart2 = function(){ chart2.series[0].data[this.x].select(true);}; //utilisé dans Chart1

function miseEnPlaceHighChart(){

	Highcharts.setOptions({
        colors: ['#E81C0C', '#FF530D', '#E8C57A', '#1BAA8F', '#166877', '#FF9655', '#FFF263']
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
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_conso',
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0.5)',
            animation: false,
            zoomType: 'x'
        },
        credits : {
            enabled : false
        },
        title: {
            text: 'Puissance du parc'
        },
        subtitle: {
            text: 'Année de reférence : 2050'
        },
        xAxis: {
            type: 'datetime',
            //maxZoom : 10,
            title: {
                enabled: false
            },
            labels : {
                formatter : function(){
                    return Highcharts.dateFormat("%B %e, %Y", this.value);
                },
                staggerLines: 2
            }
        },
        yAxis: {
            title: {
                text: 'Puissance (Gw) '
            },
            labels: {
                formatter: function() {
                    return this.value / 1000;
                }
            },
            min: 0
        },
        tooltip: {
            formatter: function() {
                return ''+
                    '<b>Date </b>: ' + Highcharts.dateFormat("%B %e, %Y", this.x) +'<br/>'+ '<b>Puissance : </b>'+Highcharts.numberFormat(this.y, 0)+' GW';
            },
            crosshairs: true
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 5
                        }
                    }
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 5
                        }
                    }
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type:'line',
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Total de consommation',
            data: dataJSON.series.total
        },{
            pointInterval: 24 * 60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Centrales à flammes',
            data: dataJSON.series.flamme
            //data : [20000, 40000],
          //  color: colorFlammes
        }, {
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Photovoltaique',
            data: dataJSON.series.photovoltaique
         //   color: colorPhoto
        }, {
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Eolien',
            data: dataJSON.series.eolien
          //  color: colorEol
        }, {
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Hydraulique',
            data: dataJSON.series.hydraulique
           // color: colorHydrau
        }, {
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Nucléaire',
            data: dataJSON.series.nucleaire
            //   color: colorNuke
        }/*, {
            name: 'STEP',
            color: colorSTEP,
            data: [0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'Import',
            color: colorIMPORT,
            data: [0, 0, 0, 0, 0, 0, 0]
        }*/]
    });

/*----------------Mix demandé----------------*/

    // First chart initialization
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_1',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height:350,
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        credits : {
            enabled : false
        },
        title: {
            text: 'Mix électrique en TWh'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return  this.percentage.toFixed(1) +' %';
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
                {name :'Centrales à flammes',   y: perMixTargetFlame,   events:{click : afficherPieChart2},visible:(perMixTargetFlame.toFixed(1)!=0.0)},
                {name :'Photovoltaïque',        y: perMixTargetPhoto ,  events:{click : afficherPieChart2},visible:(perMixTargetPhoto.toFixed(1)!=0.0)},
                {name :'Eolien',                y: perMixTargetEol,     events:{click : afficherPieChart2},visible:(perMixTargetEol.toFixed(1)!=0.0)},
                {name :'Hydraulique',           y: perMixTargetHydrau,  events:{click : afficherPieChart2},visible:(perMixTargetHydrau.toFixed(1)!=0.0)},
                {name :'Nucléaire',             y: perMixTargetNuke,    events:{click : afficherPieChart2,visible:(perMixTargetNuke.toFixed(1)!=0.0)}}
/*,
                {name :'STEP', y: 0, events:{
                    select : function(){chart2.series[0].data[this.x].select(true); },
                    unselect : function(){chart2.series[0].data[this.x].select(false);}
                }},
                {name :'IMPORT', y: 0, events:{
                    select : function(){chart2.series[0].data[this.x].select(true); },
                    unselect : function(){chart2.series[0].data[this.x].select(false);}
                }}*/
            ]
        }]
    });



    /*----------------Mix calculé----------------*/

    // Second chart initialization (pie chart)
    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 350,
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        title: {
            text: 'Mix électrique en TWh'
        },
        credits : {
            enabled : false
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}% ({point.z}%)</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return this.percentage.toFixed(1) +' %';
                    }
                },

                showInLegend: true
            }
        },

        series: [{
            type: 'pie',
            name: 'calculé',
            data: [
                {name : 'Centrales à flammes',  y: perMixFinalFlame,    z:diffPerMixFlame,  events:{click : afficherPieChart1},visible:perMixFinalFlame.toFixed(1)!=0.0},
                {name : 'Photovoltaïque',       y: perMixFinalPhoto,    z:diffPerMixPhoto,  events:{click : afficherPieChart1},visible:perMixFinalPhoto.toFixed(1)!=0.0},
                {name : 'Eolien',               y: perMixFinalEol,      z:diffPerMixEol,    events:{click : afficherPieChart1},visible:perMixFinalEol.toFixed(1)!=0.0},
                {name : 'Hydraulique',          y: perMixFinalHydrau,   z:diffPerMixHydrau, events:{click : afficherPieChart1},visible:perMixFinalHydrau.toFixed(1)!=0.0},
                {name : 'Nucléaire',            y: perMixFinalNuke,     z:diffPerMixNuke,   events:{click : afficherPieChart1},visible:perMixFinalNuke.toFixed(1)!=0.0}
               /* {name : 'STEP', y: 0,z:'0', events:{
                    select : function(){chart1.series[0].data[this.x].select(true); },
                    unselect : function(){chart2.series[0].data[this.x].select(false);}
                }},
                {name : 'IMPORT', y: 0,z:'0', events:{
                    select : function(){chart1.series[0].data[this.x].select(true); },
                    unselect : function(){chart2.series[0].data[this.x].select(false);}
                }}*/
            ]
        }]
    });
};
