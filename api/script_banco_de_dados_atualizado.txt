create database reservas_salas;

use reservas_salas;

create table usuario(
    id_usuario int auto_increment primary key,
    email varchar(255) not null unique,
    senha varchar(255) not null,
    nome_usuario varchar(255) not null    
);

create table salas(
    id_salas int auto_increment primary key,
    descricao_sala varchar(255) not null,
    nome_sala varchar(255) not null unique,
    capacidade varchar(255) not null
);

create table agendamentos(
    id_agendamentos int auto_increment primary key,
    fk_id_usuario int not null,
    foreign key (fk_id_usuario) references usuario (id_usuario),
    fk_id_sala int not null,
    foreign key (fk_id_sala) references salas (id_salas),
    descricao_agend varchar(255) not null,
    inicio_periodo DATETIME not null,
    fim_periodo DATETIME not null
);