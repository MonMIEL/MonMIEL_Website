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
        <script src="js/highchart/exporting.js"></script>

		<script src="js/rendu1.js" ></script>
        <script src="js/calculJsonMonMIEL.js" ></script>
        <script src="js/oXHR.js"></script>
		<script src="js/spin.js"></script>
        <script>
            var anneeRef;
            var anneeCible;
            var consommation2050;
            var nuc_gwh;
            var pho_gwh;
            var eol_gwh;
            var nbPoints;
            function init(){
                anneeRef = 2011;
                anneeCible = 2050;
                consommation2050 = <?php echo $_GET["consommation2050"] ?>;
                nuc_gwh = <?php echo $_GET["nuc_gwh"] ?>;
                pho_gwh = <?php echo $_GET["pho_gwh"] ?>;
                eol_gwh = <?php echo $_GET["eol_gwh"] ?>;
                nbPoints = <?php echo $_GET["nbPoints"] ?>;
                console.log("anneeRef : "+anneeRef);
                console.log("anneeCible : "+anneeCible);
                console.log("consommation2050 : "+consommation2050);
                console.log("nuc_gwh : "+nuc_gwh);
                console.log("pho_gwh : "+pho_gwh);
                console.log("eol_gwh : "+eol_gwh);
                if(typeof(anneeRef)=="undefined" ||
                        typeof(anneeCible)=="undefined" ||
                        typeof(consommation2050)=="undefined" ||
                        typeof(nuc_gwh)=="undefined" ||
                        typeof(pho_gwh)=="undefined" ||
                        typeof(eol_gwh)=="undefined"){
                    alert();
                    window.location = "ihm1.php?error=manqueDonnee";
                }
                calculerMonMIEL();
            }
			
        </script>
    </head>
    <body onload="init()">
		<?php include("header.php"); ?>
		
		<?php include("menu.php"); ?>

		<section>
			<div id="ariane" class="ariane">
				<img src="img/ariane2.png"/>
			</div>

			<div id="loadCalculMonMIEL"></div>

			<div id="parc">

				<h1>Résultat - Parc calculé</h1>

				<div class="bloc">
					<div class="row first">
						<div class="span2">Type parc</div>
						<div class="span6">Répartition de la puissance du parc en MW</div>
						<div class="span1">Parc ciblé (MW)</div>
						<div class="span1">Parc calculé (MW)</div>
						<div class="span2 evol">Evolution de la puissance (MW)</div>
					</div>
					<div class="row">
						<div class="span2">Nucléaire</div>
						<div class="span6">
							<div id="barParcTargetNuke" class="first progress progress-success progress-striped active">
							    <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalNuke" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
						<div id="idParcTargetNuke" class="span1"></div>
						<div id="idParcFinalNuke" class="span1"></div>
						<div id="idDiffParcNuke" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Photovoltaïque</div>
						<div class="span6">
							<div id="barParcTargetPhoto" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalPhoto" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetPhoto" class="span1"></div>
                        <div id="idParcFinalPhoto" class="span1"></div>
                        <div id="idDiffParcPhoto" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Eolien</div>
						<div class="span6">
							<div id="barParcTargetEol" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalEol" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetEol" class="span1"></div>
                        <div id="idParcFinalEol" class="span1"></div>
                        <div id="idDiffParcEol" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Hydraulique</div>
						<div class="span6">
							<div id="barParcTargetHydrau" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalHydrau" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetHydrau" class="span1"></div>
                        <div id="idParcFinalHydrau" class="span1"></div>
                        <div id="idDiffParcHydrau" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Centrales à flammes</div>
						<div class="span6">
							<div id="barParcTargetFlame" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalFlame" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetFlame" class="span1"></div>
                        <div id="idParcFinalFlame" class="span1"></div>
                        <div id="idDiffParcFlame" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">STEP</div>
						<div class="span6">
							<div id="barParcTargetStep" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalStep" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetStep" class="span1"></div>
                        <div id="idParcFinalStep" class="span1"></div>
                        <div id="idDiffParcStep" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Import</div>
						<div class="span6">
							<div id="barParcTargetImport" class="first progress progress-success progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalImport" class="progress progress-warning progress-striped active">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetImport" class="span1"></div>
                        <div id="idParcFinalImport" class="span1"></div>
                        <div id="idDiffParcImport" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Légende</div>
						<div class="span1"></div>
						<div class="span4 legende-verte">
                            Puissance énergétique du parc ciblé
							<div id="idLegendeRef" class="progress progress-success progress-striped active">
							  <div class="bar" style="width: 100%;"></div>
							</div>
						</div>
						<div class="span4 legende-jaune">
                            Puissance énergétique du parc calculé
							<div id="idLegendeCible" class="progress progress-warning progress-striped active">
							  <div class="bar" style="width: 100%;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>



            <div id="rendue2" style="display:none">


                <div id="consommation">
                    <h1>Résultat : Consommation</h1>
                    <div id="chart_conso" class="chart"></div>
                </div>

                <div class="row first">
                    <div id="mixdemande" class="span6">
                        <h1>Mix demandé</h1>
                        <div id="chart_1" class="chart"></div>
                    </div>
                    <div id="mixcalcule" class="span6">
                        <h1>Mix Calculé</h1>
                        <div id="chart_2" class="chart"></div>
                    </div>
                </div>
            </div>

            <div id="calcul" style="display:none">
                <img class="separateur" src="img/separateur.jpg" alt="separateur" />
                <div id ="bouttonMix" class="bouton">
                    <a onclick="passerEnergetique()"><span class="but-icon"></span>Mix énergétique</a>
                </div>
            </div>
		</section>

		<?php include("footer.php"); ?>
    </body>
</html>
