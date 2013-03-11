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


function passerEnergetique(){
    document.getElementById('ariane').innerHTML="<img src='img/ariane3.png' />";
    document.getElementById("rendue2").style.display="";
    document.getElementById("parc").style.display="none";
    document.getElementById("calcul").style.display="none";

    miseEnPlaceHighChart();
}

var chart1, chart2,chart;

function miseEnPlaceHighChart(){

	Highcharts.setOptions({
        colors: ['#E81C0C', '#FF530D', '#E8C57A', '#1BAA8F', '#166877', '#FF9655', '#FFF263']
    });
	
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_conso',
            type: 'area',
            backgroundColor: 'rgba(255,255,255,0.5)'
        },
        title: {
            text: 'Consommation'
        },
        subtitle: {
            text: 'Année de reférence : 2050'
        },
        xAxis: {
            categories: ['Janvier', 'Mars', 'Mai', 'Juillet', 'Septembre', 'Novembre', 'Decembre'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Gw '
            },
            labels: {
                formatter: function() {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            formatter: function() {
                return ''+
                    this.x +': '+ Highcharts.numberFormat(this.y, 0, ',') +' GW';
            }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Nucléaire',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'Photovoltaique',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: 'Eolien',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'Hydraulique',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: 'Centrales à flammes',
            data: [2, 2, 2, 6, 13, 30, 46]
        }, {
            name: 'STEP',
            data: [0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'Import',
            data: [0, 0, 0, 0, 0, 0, 0]
        }]
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
};