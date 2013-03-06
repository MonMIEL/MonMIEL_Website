<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/style.css">

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <script src="js/bootstrap.js"></script>
        <!-- add scripts -->
        <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="js/highchart/highcharts.js"></script>
        <script src="js/highchart/gray.js"></script>
        <script src="js/highchart/main.js"></script>
    </head>
    <body>
		
		<?php include("header.php"); ?>
		
		<?php include("menu.php"); ?>
		
		<section>
			<div id="Horizon">
				<h1>Horizon</h1>
				<label for="annee">Année sélectionnée</label>
				<input id="annee" name="annee" type=text placeholder="exemple : 2012" required autofocus>
			</div>

			<div id="Scenario">
				<h1>Scénario</h1>
			</div>
				<!-- two different charts -->
				<div id="chart_2" class="chart"></div>
				<div id="chart_1" class="chart"></div>
			<div id="monmix">
				<h1>Mon MIx ELectrique</h1>
			</div>

		</section>

		<?php include("footer.php"); ?>
    </body>
</html>
