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
    document.getElementById('importExportSection').style.display = 'none';
    clearInputs(); // Nettoyer les champs d'ajout  
}

function showAnimeList() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'block';
    document.getElementById('statisticsSection').style.display = 'none';
    document.getElementById('importExportSection').style.display = 'none';
    renderAnimeList(); // Rendre à jour la liste à chaque fois que l'on l'affiche  
}

function showStatistics() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'block';
    document.getElementById('importExportSection').style.display = 'none';
    updateStatistics(); // Mettre à jour les statistiques à chaque affichage  
}

function showImportExport() {
    document.getElementById('addAnimeSection').style.display = 'none';
    document.getElementById('animeListSection').style.display = 'none';
    document.getElementById('statisticsSection').style.display = 'none';
    document.getElementById('importExportSection').style.display = 'block'; // Afficher la section d'importation et d'exportation  
}

// Fonction pour vider le localStorage  
function clearLocalStorage() {
    if (confirm("Êtes-vous sûr de vouloir vider le Local Storage ?")) {
        localStorage.removeItem('animeList'); // Effacer la liste des anime  
        animeList = []; // Réinitialiser le tableau animeList  
        renderAnimeList(); // Mettre à jour l'affichage  
        updateStatistics(); // Remettre à jour les statistiques  
        alert("Le Local Storage a été vidé avec succès !");
    }
}

// Fonction pour ajouter un anime  
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
    const animeImageInput = document.getElementById('animeImageInput');

    // Vérification des champs  
    if (!animeInput.value.trim() || !nbEpisodes || !animeType || !animeStatus ||
        !graphicsRating || !charactersRating || !storyRating ||
        !emotionRating || !generalRating || !animeImageInput.files[0]) {
        alert("Veuillez remplir tous les champs avant d'ajouter un anime.");
        return;
    }

    const file = animeImageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
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
            },
            image: reader.result // Image en base64  
        };

        animeList.push(anime);
        saveAnime(); // Sauvegarder dans localStorage  
        clearInputs();
        showAnimeList(); // Afficher la liste des anime  
        saveAnime(); // Sauvegarder dans localStorage  
        updateStatistics(); // Mettre à jour les statistiques après l'ajout  
    };

    reader.readAsDataURL(file); // Lire l'image comme une URL  
}

function saveAnime() {
    localStorage.setItem('animeList', JSON.stringify(animeList)); // Enregistrer la liste des anime dans le localStorage  
}

