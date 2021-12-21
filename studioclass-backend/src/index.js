import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { graphqlUploadExpress } from 'graphql-upload';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import express from 'express';
import http from 'http';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import config from './utils/config';
import User from './models/user';
import { join } from 'path';

require('./models/post');
require('./models/comment');
require('./models/tag');
require('./models/user');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log('error connecting to MongoDB', err.message);
  })

const startApolloServer = async () => {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use(express.static('build'));

  app.get('/post/audio/:filename', (req, res) => {
    const filename = req.params.filename;

    http.get(`http://${config.GCLOUD_LB_IP}/${filename}`, r => {
      res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes 0-${parseInt(r.headers['content-length']) - 1}/${r.headers['content-length']}`,
        'Content-Length': r.headers['content-length'],
        'Content-Type': r.headers['content-type'],
        'Connection': 'keep-alive'
      })
      r.pipe(res);
    })
  });

  app.get('/*', (_req, res) => {
    res.sendFile('index.html', { root: join(__dirname, '../build/')});
  }); 
  
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          }
        }
      },
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
    context: async ({ req }) => {
      const auth = req
        ? req.headers.authorization
        : null
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const token = verify(auth.substring(7), process.env.SECRET);
        const currentUser = await User.findById(token.id);
        return { currentUser };
      }
    }
  });
  await apolloServer.start();
  
  apolloServer.applyMiddleware({
    app,
    path: '/graphql/'
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: `${apolloServer.graphqlPath}subscriptions` }
  )

  await new Promise(resolve => httpServer.listen({
    port: process.env.PORT
  }, resolve));
  console.log(`server ready at ${process.env.PORT}${apolloServer.graphqlPath}`);
}

startApolloServer();