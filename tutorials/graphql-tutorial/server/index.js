import express from 'express';
import path from 'path';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import { schema } from './schema';

const PORT = process.env.PORT || 4000;

const server = express();

server.use('/static', express.static(path.resolve('build/static')));

server.get('/', function (req, res) {
  res.sendFile(path.resolve('build/index.html'));
});

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));