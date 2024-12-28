let animeList = [];
const averageEpisodeDuration = 20; // Durée moyenne d'un épisode en minutes  
let currentAnimeIndex = null;
let sortCriteria = ''; // Variable pour stocker le critère de tri

// Charger les anime du localStorage au démarrage  
function loadAnime() {
    const storedAnime = localStorage.getItem('animeList');
    if (storedAnime) {
        animeList = JSON.parse(storedAnime);
        renderAnimeList();
        updateStatistics(); // Mettre à jour les statistiques au démarrage  
    }
}

function showAddAnime() {
    document.getElementById('addAnimeSection').style.display = 'block';
    document.getElementById('animeListSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'none';
    document.getElementById('descriptionSection').style.display = 'none'; // Cacher la section de description  
    clearInputs(); // Nettoyer les champs d'ajout  
}

function showAnimeList() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'block';
    document.getElementById('statisticsSection').style.display = 'none';
    document.getElementById('descriptionSection').style.display = 'none'; // Cacher la section de description  
    renderAnimeList(); // Rendre à jour la liste à chaque fois que l'on l'affiche  
}

function showStatistics() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'block';
    document.getElementById('descriptionSection').style.display = 'none'; // Cacher la section de description  
    updateStatistics(); // Mettre à jour les statistiques à chaque affichage  
}

// Appeler ces fonctions dans showDescription  
function showDescription() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'none';
    document.getElementById('descriptionSection').style.display = 'block'; // Afficher la section de description  
    populateAnimeDropdown(); // Remplir la liste des anime  
}

function addAnime() {
    const animeInput = document.getElementById('animeInput');
    const nbEpisodes = document.getElementById('nbEpisodes').value;
    const animeType = document.getElementById('animeType').value;
    const animeStatus = document.getElementById('animeStatus').value;
    const graphicsRating = document.getElementById('graphicsRating').value;
    const charactersRating = document.getElementById('charactersRating').value;
    const storyRating = document.getElementById('storyRating').value;
    const emotionRating = document.getElementById('emotionRating').value;
    const generalRating = document.getElementById('generalRating').value;

    // Vérifier si tous les champs sont remplis  
    if (!animeInput.value.trim() || !nbEpisodes || !animeType || !animeStatus || !graphicsRating || !charactersRating || !storyRating || !emotionRating || !generalRating) {
        alert("Veuillez remplir tous les champs avant d'ajouter un anime."); // Message d'erreur  
        return; // Sortir de la fonction si un champ est vide  
    }

    // Validation des notes  
    const ratings = [graphicsRating, charactersRating, storyRating, emotionRating, generalRating];
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i] < 0 || ratings[i] > 10) {
            alert("Les notes doivent être comprises entre 0 et 10.");
            return; // Sortir de la fonction si une note est invalide  
        }
    }

    const anime = {
        name: animeInput.value.trim(),
        episodes: parseInt(nbEpisodes),
        type: animeType,
        status: animeStatus,
        ratings: {
            graphics: parseFloat(graphicsRating),
            characters: parseFloat(charactersRating),
            story: parseFloat(storyRating),
            emotion: parseFloat(emotionRating),
            general: parseFloat(generalRating)
        }
    };

    animeList.push(anime);
    saveAnime(); // Sauvegarder l'anime dans le localStorage  
    clearInputs();
    showAnimeList(); // Afficher la liste des anime après ajout  
}

function saveAnime() {
    localStorage.setItem('animeList', JSON.stringify(animeList)); // Enregistrer la liste des anime dans le localStorage  
}

function clearInputs() {
    document.getElementById('animeInput').value = '';
    document.getElementById('nbEpisodes').value = '';
    document.getElementById('animeType').value = 'série';
    document.getElementById('animeStatus').value = 'fini';
    document.getElementById('graphicsRating').value = '';
    document.getElementById('charactersRating').value = '';
    document.getElementById('storyRating').value = '';
    document.getElementById('emotionRating').value = '';
    document.getElementById('generalRating').value = '';
}

