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
	<link href='http://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/ihm1.css">

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
    <script src="js/dhtmlgoodies_slider.js"></script>
	<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.qtip-1.0.0-rc3.min.js"></script>
	
    <!-- script d'affichage du contenu du slider -->
	<script rel="text/javasript">
		function updateTextInput(id) {
            val = document.getElementById(id+"_txtfield").value;
			document.getElementById(id).value=val; 
			document.getElementById(id+"_gwh").value=Math.floor((val/100)*consommation2050);
		}

        function gorendu(){
            var html = "rendu1.php?"+
                    "nuc_gwh="+ document.getElementById("nuc_gwh").value+
                    "&pho_gwh="+ document.getElementById("pho_gwh").value +
                    "&eol_gwh="+ document.getElementById("eol_gwh").value +
                    "&nbPoints=100";
            window.location = html;
        }
	</script>
	<!-- script d'affichage du contenu du slider -->
	
	<!-- script de bulles d'information -->
		<script type="text/javascript">
			$(document).ready(function(){
				$("#bulle").qtip({
					content:'Test bulleTest bulleTest bulleTest bulleTest bulleTest bulleTest bulleTest bulleTest bulleTest bulle',
					position: {
						corner:{
							target:'topRight',
							tooltip: 'bottomLeft'
						}
					},
					style: {
						name: 'cream',
						padding:5,
						tip: 'bottomLeft',
						border: {
							radius:5
						}
					}
				});
			});
		</script>
	<!-- script de bulles d'information -->
	
