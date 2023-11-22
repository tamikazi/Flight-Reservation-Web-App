DROP DATABASE IF EXISTS flights;
CREATE DATABASE flights;
USE flights;

CREATE TABLE AIRCRAFT (
  aircraftID			INT				NOT NULL 	AUTO_INCREMENT,
  model      			VARCHAR(4)		NOT NULL,
  numCols     		  	INT				NOT NULL,
  numRows				INT				NOT NULL,
PRIMARY KEY   (aircraftID),
INDEX (model));

INSERT INTO AIRCRAFT (model, numCols, numRows)
VALUES
('A456', 6, 13),
('B787', 9, 16),
('C123', 4, 11),
('D890', 6, 19),
('E234', 6, 10);

CREATE TABLE FLIGHT (
  flightID			INT				NOT NULL 	AUTO_INCREMENT,
  code      		VARCHAR(10)		NOT NULL,
  origin     		VARCHAR(20)		NOT NULL,
  destination		VARCHAR(20)		NOT NULL,
  departDate      	DATE			NOT NULL,
  departTime		TIME			NOT NULL,
  aircraft   		VARCHAR(4)		NOT NULL,
PRIMARY KEY   (flightID),
FOREIGN KEY (aircraft) REFERENCES AIRCRAFT(model));

INSERT INTO FLIGHT (code, origin, destination, departDate, departTime, aircraft) 
VALUES 
('A4100', 'Tokyo', 'New York', '2023-11-20', '18:35:39', 'A456'), 
('B7101', 'Los Angeles', 'London', '2023-11-21', '19:45:40', 'B787'), 
('C1102', 'Tokyo', 'Paris', '2023-11-22', '11:20:16', 'C123'), 
('D8103', 'Chicago', 'Vancouver', '2023-11-23', '09:37:07', 'D890'), 
('E2104', 'Montreal', 'Toronto', '2023-11-24', '17:32:14', 'E234');

CREATE TABLE USER (
  user_ID      INT            NOT NULL AUTO_INCREMENT,
  username     VARCHAR(50)    NOT NULL,
  password     VARCHAR(50)    NOT NULL,
  role         VARCHAR(20)    NOT NULL,
  PRIMARY KEY (user_ID)
);

CREATE TABLE SEAT (
  seatID       INT            NOT NULL AUTO_INCREMENT,
  flightID     INT            NOT NULL,
  aircraftID   INT			  NOT NULL,
  seatNumber   VARCHAR(5)     NOT NULL,
  available    BOOLEAN        NOT NULL DEFAULT TRUE,
  PRIMARY KEY (seatID),
  FOREIGN KEY (flightID) REFERENCES FLIGHT(flightID)
);

CREATE TABLE TICKET (
  ticket_ID     INT            NOT NULL AUTO_INCREMENT,
  seat_ID       INT            NOT NULL,
  class         VARCHAR(20)    NOT NULL,
  user_ID       INT			   NOT NULL,  
  PRIMARY KEY (ticket_ID),
  FOREIGN KEY (seat_ID) REFERENCES SEAT(SeatID),
  FOREIGN KEY (user_ID) REFERENCES USER(user_ID)
);