function renderAnimeList() {
    const animeListElement = document.getElementById('animeList');
    animeListElement.innerHTML = '';

    animeList.forEach((anime, index) => {
        const li = document.createElement('li');
        li.textContent = `${anime.name} `; // Afficher le nom de l'anime

        // Afficher uniquement la note à droite en fonction du critère de tri  
        let ratingDisplay = '';

        if (sortCriteria === 'graphics') {
            ratingDisplay = `${anime.ratings.graphics}`; // Afficher uniquement la note des graphismes  
        } else if (sortCriteria === 'characters') {
            ratingDisplay = `${anime.ratings.characters}`; // Afficher uniquement la note des personnages  
        } else if (sortCriteria === 'story') {
            ratingDisplay = `${anime.ratings.story}`; // Afficher uniquement la note de l'histoire  
        } else if (sortCriteria === 'emotion') {
            ratingDisplay = `${anime.ratings.emotion}`; // Afficher uniquement la note de l'émotion  
        } else if (sortCriteria === 'general') {
            ratingDisplay = `${anime.ratings.general}`; // Afficher uniquement la note générale  
        }

        li.innerHTML += `<span class="rating">${ratingDisplay}</span>`; // Ajouter la note dans un span

        // Ajouter la classe 'golden' si la note générale est 9 ou plus  
        if (anime.ratings.general >= 9) {
            li.classList.add('golden');
        }

        // Écouter le clic pour afficher la fenêtre modale  
        li.addEventListener('click', () => {
            openModal(index); // Passer l'index de l'anime  
        });

        animeListElement.appendChild(li);
    });
}

function openModal(index) {
    currentAnimeIndex = index; // Mémoriser l'index de l'anime actuel  
    const anime = animeList[index]; // Récupérer l'anime à partir de l'index

    document.getElementById('modalImageContainer').innerHTML = `<img src="${anime.image}" alt="${anime.name}" style="max-width: 100%; margin-bottom: 10px;">`;

    const modalTable = document.getElementById('modalTable');
    modalTable.innerHTML = `
        <tr>
            <th>Propriété</th>
            <th>Valeur</th>
        </tr>
        <tr>
            <td>Nombre d'épisodes</td>
            <td>${anime.episodes}</td>
        </tr>
        <tr>
            <td>Type</td>
            <td>${anime.type}</td>
        </tr>
        <tr>
            <td>Statut</td>
            <td>${anime.status}</td>
        </tr>
        <tr>
            <td>Graphismes</td>
            <td>${anime.ratings.graphics}</td>
        </tr>
        <tr>
            <td>Personnages</td>
            <td>${anime.ratings.characters}</td>
        </tr>
        <tr>
            <td>Histoire</td>
            <td>${anime.ratings.story}</td>
        </tr>
        <tr>
            <td>Émotion</td>
            <td>${anime.ratings.emotion}</td>
        </tr>
        <tr>
            <td>Général</td>
            <td>${anime.ratings.general}</td>
        </tr>
    `;

    // Masquer le bouton "Supprimer" par défaut  
    document.getElementById('deleteButton').style.display = 'none';

    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function enableEditing() {
    const anime = animeList[currentAnimeIndex];

    // Remplir les champs d'édition  
    document.getElementById('modalTable').innerHTML = `
        <tr>
            <th>Propriété</th>
            <th>Valeur</th>
        </tr>
        <tr>
            <td>Nombre d'épisodes</td>
            <td><input type="number" id="editEpisodes" value="${anime.episodes}" min="0" /></td>
        </tr>
        <tr>
            <td>Type</td>
            <td>
                <select id="editType">
                    <option value="série" ${anime.type === 'série' ? 'selected' : ''}>Série</option>
                    <option value="film" ${anime.type === 'film' ? 'selected' : ''}>Film</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Statut</td>
            <td>
                <select id="editStatus">
                    <option value="fini" ${anime.status === 'fini' ? 'selected' : ''}>Fini</option>
                    <option value="en cours" ${anime.status === 'en cours' ? 'selected' : ''}>En cours</option>
                    <option value="inconnu" ${anime.status === 'inconnu' ? 'selected' : ''}>Inconnu</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Graphismes</td>
            <td><input type="number" id="editGraphics" value="${anime.ratings.graphics}" min="0" max="10" /></td>
        </tr>
        <tr>
            <td>Personnages</td>
            <td><input type="number" id="editCharacters" value="${anime.ratings.characters}" min="0" max="10" /></td>
        </tr>
        <tr>
            <td>Histoire</td>
            <td><input type="number" id="editStory" value="${anime.ratings.story}" min="0" max="10" /></td>
        </tr>
        <tr>
            <td>Émotion</td>
            <td><input type="number" id="editEmotion" value="${anime.ratings.emotion}" min="0" max="10" /></td>
        </tr>
        <tr>
            <td>Général</td>
            <td><input type="number" id="editGeneral" value="${anime.ratings.general}" min="0" max="10" /></td>
        </tr>
    `;

    // Afficher le bouton "Supprimer" et masquer le bouton "Modifier"
    document.getElementById('deleteButton').style.display = 'block'; // Afficher le bouton "Supprimer"
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'block';
}

function saveChanges() {
    const editedEpisodes = document.getElementById('editEpisodes').value;
    const editedType = document.getElementById('editType').value;
    const editedStatus = document.getElementById('editStatus').value;
    const editedGraphics = document.getElementById('editGraphics').value;
    const editedCharacters = document.getElementById('editCharacters').value;
    const editedStory = document.getElementById('editStory').value;
    const editedEmotion = document.getElementById('editEmotion').value;
    const editedGeneral = document.getElementById('editGeneral').value;

    // Validation des notes  
    const ratings = [editedGraphics, editedCharacters, editedStory, editedEmotion, editedGeneral];
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i] < 0 || ratings[i] > 10) {
            alert("Les notes doivent être comprises entre 0 et 10.");
            return; // Sortir de la fonction si une note est invalide  
        }
    }

    // Mettre à jour les informations de l'anime  
    animeList[currentAnimeIndex].episodes = editedEpisodes;
    animeList[currentAnimeIndex].type = editedType;
    animeList[currentAnimeIndex].status = editedStatus;
    animeList[currentAnimeIndex].ratings.graphics = editedGraphics;
    animeList[currentAnimeIndex].ratings.characters = editedCharacters;
    animeList[currentAnimeIndex].ratings.story = editedStory;
    animeList[currentAnimeIndex].ratings.emotion = editedEmotion;
    animeList[currentAnimeIndex].ratings.general = editedGeneral;

    saveAnime(); // Sauvegarder les modifications dans le localStorage  
    closeModal(); // Fermer la fenêtre modale  
    renderAnimeList(); // Réafficher la liste mise à jour  
    updateStatistics(); // Mettre à jour les statistiques  
    exportAnimeList(); // Télécharger le fichier mis à jour  
}

