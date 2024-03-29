# html-docx
It makes docx html content with pandoc. Set up simple with the docker if you like.

### Using

    git clone https://github.com/yasaricli/html-docx.git
    cd html-docx
    pip install -r requirements.txt
    python main.py
    
`POST` the file **name** and **html** content here: http://localhost:6000

```JS

// POST DATA http://localhost:6000
{
  "name": "file example",
  "html": "<b>hello</b><i>hello</i>"
}

// RESULT

{
  "status": "success",
  "data": {
    "url": "http://localhost:6000/docs/file-example.docx"
  }
}
```



### Using Docker
    
Pull docker image:

    docker pull yasaricli/html-docx

and run:

    docker run -e ROOT_URL=https://domain.com -d -p 6000:6000 yasaricli/html-docx


### Variables

you can use some env variables.

`ROOT_URL`=**http://localhost:6000**

You can change it by using the **-e** parameter.

    -e ROOT_URL=http://domain.com
