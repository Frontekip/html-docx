# html-docx
It makes docx html content with pandoc. Set up simple with the docker if you like.

### Using Docker
    
    
Pull docker image:

    docker pull icerikevreni/html-docx


and run:

    docker run -e ROOT_URL=https://domain.com -d -p 5000:5000 icerikevreni/html-docx
    
