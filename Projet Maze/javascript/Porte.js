function creerObj3DPorte(objgl, intNoTexture, tabCouleur, posX, posZ) {
  var obj3DPorte = {};
  obj3DPorte.fltProfondeur = 1;
  obj3DPorte.fltLargeur = 1;
  obj3DPorte.fltHauteur = 1;
  obj3DPorte.id = 7;
  obj3DPorte.vertex = creerVertexPorte(objgl, posX, posZ);
  obj3DPorte.couleurs = creerCouleursPorte(objgl, tabCouleur?true:tabCouleur);
  obj3DPorte.texels = creerTexelsPorte(objgl, obj3DPorte.fltLargeur, obj3DPorte.fltProfondeur, intNoTexture);
  obj3DPorte.maillage = creerMaillagePorte(objgl);
  obj3DPorte.visible = false;

  obj3DPorte.transformations = creerTransformations();
  //setAngleY(90,obj3DPorte.transformations);

  setPositionsXYZ([posX, -2, posZ], obj3DPorte.transformations);

  return obj3DPorte;
}

function creerVertexPorte(objgl, X, Z) {

  var tabVertex = [

    /*
    0 = 25
    1 = 26
    2 = 27
    3 = 28
    4 = 29
    5 = 30
    6 = 31
    7 = 32
    8 = 33
    9 = 34
    10 = 35
    11 = 36
    12 = 37
    13 = 38
    14 = 39
    15 = 40
    16 = 41
    17 = 42
    18 = 43
    19 = 44
    20 = 45
    21 = 46
    22 = 47
    23 = 48
    24 = 49

    */

    /* Face Z=1 */
    // poteau gauche
    -1.0, 0.0, 0.0, //0
    -0.9, 0.0, 0.0,
    -0.9, 1.5, 0.0,
    -0.95, 1.55, 0.0,
    -1.0, 1.5, 0.0,

    // poteau gauche/milieu
    -0.75-0.05, 0.0, 0.0, //5
    -0.65-0.05, 0.0, 0.0,
    -0.65-0.05, 1.75, 0.0,
    -0.70-0.05, 1.80, 0.0,
    -0.75-0.05, 1.75, 0.0,

    //poteau milieu
    -0.55, 0.0, 0.0,  //10
    -0.45, 0.0, 0.0,
    -0.45, 1.95, 0.0,
    -0.50, 2.0, 0.0,
    -0.55, 1.95, 0.0,

    // poteau droite/milieu
    -0.25-0.05, 0.0, 0.0, //15
    -0.15-0.05, 0.0, 0.0,
    -0.15-0.05, 1.75, 0.0,
    -0.20-0.05, 1.80, 0.0,
    -0.25-0.05, 1.75, 0.0,

    // poteau gauche
    -0.1, 0.0, 0.0, //20
    -0.0, 0.0, 0.0,
    -0.0, 1.5, 0.0,
    -0.05, 1.55, 0.0,
    -0.1, 1.5, 0.0,

    /* Face Z=-1 */
    // poteau gauche
    -1.0, 0.0,  -0.025, //25
    -0.9, 0.0,  -0.025,
    -0.9, 1.5,  -0.025,
    -0.95, 1.55,  -0.025,
    -1.0, 1.5,  -0.025,

    // poteau gauche/milieu
    -0.75-0.05, 0.0, -0.025, //5
    -0.65-0.05, 0.0, -0.025,
    -0.65-0.05, 1.75,  -0.025,
    -0.70-0.05, 1.80,  -0.025,
    -0.75-0.05, 1.75,  -0.025,

    //poteau milieu
    -0.55, 0.0, -0.025,  //10
    -0.45, 0.0,  -0.025,
    -0.45, 1.95,  -0.025,
    -0.50, 2.0,  -0.025,
    -0.55, 1.95,  -0.025,

    // poteau droite/milieu
    -0.25-0.05, 0.0,  -0.025, //15
    -0.15-0.05, 0.0,  -0.025,
    -0.15-0.05, 1.75,  -0.025,
    -0.20-0.05, 1.80,  -0.025,
    -0.25-0.05, 1.75, -0.025,

    // poteau gauche
    -0.1, 0.0, -0.025, //20
    -0.0, 0.0,  -0.025,
    -0.0, 1.5, -0.025,
    -0.05, 1.55,  -0.025,
    -0.1, 1.5, -0.025,

  ];

  var objPorte = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objPorte);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);


  return objPorte;
}

function creerCouleursPorte(objgl, tabCouleur) {

  if(tabCouleur === true){

    tabCouleurs = [ 0.0, 0.0, 0.0, 0.0


    ];
  }else{

    tabCouleurs = [
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,

    ];
  }


  var objCouleursPorte = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPorte);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);


  return objCouleursPorte;
}

