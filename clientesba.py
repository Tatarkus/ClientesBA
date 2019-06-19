from flask import Flask, render_template
import conectarbd, os

#CONFIGURACION
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
	SECRET_KEY='dev',
	DATABASE=os.path.join(app.instance_path, 'clientesba.sqlite'),
	)
try:
	os.makedirs(app.instance_path)
except OSError:
	pass

#REGISTRAR LA FUNCION DE LA BD CON LA APLICACION
conectarbd.init_app(app)

#REGISTRAR LOS "BLUEPRINTS" CON LA APLICACION
import autenticar
app.register_blueprint(autenticar.bp)

 #VIEWS
@app.route('/')
def hello():
	return render_template('autenticar/registrar.html')