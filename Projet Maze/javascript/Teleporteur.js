

function creerObj3DTeleporteur(objgl, intNoTexture, posX, posZ) {
  var obj3DTeleporteur = new Object();
  obj3DTeleporteur.fltProfondeur = 0.8;
  obj3DTeleporteur.fltLargeur = 0.8;
  obj3DTeleporteur.fltHauteur = 2.3;
  obj3DTeleporteur.id = 5;
  obj3DTeleporteur.vertex = creerVertexTeleporteur(objgl, posX, posZ);
  obj3DTeleporteur.couleurs = creerCouleursTeleporteur(objgl, [1, 1, 1, 1]);
  obj3DTeleporteur.texels = creerTexelsTeleporteur(objgl, obj3DTeleporteur.fltLargeur, obj3DTeleporteur.fltProfondeur, intNoTexture);
  obj3DTeleporteur.maillage = creerMaillageTeleporteur(objgl);
  obj3DTeleporteur.visible = true;

  obj3DTeleporteur.transformations = creerTransformations();
  setPositionsXYZ([posX, 0.0, posZ], obj3DTeleporteur.transformations)
  setAngleY(90, obj3DTeleporteur.transformations)
  return obj3DTeleporteur;
}

function creerVertexTeleporteur(objgl, X, Z) {
  Z = 0;
  X = 0;
  Y = 0.01;
  Y2 = 0.15;
  var tabVertex = []
  for (var i = 0; i < 2; i++, Y += 1.85, Y2 = -Y2) {
    tabVertex = tabVertex.concat([
      //Face du DESSOUS du teleporteur en bas
      -0.40, Y, 0.4,                        // 0:
      0.40, Y, 0.4,
      -0.40, Y, -0.4,
      0.40, Y, -0.4,
      //Face du cote AVANT
      -0.40, Y, -0.4,                       // 4:
      0.40, Y, -0.4,
       -0.20, Y + Y2, -0.2,
      0.20, Y + Y2, -0.2,
      //Face du cote GAUCHE
      -0.40, Y, -0.4,                       // 8:
      -0.40, Y, 0.4,
       -0.20, Y + Y2, -0.2,
        -0.20, Y + Y2, 0.2,
      //Face du cote DERRIERE
      0.40, Y, 0.4,                         // 12:
      -0.40, Y, 0.4,
      0.20, Y + Y2, 0.2,
       -0.20, Y + Y2, 0.2,
      //Face du cote DROIT
      0.40, Y, 0.4,                         // 16:
      0.40, Y, -0.4,
      0.20, Y + Y2, 0.2,
      0.20, Y + Y2, -0.2,
      //Face du DESSUS
      -0.20, Y + Y2, -0.2,                  // 20:
      0.20, Y + Y2, -0.2,
       -0.20, Y + Y2, 0.2,
      0.20, Y + Y2, 0.2,
    ])
  }

  var objTeleporteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTeleporteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

  return objTeleporteur;
}

function creerCouleursTeleporteur(objgl, tabCouleur) {
  tabCouleurs = [0, 0, 0, 1.0];
  for (var i = 0; i < 48; i++)
    tabCouleurs = tabCouleurs.concat(tabCouleur);

  var objCouleursTeleporteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleporteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

  return objCouleursTeleporteur;
}

function creerTexelsTeleporteur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
  var tabTexels = []
  tabTexels = tabTexels.concat([
    1 / 511, 510 / 511,
    300 / 511, 510 / 511,
    1 / 511, 242 / 511,
    300 / 511, 242 / 511,
  ])
  for (var i = 0; i < 4; i++)
    tabTexels = tabTexels.concat([
      0 / 511, 238 / 511,
      510 / 511, 237 / 511,
      100 / 511, 0 / 511,
      411 / 511, 0 / 511,
    ])
  tabTexels = tabTexels.concat([
    1 / 511, 510 / 511,
    300 / 511, 510 / 511,
    1 / 511, 242 / 511,
    300 / 511, 242 / 511,
  ])
  tabTexels = tabTexels.concat([
    1 / 511, 510 / 511,
    300 / 511, 510 / 511,
    1 / 511, 242 / 511,
    300 / 511, 242 / 511,
  ])
  for (var i = 0; i < 4; i++)
    tabTexels = tabTexels.concat([
      0 / 511, 238 / 511,
      510 / 511, 237 / 511,
      100 / 511, 0 / 511,
      411 / 511, 0 / 511,
    ])
  tabTexels = tabTexels.concat([
    1 / 511, 510 / 511,
    300 / 511, 510 / 511,
    1 / 511, 242 / 511,
    300 / 511, 242 / 511,
  ])

  var objTexelsTeleporteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleporteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

  objTexelsTeleporteur.intNoTexture = intNoTexture;
  objTexelsTeleporteur.pcCouleurTexel = 0.7;

  return objTexelsTeleporteur;
}

function creerMaillageTeleporteur(objgl) {
  var tabMaillage = []
    tabMaillage = tabMaillage.concat([
      0 , 2 , 1 ,
      1 , 2 , 3 ,
      4 , 5 , 6 ,
      5 , 7 , 6 ,
      8 , 10 , 9 ,
      9 , 10 , 11 ,
      12 , 13 , 14 ,
      13 , 15 , 14 ,
      16 , 18 , 17 ,
      17 , 18 , 19 ,
      20 , 21 , 22 ,
      21, 23, 22,

      24,26,25,
      25,26,27,
      28,30,29,
      29,30,31,
      32,33,34,
      33,35,34,
      36,38,37,
      37,38,39,
      40,41,42,
      41,43,42,
      44,46,45,
      45,46,47
    ])

  var objMaillageTeleporteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleporteur);
  objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

  // Le nombre de triangles
  objMaillageTeleporteur.intNbTriangles = 24
  // Le nombre de droites
  objMaillageTeleporteur.intNbDroites = 0;

  return objMaillageTeleporteur;
}
