import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../models/user';
import { gql, UserInputError } from 'apollo-server-express';

export const typeDefs = gql`
  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`

export const resolvers = {
  Mutation: {
    createUser: async (_root, { username, password }) => {
      const userWithUsername = await User.findOne({ username: username });

      if (userWithUsername) {
        throw new UserInputError('Already user with that username');
      }

      const saltRounds = 10;
      const passwordHash = await hash(password, saltRounds);

      const newUser = new User({
        username,
        passwordHash,
        dateJoined: new Date()
      });

      const savedUser = await newUser.save();
      delete savedUser.passwordHash;
      return savedUser;
    },
    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username: username });
      const passwordCorrect = user
        ? await compare(password, user.passwordHash)
        : false;
      
      if (!passwordCorrect) {
        throw new UserInputError('Incorrect username or password');
      }
      const userForToken = { username: username, id: user._id }
      return { value: sign(userForToken, process.env.SECRET) }
    }
  }
}

export default { typeDefs, resolvers }