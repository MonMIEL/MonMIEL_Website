<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <!-- <meta name="viewport" content="width=device-width"> -->

        <link rel="stylesheet" href="css/bootstrap.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/style.css">

        <script src="js/bootstrap.js"></script>
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

			<div id="monmix">
				<h1>Mon MIx ELectrique</h1>
			</div>

			<div id="simuler">

			</div>
		</section>

		<?php include("footer.php"); ?>
    </body>
</html>
