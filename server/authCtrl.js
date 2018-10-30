let {
  DOMAIN: domain,
  CLIENT_ID: clientID,
  CLIENT_SECRET: clientSecret,
  REACT_APP_CLIENT: client
} = process.env;
const passport = require("passport");
const AuthStratgy = require("passport-auth0");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new AuthStratgy(
      {
        domain,
        clientID,
        clientSecret,
        callbackURL: "/login", // original
        scope: "openid email profile"
      },
      (_, __, ___, profile, done) => done(null, profile)
    )
  );
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
  app.get(
    "/login",
    passport.authenticate("auth0", {
      successRedirect: "/success",
      failureRedirect: "/login"
    })
  );
  app.get("/success", (req, res) => {
    res.redirect(client + "/");
  });
  app.get("/api/user", (req, res) => {
    res.status(200).json(req.user);
  });
};
