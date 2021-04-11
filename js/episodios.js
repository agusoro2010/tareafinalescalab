class Episodio{
    constructor({id, name, airDate, director, writer, characters, imgUrl}){
        this.id=id;
        this.name=name;
        this.airDate=airDate;
        this.director=director;
        this.writer=writer;
        this.characters=Array.isArray(characters) ? characters : [characters];;
        this.imgUrl=imgUrl;
    }

    agregarEpisodio(){
        episodios.push({
            'id':episodios.length+1,
            'airDate': this.airDate,
            'name':this.name,
            'director':this.director,
            'writer':this.writer,
            'characters':this.characters,
            'img_url':this.imgUrl
        });
    }


    agrupaPorEscritor = (escritores, currentItem) => { 
        const {writer} = currentItem; 
        const {[writer]: currentList = []} = escritores; 
        escritores[writer] = [...currentList, currentItem];
        return escritores;
    };
    
    agrupaEpisodioPorEscritor = () => episodios.reduce(
        this.agrupaPorEscritor, {}
    );

    
    

}