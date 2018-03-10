# -*- coding: utf-8 -*-
import os
import pypandoc
import tornado.ioloop
import tornado.web

STATIC_PATH = os.path.join(os.path.dirname(__file__), 'docs')

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('allow post.')

    def post(self):
        html = self.get_argument('html')
        outputfile = self.get_argument('outputfile')

        ## oluştur.
        pypandoc.convert(html, format='html', to='docx', outputfile=outputfile, encoding='utf8', extra_args=["-M2GB", "+RTS", "-K64m", "-RTS"])

        self.write('generated')

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {
            'path': STATIC_PATH
        }),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
