var booCtrlPress = false;
var booShiftPress = false;
var modeAerienne = false;

var Tricher = 1;
var intervalID = null;
var timeOut1 = null;

function initializeListeners() {
	var canvas = document.getElementById("monCanvas");
	canvas.addEventListener('keydown', presserBouton, false);
	canvas.addEventListener('keyup', lacherBouton, false);
}

function oldCamera(tab1, tab2, tab3) {
	return {
		tabOld1: tab1,
		tabOld2: tab2,
		tabOld3: tab3
	};
}

// onKeyDown
function presserBouton(event) {
	tabBouton[event.keyCode] = true;
	booCtrlPress = event.ctrlKey;
	booShiftPress = event.shiftKey;
}

// onKeyUp
function lacherBouton(event) {
	tabBouton[event.keyCode] = false;
	booCtrlPress = event.ctrlKey;
	booShiftPress = event.shiftKey;
}

/*
 * Boucle lancée au début du programme
 */
function listenerLoop() {
	var camera = objScene3D.camera;
	var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
	var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);

	if ((tabBouton[32] || tabBouton[33] || tabBouton[34] || tabBouton[37] || tabBouton[38] || tabBouton[39] || tabBouton[40]) &&
		timeOut1 === null || (modeAerienne && Score < 10 && !blnVictoire && !blnGameOver)) {
		if ((modeAerienne && tabBouton[34]) || (modeAerienne && Score < 10)) {
			// 34: Page-Down
			//Timer stop
			clearInterval(intervalID);

			//Reset position du joueur
			setPositionsCameraXYZ(oldCam.tabOld1, camera);
			setCiblesCameraXYZ(oldCam.tabOld2, camera);
			setOrientationsXYZ(oldCam.tabOld3, camera);
			//Reset variables
			modeAerienne = false;
			FOV = 75;

			// Rendre les objets fleches / tresor / teleporteurs etc visibles
			for (var x1 = 0; x1 < tabVisibleObjets.length; x1++)
				objScene3D.tabObjets3D[tabVisibleObjets[x1]].visible = true;

			//Mettre les fleches a l'horizontal
			for (var o = 0; o < tabTransformationsFleches.length; o++)
				mettreFlecheFaceAuTresor(tabTransformationsFleches[o], getPositionsXYZ(transformationsTresor), 'z');

		} else if (!modeAerienne && tabBouton[33] && Score >= 10) {
			// 33: Page-Up
			//Timer start pour diminiuer le score
			intervalID = setInterval(function myCallback() {
				if (Score > 0)
					Score -= 10;
			}, 1000);

			// Store old cam
			oldCam = oldCamera(getPositionsCameraXYZ(camera), getCiblesCameraXYZ(camera), getOrientationsXYZ(camera));

			//Update fleche du joueur (verte)
			setPositionX(getPositionCameraX(camera), objScene3D.tabObjets3D[objScene3D.tabObjets3D.length - 1].transformations);
			setPositionZ(getPositionCameraZ(camera), objScene3D.tabObjets3D[objScene3D.tabObjets3D.length - 1].transformations);
			mettreFlecheFaceAuTresor(objScene3D.tabObjets3D[objScene3D.tabObjets3D.length - 1].transformations, getCiblesCameraXYZ(camera), 'x');

			//Mettre en mode aerienne
			setPositionsCameraXYZ([13.5, 210, 15.5], camera);
			setCiblesCameraXYZ([13.5, 0, 15.5], camera);
			setOrientationsXYZ([1, 0, 0], camera);

			//Set les variables
			modeAerienne = true;
			FOV = 10;

			// Rendre les objets fleches / tresor / teleporteurs etc invisibles
			for (var x = 0; x < tabVisibleObjets.length; x++)
				objScene3D.tabObjets3D[tabVisibleObjets[x]].visible = false;

		} else if (booCtrlPress && booShiftPress && tabBouton[32] && modeAerienne) {
			Tricher++;
			//Reset les variables
			tabBouton[32] = false;
			booCtrlPress = false;
			booShiftPress = false;

			//Mettre objets visibles si le joueur appuie sur tricher et alterne
			for (var x2 = 0; x2 < tabVisibleObjets.length; x2++)
				objScene3D.tabObjets3D[tabVisibleObjets[x2]].visible = (Tricher % 2 === 0) ? true : false;

			//Mettre les fleches a l'horizontal
			for (var o2 = 0; o2 < tabTransformationsFleches.length; o2++)
				mettreFlecheFaceAuTresor(tabTransformationsFleches[o2], getPositionsXYZ(transformationsTresor), 'x');

		} else if (CollisionAvecObjet(getPositionCameraX(camera), getPositionCameraZ(camera), 0, 3) && timeOut1 === null) {
			//Jouer son tresor
			sonTresorTrouver.volume = 0.1;
			sonTresorTrouver.loop = false;
			sonTresorTrouver.play();

			//Arreter le chronometre
			clearInterval(intervalTimer);

			//changer la camera pour le faire face au tresor
			FOV = 100;
			setCiblesCameraXYZ(transformationsTresor, objScene3D.camera);
			setCibleCameraX(getPositionX(transformationsTresor),objScene3D.camera)
			setCibleCameraY(getPositionY(transformationsTresor) + 0.4,objScene3D.camera)
			setCibleCameraZ(getPositionZ(transformationsTresor),objScene3D.camera)
			sonTimer10sec.pause();
			sonTimer10sec.currentTime = 0;
			//Attendre 6 secondes avant de changer de niveau
			timeOut1 = setTimeout(function() {
				changerNiveau(niveau);
				Score += 10 * tempsDuNiveauEnEcoule;
			}, 6000);

		} else if (CollisionAvecObjet(getPositionCameraX(camera), getPositionCameraZ(camera), 0, 5)) {
			teleporter();
		}
		if (getPositionCameraX(camera) >= 18.1 && !booFence_raised) {
			//Permettre la porte de monter
			booFence_raised = true;

			//Rendre la porte visible
			objScene3D.tabObjets3D[intPos_tab3DObjets_de_la_porte].visible = true;

		} else if (!modeAerienne && timeOut1 === null) { // S'il n'est pas dans la vue aerienne
			if (tabBouton[32] && nbOuvreursDuJoueur > 0)
				briserMur(getCibleCameraX(camera) - getPositionCameraX(camera), getCibleCameraZ(camera) - getPositionCameraZ(camera), getPositionCameraX(camera), getPositionCameraZ(camera));

			if (tabBouton[37] || tabBouton[39]) {
				// 37: Gauche; 39: Droite
				var intDirection = (tabBouton[37]) ? -1 : 1;
				var fltAngle = intDirection * vitesse * Math.PI / 25; // Tourner
				var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
				var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
				setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
				setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
			}

			if (tabBouton[38] || tabBouton[40]) {
				// 38: Haut; 40: Bas
				var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
				var intDirection1 = (tabBouton[38]) ? 1 : -1;
				intDirection1 = intDirection1 * vitesse;

				var fltXPrime1 = intDirection1 * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
				var fltZPrime1 = intDirection1 * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

				if (!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 9) &&
					!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 1) &&
					!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 7)) {
					setCibleCameraX(getCibleCameraX(camera) + fltXPrime1, camera);
					setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime1, camera);
					setPositionCameraX(getPositionCameraX(camera) + fltXPrime1, camera);
					setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime1, camera);
				} else {
					if (CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera), 0.1, 9) ||
						CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera), 0.1, 1) ||
						CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera), 0.1, 7)) { //Check si le joueur est bloqué sur les X
						fltZPrime1 = ((fltZ < 0) ? -1 : 1) * 0.2 * intDirection1;
						fltXPrime1 = 0;
					} else {
						fltXPrime1 = ((fltX < 0) ? -1 : 1) * 0.2 * intDirection1;
						fltZPrime1 = 0;
					}

					if (!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 9) &&
						!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 1) &&
						!CollisionAvecObjet(getPositionCameraX(camera) + fltXPrime1, getPositionCameraZ(camera) + fltZPrime1, 0.1, 7)) {
						setCibleCameraX(getCibleCameraX(camera) + fltXPrime1, camera);
						setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime1, camera);
						setPositionCameraX(getPositionCameraX(camera) + fltXPrime1, camera);
						setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime1, camera);
					}
				}
			}
		}
	}
}
