function creerObj3DFleche(objgl, intNoTexture, tabCouleur, posX, posY, posZ) {
  var obj3DFleche = new Object();
  obj3DFleche.fltProfondeur = 1;
  obj3DFleche.fltLargeur = 1;
  obj3DFleche.fltHauteur = 1;
  obj3DFleche.id = 4;
  obj3DFleche.vertex = creerVertexFleche(objgl, posX, posZ);
  obj3DFleche.couleurs = creerCouleursFleche(objgl, tabCouleur?true:tabCouleur);
  obj3DFleche.texels = creerTexelsFleche(objgl, obj3DFleche.fltLargeur, obj3DFleche.fltProfondeur, intNoTexture);
  obj3DFleche.maillage = creerMaillageFleche(objgl);
  obj3DFleche.visible = true;

  obj3DFleche.transformations = creerTransformations();
  //setAngleY(90,obj3DFleche.transformations);

  setPositionsXYZ([posX, posY, posZ], obj3DFleche.transformations);
  setEchellesXYZ([0.8,0.8,0.8],obj3DFleche.transformations);
  return obj3DFleche;
}

function creerVertexFleche(objgl, X, Z) {

  var tabVertex = [

    -0.5, 0, 0.1, //0    left far milieu
    0, -0.5, 0.1,
    0, -0.25, 0.1,
    0.5, -0.25, 0.1,
    0.5, 0.25, 0.1,
    0, 0.25, 0.1,
    0, 0.5, 0.1,

    -0.5, 0, -0.1,//7
    0, -0.5, -0.1,
    0, -0.25, -0.1,
    0.5, -0.25, -0.1,
    0.5, 0.25, -0.1,
    0, 0.25, -0.1,
    0, 0.5, -0.1
  ];

  var objFleche = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);


  return objFleche;
}

function creerCouleursFleche(objgl, tabCouleur) {

  if(tabCouleur === true){

    tabCouleurs = [ 1.0, 1.00, 0.0, 1.0, //0
                    0.8, 0.52, 0.25, 1.0, //1
                    0.8, 0.52, 0.25, 1.0, //2
                    0.9, 0.20, 0.04, 1.0, //3
                    0.9, 0.20, 0.04, 1.0, //4
                    0.8, 0.52, 0.25, 1.0, //5
                    0.8, 0.52, 0.25, 1.0, //6

                    1.0, 1.00, 0.0, 1.0, //7
                    0.8, 0.52, 0.25, 1.0, //8
                    0.8, 0.52, 0.25, 1.0, //9
                    0.9, 0.20, 0.04, 1.0, //10
                    0.9, 0.20, 0.04, 1.0, //11
                    0.8, 0.52, 0.25, 1.0, //12
                    0.8, 0.52, 0.25, 1.0, //13
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


  var objCouleursFleche = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleche);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

  return objCouleursFleche;
}

function creerTexelsFleche(objgl, fltLargeur, fltProfondeur, intNoTexture) {
  var tabTexels = [
  ];

  var objTexelsFleche = objgl.createBuffer();
  objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsFleche);
  objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

  objTexelsFleche.intNoTexture = 0;
  objTexelsFleche.pcCouleurTexel = 0;

  return objTexelsFleche;
}

function creerMaillageFleche(objgl) {

  // Le maillage
  tabMaillageFleche = [
    //front face Z=1
    0,6,1,
    2,4,3,
    4,2,5,
    //back face Z=-1
    7,8,13,
    9,10,11,
    9,11,12,
    //top pointy edge
    0,7,13,
    13,6,0,
    //bottom pointy edge
    0,1,8,
    8,7,0,
    //top square (5,6,12,13)
    6,12,5,
    12,6,13,
    //bottom square (1,2,8,9)
    1,9,8,
    9,1,2,
    //top rectangle
    5,12,11,
    11,4,5,
    //bottom rectangle
    2,3,10,
    10,9,2,
    //back square
    3,11,10,
    11,3,4,
    11,4,3

  ];

  var objMaillageFleche = objgl.createBuffer();
  objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleche);
  objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageFleche), objgl.STATIC_DRAW);

  // Le nombre de triangles
  objMaillageFleche.intNbTriangles = 20;
  // Le nombre de droites
  objMaillageFleche.intNbDroites = 0;

  return objMaillageFleche;
}
