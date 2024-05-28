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

insert into tbl_cadastro(nome, email,endereco,telefone,cpf,rg)values(
'Julia Fonseca',
'julia@gmail.com',
'rua das rosas',
'1140028922',
'23450398206',
'278493184'
);

create table tbl_animais(
id int auto_increment primary key,
nome varchar(50),
raca varchar(100) not null ,
idade int(5),
setor varchar(20) not null
);

insert into tbl_animais(nome, raca, idade, setor)values(
'Zeus',
'Maltês',
'4',
'pequeno porte'
);

select cast(last_insert_id() as decimal) as id from tbl_animais limit 1;

create table tbl_racas(
id int not null auto_increment primary key,
nome varchar(45),
descricao varchar(250),
expectativa_de_vida varchar(50),
cor varchar(30),
popularidade varchar(50),
problemas_de_saude_comuns varchar (50)
);


insert into tbl_racas(nome, descricao, expectativa_de_vida, cor, popularidade, problemas_de_saude_comuns)values
(
'Yorkshire',
'Yorkshire terrier, também chamada york e yorkie, é uma raça canina de pequeno porte do grupo dos terriers, originária do condado de Yorkshire na Inglaterra.',
'Treze a Dezesseis',
'Diversas',
'Alta',
'Gengivite'
);


create table tbl_formulario_adocao(
nome_usuario varchar(100),
id int not null auto_increment primary key,
raca_de_preferencia varchar(100) not null,
porte varchar(25),
idade_minima int not null,
resgatado_ou_nao varchar(3)
);


show tables;
                                



