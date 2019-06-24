import functools

from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from conectarbd import get_db
from datetime import datetime
bp = Blueprint('mantenciones', __name__, url_prefix='/mantenciones')

@bp.route('/mantenciones', methods=('GET', 'POST'))
def obtenerMantenciones():	
	if request.method =='POST':
		result=request.form
		now = datetime.now()
		dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
		user_id = request.form['id']
		desc = request.form['descripcion']
		print(user_id)
		db = get_db()
		db.execute(
			'insert into mantencion (id_usuario, descripcion, fechayhora) values (?,?,DateTime("now"))',
			(user_id, desc)
		)
		db.commit()
		return render_template('mantenciones/respuestaForm.html', result = result)
		

	

	return render_template('mantenciones/mantenciones.html')

@bp.route('/verMantenciones', methods=('GET', 'POST'))
def listarMantenciones():		

	return render_template('mantenciones/verMantenciones.html')