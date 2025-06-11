// import {createServer} from 'node:http';

// const fastify = require("fastify");

// const server = createServer((request,response) =>{
//    response.write("Oiii Mundo!!! Seja muito bem vindo :D")
//    return response.end()
// })

// server.listen(3333)
import { fastify } from 'fastify'
import {DatabaseMemory} from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory();

server.post('/videos',(request,reply) =>{
   const {title,description,duration} = request.body;

   database.create({
      title,
      description,
      duration,
   })

  return reply.status(201).send();
  //.status uma forma de informar para o front o estado da operação, se deu sucesso ou não, incluindo o tipo de cada uma deles
  //201 - algo foi criado
})

server.get('/videos',(request,reply) =>{
   const search = request.query.search;

   console.log(search)

   const videos = database.list(search);

   return videos;
})


server.put('/videos/:id',(request,reply) =>{
   const videoId = request.params.id;
   const {title,description,duration} = request.body;

   database.update(videoId,{
      title,
      description,
      duration,
   })

   return reply.status(204).send();
   //204- quer dizer que teve sucesso, mas que não tem conteudo na resposta
})

server.delete('/videos/:id',(request,reply)=>{
   const videoId = request.params.id;
   
   database.delete(videoId);

   return reply.status(204).send();
})

server.listen({
   port: 3333,
})