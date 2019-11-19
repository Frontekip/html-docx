# html-docx
It makes docx html content with pandoc. Set up simple with the docker if you like.

### Using

    git clone https://github.com/yasaricli/html-docx.git
    cd html-docx
    npm install
    npm start
    
`POST` the file **name** and **html** content here: http://localhost:5000

```JS

// POST DATA http://localhost:5000
{
  "name": "file example",
  "html": "<b>hello</b><i>hello</i>"
}

// RESULT

{
  "status": "success",
  "data": {
    "url": "http://localhost:5000/docs/file-example.docx"
  }
}
```



### Using Docker
    
Pull docker image:

    docker pull icerikevreni/html-docx

and run:

    docker run -e ROOT_URL=https://domain.com -d -p 5000:5000 icerikevreni/html-docx


### Variables

you can use some env variables.

`PORT`=**5000**

`ROOT_URL`=**http://localhost:5000**
