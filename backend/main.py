from app import create_app
from config import Config

app = create_app(Config)

if __name__ == '__main__':
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['DEBUG'], use_reloader=False)
