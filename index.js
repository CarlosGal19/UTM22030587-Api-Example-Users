const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { auth, requiresAuth } = require('express-openid-connect');
const { getUsers, createUser } = require("./queries/user.queries");

app.use(bodyParser.json());

require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.get("/user", requiresAuth(), (req, res) => {
  getUsers(req, res);
});

app.post("/user", (req, res) => {
  createUser(req, res);
});

app.listen(port, () => {
  console.log(` app running on port ${port}`);
});
