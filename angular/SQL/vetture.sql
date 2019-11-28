--------------------------------------------------------
--  File creato - martedì-febbraio-19-2019   
--------------------------------------------------------
--------------------------------------------------------
--  DCL for user VETTUREDB
--------------------------------------------------------
create user vetturedb identified by vetturedb;
alter user vetturedb default tablespace users;
grant all privileges to vetturedb;

--------------------------------------------------------
--  DDL for Sequence MARCA_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "VETTUREDB"."MARCA_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 15 NOCACHE  NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence MODELLO_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "VETTUREDB"."MODELLO_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 24 NOCACHE  NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Table MARCA
--------------------------------------------------------

  CREATE TABLE "VETTUREDB"."MARCA" 
   (	"ID_MARCA" NUMBER(*,0), 
	"NOME" VARCHAR2(100 BYTE), 
	"FONDAZIONE" NUMBER(4,0), 
	"WEBSITE" VARCHAR2(300 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table MODELLO
--------------------------------------------------------

  CREATE TABLE "VETTUREDB"."MODELLO" 
   (	"ID_MODELLO" NUMBER(*,0), 
	"NOME" VARCHAR2(100 BYTE), 
	"CILINDRATA" NUMBER(5,0), 
	"POTENZA" NUMBER(4,0), 
	"ID_MARCA" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into VETTUREDB.MARCA
SET DEFINE OFF;
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('1','Ferrari','1947','http://www.ferrari.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('2','Lamborghini','1963','http://www.lamborghini.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('3','Maserati','1914','http://www.maserati.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('4','Alfa Romeo','1910','http://www.alfaromeo.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('7','Aston Martin','1913','http://www.astonmartin.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('5','BMW','1917','http://www.bmwgroup.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('6','Porsche','1931','http://www.porsche.de/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('8','Mercedes-Benz','1926','http://www.mercedes-benz.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('9','Bugatti','1909','http://bugatti.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('10','FIAT','1899','http://www.fiat.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('11','Abarth','1949','http://www.abarth.it/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('12','Opel','1862','http://www.opel.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('13','Audi','1909','http://www.audi.com/');
Insert into VETTUREDB.MARCA (ID_MARCA,NOME,FONDAZIONE,WEBSITE) values ('14','Alfred','1234','http://www.google.com');
REM INSERTING into VETTUREDB.MODELLO
SET DEFINE OFF;
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('1','350 GT','3500','280','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('2','400 GT','4000','320','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('5','Islero','4000','350','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('3','Miura','4000','350','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('4','Espada','4000','350','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('6','Jarama','4000','365','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('7','Urraco','3000','260','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('8','Countach','5100','455','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('9','Silhouette','3000','260','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('10','Jalpa','3500','247','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('11','LM002','5100','450','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('12','Diablo','6000','595','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('13','Murciélago','6500','670','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('14','Gallardo','5200','570','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('15','Aventador','6500','770','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('16','Huracán','5200','640','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('17','Urus','4000','650','2');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('18','166 Inter','2000','90','1');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('19','195 Inter','2400','90','1');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('20','195 Inter','2500','170','1');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('21','342 America','4100','200','1');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('22','250 Europa','3000','220','1');
Insert into VETTUREDB.MODELLO (ID_MODELLO,NOME,CILINDRATA,POTENZA,ID_MARCA) values ('23','375 America','4500','300','1');
--------------------------------------------------------
--  DDL for Index MARCA_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "VETTUREDB"."MARCA_PK" ON "VETTUREDB"."MARCA" ("ID_MARCA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index MODELLO_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "VETTUREDB"."MODELLO_PK" ON "VETTUREDB"."MODELLO" ("ID_MODELLO") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table MARCA
--------------------------------------------------------

  ALTER TABLE "VETTUREDB"."MARCA" ADD CONSTRAINT "MARCA_PK" PRIMARY KEY ("ID_MARCA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table MODELLO
--------------------------------------------------------

  ALTER TABLE "VETTUREDB"."MODELLO" ADD CONSTRAINT "MODELLO_PK" PRIMARY KEY ("ID_MODELLO")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table MODELLO
--------------------------------------------------------

  ALTER TABLE "VETTUREDB"."MODELLO" ADD CONSTRAINT "ID_MARCA_FK" FOREIGN KEY ("ID_MARCA")
	  REFERENCES "VETTUREDB"."MARCA" ("ID_MARCA") ENABLE;

--------------------------------------------------------
--  COMMIT changes
--------------------------------------------------------
  COMMIT;
