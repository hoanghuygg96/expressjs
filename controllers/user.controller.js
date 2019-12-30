const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let result = db
    .get("users")
    .value()
    .filter(el => {
      return el.name.toLowerCase().includes(q.toLowerCase());
    });

  res.render("users/index", {
    users: result
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.get = (req, res) => {
  const id = req.params.id;

  const user = db
    .get("users")
    .find({ id: id })
    .value();

  res.render("users/view", {
    user: user
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path
    .split("\\")
    .slice(1)
    .join("/");

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