</head>
<body>
    <?php include("header.php"); ?>
    <?php include("menu.php"); ?>

    <section>
		<div class="ariane">
			<img src="img/ariane1.png"/>
		</div>

    <!-- Horizon section -->
        <div id="horizon">

            <?php if(isset($_GET['error'])) {
            echo "<div id='erreur' class='bloc'>";
            if($_GET['error']=="erreurChargementRendu1")
                echo "Erreur lors du chargement du calculateur";
            else if ($_GET['error']=="manqueDonnee")
                echo "Merci de renseigner les informations avant de simuler";
            echo "</div>";
            }?>
        </div>
            <!--<ul class="pager">-->
            <!--<div class="bloc">
                <div class="row">
					
					<div class="span6 gauche">Année de référence :</div>
					<div class="span6 droite">
						<select id="anneeRef">
							<option>2011</option>
							<option>2012</option>
						</select>
						<!-- info bulle -->
				<!--		<a href="#" class="bulle">
							<img src="img/bulle.png" class="bulle" style="height:25px; width:25px;"/>
							<span class="bulle-content">On choisit ici une année de référence, qu'on prendra pour le calcul de notre scénario.</span>
						</a>
						<!-- info bulle -->
					<!--</div>
				</div>
				<p id="labelHorizonRef"></p>
                <!--<li><a id="ValiderHorizon" onclick="validerHorizon()">Valider</a></li>-->
				<!--<div class="bouton">
					<a onclick="validerHorizonRef()"><span class="but-icon"></span>Valider</a>
				</div>
            </div>
			
			<div class="bloc last">
                <div class="row">
					<div class="span6 gauche">Année cible :</div>
					<div class="span6 droite">
						<select id="anneeCible">
							<option>2050</option>
						</select>
						<!-- info bulle -->
					<!--	<a href="#" class="bulle">
							<img src="img/bulle.png" class="bulle" style="height:25px; width:25px;"/>
							<span class="bulle-content">L'année lors de laquelle on désire connaitre la consommation plus tard.</span>
						</a>
						<!-- info bulle -->						
				<!--	</div>
				</div>
				<p id="labelHorizonCible"></p>
                <!--<li><a id="ValiderHorizon" onclick="validerHorizon()">Valider</a></li>-->
				<!--<div class="bouton">
					<a onclick="validerHorizonCible()"><span class="but-icon"></span>Valider</a>
				</div>
            </div>

        </div>

        <!-- Scenario section -->
        <div id="scenario">

            <!--Titre-->
            <h1 id="titleScenario">
				Etape 1 - Scénario
				
			<!-- info bulle -->
				<img src="img/bulle.png" id="bulle" style="height:25px; width:25px;" />
			<!-- info bulle -->
			
			</h1>
            <div class="bloc">
                <!--NavBar-->
                <div class="navbar nav-tabs">
                    <div class="navbar-inner">
                        <a class="brand">Type de scénario</a>
                        <ul class="nav">
                            <li class="active"><a href="#tab1" data-toggle="tab" onclick="changementOnglet('RTE')">RTE</a></li>
                            <li class=""><a href="#tab2" data-toggle="tab" onclick="changementOnglet('Personnel')">Personnel</a></li>
                            <li class=""><a href="#tab3" data-toggle="tab" onclick="changementOnglet('UFE')">UFE</a></li>
                        </ul>
                    </div>

                </div>

                <!--Graphs-->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab1">
                        <table>
                            <tr>
                                <td>
									<div id="chart_Scenario" class="chart" style="height:300px;"></div>
								</td>
                                <td>
									<div id="tab_chart_Scenario">
										<table class="table table-bordered">
											<tr class="success">
												<th>Année</th>
												<th>Consommation</th>
											</tr>
											<tr>
												<td id="tab_chart_Scenario.id"></td>
												<td id="tab_chart_Scenario.qu"></td>
											</tr>
										</table>
										<div id="etatScenario" style="display:none"></div>
									</div>
								</td>
                            </tr>
                        </table>
                    </div>
                </div>
				<div id="bouton_scenario" class="bouton" style="display:none">
					<a onclick="validerScenario()"><span class="but-icon"></span>Valider</a>
				</div>
            </div>
        </div>
        <form>
        <!-- MonMix section -->
        <div id="monmix" style="display:none">
            <img class="separateur" src="img/separateur.jpg" alt="separateur" />
			<!-- <img class="separateur" src="img/separateur.jpg" alt="separateur" /> -->
            <h1 id="titleMonMix">Etape 2 - Mon MIx ELectrique</h1>
			<div id="monmix-right" style="width:48%;">
				<h2>
					Vos paramètres
					<img src="img/bulle.png" class="bulle" style="height:25px; width:25px;"/>			
				</h2>
				<div class="bloc">
					<div class="row first">
						<div class="span3">Energie</div>
						<div class="span1" style="margin-top:0;">%</div>
						<div class="span1" style="margin-top:0;">GWh</div>
					</div>

					<div class="row">					
						<div class="span3">Nucléaire
							<table><tr>
								<td id="slider_target1"></td>
								<td><input type="text" id="nuc_txtfield" name="textfield1" size="3" value="30" onchange="updateTextInput('nuc');" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="nuc" value="30" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="nuc_gwh" style="width:50px; background:none;"></div>
					</div>
					
					<div class="row">					
						<div class="span3">Photovoltaïque
							<table><tr>
							<td id="slider_target2"></td>
							<td><input type="text" id="pho_txtfield" name="textfield2" size="3" value="10" onchange="updateTextInput('pho');" style="display:none"/></td>
						</tr></table></div>
						<div class="span1"><input type="text" id="pho" value="10" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="pho_gwh" style="width:50px; background:none;"></div>
					</div>

					<div class="row">					
						<div class="span3">Eolien
							<table><tr>
								<td id="slider_target3"></td>
								<td><input type="text" id="eol_txtfield" name="textfield3" size="3" value="20" onchange="updateTextInput('eol');" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="eol" value="20" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="eol_gwh" style="width:50px; background:none;"></div>
					</div>
				</div>
				<h2>Paramètres indépendants</h2>
				<div class="bloc">
					<div class="row first">
						<div class="span3">Energie</div>
						<div class="span1" style="margin-top:0;">%</div>
						<div class="span1" style="margin-top:0;">TWh</div>
					</div>
					<div class="row">						
						<div class="span3">Hydraulique
							<table><tr>
								<td id="slider_target4"></td>
								<td><input type="text" id="hyd_txtfield" name="textfield4" size="3" value="20" onchange="updateTextInput('hyd');" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="hyd" value="20" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="hyd_gwh" style="width:50px; background:none;"></div>
					</div>

					<div class="row">					
						<div class="span3" title="les centrales à flammes servent de compléments">Centrales à flammes
							<table><tr>
								<td id="slider_target5"></td>
								<td><input type="text" id="cen_txtfield" name="textfield5" size="3" value="20" onchange="" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="cen" value="20" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="cen_gwh" style="width:50px; background:none;"></div>
					</div>

					<div class="row">					
						<div class="span3" title="pas implémenté">STEP
							<table><tr>
								<td id="slider_target6"></td>
								<td><input type="text" id="ste_txtfield" name="textfield6" size="3" value="50" onchange="" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="ste" value="50" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="ste_gwh" style="width:50px; background:none;"></div>
					</div>

					<div class="row">					
						<div class="span3" title="pas implémenté">Import
							<table><tr>
								<td id="slider_target7"></td>
								<td><input type="text" id="imp_txtfield" name="textfield7" size="3" value="50" onchange="" style="display:none"/></td>
							</tr></table></div>
						<div class="span1"><input type="text" id="imp" value="50" style="width:30px; background:none;">%</div>
						<div class="span1"><input type="text" id="imp_gwh" style="width:50px; background:none;"></div>
					</div>
					
				</div>
			</div>
            <div id="camembert" style="width:48%;">
                <div id="chart_cam" class="chart"></div>
            </div>
        </div>
        </form>

        <div id="simuler" style="display:none">
			<img class="separateur" src="img/separateur.jpg" alt="separateur" />
			<div class="bouton">
				<a onclick="gorendu()" href="#"><span class="but-icon"></span>Simuler</a>
			</div>
        </div>
    </section>

    <?php include("footer.php"); ?>

</body>

</html>
