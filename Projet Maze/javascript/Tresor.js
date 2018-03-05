function creerObj3DTresor(objgl, intNoTexture,posX,posZ) {
    var obj3DTresor = new Object();
    obj3DTresor.fltProfondeur = 1;
    obj3DTresor.fltLargeur = 1;
    obj3DTresor.fltHauteur = 0.8;
    obj3DTresor.id = 3;
    obj3DTresor.vertex = creerVertexTresor(objgl, posX, posZ);
    obj3DTresor.couleurs = creerCouleursTresor(objgl, [1,1,1, 1]);
	  obj3DTresor.texels = creerTexelsTresor(objgl, obj3DTresor.fltLargeur, obj3DTresor.fltProfondeur, intNoTexture);
	  obj3DTresor.maillage = creerMaillageTresor(objgl);
    obj3DTresor.visible = true;

    obj3DTresor.transformations = creerTransformations();
    setPositionsXYZ([posX,0.0,posZ],obj3DTresor.transformations)
    return obj3DTresor;
}

function creerVertexTresor(objgl, X, Z) {
  Z = 0 ;
  X = 0 ;
    var tabVertex = [
        //La face de DESSOUS
             X - 0.4, 0.01, Z - 0.25,      // 0: bas à gauche (AVANT)
             X + 0.4, 0.01, Z - 0.25,      // 1: bas à droite (AVANT)
             X - 0.4, 0.01, Z + 0.25,      // 2: bas à gauche (DERRIERE)
             X + 0.4, 0.01, Z + 0.25,      // 3: bas à droite (DERRIERE)
        //La face vers le SUD
             X - 0.4, 0.01, Z - 0.25,      // 4: bas à gauche (AVANT)
             X + 0.4, 0.01, Z - 0.25,      // 5: bas à droite (AVANT)
             X - 0.4, 0.50, Z - 0.25,      // 6: haut à gauche (AVANT)
             X + 0.4, 0.50, Z - 0.25,      // 7: haut à droite (AVANT)
        //La face vers l'EST
             X + 0.4, 0.01, Z - 0.25,      // 8: bas à droite (AVANT)
             X + 0.4, 0.01, Z + 0.25,      // 9:
             X + 0.4, 0.5,  Z - 0.25,      // 10:
             X + 0.4, 0.5,  Z + 0.25,
        //La face vers le NORD
             X - 0.4, 0.01, Z + 0.25,      // 12:
             X + 0.4, 0.01, Z + 0.25,
             X - 0.4, 0.5,  Z + 0.25,
             X + 0.4, 0.5,  Z + 0.25,
        //La face vers l'OUEST
             X - 0.4, 0.01, Z - 0.25,      // 16:
             X - 0.4, 0.01, Z + 0.25,
             X - 0.4, 0.5,  Z - 0.25,
             X - 0.4, 0.5,  Z + 0.25,
        //La face du DESSUS
             X - 0.4, 0.5, Z - 0.25,       // 20:
             X + 0.4, 0.5, Z - 0.25,
             X - 0.4, 0.5, Z + 0.25,
             X + 0.4, 0.5, Z + 0.25,
        //Debut du cylindre COTE DROIT
             X - 0.4, 0.5, Z,              // 24
             X - 0.4, 0.5, Z + 0.25,       // 25
             X - 0.4, 0.56, Z + 0.2,       // 26
             X - 0.4, 0.60, Z + 0.15,      // 27
             X - 0.4, 0.63, Z + 0.10,      // 28
             X - 0.4, 0.65, Z + 0.05,      // 29
             X - 0.4, 0.655, Z,            // 30
             X - 0.4, 0.65, Z - 0.05,      // 31
             X - 0.4, 0.63, Z - 0.1,       // 32
             X - 0.4, 0.6, Z - 0.15,       // 33
             X - 0.4, 0.56, Z - 0.2,       // 34
             X - 0.4, 0.5, Z - 0.25,       // 35
        //Cylindre COTE GAUCHE
             X + 0.4, 0.5, Z,              // 36
             X + 0.4, 0.5, Z + 0.25,       // 37
             X + 0.4, 0.56, Z + 0.2,       // 38
             X + 0.4, 0.6, Z + 0.15,       // 39
             X + 0.4, 0.63, Z + 0.10,      // 40
             X + 0.4, 0.65, Z + 0.05,      // 41
             X + 0.4, 0.655, Z,            // 42
             X + 0.4, 0.65, Z - 0.05,      // 43
             X + 0.4, 0.63, Z - 0.1,       // 44
             X + 0.4, 0.6, Z - 0.15,       // 45
             X + 0.4, 0.56, Z - 0.2,       // 46
             X + 0.4, 0.5, Z - 0.25,       // 47
        //Choses du haut
             X - 0.4, 0.5, Z - 0.25,       // 48
             X + 0.4, 0.5, Z - 0.25,       // 49
             X - 0.4, 0.56, Z - 0.2,       // 50
             X + 0.4, 0.56, Z - 0.2,       // 51
             X - 0.4, 0.6, Z - 0.15,       // 52
             X + 0.4, 0.6, Z - 0.15,       // 53
             X - 0.4, 0.63, Z - 0.1,       // 54
             X + 0.4, 0.63, Z - 0.1,       // 55
             X - 0.4, 0.65, Z - 0.05,      // 56
             X + 0.4, 0.65, Z - 0.05,      // 57
             X - 0.4, 0.655, Z,            // 58
             X + 0.4, 0.655, Z,            // 59
             X - 0.4, 0.65, Z + 0.05,      // 60
             X + 0.4, 0.65, Z + 0.05,      // 61
             X - 0.4, 0.63, Z + 0.10,      // 62
             X + 0.4, 0.63, Z + 0.10,      // 63
             X - 0.4, 0.6, Z + 0.15,       // 64
             X + 0.4, 0.6, Z + 0.15,       // 65
             X - 0.4, 0.56, Z + 0.2,       // 66
             X + 0.4, 0.56, Z + 0.2,       // 67
             X - 0.4, 0.5, Z + 0.25,       // 68
             X + 0.4, 0.5, Z  + 0.25,      // 69
        ];

    var objTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTresor;
}

