const express = require("express");
const { checkAndUpdateBalance } = require("../controller/controller");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log("Listen on port " + port);
});

const callRouter = async (req, res) => {
  console.log("req", req);
  console.log("res", res.body);

  const from = res.body.from;
  const to = res.body.to;

  const untrackedWallets = getUntrackedWallets();
  if (!untrackedWallets.includes(from)) {
    checkAndUpdateBalance(from);
  }

  if (!untrackedWallets.includes(to)) {
    checkAndUpdateBalance(to);
  }
  res.json({ success: "thank u!" });
};

app.post("/*", callRouter);
