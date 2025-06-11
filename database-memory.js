import { randomUUID } from 'node:crypto';
export class DatabaseMemory {
    #videos = new Map();
    // Set é como um Array, mas não aceita objetos duplicados
    //Map é como no Java
    create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID();
       
        this.#videos.set(videoId, video);
    }

    list(search){
       return Array.from(this.#videos.entries())
       .map((videoArray) =>{
        const id = videoArray[0];
        const data = videoArray[1];

        return {
            id,
            ...data,
        }
       })
       .filter(video => {
        if(search){
            return video.title.includes(search);
        }

        return true;
       });
    }

    update(id,video){
        this.#videos.set (id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }
}