body {
    font-family: 'Arial', sans-serif;
    background-color: #121212; /* Couleur de fond sombre */
    color: #ffffff; /* Couleur du texte en blanc */
    margin: 0;
    padding: 0;
    background-image: url("https://i.postimg.cc/K8nWxckt/jpg.jpg"); /* Image d'arrière-plan */
    background-size: cover; /* Couvre tout l'espace disponible */
    background-repeat: no-repeat; /* Pas de répétition de l'image */
    background-position: center; /* Centre l'image */
    background-attachment: fixed; /* Rendre l'image fixe lors du défilement */
    min-height: 100vh; /* Assure que le body prend au moins la hauteur de la vue */
}

.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
    border-radius: 10px; /* Coins arrondis */
    background-color: rgba(192, 192, 192, 0.1); /* Couleur de fond du conteneur */
}

h1, h2 {
    text-align: center;
    color: #ffffff; /* Couleur blanche pour le texte des titres */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Ombre pour les titres */
}

nav {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

button {
    margin: 0 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #3a3a3a; /* Couleur de fond des boutons */
    color: #ffffff; /* Couleur du texte des boutons */
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.2s; /* Ajout de transition de box-shadow */
}

button:hover {
    background-color: #444; /* Couleur de fond des boutons au survol */
    transform: translateY(-2px); /* Légère élévation au survol */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Ombre au survol */
}

.card {
    background-color: #292929; /* Couleur de fond des cartes */
    padding: 20px;
    border-radius: 10px; /* Coins arrondis */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Ombre douce */
    margin-bottom: 20px; /* Espace entre les cartes */
    transition: transform 0.3s; /* Transition pour l'effet de zoom */
}

.card:hover {
    transform: scale(1.03); /* Légère augmentation lors du survol */
}

.dropdown {
    display: inline-block;
    position: relative;
    margin: 10px 0;
}

.dropbtn {
    padding: 10px 15px;
    background-color: #3a3a3a; /* Couleur de fond du bouton de tri */
    color: #ffffff; /* Couleur du texte du bouton de tri */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s; /* Transition ajoutée */
}

.dropbtn:hover {
    background-color: #444; /* Couleur de fond au survol */
    transform: translateY(-2px); /* Légère élévation au survol */
}

.dropdown-content {
    display: none; /* Masquer le menu déroulant par défaut */
    position: absolute;
    background-color: #3a3a3a; /* Couleur de fond du menu déroulant */
    min-width: 160px; /* Largeur minimale du menu déroulant */
    z-index: 1;
    border-radius: 5px; /* Coins arrondis */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Ombre douce pour le menu */
}

.dropdown-content a {
    color: #ffffff; /* Couleur du texte des options */
    padding: 12px 16px; /* Espacement des options */
    text-decoration: none; /* Supprimer le soulignement des liens */
    display: block; /* Afficher les options comme blocs */
    transition: background-color 0.3s; /* Transition sur la couleur de fond */
}

.dropdown-content a:hover {
    background-color: #444; /* Couleur de fond des options au survol */
}

.dropdown:hover .dropdown-content {
    display: block; /* Afficher le menu déroulant au survol */
}

#animeList {
    list-style-type: none;
    padding: 0;
}

#animeList li {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #444; /* Bordure des éléments de liste */
    margin-bottom: 10px;
    background-color: rgba(4, 146, 115, 0.8); /* Couleur de fond des éléments de liste */
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.2s; /* Ajout de transitions */
    border-radius: 5px; /* Coins arrondis */
    display: flex; /* Utilisation du flexbox pour aligner le texte et la note */
    justify-content: space-between; /* Espacement entre le titre et la note */
}

#animeList li:hover {
    background-color: rgba(6, 101, 81, 0.9); /* Couleur de fond au survol */
    transform: translateY(-2px); /* Légère élévation au survol */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Ombre au survol */
}

.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(0,0,0,0.8); /* Couleur de fond sombre de la modale */
}

.modal-content {
    background-color: #333; /* Couleur de fond de la modale */
    color: #ffffff; /* Couleur du texte en blanc */
    margin: 15% auto; 
    padding: 30px; /* Augmentez le rembourrage pour plus d'espace */
    border-radius: 12px; /* Coins arrondis plus prononcés */
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.7); /* Ombre plus douce */
    width: 80%;
    max-width: 400px; /* Limiter la largeur max pour un look plus modéré */
    text-align: center; /* Centrer le texte */
}

#modalImageContainer {
    margin-bottom: 20px;
}

#modalTable {
    width: 100%; 
    border-collapse: collapse;
}

#modalTable th, 
#modalTable td {
    padding: 12px; /* Espacement dans les cellules */
    text-align: left;
    border: 1px solid #444; /* Bordure des cellules */
}

#modalTable th {
    background-color: #3a3a3a; /* Couleur de fond des en-têtes du tableau */
    color: #ffffff; /* Couleur du texte des en-têtes */
}

#modalTable tr:hover {
    background-color: #444; /* Couleur de fond au survol des lignes */
}

#statisticsTable {
    width: 100%; 
    border-collapse: collapse;
    margin-top: 20px; /* Espace au-dessus du tableau */
}

#statisticsTable th, 
#statisticsTable td {
    border: 1px solid #444; /* Bordure des cellules du tableau */
    padding: 8px;
    text-align: left;
}

#statisticsTable th {
    background-color: #232323; /* Couleur de fond des en-têtes du tableau */
    color: #ffffff; /* Couleur du texte des en-têtes */
}

#statisticsTable tr {
    background-color: #383838; /* Couleur de fond des lignes */
}

.form-group {
    margin: 10px 0;
}

input[type="text"],
input[type="file"],
input[type="number"],
input[type="password"], /* Ajout de l'input pour le mot de passe */
select {
    width: 100%; /* Prendre 100% de la largeur de la modale */
    padding: 12px;
    border: 1px solid #444; /* Bordure des champs */
    border-radius: 5px; /* Coins arrondis */
    background-color: #292929; /* Couleur de fond des champs */
    color: #ffffff; /* Couleur du texte */
    margin-top: 10px; /* Espacement au-dessus du champ */
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="file"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
select:focus {
    border-color: #666; /* Couleur de bordure au focus */
    outline: none; /* Supprimer le contour par défaut */
}

/* Style pour les anime ayant une note générale de 9 ou plus */
.golden {
    color: gold;
    font-weight: bold; 
    border-color: gold; /* Couleur de la bordure en or */
    border-width: 2px; /* Épaisseur de la bordure */
    border-style: solid; /* Style de la bordure */
}


