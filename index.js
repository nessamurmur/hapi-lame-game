var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

var Character = function(name) {
    return { name: name };
}

var characters = [];

var getCharacter = function(name, characters) {
    return characters.filter(function(character) {
        return character.name == name;
    }).pop();

};

server.route({
    method: 'GET',
    path: '/characters',
    handler: function(request, reply) {
        reply(characters);
    }
});

server.route({
    method: 'GET',
    path: '/characters/{name}',
    handler: function(request, reply) {
        character = getCharacter(request.params.name, characters);
        reply(character);
    }
});

server.route({
    method: 'POST',
    path: '/characters',
    handler: function(request, reply) {
        character = new Character(request.payload.name)
        characters.push(character)
        reply(character).code(201);
    }
});

server.route({
    method: 'DELETE',
    path: '/characters/{name}',
    handler: function(request, reply) {
        character = getCharacter(request.params.name, characters);
        index = characters.indexOf(character);
        characters.splice(index, 1);
        reply(character).code(204);
    }
});

server.start();