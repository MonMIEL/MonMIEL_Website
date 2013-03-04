<!DOCTYPE html>
<html lang="en" >
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>MonMIEL</title>

    <!-- add styles -->
    <link href="css/highchart/main.css" rel="stylesheet" type="text/css" />

    <!-- add scripts -->
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="js/highchart/highcharts.js"></script>
    <script src="js/highchart/gray.js"></script>
    <script src="js/highchart/main.js"></script>
</head>
<body>

<? include("header.php"); ?>

<? include("menu.php"); ?>



<!-- Chart type switchers -->
<div class="actions">
    <button class="switcher" id="column">column</button>
    <button class="switcher" id="area">area</button>
    <button class="switcher" id="line">line</button>
    <button class="switcher" id="spline">Spine</button>
    <button class="switcher" id="areaspline">areaspline</button>
</div>

<!-- two different charts -->
<div id="chart_3" class="chart"></div>
<div id="chart_1" class="chart"></div>
<div id="chart_2" class="chart"></div>
</body>
<? include("footer.php"); ?>
</html>