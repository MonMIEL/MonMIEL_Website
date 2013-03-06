<?php
/* Si le formulaire est envoyé alors on fait les traitements */
if (isset($_POST['envoye']))
{
    /* Récupération des valeurs des champs du formulaire */
    if (get_magic_quotes_gpc())
    {
        $civilite		= stripslashes(trim($_POST['civilite']));
        $nom	     	= stripslashes(trim($_POST['nom']));
        $expediteur	= stripslashes(trim($_POST['email']));
        $sujet		= stripslashes(trim($_POST['sujet']));
        $message		= stripslashes(trim($_POST['message']));
    }
    else
    {
        $civilite		= trim($_POST['civilite']);
        $nom		    = trim($_POST['nom']);
        $expediteur	= trim($_POST['email']);
        $sujet		= trim($_POST['sujet']);
        $message		= trim($_POST['message']);
    }

    /* Expression régulière permettant de vérifier si le
    * format d'une adresse e-mail est correct */
    $regex_mail = '/^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i';

    /* Expression régulière permettant de vérifier qu'aucun
    * en-tête n'est inséré dans nos champs */
    $regex_head = '/[\n\r]/';

    /* Si le formulaire n'est pas posté de notre site on renvoie
    * vers la page d'accueil */
    if($_SERVER['HTTP_REFERER'] != 'http://localhost/')
    { 
        header('Location: http://localhost/');
    }
    /* On vérifie que tous les champs sont remplis */
    elseif (empty($civilite)
        || empty($nom)
        || empty($expediteur)
        || empty($sujet)
        || empty($message))
    {
        $alert = 'Tous les champs doivent être renseignés';
    }
    /* On vérifie que le format de l'e-mail est correct */
    elseif (!preg_match($regex_mail, $expediteur))
    {
        $alert = 'L\'adresse '.$expediteur.' n\'est pas valide';
    }
    /* On vérifie qu'il n'y a aucun header dans les champs */
    elseif (preg_match($regex_head, $expediteur)
        || preg_match($regex_head, $nom)
        || preg_match($regex_head, $sujet))
    {
        $alert = 'En-têtes interdites dans les champs du formulaire';
    }
    /* Si aucun problème et aucun cookie créé, on construit le message et on envoie l'e-mail */
    elseif (!isset($_COOKIE['sent']))
    {
        /* Destinataire (votre adresse e-mail) */
        $to = 'vincent.burlet@voila.fr';

        /* Construction du message */
        $msg  = 'Bonjour,'."\r\n\r\n";
        $msg .= 'Ce mail a été envoyé depuis monMiel.com par '.$civilite.' '.$nom."\r\n\r\n";
        $msg .= 'Voici le message qui vous est adressé :'."\r\n";
        $msg .= '***************************'."\r\n";
        $msg .= $message."\r\n";
        $msg .= '***************************'."\r\n";

        /* En-têtes de l'e-mail */
        $headers = 'From: '.$nom.' <'.$expediteur.'>'."\r\n\r\n";

        /* Envoi de l'e-mail */
        if (mail($to, $sujet, $msg, $headers))
        {
            $alert = 'E-mail envoyé avec succès';

            /* On créé un cookie de courte durée (ici 120 secondes) pour éviter de
            * renvoyer un mail en rafraichissant la page */
            setcookie("sent", "1", time() + 120);

            /* On détruit la variable $_POST */
            unset($_POST);
        }
        else
        {
            $alert = 'Erreur d\'envoi de l\'e-mail';
        }

    }
    /* Cas où le cookie est créé et que la page est rafraichie, on détruit la variable $_POST */
    else
    {
        unset($_POST);
    }
}
?>
<!DOCTYPE html>
<html>
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
</head>
<body>

<?php
if (!empty($alert))
{
    echo '<p style="color:red">'.$alert.'</p>';
}
?>
    <?php include("header.php"); ?>

    <?php include("menu.php"); ?>
<section>
    <div id="contenu_mail">

        <form action="contact.php" method="post">
            <div class="row">
               <div class="span6 droite"> Civilité :</div>
                <div class="span6 gauche"> <select id="civilite" name="civilite">
                    <option
                            value="mr"
                        <?php
                        if (!isset($_POST['civilite']) || $_POST['civilite'] == 'mr')
                        {
                            echo ' selected="selected"';
                        }
                        ?>
                            >
                        Monsieur
                    </option>
                    <option
                            value="mme"
                        <?php
                        if (isset($_POST['civilite']) && $_POST['civilite'] == 'mme')
                        {
                            echo ' selected="selected"';
                        }
                        ?>
                            >
                        Madame
                    </option>
                    <option
                            value="mlle"
                        <?php
                        if (isset($_POST['civilite']) && $_POST['civilite'] == 'mlle')
                        {
                            echo ' selected="selected"';
                        }
                        ?>
                            >
                        Mademoiselle
                    </option>
                </select>
                   </div>
             </div>
            <div class="row">
                <div class="span6 droite" > Nom/Prénom :</div>
                <div class="span6 gauche">
                    <input type="text" id="nom" name="nom"
                       value="<?php echo (isset($_POST['nom'])) ? $nom : '' ?>"
                        />
                </div>
            </div>
            <div class="row">
                <div class="span6 droite" > E-mail : </div>
                    <div class="span6 gauche">
                        <input type="text" id="email" name="email"
                       value="<?php echo (isset($_POST['email'])) ? $expediteur : '' ?>"
                        />
                    </div>
            </div>
           <div class="row">

               <div class="span6 droite">  Sujet : </div>
                   <div class="span6 gauche"> <input type="text" id="sujet" name="sujet"
                       value="<?php echo (isset($_POST['sujet'])) ? $sujet : '' ?>"
                        />
                   </div>
           </div>
            <div id="message_saisie">
                <label for="message"><b>Message :</b></label>
                <textarea id="message" name="message" cols="100" rows="8">
                    <?php echo (isset($_POST['message'])) ? $message : '' ?>
                </textarea>
            </div>

            <div id="envoye">
                    <input  type="submit" name="envoye" value="Envoyer" />
            </div>

        </form>



    </div>
</section>
    <?php include("footer.php"); ?>
</body>
</html>