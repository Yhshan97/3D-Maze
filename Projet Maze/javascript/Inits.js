function mettreLesObjetsDansLeTableau(Tresor, Fleches, Porteurs, Recepteurs) {
	while (Tresor > 0 || Fleches > 0 || Recepteurs > 0 || Porteurs > 0)
		for (var x = 0; x < tabPositionMurs2.length; x++)
			for (var y = 0; y < tabPositionMurs2[x].length; y++)
				if (tabPositionMurs2[x][y] === 0) {
					var random = Math.floor((Math.random() * 1000) + 1);
					if (random <= 12) {
						if (Fleches > 0) {
							tabPositionMurs2[x][y] = 4;
							Fleches--;
						} else if (Porteurs > 0) {
							tabPositionMurs2[x][y] = 5;
							Porteurs--;
						} else if (Tresor > 0) {
							tabPositionMurs2[x][y] = 3;
							Tresor--;
						} else if (Recepteurs > 0) {
							tabPositionMurs2[x][y] = 6;
							Recepteurs--;
						}
					}
				}
	tabPositionMurs2Copie = tabPositionMurs2;
}

function changerNiveau(NextNiveau) {
	if (niveau != 10) {
		NextNiveau++;
		if (NextNiveau % 2 === 1) nbOuvreursTotal--;
		if (NextNiveau % 2 === 0) nbTeleporteurs++;
		nbTelerecepteurs++;
		nbFleches -= 2;
		niveau++;
		initTabPositionsMurs();
		mettreLesObjetsDansLeTableau(nbTresor, nbFleches, nbTeleporteurs, nbTelerecepteurs);
		resetNiveau();
	} else {
		blnVictoire = true;
		initTabPositionsMurs();
		resetNiveau();
		var camera = objScene3D.camera;
		setPositionsCameraXYZ([15.5, 100, 20.5], camera);
		setCiblesCameraXYZ([15.5, 0, 20.5], camera);
		setOrientationsXYZ([1, 0, 0], camera);
		FOV = 15;
		modeAerienne = true;
	}
}

function resetNiveau() {
	clearInterval(intervalID);
	if (!blnVictoire && !blnGameOver) {
		nbOuvreursDuJoueur = nbOuvreursTotal;
		updateViewShovels(nbOuvreursDuJoueur);
		clearInterval(intervalTimer);
		var affichage = document.querySelector('#time');
		timer(tempsDuNiveauEnSec, affichage);
	}
	var objCanvas = document.getElementById('monCanvas');
	objgl = initWebGL(objCanvas); // Initialise le contexte WebGL
	objProgShaders = initShaders(objgl);
	objScene3D = initScene3D(objgl);
  	FOV = 75;
	timeOut1 = null;
	modeAerienne = false;
  	blnNiveauFini = false;
  	fence_raised_height = -1;
	booFence_raised = false;
}

