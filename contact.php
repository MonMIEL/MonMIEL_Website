<!DOCTYPE html>
<html>
<head>
    <title>MonMIEL</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
	<header>
		<img src="img/header.png" alt="" />
	</header>

	<nav>
		<ul>
			<li>Accueil</li>
			<li>Problématique</li>
			<li>Simulez votre mix</li>
			<li>Liens utiles</li>
			<li>Contact</li>
		</ul>
	</nav>

	<section>
        <form id=contact>
            <fieldset>
                <legend>Formulaire de contact</legend>
                <ol>
                    <li>
                        <label for=nom>Nom</label>
                        <input id=nom name=nom type=text placeholder="Prénom et nom" required autofocus>
                    </li>
                    <li>
                        <label for=email>Email</label>
                        <input id=email name=email type=email placeholder="exemple@domaine.com" required>
                    </li>
                    <li>
                        <label for=message>Message</label>
                        <textarea id=message name=message rows=8 required></textarea>
                    </li>
                </ol>
            </fieldset>
            <fieldset>
                <button type=submit>Envoyer</button>
            </fieldset>
        </form>
    </div>

	<footer>
		
	</footer>
</body>
</html>