import json

from flask import (
	Blueprint, render_template, request
)

bp = Blueprint('pagar', __name__, url_prefix='/pagar')

@bp.route('/pagar', methods=('GET', 'POST'))
def realizarPago():
	if request.method == 'POST':
		print("Intentando mandar datos al webservice")	
		json = request.form['json']
		url = 'http://localhost:3002/pagar'
		headers = {'Content-type': 'application/json; charset=UTF-8'}		
		response = requests.post(url, data=json, headers=headers)
		if response.status_code == 200 :
			print("TODO OK!")
			print("TODO OK!")
	return render_template('pagar/pagar.html')