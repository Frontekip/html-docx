const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pandoc = require('node-pandoc');
const slugify = require('slugify');
const cors = require('cors');

// app
const app = express();

// Cors add
app.use(cors());

// middle
app.use(bodyParser.json());

// static docs
app.use('/docs', express.static(path.join(__dirname, 'docs')))

// envs default port 3000
const { PORT = 5000, ROOT_URL = 'http://127.0.0.1:5000' } = process.env;

const _getName = (name) => {
  return `${slugify(name)}.docx`;
}

const _absoluteUrl = (url) => {
  return `${ROOT_URL}/${url}`;
}

const _panCommands = (name) => {
  return `-f html -t docx -o ./docs/${_getName(name)}`;
}

app.get('/', (req, res) => {
  return res.send('welcome html-docx')
});

app.post('/', (req, res) => {
  const { name, html } = req.body;
  
  if (name && html) {
    pandoc(html, _panCommands(name), (err) => {
      if (err) {
        console.log(err);
        return res.json({
          status: 'error',
          data: {
            message: 'Could not create file!'
          }
        })
      }
  
      res.json({
        status: 'success',
        data: {
          url: _absoluteUrl(`docs/${_getName(name)}`)
        }
      })
    });
  }
});

app.listen(PORT)