function clearInputs() {
    document.getElementById('animeInput').value = '';
    document.getElementById('animeImageInput').value = '';
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

        // Calculer la moyenne des notes 
        const averageRating = (
            (parseFloat(anime.ratings.graphics) +
            parseFloat(anime.ratings.characters) +
            parseFloat(anime.ratings.story) +
            parseFloat(anime.ratings.emotion) +
            parseFloat(anime.ratings.general)) / 5  
        ).toFixed(2); // Calculer la moyenne et arrondir à 2 décimales

        // Appliquer la classe en fonction de la moyenne  
        if (averageRating >= 9) {
            li.classList.add('golden'); // Classe pour l'or  
        } else if (averageRating >= 8.5) {
            li.classList.add('silver'); // Classe pour l'argent  
        } else if (averageRating >= 8) {
            li.classList.add('bronze'); // Classe pour le bronze  
        }

        // Afficher uniquement la note à droite  
        li.innerHTML += `<span class="rating">${averageRating}</span>`; // Ajouter la note dans un span

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

    // Calculer la moyenne des notes  
    const averageRating = (
        parseFloat(anime.ratings.graphics) +
        parseFloat(anime.ratings.characters) +
        parseFloat(anime.ratings.story) +
        parseFloat(anime.ratings.emotion) +
        parseFloat(anime.ratings.general)
    ) / 5; // Supposons qu'il y ait 5 notes

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
        <tr>
            <td><strong>Moyenne des Notes</strong></td>
            <td><strong>${averageRating.toFixed(2)}</strong></td> <!-- Afficher la moyenne -->
        </tr>
    `;

    document.getElementById('changeImageButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'inline-block'; // Afficher le bouton "Modifier"
    document.getElementById('saveButton').style.display = 'none'; // Masquer le bouton "Sauvegarder"
    document.getElementById('deleteButton').style.display = 'none'; // Afficher le bouton "Supprimer"

    document.getElementById('modal').style.display = 'block'; // Afficher la modale  
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

    // Gérer la visibilité des boutons  
    document.getElementById('changeImageButton').style.display = 'block';
    document.getElementById('editButton').style.display = 'none'; // Masquer le bouton "Modifier"
    document.getElementById('saveButton').style.display = 'block'; // Afficher le bouton "Sauvegarder"
    document.getElementById('deleteButton').style.display = 'block'; // Afficher le bouton "Supprimer"
}

function saveChanges() {
    // Récupération des valeurs des champs d'édition  
    const editedEpisodes = parseInt(document.getElementById('editEpisodes').value, 10); // Conversion en entier  
    const editedType = document.getElementById('editType').value;
    const editedStatus = document.getElementById('editStatus').value;
    const editedGraphics = parseFloat(document.getElementById('editGraphics').value); // Conversion en float  
    const editedCharacters = parseFloat(document.getElementById('editCharacters').value); // Conversion en float  
    const editedStory = parseFloat(document.getElementById('editStory').value); // Conversion en float  
    const editedEmotion = parseFloat(document.getElementById('editEmotion').value); // Conversion en float  
    const editedGeneral = parseFloat(document.getElementById('editGeneral').value); // Conversion en float  
    const editedImageInput = document.getElementById('editImageInput');

    // Validation des notes  
    const ratings = [editedGraphics, editedCharacters, editedStory, editedEmotion, editedGeneral];
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i] < 0 || ratings[i] > 10) {
            alert("Les notes doivent être comprises entre 0 et 10.");
            return; // Sortir de la fonction si une note est invalide  
        }
    }

    // Mettre à jour les informations de l'anime  
    const currentAnime = animeList[currentAnimeIndex];
    currentAnime.episodes = editedEpisodes; // Assurez-vous que c'est un nombre  
    currentAnime.type = editedType;
    currentAnime.status = editedStatus;
    currentAnime.ratings.graphics = editedGraphics; // Assurez-vous que c'est un nombre  
    currentAnime.ratings.characters = editedCharacters; // Assurez-vous que c'est un nombre  
    currentAnime.ratings.story = editedStory; // Assurez-vous que c'est un nombre  
    currentAnime.ratings.emotion = editedEmotion; // Assurez-vous que c'est un nombre  
    currentAnime.ratings.general = editedGeneral; // Assurez-vous que c'est un nombre

    // Vérifier si une nouvelle image a été choisie  
    if (editedImageInput.files.length > 0) {
        const file = editedImageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            currentAnime.image = reader.result; // Mettre à jour l'image en base64  
            saveAnime(); // Sauvegarder les modifications dans le localStorage  
            closeModal(); // Fermer la fenêtre modale  
            renderAnimeList(); // Mettre à jour l'affichage de la liste  
            updateStatistics(); // Mettre à jour les statistiques  
        };

        reader.readAsDataURL(file); // Lire l'image comme une URL  
    } else {
        // Si aucune nouvelle image n'est sélectionnée, simplement sauvegarder  
        saveAnime(); 
        closeModal(); // Fermer la fenêtre modale  
        renderAnimeList(); // Mettre à jour l'affichage de la liste  
        updateStatistics(); // Mettre à jour les statistiques  
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

    // Mise à jour de l'affichage des statistiques  
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
        totalRatings.graphics += parseFloat(anime.ratings.graphics) || 0; // Assurer que ce soit un nombre  
        totalRatings.characters += parseFloat(anime.ratings.characters) || 0; // Assurer que ce soit un nombre  
        totalRatings.story += parseFloat(anime.ratings.story) || 0; // Assurer que ce soit un nombre  
        totalRatings.emotion += parseFloat(anime.ratings.emotion) || 0; // Assurer que ce soit un nombre  
        totalRatings.general += parseFloat(anime.ratings.general) || 0; // Assurer que ce soit un nombre  
    });

    const animeCount = animeList.length;

    // Calculer les moyennes en évitant la division par zéro  
    const averageGraphics = animeCount > 0 ? (totalRatings.graphics / animeCount).toFixed(2) : 0;
    const averageCharacters = animeCount > 0 ? (totalRatings.characters / animeCount).toFixed(2) : 0;
    const averageStory = animeCount > 0 ? (totalRatings.story / animeCount).toFixed(2) : 0;
    const averageEmotion = animeCount > 0 ? (totalRatings.emotion / animeCount).toFixed(2) : 0;
    const averageGeneral = animeCount > 0 ? (totalRatings.general / animeCount).toFixed(2) : 0;

    // Mise à jour de l'affichage des moyennes  
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
            animeList.sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabétique  
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
        case 'average': // Ajout du cas pour trier par moyenne  
            animeList.sort((a, b) => {
                const averageA = (parseFloat(a.ratings.graphics) + 
                                  parseFloat(a.ratings.characters) + 
                                  parseFloat(a.ratings.story) + 
                                  parseFloat(a.ratings.emotion) + 
                                  parseFloat(a.ratings.general)) / 5; // Calculer la moyenne de A
  
                const averageB = (parseFloat(b.ratings.graphics) + 
                                  parseFloat(b.ratings.characters) + 
                                  parseFloat(b.ratings.story) + 
                                  parseFloat(b.ratings.emotion) + 
                                  parseFloat(b.ratings.general)) / 5; // Calculer la moyenne de B

                return averageB - averageA; // Tri par moyenne décroissante  
            });
            break;
    }
    renderAnimeList(); // Rendre la liste mise à jour après le tri  
}

// Fonction pour exporter la liste des anime en fichier Excel  
function exportAnimeList() {
    const worksheetData = animeList.map(anime => ({
        'Titre': anime.name,
        'Type': anime.type,
        'Statut': anime.status,
        'Épisodes': anime.episodes,
        'Graphismes': anime.ratings.graphics,
        'Personnages': anime.ratings.characters,
        'Histoire': anime.ratings.story,
        'Émotion': anime.ratings.emotion,
        'Général': anime.ratings.general,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des Anime");

    // Générer le fichier Excel  
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'anime_list.xlsx'; // Nom du fichier Excel  
    link.click(); // Déclencher le téléchargement

    alert("Votre fichier Excel a été téléchargé avec succès !");
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
            image: '', // Placeholder pour l'image  
        }));

        saveAnime(); // Sauvegarder la nouvelle liste dans localStorage  
        renderAnimeList(); // Rendre à jour l'affichage de la liste  
        updateStatistics(); // Mettre à jour les statistiques  
    };

    reader.readAsArrayBuffer(file); // Lire le fichier comme un buffer  
}

// Fonction pour exporter les images en JSON  
function exportAnimeImages() {
    const images = animeList.map(anime => anime.image); // Extraire les images  
    const jsonString = JSON.stringify(images, null, 2); // Convertir en format JSON  
    const blob = new Blob([jsonString], { type: 'application/json' }); // Créer un Blob pour le JSON  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'anime_images.json'; // Nom du fichier JSON  
    link.click(); // Déclencher le téléchargement

    alert("Votre fichier JSON d'images a été téléchargé avec succès !");
}

// Fonction pour charger les images des anime depuis un fichier JSON  
function loadAnimeFromJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const images = JSON.parse(e.target.result);

        // Assurez-vous que le nombre d'images correspond au nombre d'anime  
        if (images.length !== animeList.length) {
            alert("Le nombre d'images ne correspond pas au nombre d'anime !");
            return;
        }

        // Assigner les images aux anime dans animeList  
        animeList.forEach((anime, index) => {
            anime.image = images[index]; // Assigner l'image à chaque anime  
        });

        alert('Images des anime importées avec succès !');
        renderAnimeList(); // Afficher la liste des anime mise à jour  
    };

    reader.readAsText(file);
}

function deleteAnime() {
    if (currentAnimeIndex !== null) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet anime ?")) {
            animeList.splice(currentAnimeIndex, 1); // Supprimer l'anime  
            saveAnime(); // Sauvegarder les changements  
            closeModal(); // Fermer la modale  
            renderAnimeList(); // Mettre à jour l'affichage de la liste  
            updateStatistics(); // Mettre à jour les statistiques après la suppression  
            alert("L'anime a été supprimé avec succès !");
        }
    }
}

function filterAnime(status) {
    const filteredAnimeList = status === 'tous' ? animeList : animeList.filter(anime => anime.status === status);
    renderFilteredAnimeList(filteredAnimeList);
}

function renderFilteredAnimeList(filteredList) {
    const animeListElement = document.getElementById('animeList');
    animeListElement.innerHTML = '';

    filteredList.forEach((anime, index) => {
        const li = document.createElement('li');
        li.textContent = `${anime.name} `;

        // Calculer la moyenne des notes 
        const averageRating = (
            (parseFloat(anime.ratings.graphics) +
            parseFloat(anime.ratings.characters) +
            parseFloat(anime.ratings.story) +
            parseFloat(anime.ratings.emotion) +
            parseFloat(anime.ratings.general)) / 5  
        ).toFixed(2);

        // Appliquer la classe en fonction de la moyenne  
        if (averageRating >= 9) {
            li.classList.add('golden'); 
        } else if (averageRating >= 8.5) {
            li.classList.add('silver'); 
        } else if (averageRating >= 8) {
            li.classList.add('bronze'); 
        }

        li.innerHTML += `<span class="rating">${averageRating}</span>`; 

        li.addEventListener('click', () => {
            openModal(animeList.indexOf(anime));
        });

        animeListElement.appendChild(li);
    });
}

function filterAnime(status) {
    currentStatusFilter = status; // Mettre à jour le filtre de statut

    // Filtrer la liste selon le statut actuel  
    currentFilteredList = animeList.filter(anime => 
        (status === 'tous' || anime.status === status) &&
        (currentTypeFilter === 'tout' || anime.type === currentTypeFilter) // Appliquer aussi le filtre de type  
    );

    renderFilteredAnimeList(currentFilteredList);
}

function filterType(type) {
    currentTypeFilter = type; // Mettre à jour le filtre de type

    // Filtrer la liste selon le type actuel  
    currentFilteredList = animeList.filter(anime => 
        (currentStatusFilter === 'tous' || anime.status === currentStatusFilter) &&
        (type === 'tout' || anime.type === type) // Appliquer aussi le filtre de statut  
    );

    renderFilteredAnimeList(currentFilteredList);
}

// Initialiser le chargement des anime au démarrage  
window.onload = loadAnime;
