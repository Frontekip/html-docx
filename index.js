var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pandoc = require('node-pandoc');
const slugify = require('slugify');

// app
const app = express();

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
    return pandoc(html, _panCommands(name), (err) => {
      if (err) {
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

  return res.json({
    status: 'error',
    data: {
      message: 'name and html fields required!'
    }
  });
});

app.listen(PORT)
