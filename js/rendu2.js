/**
 * Created with JetBrains PhpStorm.
 * User: Vincent-Port
 * Date: 06/03/13
 * Time: 08:56
 * To change this template use File | Settings | File Templates.
 */
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

var chart1, chart2;

$(document).ready(function() {

    // First chart initialization
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_1',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height:350
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
                ['nucléaire', 50],
                ['Photovoltaïque', 10],
                ['Eolien', 5],
                ['Hydraulique', 5],
                ['Centrales à flammes', 30],
                ['STEP', 0]
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
            height: 350
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
                {name : 'nucléaire',y:  35, z: '-15'},
                {name : 'Photovoltaïque',y: 15,z:'+5'},
                {name : 'Eolien',y: 15,z:'+10'},
                {name : 'Hydraulique',y: 5,z:'0'},
                {name : 'Centrales à flammes',y: 30,z:'0'},
                {name : 'STEP',y: 0,z:'0'}
            ]
        }]
    });


});