function deleteAnime() {
    // Confirmer la suppression  
    if (confirm("Êtes-vous sûr de vouloir supprimer cet anime ?")) {
        // Supprimer l'anime de la liste  
        animeList.splice(currentAnimeIndex, 1);
        saveAnime(); // Mettre à jour le stockage local  
        closeModal(); // Fermer la fenêtre modale  
        renderAnimeList(); // Réafficher la liste mise à jour  
        updateStatistics(); // Mettre à jour les statistiques  
        exportAnimeList(); // Télécharger le fichier mis à jour  
    }
}

// Fonction pour mettre à jour les statistiques  
function updateStatistics() {
    const countSeries = animeList.filter(anime => anime.type === 'série').length;
    const countFilms = animeList.filter(anime => anime.type === 'film').length;
    const totalEpisodes = animeList.reduce((total, anime) => {
        return total + (anime.type === 'film' ? 1 : anime.episodes);
    }, 0);

    const totalWatchTimeMinutes = animeList.reduce((total, anime) => {
        return total + (anime.type === 'film' ? 120 : anime.episodes * averageEpisodeDuration);
    }, 0);

    const totalWatchTimeHours = (totalWatchTimeMinutes / 60).toFixed(2);
    const totalWatchTimeDays = (totalWatchTimeMinutes / 1440).toFixed(2);

    // Affichage des statistiques  
    document.getElementById('countSeries').textContent = countSeries;
    document.getElementById('countFilms').textContent = countFilms;
    document.getElementById('totalEpisodes').textContent = totalEpisodes;
    document.getElementById('totalWatchTimeMinutes').textContent = totalWatchTimeMinutes; // Affichage des minutes  
    document.getElementById('totalWatchTimeHours').textContent = totalWatchTimeHours; // Affichage des heures  
    document.getElementById('totalWatchTimeDays').textContent = totalWatchTimeDays; // Affichage des jours

    // Calcul des moyennes  
    const totalRatings = {
        graphics: 0,
        characters: 0,
        story: 0,
        emotion: 0,
        general: 0  
    };

    animeList.forEach(anime => {
        totalRatings.graphics += parseFloat(anime.ratings.graphics);
        totalRatings.characters += parseFloat(anime.ratings.characters);
        totalRatings.story += parseFloat(anime.ratings.story);
        totalRatings.emotion += parseFloat(anime.ratings.emotion);
        totalRatings.general += parseFloat(anime.ratings.general);
    });

    const animeCount = animeList.length;

    // Calculer les moyennes en évitant la division par zéro  
    const averageGraphics = animeCount > 0 ? (totalRatings.graphics / animeCount).toFixed(2) : 0;
    const averageCharacters = animeCount > 0 ? (totalRatings.characters / animeCount).toFixed(2) : 0;
    const averageStory = animeCount > 0 ? (totalRatings.story / animeCount).toFixed(2) : 0;
    const averageEmotion = animeCount > 0 ? (totalRatings.emotion / animeCount).toFixed(2) : 0;
    const averageGeneral = animeCount > 0 ? (totalRatings.general / animeCount).toFixed(2) : 0;

    document.getElementById('averageGraphics').textContent = averageGraphics; // Affichage de la moyenne des graphismes  
    document.getElementById('averageCharacters').textContent = averageCharacters; // Affichage de la moyenne des personnages  
    document.getElementById('averageStory').textContent = averageStory; // Affichage de la moyenne de l'histoire  
    document.getElementById('averageEmotion').textContent = averageEmotion; // Affichage de la moyenne de l'émotion  
    document.getElementById('averageGeneral').textContent = averageGeneral; // Affichage de la moyenne générale  
}

