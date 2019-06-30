function poblar_tabla(mantenciones) {
	
	
    var tableRef = document.getElementById('mi_tabla').getElementsByTagName('tbody')[0];
    tableRef.innerHTML="";
    for (var i = 0 ; i < mantenciones.length ; i++) {
        var newRow   = tableRef.insertRow(tableRef.rows.length);

        var newCell  = newRow.insertCell(0);
        var newText  = document.createTextNode(mantenciones[i].id_mantencion);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(1);
        var newText  = document.createTextNode(mantenciones[i].id_usuario);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(2);
        var newText  = document.createTextNode(mantenciones[i].descripcion) ;
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(3);
        var newText  = document.createTextNode(mantenciones[i].fechayhora);
        newCell.appendChild(newText);

    }
}

function buscarMantenciones() {
	idProducto = document.getElementById("idMantencion").value;
	console.log("Conectandose con la API")
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:3001/mantenciones/'+idProducto, true);
	request.responseType = 'json';
	request.onreadystatechange = function(){
		console.log(request.status);
		if(this.readyState == 4 && request.status == 200)
		{
            console.log("todo ok");
            poblar_tabla(request.response)
		}
	}
	
	
	request.send(null);
	

}
document.getElementById("buscarMantenciones").addEventListener("click", buscarMantenciones);
//document.getElementById("buscarProductos").onclick = buscarProductos();
