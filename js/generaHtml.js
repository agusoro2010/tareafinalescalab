  /**Función que permite obtener un personaje dado su id */
 function mostrarDatosPersonajes2(parametroPersonajes = []) {
    //por cada personaje genero un div que lo contendrá
    parametroPersonajes.map(personaje => {
        //salvo el scope en self
        let self = this;
        // crea un nuevo div
        let newDiv = document.createElement("div");
        newDiv.id = "personaje";

        let linkId = document.createElement("button");
        let linkTexto = document.createTextNode(personaje.id);
        linkId.appendChild(linkTexto);
        
        let nombre = document.createElement('p');
        let imagen = document.createElement('img');
        //creo el evento click sobre el id del personaje, y sobre la imagen
        linkId.addEventListener("click", function(){Personaje.muestraPersonajesPorId(personaje.id)}, false);
        linkId.style.cursor="pointer";
        imagen.addEventListener("click", function(){Personaje.muestraPersonajesPorId(personaje.id)}, false);
        imagen.style.cursor="pointer";

        nombre.innerHTML = personaje.name;
        imagen.src = personaje.img_url;
        imagen.width = 90;
        imagen.height = 90;

        newDiv.appendChild(linkId); //añade texto al div creado.
        newDiv.appendChild(nombre); //añade texto al div creado.
        newDiv.appendChild(imagen); //añade texto al div creado.
    
        // añade el elemento creado y su contenido al DOM
        contenedor.appendChild(newDiv)
        
    });
}
/**PERSONAJES POR CATEGORIA SELECCIONADA */
function vistaMuestraPersonajePorID(personaje = {}){
    let [hab1 = "Sin habilidades", ...restoHabilidades] = personaje.abilities;
    document.getElementById("box").innerHTML=`
       <div id="personaje_individual" class="ventanapersonaje">
        <input type="button" id="cierra_mini_ventana" class="boton" onclick="cerrarventana('personaje_individual')" value="(X) Cerrar"></input>
        <br>   
        <div id="imagen_personaje" style="position:left"><img src="${personaje.img_url}"/></div>
            <div id="descriptor_personaje">
                <div># Identificador: ${personaje.id}</div>
                <div>Nombre: ${personaje.name}</div>
                <div>Genero: ${personaje.gender}</div>
                <div>Alias: ${personaje.alias}</div>
                <div>Estado: ${personaje.status}</div>
                <div>Origen: ${personaje.origin}</div>
                <div>Especie: ${personaje.species}</div>
                <div>Habilidades: ${hab1} ${restoHabilidades}</div>
            </div>
       </div>`;
   
}
/**CONSULTA API QUE PERMITE CONSULTAR UN PERSONAJE POR ID */

function limpiarPersonajesMostrados(){
    let divPersonajes = document.getElementById("contenedor");
        while (divPersonajes.firstChild) {
            divPersonajes.removeChild(divPersonajes.firstChild);
        }
}

/**CARGAR LOS SELECT PARA CATEGORIZAR */

function cargarSelects(idElemento = undefined, arreglo = []) {
    for(let propiedad in arreglo){
        document.getElementById(`${idElemento}`).innerHTML += `<option value="${arreglo[propiedad]}">${arreglo[propiedad]}</option>`; 
    }
}


cerrarventana = idVentanaPersonaje => {
    document.getElementById(idVentanaPersonaje).style.display = "none";
}

