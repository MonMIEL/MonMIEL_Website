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

    <link rel="stylesheet" href="css/bootstrap.css">

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/ihm1.css">

    <!-- add scripts -->
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/highchart/highcharts.js"></script>
    <script src="js/highchart/gray.js"></script>
    <script src="js/ihm1.js"></script>
	
	<!-- script d'affichage du contenu du slider -->
	<script rel="text/javasript">
		function updateTextInput(val) {
			document.getElementById('textInput').value=val; 
		}
	</script>
	<!-- script d'affichage du contenu du slider -->
</head>
<body>
    <?php include("header.php"); ?>
    <?php include("menu.php"); ?>

    <?php
        $var_anneeRef = 2011;
        // $$var_anneeRef contient la valeur numérique de l'année de référence entrée par l'utilisateur
    ?>
    <!-- Chart type switchers -->
    <!-- <div class="actions">
        <button class="switcher" id="column">column</button>
        <button class="switcher" id="area">area</button>
        <button class="switcher" id="line">line</button>
        <button class="switcher" id="spline">Spine</button>
        <button class="switcher" id="areaspline">areaspline</button>
    </div> -->
    <section>

    <!-- Horizon section -->
        <div id="Horizon">
            <h1>Etape 1 : Horizon</h1>
            <label for="anneeRef">Indiquer l'année de Référence</label>
            <input id="anneeRef" name="anneeRef" type="text" placeholder="exemple: 2012" autofocus>
            <ul class="pager">
                <li><a href="#" onclick="showDivScenario(<?php echo $var_anneeRef; ?>)">Valider</a></li>
            </ul>
        </div>

        <!-- Scenario section -->
        <div id="Scenario" style="display:none;">
            <!--Titre-->
            <h1>Etape 2 : Scénario</h1>
            <!--Label-->
            <label for="anneeRef">Indiquer la quantité de la production</label>
            <!--Scenario-->
            <div class="navbar nav-tabs">
                <div class="navbar-inner">
                    <a class="brand">Type de scénario</a>
                    <ul class="nav">
                        <li class="active"><a href="#tab1" data-toggle="tab">RTE</a></li>
                        <li><a href="#tab2" data-toggle="tab">Autre</a></li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane active" id="tab1">
                    <div id="chart_Scenario" class="chart" style="width:100%; height:300px;"></div>
                </div>
                <div class="tab-pane" id="tab2">
                    <div id="chart_3" class="chart" style="width:100%; height:300px;"></div>
                </div>
            </div>
        </div>

        <!-- MonMix section -->
        <div id="monmix">
            <h1>Mon MIx ELectrique</h1>
			<div class="row">
				<div class="span1">
						Nucléaire
				</div>
				
				<div class="span3">
					<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput(this.value);">
				</div>

				<div class="span1">
					<input type="text" id="textInput" value="" style="width:30px; background:none;"> %
				</div>
			</div>
        </div>

        <div id="simuler">

        </div>
    </section>

    <?php include("footer.php"); ?>
</body>

</html>
