const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]
    }
    
    enum Nationality{
        CANADA,
        BRAZIL,
        GERMANY
        INDIA,
        CHILE
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }
   
    type Query{
        users: [User!]!
        user(id: ID!): User
        movies: [Movie!]!
        movie(name: String!): Movie

    }

    input CreateUser {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUser {
        id: ID!
        name: String
        username: String
        age: Int
        nationality: Nationality = BRAZIL
    }

    type Mutation {
        createUser(input: CreateUser!): User!
        updateUser(input: UpdateUser!): User!
        deleteUser(id: ID!): User
    }
`;

module.exports = { typeDefs };