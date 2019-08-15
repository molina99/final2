/* CREAR USUARIO */
CREATE USER admin PASSWORD '12345';
ALTER ROLE admin WITH SUPERUSER;
ALTER ROLE admin WITH LOGIN;

/* CREAR DB POSGRESQL*/

CREATE DATABASE "proyecto-gyba"
    WITH 
    OWNER = admin
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

/* CREAR SESIONES */

CREATE SCHEMA IF NOT EXISTS gyba AUTHORIZATION admin;


/* CREAR TABLAS */

CREATE TABLE ponentes(
	id serial primary Key,
	nombres varchar(20),
	apellidos varchar(100),
	email varchar(100),
	categoria varchar(20),
	tema varchar(100)
	resumen varchar(100)
	institucion varchar(100)
),

CREATE TABLE asistentes(
	id serial primary Key,
	nombres varchar(100),
	apellidos varchar(100),
	email varchar(100)
),

CREATE TABLE congreso(
	id serial primary Key,
	nombre varchar(100),
	direccion varchar(100)
),

CREATE TABLE cronograma(
	id serial primary Key,
	temaPonencia varchar(100),
	fecha date,
	hora time,
	autor varchar(100),
	idCongreso integer,
	FOREIGN KEY (idCongreso) REFERENCES congreso(id)
),

CREATE TABLE inscripcion(
	id serial primary Key,
	idAsistente integer,
	idPonente integer,
	idCongreso integer,
	FOREIGN KEY (idAsistente) REFERENCES asistentes(id),
	FOREIGN KEY (idPonente) REFERENCES ponentes(id),
	FOREIGN KEY (idCongreso) REFERENCES congreso(id)
),

CREATE TABLE ponencias(
	id serial primary Key,
	tema varchar(100),
	idPonente integer,
	idCongreso integer,
	idAsistente integer,
	FOREIGN KEY (idAsistente) REFERENCES asistentes(id),
	FOREIGN KEY (idPonente) REFERENCES ponentes(id),
	FOREIGN KEY (idCongreso) REFERENCES congreso(id)
)

CREATE TABLE users(
	id serial primary key,
	user varchar(100),
	password varchar(100)
)

create table gestion(
	id serial primary key,
	tituloCongreso text,
	direccionCorreo text,
	paginaWeb text,
	informacion text,
	tituloCronograma text,
	telefono text,
	correoUno text,
	correoDos text
)