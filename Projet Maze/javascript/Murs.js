
function creerObj3DMur(objgl,id, intNoTexture,posX,posZ) {
    var obj3DMur ={};
    obj3DMur.fltProfondeur = 1;
    obj3DMur.fltLargeur = 1;
    obj3DMur.fltHauteur = 3;
    obj3DMur.id = id;
    obj3DMur.vertex = creerVertexMur(objgl, posX, posZ);
    obj3DMur.couleurs = creerCouleursMur(objgl, [0, 0, 0, 1]);
	  obj3DMur.texels = creerTexelsMur(objgl, obj3DMur.fltLargeur, obj3DMur.fltProfondeur, intNoTexture);
	  obj3DMur.maillage = creerMaillageMur(objgl);
    obj3DMur.visible = true;

    obj3DMur.transformations = creerTransformations();
    setPositionsXYZ([posX,0.0,posZ],obj3DMur.transformations);
    return obj3DMur;
}

function creerVertexMur(objgl, posX, posZ) {
    var tabVertex = [
        //La face vers le SUD
             0, 0.0, 0,               // 0: bas à gauche (AVANT)
             0 + 1, 0.0, 0,           // 1: bas à droite (AVANT)
             0, 3.0, 0,               // 2: haut à gauche (AVANT)
             0 + 1, 3.0, 0,           // 3: haut à droite (AVANT)
        //La face vers l'EST
             0 + 1, 0.0, 0,           // 4: bas à droite (AVANT)
             0 + 1, 0.0, 0 + 1,       // 5:
             0 + 1, 3.0, 0,           // 6:
             0 + 1, 3.0, 0 + 1,
        //La face vers le NORD
             0, 0.0, 0 + 1,           // 8:
             0 + 1, 0.0, 0 + 1,
             0, 3.0, 0 + 1,
             0 + 1, 3.0, 0 + 1,
        //La face vers l'OUEST
             0, 0.0, 0,               // 12:
             0, 0.0, 0 + 1,
             0, 3.0, 0,
             0, 3.0, 0 + 1,
        //La face du DESSUS
             0, 3.0, 0,               // 16:
             0 + 1, 3.0, 0,
             0, 3.0, 0 +1,
             0 + 1, 3.0, 0 + 1
        ];

    var objMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMur;
}

function creerCouleursMur(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 24; i++) // to change
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

	return objCouleursMur;
}

function creerTexelsMur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
var xMur = 1;
//var zMur = (intNoTexture === 9) ? 3 : 1;
//var pcCouleur = (intNoTexture === 9) ? 0.6 : 1;
var pcCouleur = 1;
var zMur = 3;

     var tabTexels = [
             0.0, 0.0,
             xMur, 0.0,
             0.0, zMur ,
             xMur , zMur
        ];
        for (var i = 0; i < 2; i++) {
          tabTexels = tabTexels.concat(tabTexels);
        }
        tabTexels = tabTexels.concat([
                        1/512,16/512,
                        203/512,16/512,
                        203/512,230/512,
                        1/512,230/512
                      ]);

    var objTexelsMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMur.intNoTexture = intNoTexture; objTexelsMur.pcCouleurTexel = pcCouleur;

    return objTexelsMur;
  }

function creerMaillageMur(objgl) {

       var tabMaillage =
            [ // Les 12 triangles du Mur
             0, 1, 2,
             1, 3, 2,
             4, 5, 6,
             5, 7, 6,
             8, 10, 9,
             9, 10, 11,
             12, 14, 13,
             13, 14, 15,
             16, 17, 18,
             17, 19, 18
            ];

	    var objMaillageMur = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMur);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageMur.intNbTriangles = 10;
        // Le nombre de droites
        objMaillageMur.intNbDroites = 0;

        return objMaillageMur;
    }
