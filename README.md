# html-to-docx-server
Python html to docx for tornado


### Install and Run
    pip install -r requirements.txt
    python main.py ## Started localhost:8888
    
### Nodejs request generate docx

``` JS
const future = new Future();
request.post({
  url: 'http://localhost:8888',
  form: { html: '<b>lorem</b> <i>ipsum</i> lorem <br>ipsum', outputfile: `./docs/filename.docx` }
}, function() {
  future.return({
    url: `http://localhost:8888/static/filename.docx`
  });
});

return future.wait();
```
