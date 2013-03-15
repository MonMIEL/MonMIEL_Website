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
        <script src="js/jquery.qtip-1.0.0-rc3.min.js"></script>
        <script src="js/infoBulle.js"></script>
        <script src="js/bootstrap.js"></script>
		
		<script src="js/highchart/highcharts.js"></script>
        <script src="js/highchart/exporting.js"></script>

		<script src="js/rendu1.js" ></script>
        <script src="js/calculJsonMonMIEL.js" ></script>
        <script src="js/oXHR.js"></script>
		<script src="js/spin.js"></script>
		
        <script>
            var nuc_gwh;
            var pho_gwh;
            var eol_gwh;
            var nbPoints;
            var consommation2050;
            function init(){
                anneeRef = 2011;
                anneeCible = 2050;
                consommation2050 = <?php echo $_GET["consommation2050"] ?>;
                nuc_gwh = <?php echo $_GET["nuc_gwh"] ?>;
                pho_gwh = <?php echo $_GET["pho_gwh"] ?>;
                eol_gwh = <?php echo $_GET["eol_gwh"] ?>;
                nbPoints = <?php echo $_GET["nbPoints"] ?>;
                console.log("nuc_gwh : "+nuc_gwh);
                console.log("pho_gwh : "+pho_gwh);
                console.log("eol_gwh : "+eol_gwh);
                if(typeof(nuc_gwh)=="undefined" ||
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

			<div id="parc" style="display:none;">

				<h1>Résultat - Parc calculé</h1>
				
				<div class="aide">
					<p>Ce tableau présente le parc calculé par le simulateur.</p>
					<p>Le parc ciblé, celui qui a été saisi lors du paramétrage de la simulation, peut ne pas répondre au besoin en électricité. Il doit répondre à une règle importante :</p>
					<p><Strong>Production = Consommation</Strong></p>
					<p>La production représente l’ensemble de l’énergie générée par l’ensemble du parc électrique et la consommation ce qui est demandé par la population en électricité.</p>
					<p>Si la production est supérieure à la consommation, le réseau ne supporte pas et risque de s’endommager voire de provoquer une coupure générale.</p>
					<p>Si la production est inférieure à la demande, certains utilisateurs risquent de ne plus avoir d’électricité.</p>
					</p>
				</div>

				<div class="bloc">
					<div class="row first">
						<div class="span2">Type parc</div>
						<div class="span6">Répartition de la puissance du parc en MW</div>
						<div class="span1">Parc ciblé (MW)</div>
						<div class="span1">Parc calculé (MW)</div>
						<div class="span2 evol">Evolution de la puissance (MW)</div>
					</div>
					<div class="row">
						<div class="span2">Légende</div>
						<div class="span1"></div>
						<div class="span4 legende-verte">
                            Puissance énergétique du parc ciblé
							<div id="idLegendeRef" class="progress progress-success progress-striped active bulle" tooltip="Le parc ciblé est celui que vous avez choisi lors du paramétrage de la simulation">
							  <div class="bar" style="width: 100%;"></div>
							</div>
						</div>
						<div class="span4 legende-jaune">
                            Puissance énergétique du parc calculé
							<div id="idLegendeCible" class="progress progress-warning progress-striped active bulle" tooltip="Le parc calculé est le parc ciblé avec les ajustements fait par le simulateur. Il peut y avoir un écart important si le parc ciblé n’était pas assez flexible dans sa capacité à répondre à la demande">
							  <div class="bar" style="width: 100%;"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="span2">Nucléaire <img src="img/help.png" class="bulle" tooltip="Le nucléaire fournit une puissance importante mais son fonctionnement ne permet pas de changer la production rapidement" /></div>
						<div class="span6">
							<div id="barParcTargetNuke" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part du nucléaire sur le parc ciblé">
							    <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalNuke" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part du nucléaire sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
						<div id="idParcTargetNuke" class="span1"></div>
						<div id="idParcFinalNuke" class="span1"></div>
						<div id="idDiffParcNuke" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Photovoltaïque <img src="img/help.png" class="bulle" tooltip="Le photovoltaïque génère une électricité dites fatale. Autrement dit, on ne peut pas régler la puissance de l’électricité générée, il est donc nécessaire de la consommer" /></div>
						<div class="span6">
							<div id="barParcTargetPhoto" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part du photovoltaïque sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalPhoto" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part du photovoltaïque sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetPhoto" class="span1"></div>
                        <div id="idParcFinalPhoto" class="span1"></div>
                        <div id="idDiffParcPhoto" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Eolien <img src="img/help.png" class="bulle" tooltip="Tout comme le photovoltaïque, l’éolien génère une électricité fatale" /></div>
						<div class="span6">
							<div id="barParcTargetEol" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part de l’éolien sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalEol" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représente la part de l’éolien sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetEol" class="span1"></div>
                        <div id="idParcFinalEol" class="span1"></div>
                        <div id="idDiffParcEol" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Hydraulique <img src="img/help.png" class="bulle" tooltip="Tout comme le photovoltaïque, l’hydraulique génère une électricité fatale" /></div>
						<div class="span6">
							<div id="barParcTargetHydrau" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part de l’hydraulique sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalHydrau" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part de l’hydraulique sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetHydrau" class="span1"></div>
                        <div id="idParcFinalHydrau" class="span1"></div>
                        <div id="idDiffParcHydrau" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Centrales à flammes <img src="img/help.png" class="bulle" tooltip="Les centrales à flammes ont la particularité de pouvoir régler la puissance générée rapidement. Autrement dit, lorsque la demande en électricité est forte durant un laps de temps court, les centrales à flammes permettent de combler le manque d’électricité" /></div>
						<div class="span6">
							<div id="barParcTargetFlame" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part des centrales à flammes sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalFlame" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part des centrales à flammes sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetFlame" class="span1"></div>
                        <div id="idParcFinalFlame" class="span1"></div>
                        <div id="idDiffParcFlame" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">STEP <img src="img/help.png" class="bulle" tooltip="Les STEP sont un système qui permet de stocker de l'énergie grâce à des barrages. Lorsqu'il est possible de fournir une puissance électrique supérieur à la demande, l'électricité supplémentaire est utilisée pour faire monter l'eau vers les barrages. Quand la demande est forte, l'eau est libérée et elle génère de l'énergie grâce au barrage." /></div>
						<div class="span6">
							<div id="barParcTargetStep" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part des STEP sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalStep" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part des STEP sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetStep" class="span1"></div>
                        <div id="idParcFinalStep" class="span1"></div>
                        <div id="idDiffParcStep" class="span1"></div>
					</div>
					<div class="row">
						<div class="span2">Import <img src="img/help.png" class="bulle" tooltip="L'import représente l'énergie importée des pays voisins. Il faut savoir que lex prix fluctuent énormément et qu'il est parfois moins cher d'importer que d'allumer une centrale à flammes" /></div>
						<div class="span6">
							<div id="barParcTargetImport" class="first progress progress-success progress-striped active bulle" tooltip="Ce pourcentage représente la part de l’import sur le parc ciblé">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
							<div id="barParcFinalImport" class="progress progress-warning progress-striped active bulle" tooltip="Ce pourcentage représenta la part de l’import sur le parc calculé par le simulateur">
                                <span class="value"></span>
                                <div class="bar"></div>
							</div>
						</div>
                        <div id="idParcTargetImport" class="span1"></div>
                        <div id="idParcFinalImport" class="span1"></div>
                        <div id="idDiffParcImport" class="span1"></div>
					</div>
				</div>
			</div>



            <div id="rendue2" style="display:none">


                <div id="consommation">
                    <h1>Résultat - Consommation <img src="img/help.png" class="bulle" tooltip="Ce schéma représente la puissance délivrée par chaque type de parc sur l'année ciblée" /></h1>
                    <div id="chart_conso" class="chart"></div>
                </div>

                <div class="row first">
                    <div id="mixdemande" class="span6">
                        <h1>Mix ciblé <img src="img/help.png" class="bulle" tooltip="Le mix électrique ciblé est celui que vous avez choisi lors du paramétrage de la simulation" /></h1>
                        <div id="chart_1" class="chart"></div>
                    </div>
                    <div id="mixcalcule" class="span6">
                        <h1>Mix Calculé <img src="img/help.png" class="bulle" tooltip="Le mix calculé est le parc ciblé avec les ajustements fait par le simulateur. Il peut y avoir un écart important si le parc ciblé n’était pas assez flexible dans sa capacité à répondre à la demande" /></h1>
                        <div id="chart_2" class="chart"></div>
                    </div>
                </div>
                <img class="separateur" src="img/separateur.jpg" alt="separateur" />

                <h1>Explications des calculs <img src="img/help.png" class="bulle" tooltip="Découvrez le bilan des analyses et calculs réalisés dans cette partie !" /></h1>
                <div class="aide">
                    <p>Ce tableau présente le parc calculé par le simulateur.</p>
                    <p>Le parc ciblé, celui qui a été saisi lors du paramétrage de la simulation, peut ne pas répondre au besoin en électricité. Il doit répondre à une règle importante :</p>
                    <p><Strong>Production = Consommation</Strong></p>
                    <p>La production représente l’ensemble de l’énergie générée par l’ensemble du parc électrique et la consommation ce qui est demandé par la population en électricité.</p>
                    <p>Si la production est supérieure à la consommation, le réseau ne supporte pas et risque de s’endommager voire de provoquer une coupure générale.</p>
                    <p>Si la production est inférieure à la demande, certains utilisateurs risquent de ne plus avoir d’électricité.</p>
                    </p>
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
