
    /******************************************************************************************
     * ajouteZeros(intNbr)
     * Ajoute un zero si le nombre est plus petit que 10.
     *****************************************************************************************/
    function ajouteZeros(intNbr) {
      return (intNbr < 10 ? '0' : '') + intNbr;
    }

    function formatterScore(intNbr, intTaille) {
      var strScore = "" + intNbr;
      while (strScore.length < intTaille) {
        strScore = "0" + strScore;
      }
      return strScore;
    }

    function getObjTab(fltPosX, fltPosZ) {
      // retourne l'objet situé dans le tableau au x et z fournis
      return objScene3D.tabObjets3D[6 + (parseInt(31 - fltPosX) * 31) + parseInt(fltPosZ)];
    }

    function updateViewShovels(nbOuvreurs){

      for (var i = 0; i < nbOuvreurs; i++) {
        var objImgShovel2 = document.getElementById('shovel' + i)
        objImgShovel2.style.opacity = 1;
      }

      for (var i = tabObjShovel.length; i > nbOuvreurs; i--) {
        console.log(i);
        var objImgShovel = document.getElementById('shovel' + (i-1))
        objImgShovel.style.opacity = 0.3;
      }

      /*tabHUD.rows[0].cells[1].innerHTML = "";
        // Shovel
        for (var i = 0; i < nbOuvreurs; i++) {
          tabHUD.rows[0].cells[1].appendChild(tabObjShovel[i]);
        }*/
    }

    function creerPerspective(objgl, objProgShaders, intFOV) {
      var matProjection = mat4.create();
      var fltRapportCanevas = objgl.drawingBufferWidth / objgl.drawingBufferHeight;
      mat4.perspective(intFOV, fltRapportCanevas, 0.01, 210, matProjection);
      objgl.uniformMatrix4fv(objProgShaders.matProjection, false, matProjection);
    }


    function dessiner(objgl, objProgShaders, objScene3D) {
      // La vue
      objgl.viewport(0, 0, objgl.drawingBufferWidth, objgl.drawingBufferHeight);
      creerPerspective(objgl, objProgShaders, FOV);

      for (var i = 0; i < objScene3D.tabObjets3D.length; i++) {
        if (objScene3D.tabObjets3D[i].id !== 0 && objScene3D.tabObjets3D[i].id !== 2) {
          var vertex = objScene3D.tabObjets3D[i].vertex;
          var couleurs = objScene3D.tabObjets3D[i].couleurs;
          var texels = objScene3D.tabObjets3D[i].texels;
          var maillage = objScene3D.tabObjets3D[i].maillage;
          var transformations = objScene3D.tabObjets3D[i].transformations;
          var binVisible = objScene3D.tabObjets3D[i].visible;

          // Matrice du modèle
          var matModeleVue = mat4.create();
          mat4.identity(matModeleVue);

          // Placer la caméra sur la scène
          mat4.lookAt(getPositionsCameraXYZ(objScene3D.camera),
            getCiblesCameraXYZ(objScene3D.camera),
            getOrientationsXYZ(objScene3D.camera),
            matModeleVue);

          // Appliquer les transformations sur le modèle
          mat4.translate(matModeleVue, getPositionsXYZ(transformations));
          mat4.scale(matModeleVue, getEchellesXYZ(transformations));
          mat4.rotateX(matModeleVue, getAngleX(transformations) * Math.PI / 180);
          mat4.rotateY(matModeleVue, getAngleY(transformations) * Math.PI / 180);
          mat4.rotateZ(matModeleVue, getAngleZ(transformations) * Math.PI / 180);

          // Relier la matrice aux shaders
          objgl.uniformMatrix4fv(objProgShaders.matModeleVue, false, matModeleVue);

          if (maillage === null && binVisible)
            // Dessiner les sous-objets
            for (var j = 0; j < vertex.length; j++) {

              // Relier les vertex aux shaders
              objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex[j]);
              objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);
              var intNbVertex = (objgl.getBufferParameter(objgl.ARRAY_BUFFER, objgl.BUFFER_SIZE) / 4) / 3;

              // Relier les couleurs aux shaders
              objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs[j]);
              objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0);

              // Activer la texture
              objgl.activeTexture(objgl.TEXTURE0 + texels[j].intNoTexture);
              objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels[j].intNoTexture]);

              // Relier les texels aux shaders
              objgl.bindBuffer(objgl.ARRAY_BUFFER, texels[j]);
              objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

              // Relier le no de texture et le taux de couleur aux shaders
              objgl.uniform1i(objProgShaders.noTexture, texels[j].intNoTexture);
              objgl.uniform1f(objProgShaders.pcCouleurTexel, texels[j].pcCouleurTexel);

              // Dessiner
              objgl.drawArrays(vertex[j].typeDessin, 0, intNbVertex);
            }
          else if (binVisible) { // Dessiner le maillage

            // Relier les vertex aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex);
            objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);

            // Relier les couleurs aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs);
            objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0);

            // Activer la texture
            objgl.activeTexture(objgl.TEXTURE0 + texels.intNoTexture);
            objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels.intNoTexture]);

            // Relier les texels aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, texels);
            objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

            // Relier le no de texture et le taux de couleur aux shaders
            objgl.uniform1i(objProgShaders.noTexture, texels.intNoTexture);
            objgl.uniform1f(objProgShaders.pcCouleurTexel, texels.pcCouleurTexel);

            // Sélectionner le maillage qu'on va utiliser pour les triangles et les droites
            objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, maillage);

            // Dessiner les triangles
            objgl.drawElements(objgl.TRIANGLES, maillage.intNbTriangles * 3, objgl.UNSIGNED_SHORT, 0);
            // Dessiner les droites à la suite des triangles
            objgl.drawElements(objgl.LINES, maillage.intNbDroites * 2, objgl.UNSIGNED_SHORT, maillage.intNbTriangles * 2 * 3);
          }
        }
      }
    }

    function effacerCanevas(objgl) {
      // Met la couleur d'effacement au noir et complétement opaque
      objgl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Efface les couleurs et le buffer de profondeur.
      objgl.clear(objgl.COLOR_BUFFER_BIT | objgl.DEPTH_BUFFER_BIT);
    }
