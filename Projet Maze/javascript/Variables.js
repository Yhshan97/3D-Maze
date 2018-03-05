
var objgl = null;
var objProgShaders = null;
var objScene3D = null;
var tabPositionMurs2 = null;
var tabVisibleObjets = null;
var tabTelerecepteursPosDansTabObjets3D = null;
var FOV = 75;

//Variables pour le deroulement du jeu
var tempsDuNiveauEnSec = 60;                          /* TEMPS DU NIVEAU */
var tempsDuNiveauEnEcoule = 0.1;
var niveau = 1; //
var nbFleches = 18;
var nbTeleporteurs = 0;
var nbTelerecepteurs = 0;
var nbOuvreursTotal = 4;
var nbOuvreursDuJoueur = nbOuvreursTotal;
var nbTresor = 1;
var blnGameOver = false;
var blnVictoire = false;
var Score = 300;

// Mouvements
var tabBouton = [];
var vitesse = 0.25;

// vielle camera
var oldCam = null;

var tabHUD = document.getElementById('tabHUD');

var tabLoadedImages = [];
var countImagesLoaded = 0;
var imgShovel = null;
var imgScore = null;
var imgLevel = null;
var tabObjShovel = [];
var tabImageLevel = [];

// Variables Sons
var sonGameOver = new Audio('Sons/sonic_game_over.mp3'); //Son 1
var sonDebutNiveau = new Audio('Sons/pacman_beginning.mp3'); //Son 2
var sonTresorTrouver = new Audio('Sons/Chest_found_sound_effect.mp3'); //Son 3
var sonTeleportation = new Audio('Sons/dbz_teleport_sound.mp3'); //Son 4
var sonCreuser = new Audio('Sons/mining_sound.mp3'); //Son 5
var sonVictoire = new Audio('Sons/win_sound_effect.mp3'); //Son 6
var sonFailedLevel = new Audio('Sons/pacman_death.mp3'); //Son 7
var sonTimer10sec = new Audio('Sons/timer-10sec.mp3'); //Son 8

var tabImages = [
      'images/Transparent.gif',     // 0: Transparent
      'images/Floor.jpg',           // 1: Plancher
      'images/Wood_texture.png',    // 2: Plafond
      'images/test.jpg',            // 3: Mur labyrinthe
      'images/Tresor.png',          // 4: Tresor
      'images/Teleporteur.bmp',     // 5: Teleporteur
      'images/Telerecepteur.bmp',   // 6: Telerecepteur
      'images/SolBase.jpg',         // 7: Sol de la base
      'images/arrowtest.png',       // 8: Flèche
      'images/MurBase7.jpg',        // 9: Mur de la base
      'images/Bois.jpg'             // 10: Porte de la base (Gate)
];

var TEX_TRANSPARENT = 0;
var TEX_SOL = 1;
var TEX_CIEL = 2;
var TEX_MUR = 3;
var TEX_TRESOR = 4;
var TEX_TELEPORTEUR = 5;
var TEX_TELERECEPTEUR = 6;
var TEX_SOLBASE = 7;
var TEX_MURBASE = 9;
var TEX_FLECHE = 8;
var TEX_PORTE = 10;
