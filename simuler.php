<!DOCTYPE html>
<html>
<head>
    <title>MonMIEL</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="style.css" type="text/css" /> 
</head>
<body>
<?php include("header.php"); ?>

<?php include("menu.php"); ?>

<div id="contenu">
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
</div>

<?php include("footer.php"); ?>
</body>
</html>