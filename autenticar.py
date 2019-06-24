import functools

from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from conectarbd import get_db

bp = Blueprint('autenticar', __name__, url_prefix='/autenticar')

@bp.route('/registrar', methods=('GET', 'POST'))
def registrar():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		db = get_db()
		error = None

		if not username:
			error = 'Nombre de usuario requerido.'
		elif not password:
			error = 'Password requerido.'
		elif db.execute(
			'SELECT id FROM user WHERE username = ?', (username,)
		).fetchone() is not None:
			error = 'El usuario {} ya se encuentra registrado.'.format(username)

		if error is None:
			db.execute(
				'INSERT INTO user (username, password) VALUES (?, ?)',
				(username, generate_password_hash(password))
			)
			db.commit()
			return redirect(url_for('autenticar.login'))

		flash(error)

	return render_template('autenticar/registrar.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		db = get_db()
		error = None
		user = db.execute(
			'SELECT * FROM user WHERE username = ?', (username,)
		).fetchone()

		if user is None:
			error = 'Usuario incorrecto'
		elif not check_password_hash(user['password'], password):
			error = 'Password incorrecto.'

		if error is None:
			session.clear()
			session['user_id'] = user['id']
			return redirect(url_for('mantenciones.listarMantenciones'))

		flash(error)

	return render_template('autenticar/login.html')

@bp.before_app_request
def load_logged_in_user():
	user_id = session.get('user_id')

	if user_id is None:
		g.user = None
	else:
		g.user = get_db().execute(
			'SELECT * FROM user WHERE id = ?', (user_id,)
		).fetchone()

@bp.route('/logout')
def logout():
	session.clear()
	return redirect(url_for('hello'))

def login_required(view):
	@functools.wraps(view)
	def wrapped_view(**kwargs):
		if g.user is None:
			return redirect(url_for('autenticar.login'))

		return view(**kwargs)

	return wrapped_view