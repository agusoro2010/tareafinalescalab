/**CLASE PRINCIPAL */
class Persona{

    constructor(id, nombre, genero){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;

    }

    set nombrePersona(value){
        this.nombre = value;
    }

    set generoPersona(value){
        this.genero = value;
    }

    get idPersona(){
        return this.id;
    }

    get nombrePersona(){
        return this.nombre;
    }

    get generoPersona(){
        return this.genero;
    }

}

/**CLASE HIJA */

class Personaje extends Persona{

    constructor(id, nombre, genero, estado, especie, cabello, alias, origen, habilidades, imagen){
        super(id, nombre, genero);
        this.estado = estado;
        this.especie = especie;
        this.cabello = cabello;
        this.alias = Array.isArray(alias) ? alias : [alias];
        this.origen = origen;
        this.habilidades = Array.isArray(habilidades) ? habilidades : [habilidades];
        this.imagen = imagen;
    }

    agregaNuevoPersonaje(){
        personajes.push({
            id:personajes.length+1,
            name:this.nombre,
            status:this.estado,
            species:this.especie,
            gender:this.genero,
            hair:this.cabello,
            alias:this.alias,
            origin:this.origen,
            abilities:this.habilidades,
            img_url:this.imagen
        });
    }

    /**Función que devuelve un array con los valores de species que contiene el arreglo */

    especiePersonajes(){
        let especiePersonaje = personajes.map( personaje => personaje.species);
        const especiesUnicas = especiePersonaje.reduce( (esp, elem) => {
            if(!esp.includes(elem)){
                esp.push(elem);
            }
            return esp;
        },[]);
        return especiesUnicas;
    }

     /**Función que devuelve un array con los valores de gender que contiene el arreglo */
    generoPersonajes(){
        let generoPersonaje = personajes.map( personaje => personaje.gender);
        const generosUnicos = generoPersonaje.reduce( (gen, elem) => {
            if(!gen.includes(elem)){
                gen.push(elem);
            }
            return gen;
        },[]);
        return generosUnicos;
    }

     /**Función que devuelve un array con los valores de origin que contiene el arreglo */
    
    origenPersonajes(){
        let origenPersonaje = personajes.map( personaje => personaje.origin);
        const origenesUnicos = origenPersonaje.reduce( (ori, elem) => {
            if(!ori.includes(elem)){
                ori.push(elem);
            }
            return ori;
        },[]);
        return origenesUnicos;
    }

     /**Función que devuelve un array con los valores de abilities que contiene el arreglo */
    
    habilidadPersonajes(){
        let habilidadPersonaje1 = personajes.map( personaje => personaje.abilities);
        //las habilidades son un array, por eso aplico dos veces un reduce.
        //este primero es para no tener un array con elementos array en el resultado que me dejó map [["",""],["","",""]] 
        //y dejarlo de la forma ["","","",""] 
        const habilidadUnica0 = habilidadPersonaje1.reduce( (hab, elem) => {
            hab.push(...elem);
            return hab;
        },[]);
        
        const habilidadUnica = habilidadUnica0.reduce( (h, e) => {
            if(!h.includes(e)){
                h.push(e);
            }
            return h;
        },[]);
        
        return habilidadUnica;
    }

    /**Función que solicita generar los selects que permitiran aplicar un filtro */
    cargaSelectores(){
        cargarSelects("especie", this.especiePersonajes());
        cargarSelects("genero", this.generoPersonajes());
        cargarSelects("origen", this.origenPersonajes());
        cargarSelects("habilidad", this.habilidadPersonajes());
    }
    
    /**Función que permite obtener un personaje dado su id */
    static muestraPersonajesPorId(id = undefined) {
        let result = personajes.find(personaje => personaje.id===id);
        if (result) {
            return vistaMuestraPersonajePorID(result);
        }else{
            return window.alert(`No se encontró el personaje con el id: (${id})`);
        }
    }

    static muestraPersonajesPorId2() {
        let idABuscar = document.getElementById('id_buscar').value;
        let result = personajes.find(personaje => personaje.id == idABuscar);
        if (result){
            return vistaMuestraPersonajePorID(result);
        }else{
            return window.alert(`No se encontró el personaje con el id: ${idABuscar}`);
        }
    }

    /**Función que permite obtener un personaje dado el nombre ingresado*/
    static muestraPersonajesPorNombre(){
        let nombre = document.getElementById('nombre_buscar').value;
        let nombresPersonajes = personajes.filter( pers => pers.name.includes(nombre));
        limpiarPersonajesMostrados();
        return mostrarDatosPersonajes2(nombresPersonajes);
    }


}