// Fonction de tri par critère  
function sortAnime(criteria) {
    sortCriteria = criteria; // Mettez à jour le critère de tri

    switch(criteria) {
        case 'alpha':
            animeList.sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabetique  
            break;
        case 'emotion':
            animeList.sort((a, b) => b.ratings.emotion - a.ratings.emotion); // Tri par émotion (décroissant)
            break;
        case 'story':
            animeList.sort((a, b) => b.ratings.story - a.ratings.story); // Tri par histoire (décroissant)
            break;
        case 'graphics':
            animeList.sort((a, b) => b.ratings.graphics - a.ratings.graphics); // Tri par graphismes (décroissant)
            break;
        case 'characters':
            animeList.sort((a, b) => b.ratings.characters - a.ratings.characters); // Tri par personnages (décroissant)
            break;
        case 'general':
            animeList.sort((a, b) => b.ratings.general - a.ratings.general); // Tri par général (décroissant)
            break;
    }
    renderAnimeList(); // Rendre la liste mise à jour après le tri  
}

// Fonction pour exporter la liste des anime en fichier Excel  
function exportAnimeList() {
    const worksheet = XLSX.utils.json_to_sheet(animeList.map(anime => ({
        'Titre': anime.name,
        'Type': anime.type,
        'Statut': anime.status,
        'Épisodes': anime.episodes,
        'Graphismes': anime.ratings.graphics,
        'Personnages': anime.ratings.characters,
        'Histoire': anime.ratings.story,
        'Émotion': anime.ratings.emotion,
        'Général': anime.ratings.general  
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des Anime");

    // Générer le fichier Excel et le télécharger  
    XLSX.writeFile(workbook, 'anime_list.xlsx');
}

// Fonction pour charger la liste d'anime depuis un fichier Excel  
function loadAnimeFromFile(event) {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné  
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume que la première feuille de calcul contient nos anime  
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convertir le JSON en format attendu pour animeList  
        animeList = json.slice(1).map(row => ({
            name: row[0],
            type: row[1],
            status: row[2],
            episodes: row[3],
            ratings: {
                graphics: row[4],
                characters: row[5],
                story: row[6],
                emotion: row[7],
                general: row[8]
            },
            image: '', // Vous pouvez ajouter une logique pour gérer les images ici  
        }));

        saveAnime(); // Sauvegarder la nouvelle liste dans localStorage  
        renderAnimeList(); // Rendre à jour l'affichage de la liste  
        updateStatistics(); // Mettre à jour les statistiques  
    };

    reader.readAsArrayBuffer(file); // Lire le fichier comme un buffer  
}

let currentIndex = 0; // Indice de l'élément actuellement mis en avant

function populateAnimeDropdown() {
    const animeDropdown = document.getElementById('animeDropdown');
    animeDropdown.innerHTML = ''; // Vider la liste avant de la remplir

    // Remplir la liste avec tous les anime  
    animeList.forEach((anime) => {
        const li = document.createElement('li');
        li.textContent = anime.name; // Afficher le nom de l'anime  
        li.style.padding = '10px';
        animeDropdown.appendChild(li);
    });

    highlightAnime(); // Initialiser la mise en évidence du premier élément  
}

function highlightAnime() {
    const animeDropdown = document.getElementById('animeDropdown');
    const items = animeDropdown.getElementsByTagName('li');

    // Supprimer la mise en évidence des éléments précédents  
    Array.from(items).forEach(item => {
        item.style.fontWeight = 'normal';
        item.style.backgroundColor = '';
    });

    // Mettre en évidence l'élément courant  
    if (items.length > 0 && currentIndex < items.length) {
        items[currentIndex].style.fontWeight = 'bold';
        items[currentIndex].style.backgroundColor = 'rgba(255, 215, 0, 0.2)'; // Couleur de fond pour l'élément actuel

        // Afficher les détails de l'anime correspondant  
        displayAnimeDetails(currentIndex);
    }
}

function displayAnimeDetails(index) {
    const anime = animeList[index]; // Récupérer l'anime à partir de l'index  
    const detailsTableBody = document.getElementById('animeDetailsTable').querySelector('tbody');

    // Vider le tableau avant de remplir  
    detailsTableBody.innerHTML = '';

    // Ajouter les lignes avec les informations de l'anime  
    const details = [
        { property: 'Titre', value: anime.name },
        { property: 'Type', value: anime.type },
        { property: 'Statut', value: anime.status },
        { property: 'Épisodes', value: anime.episodes },
        { property: 'Graphismes', value: anime.ratings.graphics },
        { property: 'Personnages', value: anime.ratings.characters },
        { property: 'Histoire', value: anime.ratings.story },
        { property: 'Émotion', value: anime.ratings.emotion },
        { property: 'Général', value: anime.ratings.general }
    ];

    details.forEach(detail => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${detail.property}</td><td>${detail.value}</td>`;
        detailsTableBody.appendChild(row);
    });

    document.getElementById('animeDetailsTable').style.display = 'table'; // Afficher le tableau  
}

// Fonction pour gérer le défilement et déterminer l'anime au centre  
function handleScroll() {
    const animeDropdown = document.getElementById('animeDropdown');
    const items = animeDropdown.getElementsByTagName('li');
    const container = document.getElementById('animeContainer');
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;

    // Définir un seuil pour le défilement, par exemple, 75% de la hauteur du conteneur  
    const threshold = containerHeight * 0.99; // 75% de la hauteurJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ

    // Calculer l'index de l'élément au seuil  
    for (let i = 0; i < items.length; i++) {
        const itemTop = items[i].offsetTop;
        const itemBottom = itemTop + items[i].offsetHeight;

        // Vérifier si le bas de l'élément atteint le seuil  
        if (scrollTop + threshold >= itemTop && scrollTop + threshold < itemBottom) {
            currentIndex = i; // Mettre à jour l'index en fonction de l'élément au seuil  
            break;
        }
    }

    // Mettre à jour la mise en évidence  
    highlightAnime();
}

// Appeler cette fonction pour initialiser  
populateAnimeDropdown();
document.getElementById('animeContainer').addEventListener('scroll', handleScroll);

// Initialiser le chargement des anime au démarrage  
window.onload = loadAnime;
