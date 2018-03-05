
//Mouvement des objets
var rotationYTresor = 0;
var transformationsTresor = null;
var tabTransformationsTeleObjets = [];
var echelleYTeleObjets = 1;
var directionEchelleTeleObjets = 1;
var tabTransformationsFleches = [];
var transformationsPorte = null;
var intPos_tab3DObjets_de_la_porte = 0;
var booFence_raised = false;
var fence_raised_height = -2;


function animer() {
  // Requête pour le prochain cycle
  objCycleAnimation = requestAnimationFrame(animer);

  var objCanvas = document.getElementById('monCanvas');
  objCanvas.width = window.innerWidth;
  objCanvas.height = window.innerHeight;

  var hud = document.getElementById('tabHUD');
  hud.width = window.innerWidth;
  hud.height = 110;

  // Le cycle d'animation
  effacerCanevas(objgl);
  mettreAjourAnimation();
  dessiner(objgl, objProgShaders, objScene3D);
}

function mettreAjourAnimation() {
  if (Score < 0)
    Score = 0;

  if (!blnVictoire && !blnGameOver && !blnNiveauFini)
    listenerLoop();

  if (!modeAerienne) {
    tournerTresor();
    flotterTeleObjets();
  }

  if (booFence_raised && fence_raised_height <= 0)
    raiseFence();

  tabHUD.rows[0].cells[3].innerHTML = "";
  tabHUD.rows[0].cells[3].appendChild(tabImageLevel[niveau-1]);
  //tabHUD.rows[0].cells[3].innerHTML = "Niveau: " + niveau;
  tabHUD.rows[0].cells[0].innerHTML = "Score: " + formatterScore(Score, 6);
}

function raiseFence() {
	setPositionY(fence_raised_height + 0.025, transformationsPorte);
  fence_raised_height += 0.025;
}

function tournerTresor() {
	if (rotationYTresor >= 360)
		rotationYTresor = 0;
	setAngleY(rotationYTresor, transformationsTresor);
	rotationYTresor += 0.5;
}

function flotterTeleObjets() {
	if (echelleYTeleObjets >= 1.2)
		directionEchelleTeleObjets = -1;
	else if (echelleYTeleObjets <= 0.9)
		directionEchelleTeleObjets = 1;

	echelleYTeleObjets += directionEchelleTeleObjets * 0.0015;

	for (var i = 0; i < tabTransformationsTeleObjets.length; i++)
		setEchelleY(echelleYTeleObjets, tabTransformationsTeleObjets[i]);
}

function mettreFlecheFaceAuTresor(flecheTabTransformation, tabPositionsXYZDuCible, XouZ) {
	var coteA = getPositionX(flecheTabTransformation) - tabPositionsXYZDuCible[0];
	var coteB = getPositionZ(flecheTabTransformation) - tabPositionsXYZDuCible[2];
	var Hypothenuse = Math.sqrt(Math.pow(coteA, 2) + Math.pow(coteB, 2));
	var angle = -90;

	if (coteA > 0 && coteB >= 0) {
		angle += Math.asin(coteA / Hypothenuse) * 180 / Math.PI;
	} else if (coteA > 0 && coteB < 0) {
		angle += Math.acos(coteB / Hypothenuse) * 180 / Math.PI;
	} else if (coteA <= 0 && coteB < 0) {
		angle += -Math.acos(coteB / Hypothenuse) * 180 / Math.PI;
	} else if (coteA <= 0 && coteB >= 0) {
		angle += Math.asin(coteA / Hypothenuse) * 180 / Math.PI;
	}
	if (XouZ === 'x') {
		setAnglesXYZ([270, 0, angle], flecheTabTransformation);
	} else if (XouZ === 'z') {
		setAnglesXYZ([0, angle, 0], flecheTabTransformation);
	}
}
