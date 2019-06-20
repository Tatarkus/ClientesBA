import functools

from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('productos', __name__, url_prefix='/productos')

@bp.route('/productos', methods=('GET', 'POST'))
def obtenerProductos():
	if request.method == 'POST':
		productId = request.form['idProducto']

	return render_template('productos/productos.html')