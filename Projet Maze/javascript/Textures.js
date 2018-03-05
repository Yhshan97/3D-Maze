// Textures.js
function creerTextures() {
	var tabObjTextures = [];

	for (var i = 0; i < tabLoadedImages.length; i++) {
		// L'image de la texture

		// Inserer l'image a l'interieur de la texture

		// Creer La texture
        var objTexture = objgl.createTexture();
        // Ins�rer l'image a l'interieur de la texture

        objgl.bindTexture(objgl.TEXTURE_2D, objTexture);
		objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA, objgl.UNSIGNED_BYTE, tabLoadedImages[i]);

		// La parametrer
        objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
        objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST_MIPMAP_NEAREST);
        objgl.generateMipmap(objgl.TEXTURE_2D); // Pour creer le mipmap
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.REPEAT);
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.REPEAT);

		// Inserer cette texture dans un tableau de textures
		tabObjTextures.push(objTexture);
	}

	return tabObjTextures;
}
