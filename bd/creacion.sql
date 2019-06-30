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
foreign key (id_usuario) references user(id));

create table despacho (
id_despacho integer PRIMARY KEY AUTOINCREMENT,
id_usuario int not null,
id_producto int not null,
estado_despacho varchar(30) not null,
fechayhora datetime,
foreign key(id_usuario) references user(id));

INSERT INTO user(id,username,password)
	values (0,'admin','pbkdf2:sha256:150000$L3HL6ctg$feec3828eb39c2dd279d15e534c4fe4171c6d2fd3f3315743b3a5bc52545c439'
);

INSERT INTO user(id,username,password)
	values (1,'test','pbkdf2:sha256:150000$E4hp4JNv$af3a1611f71c529d8e666f4cc6033fc7211c8deef7271c9e077c7b795b85d29a'
);

insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (0,"Necesito un mantenimiento debido a que mi equipo X tiene un problema con la valvula de expansión.",DateTime("now"));
insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (0,"El problema con la valvula de expansión persiste.",DateTime("now"));

  insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (1,"Necesito un mantenimiento debido a que mi equipo X se le ha quemado el termostato.",DateTime("now"));
insert into mantencion (id_usuario, descripcion, fechayhora) 
  values (1,"Necesito una mantención urgente, el gas refrigerante de mi aire acondicionado se acabo.",DateTime("now"));

  insert into despacho (id_usuario, id_producto, estado_despacho, fechayhora) 
  values (0, 1, "En oficina",DateTime("now"));
  insert into despacho (id_usuario, id_producto, estado_despacho, fechayhora) 
  values (0, 1, "Viajando",DateTime("now"));
  insert into despacho (id_usuario, id_producto, estado_despacho, fechayhora) 
  values (0, 1, "Recibido",DateTime("now"));

   insert into despacho (id_usuario, id_producto, estado_despacho, fechayhora) 
  values (1, 2, "En oficina",DateTime("now"));
  insert into despacho (id_usuario, id_producto, estado_despacho, fechayhora) 
  values (1, 2, "Viajando",DateTime("now"));
 
 