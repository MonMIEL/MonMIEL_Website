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
        <script src="js/rendu2.js"></script>
    </head>
    <body>
		<?php include("header.php"); ?>
		
		<?php include("menu.php"); ?>

		<section>
			<div class="aliane"><img src="img/aliane3.png"/></div>
            <div class="row first">
                <div id="Mixdemandé" class="span6">
                    <h1>Mix demandé</h1>
                    <div id="chart_1" class="chart"></div>
                </div>

                <div id="Mixcalculé" class="span6">
                    <h1>Mix Calculé</h1>
                    <div id="chart_2" class="chart"></div>
                </div>
            </div>
		</section>

		<?php include("footer.php"); ?>
    </body>
</html>
