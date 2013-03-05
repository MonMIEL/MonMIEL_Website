<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8;">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta charset="UTF-8" />
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <title></title>
        <meta name="description" content="">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/style.css">
		<link href='http://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' type='text/css'>
		<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="js/bootstrap.js"></script>
		
		<script src="js/highchart/highcharts.js"></script>
		<script type="text/javascript">

			$(document).ready(function() {
				var chart;
				$(document).ready(function() {
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'chart_conso',
							type: 'area'
						},
						title: {
							text: 'Consommation'
						},
						subtitle: {
							text: 'Année de reférence : 2050'
						},
						xAxis: {
							categories: ['janvier', 'mars', 'mai', 'juillet', 'septembre', 'nombre', 'decembre'],
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
							name: 'IMPORT',
							data: [0, 0, 0, 0, 0, 0, 0]
						}]
					});
				});
				
			});

		</script>
    </head>
    <body>
		<?php include("header.php"); ?>
		
		<?php include("menu.php"); ?>

		<section>
			<div id="consommation">
				<h1>Consommation</h1>
				 <div id="chart_conso" class="chart"></div>
			</div>

			<div id="parc">
				<h1>Parc calculé</h1>
				<div class="row first">
					<div class="span2">Type parc</div>
					<div class="span6">GW</div>
					<div class="span1">Parc actuel</div>
					<div class="span1">Parc ciblé</div>
					<div class="span1">Evolution de la puissance</div>
				</div>
				<div class="row">
					<div class="span2">Nucléaire</div>
					<div class="span6">
						<div class="first progress progress-success progress-striped active">
						  <div class="bar" style="width: 50%;"></div>
						</div>
						<div class="progress progress-warning progress-striped active">
						  <div class="bar" style="width: 65%;"></div>
						</div>
					</div>
					<div class="span1">50</div>
					<div class="span1">65</div>
					<div class="span1">+15</div>
				</div>
				<div class="row">
					<div class="span2">Photovoltaïque</div>
					<div class="span6">
						<div class="first progress progress-success progress-striped active">
						  <div class="bar" style="width: 50%;"></div>
						</div>
						<div class="progress progress-warning progress-striped active">
						  <div class="bar" style="width: 65%;"></div>
						</div>
					</div>
					<div class="span1">50</div>
					<div class="span1">65</div>
					<div class="span1">+15</div>
				</div>
				<div class="row">
					<div class="span2">Eolien</div>
					<div class="span6">
						<div class="first progress progress-success progress-striped active">
						  <div class="bar" style="width: 80%;"></div>
						</div>
						<div class="progress progress-warning progress-striped active">
						  <div class="bar" style="width: 20%;"></div>
						</div>
					</div>
					<div class="span1">80</div>
					<div class="span1">20</div>
					<div class="span1">-60</div>
				</div>
			</div>

			<div id="calcul">
			</div>
			
		</section>

		<?php include("footer.php"); ?>
    </body>
</html>
