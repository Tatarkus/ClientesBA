import functools

from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from conectarbd import get_db
bp = Blueprint('mantenciones', __name__, url_prefix='/mantenciones')

@bp.route('/mantenciones', methods=('GET', 'POST'))
def obtenerMantenciones():	
	if request.method =='POST':
		result=request.form
		user_id = request.form['id']
		desc = request.form['descripcion']
		print(user_id)
		db = get_db()
		db.execute(
			'insert into mantencion (id_usuario, descripcion, fechayhora) values (?,?,null)',
			(user_id, desc)
		)
		db.commit()
		return render_template('mantenciones/respuestaForm.html', result = result)
		

	

	return render_template('mantenciones/mantenciones.html')