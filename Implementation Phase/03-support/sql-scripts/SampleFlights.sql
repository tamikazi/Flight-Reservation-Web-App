DROP DATABASE IF EXISTS flightsENSF614;
CREATE DATABASE flightsENSF614;
USE flightsENSF614;

CREATE TABLE FLIGHT (
  FlightID			INT				NOT NULL 	AUTO_INCREMENT,
  Code      		VARCHAR(10)		NOT NULL,
  Origin     		VARCHAR(20)		NOT NULL,
  Destination		VARCHAR(20)		NOT NULL,
  Date       		VARCHAR(10)		NOT NULL,
  Aircraft   		VARCHAR(10)		NOT NULL,
PRIMARY KEY   (FlightID));

INSERT INTO FLIGHT
VALUES	('1','AB100','Calgary','Vancouver','2023-11-20','B787'),
		('2','AB101','Calgary','Edmonton','2023-11-20','B737'),
		('3','AB102','Kamloops','Calgary','2023-11-20','B787'),
		('4','AB103','Vancouver','Whitehorse','2023-11-20','A220'),
		('5','AB100','Calgary','Vancouver','2023-11-21','B787'),
		('6','AB101','Calgary','Edmonton','2023-11-21','B737');