/**FUNCIONES PARA EL FILTRADO CON LOS SELECT */
const objetoFiltro = {
    especie : undefined,
    genero : undefined,
    origen : undefined,
    habilidad : undefined,
}


function aplicarFiltro(elemento) {

     let valor = elemento.options[elemento.selectedIndex].text;

    switch (elemento.name) {
        case "especie":
             objetoFiltro.especie = valor !== "Seleccione..." ?  valor : undefined; 
             limpiarPersonajesMostrados();
             filtradoDePersonajes();
        break;

        case "genero":
            objetoFiltro.genero = valor !== "Seleccione..." ?  valor : undefined;
            limpiarPersonajesMostrados();
            filtradoDePersonajes();  
        break;

        case "origen":
            objetoFiltro.origen = valor !== "Seleccione..." ?  valor : undefined; 
            limpiarPersonajesMostrados();
            filtradoDePersonajes();
        break;

        case "habilidad":
            objetoFiltro.habilidad = valor !== "Seleccione..." ?  valor : undefined;
            limpiarPersonajesMostrados();
            filtradoDePersonajes();
        break;

        default:
            limpiarPersonajesMostrados();
            filtradoDePersonajes();
        break;
    }

}

const nuevoPersonaje = new Personaje();

setTimeout("cargarSelects('especie', nuevoPersonaje.cargaSelectores())",500);
setTimeout("mostrarDatosPersonajes2(personajes)",500);

function filtradoDePersonajes(){

    let filtradoPersonaje = JSON.parse(JSON.stringify(personajes));
    let filtradoPersonajes={};
    if(objetoFiltro.especie !== undefined){
        filtradoPersonajes = filtradoPersonaje.filter( (personaje) => {
            if(personaje.species === objetoFiltro.especie){
                return personaje;
            }
        });

        filtradoPersonaje = JSON.parse(JSON.stringify(filtradoPersonajes));
    }
    if(objetoFiltro.genero !== undefined){
        filtradoPersonajes = filtradoPersonaje.filter( (personaje) => {
            if(personaje.gender === objetoFiltro.genero){
                return personaje;
            }
        });

        filtradoPersonaje = JSON.parse(JSON.stringify(filtradoPersonajes));
    }
    if(objetoFiltro.origen !== undefined){
        filtradoPersonajes = filtradoPersonaje.filter( (personaje) => {
            if(personaje.origin === objetoFiltro.origen){
                return personaje;
            }
        });

        filtradoPersonaje = JSON.parse(JSON.stringify(filtradoPersonajes));
    }
    if(objetoFiltro.habilidad !== undefined){
        filtradoPersonajes = filtradoPersonaje.filter( (personaje) => {
            //acá requiero hacer este for debido a que en la API hay espacios en blanco, o habilidades
            //son iguales, solo que varían por temporada, entonces, en cuando coincida en parte con la 
            //seleccionada en el select, la considerará.
            for(var i = 0; i < personaje.abilities.length; i++) {
                if (personaje.abilities[i].includes(objetoFiltro.habilidad)) {
                    return personaje;
                }
            }
        });

        filtradoPersonaje = JSON.parse(JSON.stringify(filtradoPersonajes));
    }
    
    if(objetoFiltro.especie === objetoFiltro.genero && objetoFiltro.origen === objetoFiltro.habilidad){

            filtradoPersonajes = JSON.parse(JSON.stringify(personajes));
    }

        return mostrarDatosPersonajes2(filtradoPersonajes);

}



// funciones creadas, pero no implementadas en la vista-->
/**DEVUELVE LOS PERSONAJES POR ESPECIE */
const agrupaPorEspecie = (especies, currentItem) => { 
    const {species} = currentItem; 
    const {[species]: currentList = []} = especies; 
    especies[species] = [...currentList, currentItem];
    return especies;
};

const agrupaPersonajesPorEspecie = () => personajes.reduce(
    agrupaPorEspecie, {}
);

/**DEVUELVE LOS PERSONAJES POR GENERO */

const agrupaPorGenero = (generos, currentItem)=>{ 
    const {gender} = currentItem; 
    const {[gender]: currentList = []} = generos; 
    generos[gender] = [...currentList, currentItem];
    return generos;
};

const agrupaPersonajesPorGenero = () => personajes.reduce(
    agrupaPorGenero, {}
);

/**DEVUELVE LOS PERSONAJES POR ORIGEN */

const agrupaPorOrigen = (origenes, currentItem)=>{ 
    const {origin} = currentItem; 
    const {[origin]: currentList = []} = origenes; 
    origenes[origin] = [...currentList, currentItem];
    return origenes;
};

const agrupaPersonajesPorOrigen = () => personajes.reduce(
    agrupaPorOrigen, {}
);