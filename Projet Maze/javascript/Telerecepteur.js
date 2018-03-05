function creerObj3DTelerecepteur(objgl, intNoTexture, posX, posZ) {
  var obj3DTelerecepteur = new Object();
  obj3DTelerecepteur.fltProfondeur = 0.8;
  obj3DTelerecepteur.fltLargeur = 0.8;
  obj3DTelerecepteur.fltHauteur = 2.3;
  obj3DTelerecepteur.id = 6;
  obj3DTelerecepteur.vertex = creerVertexTelerecepteur(objgl, posX, posZ);
  obj3DTelerecepteur.couleurs = creerCouleursTelerecepteur(objgl, [1, 1, 1, 1]);
  obj3DTelerecepteur.texels = creerTexelsTelerecepteur(objgl, obj3DTelerecepteur.fltLargeur, obj3DTelerecepteur.fltProfondeur, intNoTexture);
  obj3DTelerecepteur.maillage = creerMaillageTelerecepteur(objgl);
  obj3DTelerecepteur.visible = true;

  obj3DTelerecepteur.transformations = creerTransformations();
  setPositionsXYZ([posX, 0.0, posZ], obj3DTelerecepteur.transformations)
  setAngleY(90, obj3DTelerecepteur.transformations)
  return obj3DTelerecepteur;
}

function creerVertexTelerecepteur(objgl, X, Z) {
  Z = 0;
  X = 0;
  Y = 0.01;
  Y2 = 0.15;
  var tabVertex = []
  for (var i = 0; i < 2; i++, Y += 1.85, Y2 = -Y2) {
    tabVertex = tabVertex.concat([
      //Face du DESSOUS du Telerecepteur en bas
      -0.40, Y, 0.4, // 0:
      0.40, Y, 0.4, -0.40, Y, -0.4,
      0.40, Y, -0.4,
      //Face du cote AVANT
      -0.40, Y, -0.4, // 4:
      0.40, Y, -0.4, -0.20, Y + Y2, -0.2,
      0.20, Y + Y2, -0.2,
      //Face du cote GAUCHE
      -0.40, Y, -0.4, // 8:
      -0.40, Y, 0.4, -0.20, Y + Y2, -0.2, -0.20, Y + Y2, 0.2,
      //Face du cote DERRIERE
      0.40, Y, 0.4, // 12:
      -0.40, Y, 0.4,
      0.20, Y + Y2, 0.2, -0.20, Y + Y2, 0.2,
      //Face du cote DROIT
      0.40, Y, 0.4, // 16:
      0.40, Y, -0.4,
      0.20, Y + Y2, 0.2,
      0.20, Y + Y2, -0.2,
      //Face du DESSUS
      -0.20, Y + Y2, -0.2, // 20:
      0.20, Y + Y2, -0.2, -0.20, Y + Y2, 0.2,
      0.20, Y + Y2, 0.2,
    ])
  }

  var objTelerecepteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTelerecepteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

  return objTelerecepteur;
}

function creerCouleursTelerecepteur(objgl, tabCouleur) {
  tabCouleurs = [0, 0, 0, 1.0];
  for (var i = 0; i < 48; i++)
    tabCouleurs = tabCouleurs.concat(tabCouleur);

  var objCouleursTelerecepteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTelerecepteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

  return objCouleursTelerecepteur;
}

function creerTexelsTelerecepteur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
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

  var objTexelsTelerecepteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTelerecepteur);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

  objTexelsTelerecepteur.intNoTexture = intNoTexture;
  objTexelsTelerecepteur.pcCouleurTexel = 0.8;

  return objTexelsTelerecepteur;
}

function creerMaillageTelerecepteur(objgl) {
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

  var objMaillageTelerecepteur = objgl.createBuffer();
  objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTelerecepteur);
  objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

  // Le nombre de triangles
  objMaillageTelerecepteur.intNbTriangles = 24
  // Le nombre de droites
  objMaillageTelerecepteur.intNbDroites = 0;

  return objMaillageTelerecepteur;
}
