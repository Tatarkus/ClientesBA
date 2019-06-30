function poblar_tabla(productos) {
	
	console.log(productos);
    var tableRef = document.getElementById('mi_tabla').getElementsByTagName('tbody')[0];
    tableRef.innerHTML="";
    for (var i = 0 ; i < productos.length ; i++) {
        var newRow   = tableRef.insertRow(tableRef.rows.length);

        var newCell  = newRow.insertCell(0);
        var newText  = document.createTextNode(productos[i].id);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(1);
        var newText  = document.createTextNode(productos[i].descripcion);
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(2);
        var newText  = document.createTextNode(productos[i].stock  == null ? "-----" : productos[i].stock) ;
        newCell.appendChild(newText);

        var newCell  = newRow.insertCell(3);
        var newText  = document.createTextNode(productos[i].precio  == null ? "-----" : productos[i].precio);
        newCell.appendChild(newText);

    }
}

function buscarProductos() {
	idProducto = document.getElementById("idProducto").value;
	console.log("Conectandose con la API")
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:3000/productos/'+idProducto, true);
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
document.getElementById("buscarProductos").addEventListener("click", buscarProductos);
//document.getElementById("buscarProductos").onclick = buscarProductos();
