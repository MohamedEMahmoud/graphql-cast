const { readFile, writeFile } = require('fs/promises');
const _ = require('lodash');
const resolvers = {
    Query: {
        users: async () => {
            const UserList = await readFile('userlist.json', 'utf8');
            const users = JSON.parse(UserList);
            return users;
        },
        user: async (_parent, args) => {
            const UserList = await readFile('userlist.json', 'utf8');
            const users = JSON.parse(UserList);
            return users.find(user => ~~user.id === ~~args.id);
        },
        movies: async () => {
            const MovieList = await readFile('movielist.json', 'utf8');
            const movies = JSON.parse(MovieList);
            return movies;
        },
        movie: async (_parent, args) => {
            const MovieList = await readFile('movielist.json', 'utf8');
            const movies = JSON.parse(MovieList);
            return movies.find(movie => movie.name === args.name);
        },
    },

    User: {
        favoriteMovies: async (_parent, _args) => {
            const MovieList = await readFile('movielist.json', 'utf8');
            const movies = JSON.parse(MovieList);
            console.log(movies);
            return movies.filter(movie => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    },
    Mutation: {
        createUser: async (_parent, args) => {
            const UserList = await readFile('userlist.json', 'utf8');

            const users = JSON.parse(UserList);

            const id = ~~users[users.length - 1].id + 1;

            const user = { id, ...args.input };

            users.push(user);

            await writeFile('userlist.json', JSON.stringify(users), 'utf8');

            return user;
        },
        updateUser: async (_parent, args) => {

            const UserList = await readFile('userlist.json', 'utf8');

            const users = JSON.parse(UserList);

            let updateUser;

            users.forEach(user => {
                if (~~user.id === ~~args.input.id) {
                    Object.assign(user, args.input);
                    updateUser = user;
                }
            });

            await writeFile('userlist.json', JSON.stringify(users), 'utf8');

            return updateUser;
        },
        deleteUser: async (_parent, args) => {
            const UserList = await readFile('userlist.json', 'utf8');

            const users = JSON.parse(UserList);

            _.remove(users, (user) => ~~user.id === ~~args.id);

            await writeFile('userlist.json', JSON.stringify(users), 'utf8');

            return null;
        }
    }
};

module.exports = { resolvers };