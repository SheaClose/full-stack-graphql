require("dotenv").config();
let { SESSION_SECRET: secret, CONNECTION_STRING } = process.env,
  { GraphQLServer } = require("graphql-yoga"),
  massive = require("massive"),
  { readFileSync } = require("fs"),
  typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, "utf8"),
  resolvers = require("./schema/resolvers"),
  session = require("express-session"),
  authCtrl = require("./authCtrl"),
  server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({ request }) => request
  }),
  app = server.express;

app.use(session({ secret, saveUninitialized: true, resave: false }));

authCtrl(app);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    server.start(
      { endpoint: "/graphql", playground: "/graphiql", port: 3001 },
      ({ port }) => console.log(`listening on port: ${port}`)
    );
  })
  .catch(err => console.log(`Unable to connect to SQL Data base: ${err}`));
