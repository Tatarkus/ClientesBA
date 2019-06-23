DROP TABLE IF EXISTS user;

CREATE TABLE user(
  id INTEGER  PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

create table mantencion (
id_mantencion integer PRIMARY KEY AUTOINCREMENT,
id_usuario int not null,
descripcion varchar(30) not null,
fechayhora datetime,
foreign key (id_usuario) references usuario(id));


/*
create table despacho (
id_despacho int AUTO_INCREMENT not null,
id_usuario 
producto text ,
etapa_seguimiento varchar(30) not null,
fechayhora datetime,
primary key(id_despacho, id_producto));
*/

