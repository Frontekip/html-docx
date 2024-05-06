# html-docx
It makes docx html content with pandoc. Set up simple with the docker if you like.

### Using

    git clone https://github.com/yasaricli/html-docx.git
    cd html-docx
    npm install
    node main.js
    
`POST` the file **name** and **html** content here: http://localhost:3000

```JS

// POST DATA http://localhost:3000
{
  "name": "file example",
  "html": "<b>hello</b><i>hello</i>"
}

// RESULT

{
  "status": "success",
  "data": {
    "url": "http://localhost:3000/docs/file-example.docx"
  }
}
```

### Using Docker
    
Pull docker image:

    docker pull yasaricli/html-docx

and run:

    docker run -e ROOT_URL=https://domain.com -d -p 6000:3000 yasaricli/html-docx


### Variables

you can use some env variables.

`ROOT_URL`=**http://localhost:3000**

You can change it by using the **-e** parameter.

    -e ROOT_URL=http://domain.com