function creerCouleursTresor(objgl, tabCouleur) {
    tabCouleurs = [1.0,0.0,0.0,1.0];
    for (var i = 0; i < 70; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

	return objCouleursTresor;
}

function creerTexelsTresor(objgl, fltLargeur, fltProfondeur, intNoTexture) {
     var tabTexels = [
                      //Texels DESSOUS
                      0/511,   329/511,
                      338/511, 329/511,
                      0/511,   181/511,
                      337/511, 181/511,
                      //Texels FACE
                      172/511, 178/511,
                      507/511, 178/511,
                      172/511, 73/511,
                      507/511, 73/511,
                      //Texels cote GAUCHE
                      0/511,   180/511,
                      167/511, 180/511,
                      0/511,   67/511,
                      167/511, 67/511,
                      //Texels DERRIERE
                      0/511,   329/511,
                      338/511, 329/511,
                      0/511,   181/511,
                      337/511, 181/511,
                      //Texels cote DROIT
                      0/511,   178/511,
                      167/511, 178/511,
                      0/511,   67/511,
                      167/511, 67/511,
                      //Texels du DESSUS du **RECTANGLE**
                      0/511,   329/511,
                      338/511, 329/511,
                      0/511,   181/511,
                      337/511, 181/511,
        ]
        //Texels des courbes sur les cotes
        for(var i = 0;i<2; i++)
        tabTexels = tabTexels.concat([
                      84/511,  66/511,
                      167/511, 66/511,
                      157/511, 43/511,
                      151/511, 33/511,
                      138/511, 17/511,
                      120/511, 7/511,
                      84/511,  0/511,
                      48/511,  7/511,
                      30/511,  17/511,
                      12/511,  33/511,
                      9/511,   43/511,
                      0/511,   66/511,
        ])
        //Texels des courbes du haut
        for(var o = 0; o < 6; o++)
        tabTexels = tabTexels.concat([
          174/511,75/511, 507/511,75/511,
          174/511, 8/511,  507/511,8/511,
        ])

    var objTexelsTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTresor.intNoTexture = intNoTexture; objTexelsTresor.pcCouleurTexel = 1.0;

    return objTexelsTresor;
  }

function creerMaillageTresor(objgl) {

       var tabMaillage =
            [ // Les 12 triangles du Tresor
             0, 1, 2,
             1, 3, 2,
             4, 5, 6,
             5, 7, 6,
             8, 9, 10,
             9, 11, 10,
             12, 14, 13,
             13, 14, 15,
             16, 18, 17,
             17, 18, 19,
             20, 21, 22,
             21, 23, 22,
             //Courbe cote droit
             35,26,25,
             26,35,34,
             34,27,26,
             27,34,33,
             33,28,27,
             28,33,32,
             32,29,28,
             29,32,31,
             31,30,29,
             //Courbe cote gauche
             47,37,38,
             38,46,47,
             46,38,39,
             39,45,46,
             45,39,40,
             40,44,45,
             44,40,41,
             41,43,44,
             43,41,42,
             //Courbe haut du tresor
             48,49,50,
             49,51,50,
             50,51,52,
             51,53,52,
             52,53,54,
             53,55,54,
             54,55,56,
             55,57,56,
             56,57,58,
             57,59,58,
             58,59,60,
             59,61,60,
             60,61,62,
             61,63,62,
             62,63,64,
             63,65,64,
             64,65,66,
             65,67,66,
             66,67,68,
             67,69,68
            ];

	    var objMaillageTresor = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTresor);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageTresor.intNbTriangles = 50
        // Le nombre de droites
        objMaillageTresor.intNbDroites = 0;

        return objMaillageTresor;
    }
