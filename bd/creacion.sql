DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS mantencion;

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


insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (0,"Necesito un mantenimiento debido a que mi equipo X tiene un problema con la valvula de expansión.",DateTime("now"));
insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (0,"El problema con la valvula de expansión persiste.",DateTime("now"));

  insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (1,"Necesito un mantenimiento debido a que mi equipo X se le ha quemado el termostato.",DateTime("now"));
insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (1,"Necesito una mantención urgente, el gas refrigerante de mi aire acondicionado se acabo.",DateTime("now"));