function creerTexelsPorte(objgl, fltLargeur, fltProfondeur, intNoTexture) {
  var tabTexels = [
          //poteau gauche
          1/512, 511/512,
          81/512, 511/512,
          81/512, 152/512,
          40/512, 102/512,
          1/512, 152/512,

          // poteau gauche milieu
          82/512, 511/512,
          165/512, 511/512,
          173/512, 152/512,
          137/512, 102/512,
          90/512, 152/512,

          // poteau milieu
          166/512, 511/512,
          265/512, 511/512,
          265/512, 175/512,
          228/512, 96/512,
          182/512, 184/512,

          // poteau droite milieu
          270/512 , 511/512,
          366/512, 511/512,
          366/512, 175/512,
          333/512, 90/512,
          270/512, 175/512,

          //poteau droite
          380/512, 511/512,
          460/512, 511/512,
          460/512, 175/512,
          423/512, 93/512,
          380/512, 175/512,

          /* Z = -1 */
          //poteau gauche
          1/512, 511/512,
          81/512, 511/512,
          81/512, 152/512,
          40/512, 102/512,
          1/512, 152/512,

          // poteau gauche milieu
          82/512, 511/512,
          165/512, 511/512,
          173/512, 152/512,
          137/512, 102/512,
          90/512, 152/512,

          // poteau milieu
          166/512, 511/512,
          265/512, 511/512,
          265/512, 175/512,
          228/512, 96/512,
          182/512, 184/512,

          // poteau droite milieu
          270/512 , 511/512,
          366/512, 511/512,
          366/512, 175/512,
          333/512, 90/512,
          270/512, 175/512,

          //poteau droite
          380/512, 511/512,
          460/512, 511/512,
          460/512, 175/512,
          423/512, 93/512,
          380/512, 175/512,


           ];

  var objTexelsPorte = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPorte);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

  objTexelsPorte.intNoTexture = intNoTexture;
  objTexelsPorte.pcCouleurTexel = 1.0;

  return objTexelsPorte;
}

function creerMaillagePorte(objgl) {

  // Le maillage
  tabMaillagePorte = [

    /* Face Z=1 */
    // poteau gauche
    0,1,2,
    2,4,0,
    2,3,4,

    //poteau gauche/milieu
    5,6,7,
    7,9,5,
    7,8,9,

    //poteau milieu
    10,11,12,
    12,14,10,
    12,13,14,

    //poteau milieu/droite
    15,16,17,
    17,19,15,
    17,18,19,

    //poteau droite
    20,21,22,
    22,24,20,
    22,23,24,

    /* Face Z=-1 */
    // poteau gauche
    0+25,1+25,2+25,
    2+25,4+25,0+25,
    2+25,3+25,4+25,

    //poteau gauche/milieu
    5+25,6+25,7+25,
    7+25,9+25,5+25,
    7+25,8+25,9+25,

    //poteau milieu
    10+25,11+25,12+25,
    12+25,14+25,10+25,
    12+25,13+25,14+25,

    //poteau milieu/droite
    15+25,16+25,17+25,
    17+25,19+25,15+25,
    17+25,18+25,19+25,

    //poteau droite
    20+25,21+25,22+25,
    22+25,24+25,20+25,
    22+25,23+25,24+25, //30

    /*1*/
    0,4,29,
    29,25,0,

    1,2,27,
    27,26,1,

    2,3,28,
    28,27,2,

    3,4,29,
    29,28,3,

    /*2*/
    30,5,9,
    9,34,30,

    6,31,32,
    32,7,6,

    7,8,33,
    33,32,7,

    8,9,34,
    34,33,8,

    /*3*/
    10,35,39,
    39,14,10,

    11,12,37,
    37,36,11,

    12,13,38,
    38,37,12,

    13,14,39,
    39,38,13,

    /*4*/
    15,19,44,
    44,40,15,

    16,17,42,
    42,41,16,

    17,18,43,
    43,42,17,

    18,19,44,
    44,43,18,

    /*5*/
    20,24,49,
    49,45,20,

    21,22,47,
    47,46,21,

    22,23,48,
    48,47,22,

    23,24,49,
    49,48,23





  ];

  var objMaillagePorte = objgl.createBuffer();
  objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePorte);
  objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillagePorte), objgl.STATIC_DRAW);

  // Le nombre de triangles
  objMaillagePorte.intNbTriangles = 70;
  // Le nombre de droites
  objMaillagePorte.intNbDroites = 0;

  return objMaillagePorte;
}
