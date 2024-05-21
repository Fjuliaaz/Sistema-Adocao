create database petshop;

use petshop;

create table tbl_cadastro(
id int not null auto_increment primary key,
nome varchar(100) not null,
email varchar(100),
endereco varchar(100) not null,
telefone bigint not null,
cpf bigint not null,
rg bigint not null
);

create table tbl_animais(
id int auto_increment primary key,
nome varchar(50),
raca varchar(100) not null ,
idade int(5),
setor varchar(20) not null
);

create table tbl_racas(
descricao varchar(45),
expectativa_de_vida int,
cor varchar(30),
popularidade int,
problemas_de_saude_comuns varchar (50)
);

create table tbl_formulario_adocao(
id int not null auto_increment primary key,
raca_de_preferencia varchar(100) not null,
porte varchar(25),
idade_minima int not null,
resgatado_ou_nao varchar(3)
);

show tables;
                                



