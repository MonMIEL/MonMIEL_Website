MonMIEL_Website (fr)
===============

MonMIEL Website pour "Mon MIx Electrique"

# MonMIEL_Website

- Version:
- Date: 15 Mars 2013
- Github Repository: <https://github.com/MonMIEL/MonMIEL_Website>

# Panorama

Le site web du projet MonMIEL utilise plusieurs récentes technologies :
* HTML5
* PHP
* Javascript
* JQuery
Ansi que de nombreuses librairies et méthodologies :
* Highcharts <http://www.highcharts.com/>
* Q-tip <http://craigsworks.com/projects/qtip/>
* Bootstrap <http://twitter.github.com/bootstrap/>
* JSON
* Ajax

L'objectif est de réaliser un site web performant et facilement maintenable par les équipes, utilisant des technologies
web récents.

#IHM 1 (ihm1.php)

Cette page est la premère IHM que l'utilisateur voit lors de la simulation du Mix Electrique.
La page est divisée en 2 parties :
* Etape 1 : Scénario
* Etape 2 : Repartition des énergies (Mix Electrique ciblé)

## Etape 1 Scénario
Du point de vu de l'utilisateur, cette partie a pour but de fixer la quantité brute intérieure énergétique que l'ut.
désire avoir dans son calcul.
Cette valeur peut être choisie soit dans les scénarios prédéfinis, soit par la valeur dite "libre".
Au final, elle sera stockée dans la variable "consommation2050" et sera utilisée dans l'étape 2 de l'IHM.

Conception :
Ou se trouve dese charts.
Comment sont elles MaJ avec des valeurs de utilisateur.
Quels sont des données et des méthodes utilisées.
Quels sont des types des scénarios.
-----------------------------------------------à faire----------------------------------

## Etape 2 Mon Mix Electrique
Cette partie a pour but de fixer la répartition (des %) de chaque énergie électrique.

Les énergies sont les suivantes :
* Energies fixées par l'utilisateur
** Nucléaire            (dont le sueil est de 0% à 90% de la totalité)
** Photovoltaïque       (dont le sueil est de 0.5% à 25%)
** Eolien               (dont le sueil est de 2.5 à 50%)

* Energies d'ajustement ou fixées
** Hydraulique          (fixé à 50TWh tout le temps)
** Centrales à flammes  (qui s'ajuste à 100% pour la totalité des énergies)
** STEP                 (non utilisable par l'utilisateur)
** Import               (non utilisable par l'utilisateur)

Conception :
Ou se trouve dese charts.
Comment sont elles MaJ avec des valeurs de utilisateur.
Quels sont des données et des méthodes utilisées.
-----------------------------------------------à faire----------------------------------

# Validation de l'IHM 1 (ihm1.php)

Lors du clique sur le bouton "Simuler" par l'utilisateur :

1/ Les informations suivantes sont envoyés à la page rendu1.php :
* Repartition des énergies (en TWh) :
** Nucléaire
** Photovoltaïque
** Eolien

2/ Lors du chargement de rendu1.php, la méthode "init()" se lance et récupères les trois variables.

3/ La récupération des données se lance via la méthode "init()"->"manipulerCalculMonMIEL(eNucTwh, ePhotoTwh, eEolTwh, nbPoints)"
* Cette méthode se trouve dans oXHR.js
* L'appel ajax est réalisé au serveur central avec des données de l'utilsiateur.
* Lors du succès de l'opération, les postActionns sont réalisés sur l'objet récupéré JSON.
* Lors de l'échec de l'opération, la page ihm1.php est retournée avec le code d'erreur.

#JSON

La communication avec le serveur principal MonMIEL se fait à travers des appels ajax à l'API du serveur.
Les données envoyés au serveur sont ceux récupéré à partir de l'IHM 1 (ihm1.php) :
* La quantité de l'énergie en TWh (

