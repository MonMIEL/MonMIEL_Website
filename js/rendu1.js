
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
var ouvert=false;
var name="";
var afficherPieChart1 = function(){
    var affecterancien=false;
    if(name!="" && name!= this.name && ouvert==true){ chart1.series[0].select(false);ouvert=false};
    for(i=0;i<chart1.series[0].data.length;i++){
        if(chart1.series[0].data[i].name == this.name){
            chart1.series[0].data[i].select(!ouvert);
            ouvert=(!ouvert);
        }
    }
    name=this.name;
}; //utilisé dans Chart2

var afficherPieChart2 = function(){
    var affecterancien=false;
    if(name!="" && name!= this.name && ouvert==true){ chart2.series[0].select(false);ouvert=false};
    for(i=0;i<chart2.series[0].data.length;i++){
        if(chart2.series[0].data[i].name == this.name){
            chart2.series[0].data[i].select(!ouvert);
            ouvert=(!ouvert);
        }
    }
    name=this.name;

}; //utilisé dans Chart1

function miseEnPlaceHighChart(){

	Highcharts.setOptions({
        colors: ['#E81C0C', '#FF530D', '#E8C57A', '#1BAA8F', '#166877', '#FF9655', '#FFF263'/*, 'black', 'white'*/]
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
            zoomType: 'x',
            borderWidth: 2,
            resetZoomButton: {
                name: "hello"
            }
        },
        credits : {
            enabled : false
        },
        title: {
            text: 'Puissance du parc'
        },
        xAxis: {
            gridLineWidth: 0.3,
            gridLineColor:'black',
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
            gridLineWidth: 0.3,
            gridLineColor:'black',
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
            line: {
                stacking: 'normal',
                lineWidth: 1.5,
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 5
                        }
                    }
                },
                shadow: true,
                states: {
                    hover: {
                        lineWidth: 1.5
                    }
                }
            }
        },
        series: [{
            color:'black',
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
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'STEP',
            data: dataJSON.series.step
        }, {
            pointInterval: 24*60 * 60 * 1000,
            pointStart: Date.UTC(anneeCible, 0, 01),
            name: 'Import',
            data: dataJSON.series.import
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
            borderWidth: 2,
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        credits : {
            enabled : false
        },
        title: {
            text: 'Energie consommée ciblée (TWh)'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            series: {
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
                /*
                {name :'STEP',                  y: perMixTargetSTEP,    events:{click : afficherPieChart2,visible:(perMixTargetSTEP.toFixed(1)!=0.0)}}
                {name :'Import',                y: perMixTargetImport,  events:{click : afficherPieChart2,visible:(perMixTargetImport.toFixed(1)!=0.0)}}
                */
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
            borderWidth: 2,
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        title: {
            text: 'Energie consommée obtenue (TWh)'
        },
        credits : {
            enabled : false
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}% ({point.z}%)</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            series: {
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
                /*
                {name : 'STEP',                 y: perMixFinalSTEP,     z:diffPerMixHydrau, events:{click : afficherPieChart1},visible:perMixFinalSTEP.toFixed(1)!=0.0},
                {name : 'Import',               y: perMixFinalImport,   z:diffPerMixNuke,   events:{click : afficherPieChart1},visible:perMixFinalImport.toFixed(1)!=0.0}
                */
            ]
        }]
    });
};