function initScene3D() {
	var objScene3D = {};
	var objet3D = {};
	var tabObjets3D = [];
	objgl.frontFace(objgl.CW)

	objgl.enable(objgl.CULL_FACE);
	objgl.cullFace(objgl.BACK)
	tabVisibleObjets = [];
	tabTelerecepteursPosDansTabObjets3D = [];

	// Mettre les textures dans la scène
	objScene3D.textures = creerTextures();
	if (!blnGameOver && !blnVictoire) {
		var obj3DCiel = creerObj3DCiel(objgl, TEX_CIEL);
		tabObjets3D.push(obj3DCiel);

		var obj3DSol = creerObj3DSol(objgl, TEX_SOL, 0, 0, 0, 14, 31); // Sol 14x31 en dessous du 3x3 du milieu
		tabObjets3D.push(obj3DSol);

		obj3DSol = creerObj3DSol(objgl, TEX_SOL, 14, 0, 0, 3, 14); // Sol 14x3 a gauche du milieu
		tabObjets3D.push(obj3DSol);

		obj3DSol = creerObj3DSol(objgl, TEX_SOLBASE, 14, 0, 14, 3, 3); // Sol 3x3 milieu
		tabObjets3D.push(obj3DSol);

		obj3DSol = creerObj3DSol(objgl, TEX_SOL, 14, 0, 17, 3, 14); // Sol 14x3 a droite du milieu
		tabObjets3D.push(obj3DSol);

		obj3DSol = creerObj3DSol(objgl, TEX_SOL, 17, 0, 0, 14, 31); // Sol 14x31 en haut du milieu
		tabObjets3D.push(obj3DSol);
	}
	//Créer les murs
	for (var x = tabPositionMurs2.length - 1; x >= 0; x--) {
		for (var y = 0; y < tabPositionMurs2[x].length; y++) {
			objet3D = {};
			if (tabPositionMurs2[x][y] === 0) { // 0 : Les objets vides
				objet3D.id = 0;
				objet3D.visible = false;
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 1) { // 1 : Les murs ouvrables
				objet3D = creerObj3DMur(objgl, 1, TEX_MUR, x, y);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 2) { // 2 : Le sol du milieu (objet vide)
				objet3D.id = 2;
				objet3D.visible = false;
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 3) { // 3 : Le tresor
				objet3D = creerObj3DTresor(objgl, TEX_TRESOR, x + 0.5, y + 0.5);
				transformationsTresor = objet3D.transformations;
				tabVisibleObjets.push(tabObjets3D.length);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 4) { // 4 : Les fleches qui pointent au tresor
				objet3D = creerObj3DFleche(objgl, TEX_FLECHE, [1, 1, 1, 1], x + 0.5, 2.0, y + 0.5);
				tabTransformationsFleches.push(objet3D.transformations);
				tabVisibleObjets.push(tabObjets3D.length);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 5) { // 5 : Les teleporteurs
				objet3D = creerObj3DTeleporteur(objgl, TEX_TELEPORTEUR, x + 0.5, y + 0.5);
				tabTransformationsTeleObjets.push(objet3D.transformations);
				tabVisibleObjets.push(tabObjets3D.length);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 6) { // 6 : Les telerecepteurs
				objet3D = creerObj3DTelerecepteur(objgl, TEX_TELERECEPTEUR, x + 0.5, y + 0.5);
				tabTransformationsTeleObjets.push(objet3D.transformations);
				tabVisibleObjets.push(tabObjets3D.length);
				tabTelerecepteursPosDansTabObjets3D.push(tabObjets3D.length);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 7) { // 7 : La cloture du milieu
				objet3D = creerObj3DPorte(objgl, TEX_PORTE, [1, 1, 1, 1], 17.95, 16);
				transformationsPorte = objet3D.transformations;
				intPos_tab3DObjets_de_la_porte = tabObjets3D.length;
				setAngleY(-90, transformationsPorte);
				tabObjets3D.push(objet3D);

			} else if (tabPositionMurs2[x][y] === 9) { // 9 : Les murs non-ouvrables
				objet3D = creerObj3DMur(objgl, 9, TEX_MURBASE, x, y);
				tabObjets3D.push(objet3D);

			}
		}
	}

	//Pointer les fleches au tresor
	for (var o = 0; o < tabTransformationsFleches.length; o++)
		mettreFlecheFaceAuTresor(tabTransformationsFleches[o], getPositionsXYZ(transformationsTresor), 'z');

	// La caméra
	var camera = creerCamera();
	setPositionsCameraXYZ([15.5, 1, 15.5], camera);
	setCiblesCameraXYZ([17.5, 1, 15.5], camera);
	setOrientationsXYZ([0, 1, 0], camera);

	//Fleche verte du joueur
	if (!blnVictoire && !blnGameOver) {
		objet3D = creerObj3DFleche(objgl, TEX_FLECHE, false, getPositionCameraX(camera), 4.0, getPositionCameraZ(camera));
		mettreFlecheFaceAuTresor(objet3D.transformations, getCiblesCameraXYZ(camera), 'x');
		tabObjets3D.push(objet3D);
	}

	objScene3D.camera = camera;
	objScene3D.tabObjets3D = tabObjets3D;
	return objScene3D;
}

