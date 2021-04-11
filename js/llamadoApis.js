let personajes;
let episodios;

function apiPersonajes(){
    let url_personajes= "https://finalspaceapi.com/api/v0/character/";
    return fetch(url_personajes);
}

function apiEpisodios(){
    let url_episodios = "https://finalspaceapi.com/api/v0/episode";
    return fetch(url_episodios);
}


function combierteAJson(respuesta) {
    return respuesta.json();
}

async function todasApis(){
    let [resp_personajes, resp_episodios] = await Promise.all([apiPersonajes(), apiEpisodios()]);
    let [personaje, episodio] = await Promise.all([combierteAJson(resp_personajes), combierteAJson(resp_episodios)]);
    personajes = personaje;
    episodios = episodio;
}

// async function consultaPersonaje(id){
//     const response = await fetch(`https://finalspaceapi.com/api/v0/character/${id}`);
//     const parsedResponse = await response.json();
//     console.log(parsedResponse);
//     muestraPersonajePorID(parsedResponse);
// }

todasApis();