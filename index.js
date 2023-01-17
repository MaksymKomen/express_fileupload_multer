const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post(
  "/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "card", maxCount: 1 },
    { name: "music", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  (req, res, next) => {
    const file = req.file;
    console.log(file);
    res.send("File uploaded successfully");
  }
);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
