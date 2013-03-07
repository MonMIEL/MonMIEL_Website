/**
 * Created with JetBrains PhpStorm.
 * User: Vincent-Port
 * Date: 06/03/13
 * Time: 08:56
 * To change this template use File | Settings | File Templates.
 */
// Change Chart type function

function chartselect( chart, index){
    chart.series[0].data[index].select(true);
}

var chart1, chart2;

$(document).ready(function() {
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
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
        title: {
            text: 'Mix Demandé'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage}%</b> - ',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return  this.percentage +' %';
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
                {name :'nucléaire',y: 50, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'Photovoltaïque',y: 10, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'Eolien',y: 5, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'Hydraulique',y: 5, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'Centrales à flammes',y: 30, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'STEP',y: 0, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }},
                {name :'IMPORT',y: 0, events:{
                    click : function(){chart2.series[0].data[this.x].select(true); }
                }}
            ]
        }]
    });



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
            text: 'Mix Calculé'
        },
        tooltip: {
            pointFormat: ' <b>{point.percentage}% ({point.z}%)</b>',
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
                        return this.percentage +' %';
                    }
                },

                showInLegend: true
            }
        },

        series: [{
            type: 'pie',
            name: 'calculé',
            data: [
                {name : 'nucléaire',y:  35, z: '-15', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'Photovoltaïque',y: 15,z:'+5', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'Eolien',y: 15,z:'+10', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'Hydraulique',y: 5,z:'0', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'Centrales à flammes',y: 30,z:'0', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'STEP',y: 0,z:'0', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }},
                {name : 'IMPORT',y: 0,z:'0', events:{
                    click : function(){chart1.series[0].data[this.x].select(true); }
                }}
            ]
        }]
    });


});