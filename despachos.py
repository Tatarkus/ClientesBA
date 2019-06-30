import functools

from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from conectarbd import get_db
from datetime import datetime
bp = Blueprint('despachos', __name__, url_prefix='/despachos')



@bp.route('/verDespachos', methods=('GET', 'POST'))
def listarDespachos():		

	return render_template('despachos/verDespachos.html')