function initTabPositionsMurs() { // 9: Les murs en béton  1: Les murs normaux  2: jai aucune idée

	if (blnGameOver) {
		sonGameOver.volume = 0.1;
		sonGameOver.loop = false;
		sonGameOver.play();
		tabPositionMurs2 = [ // G A M E
                            [-1, 9, 9, 9, 9, 9, 9, -1, -1, 0, 0, 9, 0, 0, -1, -1, 9, 0, 0, 0, 0, 0, 9, -1, -1, 9, 9, 9, 9],
                            [-1, 9, -1, -1, -1, 0, 9, -1, -1, 0, 9, 0, 9, 0, -1, -1, 9, 9, 0, 0, 0, 9, 9, -1, -1, 9, 0, 0, 0],
                            [-1, 9, -1, 0, 0, 0, 0, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 9, 0, 9, 0, 9, -1, -1, 9, 0, 0, 0],
                            [-1, 9, -1, 0, 9, 9, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 9, 0, 0, 9, -1, -1, 9, 9, 9, 9],
                            [-1, 9, -1, -1, -1, -1, 9, -1, -1, 9, 9, 9, 9, 9, -1, -1, 9, 0, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0],
                            [-1, 9, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0],
                            [-1, 9, 9, 9, 9, 9, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 0, 0, 9, -1, -1, 9, 9, 9, 9],
                            [0],
                            [0],
                            [0],
                            // O V E R
                            [-1, -1, 9, 9, 9, 9, 9, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 9, 9, 9, -1, -1, 9, 9, 9, 9, 9],
                            [-1, -1, 9, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, -1, -1, 9, 0, 0, 0, 9],
                            [-1, -1, 9, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, -1, -1, 9, 0, 0, 9, 0],
                            [-1, -1, 9, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 9, 9, 9, -1, -1, 9, 9, 9, 0, 0],
                            [-1, -1, 9, 0, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, 9, -1, -1, 9, 0, 0, 0, -1, -1, 9, 0, 0, 9, 0],
                            [-1, -1, 9, 0, 0, 0, 0, 9, -1, -1, 0, 9, 0, 9, 0, -1, -1, 9, 0, 0, 0, -1, -1, 9, 0, 0, 0, 9],
                            [-1, -1, 9, 9, 9, 9, 9, 9, -1, -1, 0, 0, 9, 0, 0, -1, -1, 9, 9, 9, 9, -1, -1, 9, 0, 0, 0, 9],
                            [0], [0], [0], [0], [0], [0], [0]
        ];

		clearInterval(intervalTimer);
	} else if (blnVictoire) {
		sonVictoire.volume = 0.1;
		sonVictoire.loop = false;
		sonVictoire.play();
		tabPositionMurs2 = [ // VICTOIRE
                            [0], [0], [0], [0], [0], [0], [0],
                            [1, 0, 0, 0, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1],
                            [1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0],
                            [1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 1, 0, -1, 1, 0, 0, 0],
                            [1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 1, 1, 0, 0, -1, 1, 1, 1, 1],
                            [1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 1, 0, -1, 1, 0, 0, 0],
                            [0, 1, 0, 1, 0, -1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0],
                            [0, 0, 1, 0, 0, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 0, 0, 1, 0, 0, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 0, 0, 0, 1, -1, 1, 1, 1, 1],
                            [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]
        ];
		clearInterval(intervalTimer);
	} else {
		sonDebutNiveau.volume = 0.1;
		sonDebutNiveau.loop = false;
		sonDebutNiveau.play();

		tabPositionMurs2 = [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [9, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                            [9, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [9, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
                            [9, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
                            [9, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
                            [9, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                            [9, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 9, 9],
                            [9, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 9, 2],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 9, 2],
                            [9, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 9, 2],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 9, 9],
                            [9, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
                            [9, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
                            [9, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
                            [9, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
                            [9, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
                            [9, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
                            [9, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
                            [9, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                            [9, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
                            [9, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
                            [9, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
                            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
        ];

		var murMilieu = [9, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 7, 2, 2,
                         2, 9, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 9];

		for (var i = 0; i < tabPositionMurs2.length; i++) {
			var tab2 = tabPositionMurs2[i];
			tabPositionMurs2[i] = tabPositionMurs2[i].concat(murMilieu[i]);
			tabPositionMurs2[i] = tabPositionMurs2[i].concat(tab2.reverse());
		}

		clearInterval(intervalTimer);

		var temps = tempsDuNiveauEnSec;
		var affichage = document.querySelector('#time');
		timer(temps, affichage);

	}
	tabPositionMurs2.reverse();
}
