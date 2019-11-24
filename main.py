# -*- coding: utf-8 -*-
import os
import json
import pypandoc
import tornado.ioloop
import tornado.web

STATIC_PATH = os.path.join(os.path.dirname(__file__), 'docs')

class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("access-control-allow-origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type") 

    def options(self):
        # no body
        self.set_status(200)
        self.finish()

    def get(self):
        self.write(json.dumps({
            "status": 'success',
            "data": {
                "message": "Please Post request (html, name)"
            }
        }))

    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        html = data.get('html')
        name = data.get('name')
        file = "./docs/%s.docx" %name

        ## oluştur.
        pypandoc.convert(html, format='html', to='docx', outputfile=file, encoding='utf8', extra_args=["-M2GB", "+RTS", "-K64m", "-RTS"])

        self.write(json.dumps({
            "status": "success",
            "data": {
                "url": "%s/static/%s.docx" %(os.environ['ROOT_URL'],  name)
            }
        }))

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {
            'path': STATIC_PATH
        }),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(5000)
    tornado.ioloop.IOLoop.current().start()
