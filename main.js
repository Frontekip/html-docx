const fs = require("fs");
const HTMLtoDOCX = require("html-to-docx");
const express = require("express");
const cors = require("cors");

const { ROOT_URL } = process.env;

const app = express();

app.use(cors());
app.options("*", cors());

// Body parser middleware for handling POST requests
app.use(express.json({ limit: "999mb" }));
app.use("/static", express.static("public"));

app.get("/", async (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "Please html",
    },
  });
});

app.post("/", async (req, res) => {
  const { html, name } = req.body;

  const body = `
    <html>
        <head>
            <meta charset="UTF-8" />
        </head>

        <body>${html}</body>
    </html>
  `;

  const buff = await HTMLtoDOCX(body);

  fs.writeFile(`./public/${name}.docx`, buff, (err) => {
    if (err) {
      res.status(500).send({
        status: "error",
        data: {
          message: "Bir hata oluştu!",
        },
      });
    } else {
      res.status(200).send({
        status: "success",
        data: {
          url: `${ROOT_URL}/static/${name}.docx`,
        },
      });
    }
  });
});

// Serveri dinle
app.listen(3000, () => {
  console.log(`Running :3000 port`);
});
