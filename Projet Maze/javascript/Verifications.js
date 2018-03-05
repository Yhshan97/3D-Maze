// Les vérification des collisions et mouvements


function CollisionAvecObjet(posXPotentiel, posZPotentiel, distance, intIdObjet) {
  return (
    (getObjTab(posXPotentiel + distance, posZPotentiel + distance).id === intIdObjet && getObjTab(posXPotentiel + distance, posZPotentiel + distance).visible) ||
    (getObjTab(posXPotentiel - distance, posZPotentiel - distance).id === intIdObjet && getObjTab(posXPotentiel - distance, posZPotentiel - distance).visible) ||
    (getObjTab(posXPotentiel - distance, posZPotentiel + distance).id === intIdObjet && getObjTab(posXPotentiel - distance, posZPotentiel + distance).visible) ||
    (getObjTab(posXPotentiel + distance, posZPotentiel - distance).id === intIdObjet && getObjTab(posXPotentiel + distance, posZPotentiel - distance).visible)
  );
}

function teleporter() {
  sonTeleportation.volume = 0.1;
  sonTeleportation.loop = false;
  sonTeleportation.play();
  
  var distanceDuCibleX = getCibleCameraX(objScene3D.camera) - getPositionCameraX(objScene3D.camera);
  var distanceDuCibleZ = getCibleCameraZ(objScene3D.camera) - getPositionCameraZ(objScene3D.camera);
  var random = Math.floor(Math.random() * tabTelerecepteursPosDansTabObjets3D.length);

  setPositionCameraX(getPositionX(objScene3D.tabObjets3D[tabTelerecepteursPosDansTabObjets3D[random]].transformations), objScene3D.camera);
  setPositionCameraZ(getPositionZ(objScene3D.tabObjets3D[tabTelerecepteursPosDansTabObjets3D[random]].transformations), objScene3D.camera);
  
  setCibleCameraX(getPositionCameraX(objScene3D.camera) + distanceDuCibleX,objScene3D.camera);
  setCibleCameraZ(getPositionCameraZ(objScene3D.camera) + distanceDuCibleZ,objScene3D.camera);
}

function briserMur(fltX, fltZ, posX, posZ) {
    var xDirection1 = (fltX >= 1) ? 1 : (fltX < -1) ? -1: 0;
    var zDirection1 = (xDirection1 === 0) ? ((fltZ >= 1) ? 1 : (fltZ < -1) ? -1: 0) : 0;

  if(getObjTab(posX + xDirection1, posZ + zDirection1).id === 1 && getObjTab(posX + xDirection1, posZ + zDirection1).visible && Score >= 50){
    sonCreuser.volume = 0.1;
    sonCreuser.loop = false;
    sonCreuser.play();
    getObjTab(posX + xDirection1, posZ + zDirection1).visible = false;
    nbOuvreursDuJoueur--;
    updateViewShovels(nbOuvreursDuJoueur);
    Score -= 50;
  }
}
