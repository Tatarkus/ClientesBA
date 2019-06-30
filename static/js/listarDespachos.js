function poblar_tabla(despachos) {
	
	
    var tableRef = document.getElementById('mi_tabla').getElementsByTagName('tbody')[0];
    tableRef.innerHTML="";
    for (var i = 0 ; i < despachos.length ; i++) {
        var newRow   = tableRef.insertRow(tableRef.rows.length);

        var newCell  = newRow.insertCell(0);
        var newText  = document.createTextNode(despachos[i].id_despacho);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(1);
        var newText  = document.createTextNode(despachos[i].id_producto);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(2);
        var newText  = document.createTextNode(despachos[i].estado_despacho) ;
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(3);
        var newText  = document.createTextNode(despachos[i].fechayhora);
        newCell.appendChild(newText);

    }
}

function buscarDespachos() {
    idUsuario = document.getElementById("idUsuario").value;
    idProducto = document.getElementById("idProducto").value;
    var request = new XMLHttpRequest();
    console.log("Conectandose con la API")
    if(idProducto){
        request.open('GET', 'http://localhost:3001/despachos/user/'+idUsuario+'/product/'+idProducto, true);
    }
    else{
        request.open('GET', 'http://localhost:3001/despachos/'+idUsuario, true);
    }	
	
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
document.getElementById("buscarDespachos").addEventListener("click", buscarDespachos);
//document.getElementById("buscarProductos").onclick = buscarProductos();
