const router = require("express").Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    return res
      .status(400)
      .json({ success: false, user: user, error: "User does not exists!" });
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
      if (res.status(200)) {
        return res.status(200).json({ success: true, user, token });
      } else {
        return res.status(400).json({ success: false, err });
      }
    }
    return res
      .status(400)
      .json({ success: false, user: user, error: "Invalid credentials!" });
  }
});

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err === null)
      User.find().exec((err, users) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, users });
      });
    else
      return res
        .status(400)
        .json({ success: false, error: err.name + " " + err.message });
  });
});

router.get("/user/:id", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err === null)
      User.findById(req.params.id).exec((err, user) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, user });
      });
    else
      return res
        .status(400)
        .json({ success: false, error: err.name + " " + err.message });
  });
});

router.post("/add", async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email });
  if (req.body.token !== "undefined") {
    if (oldUser !== null) {
      return res
        .status(400)
        .json({ success: false, user: oldUser, error: "User exists!" });
    } else {
      req.body["password"] = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      user.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, user });
      });
    }
  } else {
    jwt.verify(req.body.token, JWT_SECRET, async (err) => {
      if (err === null) {
        if (oldUser !== null) {
          return res
            .status(400)
            .json({ success: false, user: oldUser, error: "User exists!" });
        } else {
          req.body["password"] = await bcrypt.hash(req.body.password, 10);
          const user = new User(req.body);
          user.save((err) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, user });
          });
        }
      } else
        return res
          .status(400)
          .json({ success: false, error: err.name + " " + err.message });
    });
  }
});

router.put("/update/:id", (req, res) => {
  jwt.verify(req.body.token, JWT_SECRET, async (err) => {
    if (err === null) {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        (err, user) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, user });
        }
      );
    } else
      return res
        .status(400)
        .json({ success: false, error: err.name + " " + err.message });
  });
});

router.delete("/delete/:id", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err === null)
      User.deleteOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, user });
      });
    else
      return res
        .status(400)
        .json({ success: false, error: err.name + " " + err.message });
  });
});

module.exports = router;
