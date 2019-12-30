require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get("/", (req, res) =>
  res.render("index", {
    name: "hoang huy"
  })
);

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(port, () => console.log(`Port ${port}!`));
