/*

*/
var intervalTimer = null;
var blnNiveauFini = false;

function timer(duree, affichage) {
	var timer = duree,
		minutes, seconde;

	if (intervalTimer !== null)
		clearInterval(intervalTimer);

	intervalTimer = setInterval(function() {
		minutes = ajouteZeros(parseInt(timer / 60));
		seconde = ajouteZeros(parseInt(timer % 60));

		affichage.textContent = minutes + ":" + seconde;

		if (timer <= 0) {
			timer = duree;
			blnNiveauFini = true;
			clearInterval(intervalTimer);
			sonFailedLevel.volume = 0.1;
			  sonFailedLevel.loop = false;
			  sonFailedLevel.play();
			setTimeout(function() {
			if (Score >= 200) {
				Score -= 200;
				resetNiveau();
			} else {
				blnGameOver = true;
				initTabPositionsMurs();
				resetNiveau();

				setPositionsCameraXYZ([15.5, 100, 15.5], objScene3D.camera);
				setCiblesCameraXYZ([15.5, 0, 15.5], objScene3D.camera);
				setOrientationsXYZ([1, 0, 0], objScene3D.camera);

				FOV = 15
				modeAerienne = true;
			}
		}, 3500);
	}

		if (timer == 10) {
			sonTimer10sec.volume = 0.1;
		  sonTimer10sec.loop = false;
		  sonTimer10sec.play();
		}

		tempsDuNiveauEnEcoule = timer;
		timer--;
	}, 1000);
}

function initTimer() {
	var intMinuteDepart = 0;
	var intSecondeDepart = 0;

	if (tempsDuNiveauEnSec > 59) {
		intMinuteDepart = tempsDuNiveauEnSec / 60
	} else {
		intMinuteDepart = 0
	}

	if (tempsDuNiveauEnSec < 59) {
		intSecondeDepart = tempsDuNiveauEnSec;
	} else {
		intSecondeDepart = tempsDuNiveauEnSec % 60
	}
	document.getElementById('time').innerHTML = ajouteZeros(Math.floor(intMinuteDepart)) + ":" + ajouteZeros(intSecondeDepart);
}
