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

	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' type='text/css'>
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
		function updateTextInput(id,val) {
			document.getElementById(id).value=val; 
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
            <ul class="pager">
                <label id="labelAnneeRef" for="anneeRef">Indiquer l'année de Référence</label>
                <li>Année : <input id="anneeRef" type="text" name="inputAnneeRef" min="2011" max="2012"></li>
                <li><a onclick="showDivScenario()">Valider</a></li>
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
                    <div id="chart_Scenario" class="chart" style="height:300px;"></div>
                </div>
                <div class="tab-pane" id="tab2">
                    <div id="chart_3" class="chart" style="width:100%; height:300px;"></div>
                </div>
            </div>
        </div>

        <!-- MonMix section -->
        <div id="monmix">
			<!-- <img class="separateur" src="img/separateur.jpg" alt="separateur" /> -->
            <h1>Mon MIx ELectrique</h1>
			<div class="bloc">
				<div class="row first">
					<div class="span3">Energie</div>
					<div class="span1">%</div>
					<div class="span1">GWh</div>
				</div>

				<div class="row">					
					<div class="span3">Nucléaire<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('nuc',this.value);"></div>
					<div class="span1"><input type="text" id="nuc" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>
				
				<div class="row">					
					<div class="span3">Photovoltaïque<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('pho',this.value);"></div>
					<div class="span1"><input type="text" id="pho" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>

				<div class="row">					
					<div class="span3">Eolien<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('eol',this.value);"></div>
					<div class="span1"><input type="text" id="eol" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>

				<div class="row">					
					<div class="span3">Hydraulique<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('hyd',this.value);"></div>
					<div class="span1"><input type="text" id="hyd" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>

				<div class="row">					
					<div class="span3">Centrales à flammes<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('cen',this.value);"></div>
					<div class="span1"><input type="text" id="cen" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>

				<div class="row">					
					<div class="span3">STEP<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('ste',this.value);"></div>
					<div class="span1"><input type="text" id="ste" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>

				<div class="row">					
					<div class="span3">Import<input type="range" min="0" max="100" name="nucleaire" onchange="updateTextInput('imp',this.value);"></div>
					<div class="span1"><input type="text" id="imp" value="" style="width:30px; background:none;">%</div>
					<div class="span1"><?php $variable = '200'; ?>200</div>
				</div>
				
			</div>
        </div>

        <div id="simuler">

        </div>
    </section>

    <?php include("footer.php"); ?>
</body>

</html>
