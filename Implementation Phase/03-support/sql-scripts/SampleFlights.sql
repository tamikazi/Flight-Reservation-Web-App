DROP DATABASE IF EXISTS flights;
CREATE DATABASE flights;
USE flights;

CREATE TABLE AIRCRAFT (
  aircraftID			INT				NOT NULL 	AUTO_INCREMENT,
  model      			VARCHAR(4)		NOT NULL,
  numCols     		  	INT				NOT NULL,
  numRows				INT				NOT NULL,
PRIMARY KEY   (aircraftID));

INSERT INTO AIRCRAFT (model, numCols, numRows)
VALUES
('A310', 6, 13),
('B787', 9, 16),
('B773', 4, 11),
('B788', 6, 19),
('C212', 6, 10);

CREATE TABLE FLIGHT (
  flightID			INT				NOT NULL 	AUTO_INCREMENT,
  code      		VARCHAR(10)		NOT NULL,
  origin     		VARCHAR(20)		NOT NULL,
  destination		VARCHAR(20)		NOT NULL,
  departDate      	DATE			NOT NULL,
  departTime		TIME			NOT NULL,
  aircraftID   		INT				NOT NULL,
PRIMARY KEY (flightID),
FOREIGN KEY (aircraftID) REFERENCES AIRCRAFT(aircraftID));

INSERT INTO FLIGHT (code, origin, destination, departDate, departTime, aircraftID) 
VALUES 
('A3100', 'Chicago', 'Calgary', '2023-12-20', '11:15:06', 1), 
('B7101', 'London', 'Paris', '2023-12-21', '10:53:56', 2), 
('B7102', 'Toronto', 'Los Angeles', '2023-12-22', '15:48:32', 3), 
('B7103', 'Paris', 'London', '2023-11-23', '19:28:15', 4), 
('C2104', 'Vancouver', 'New York', '2023-12-24', '15:00:59', 5), 
('A3101', 'Tokyo', 'New York', '2023-12-20', '17:54:52', 1), 
('B7104', 'New York', 'Calgary', '2023-12-21', '11:19:33', 2), 
('B7105', 'New York', 'London', '2023-12-22', '14:01:21', 3), 
('B7106', 'Paris', 'Tokyo', '2023-12-23', '16:32:05', 4), 
('C2105', 'San Francisco', 'New York', '2023-12-24', '13:19:57', 5);

CREATE TABLE ROLES (
	roleID		INT			NOT NULL AUTO_INCREMENT,
    roleName	VARCHAR(20)	NOT NULL,
    PRIMARY KEY (roleID)
);

INSERT INTO ROLES (roleName) VALUES
('admin'),
('agent'),
('crew'),
('passenger'); #look into bitwise enums

CREATE TABLE USER (
  userID       INT            NOT NULL AUTO_INCREMENT,
  username     VARCHAR(50)    NOT NULL,
  password     VARCHAR(50)    NOT NULL,
  roleID       INT		      NOT NULL,
  member	   BOOL			  NOT NULL DEFAULT FALSE,
  PRIMARY KEY (userID),
  FOREIGN KEY (roleID) REFERENCES ROLES(roleID)
);

INSERT INTO USER (username, password, roleID, member) VALUES
('admin@example.com', 'adminpass', 1, FALSE),
('agent@example.com', 'agentpass', 2, FALSE),
('crew@example.com', 'crewpass', 3, FALSE),
('passenger@example.com', 'pasengerpass', 4, FALSE);

CREATE TABLE CREW_FLIGHTS (
	crewID		INT		NOT NULL AUTO_INCREMENT,
    userID		INT 	NOT NULL,
    flightID	INT		NOT NULL,
    PRIMARY KEY (crewID),
    FOREIGN KEY (userID) REFERENCES USER(userID),
    FOREIGN KEY (flightID) REFERENCES FLIGHT(flightID)
);

INSERT INTO CREW_FLIGHTS (userID, flightID) VALUES
(3, 1);

CREATE TABLE SEAT (
  seatID       INT            NOT NULL AUTO_INCREMENT,
  aircraftID   INT			  NOT NULL,
  seatNumber   VARCHAR(5)     NOT NULL, 
  class        VARCHAR(20)    NOT NULL,
  PRIMARY KEY (seatID),
  FOREIGN KEY (aircraftID) REFERENCES AIRCRAFT(aircraftID)
);

INSERT INTO SEAT (aircraftID, seatNumber, class) VALUES 
(1, 'A1', 'Business'),
(1, 'B1', 'Business'),
(1, 'C1', 'Business'),
(1, 'D1', 'Business'),
(1, 'E1', 'Business'),
(1, 'F1', 'Business'),
(1, 'A2', 'Comfort'),
(1, 'B2', 'Comfort'),
(1, 'C2', 'Comfort'),
(1, 'D2', 'Comfort'),
(1, 'E2', 'Comfort'),
(1, 'F2', 'Comfort'),
(1, 'A3', 'Economy'),
(1, 'B3', 'Economy'),
(1, 'C3', 'Economy'),
(1, 'D3', 'Economy'),
(1, 'E3', 'Economy'),
(1, 'F3', 'Economy'),
(1, 'A4', 'Economy'),
(1, 'B4', 'Economy'),
(1, 'C4', 'Economy'),
(1, 'D4', 'Economy'),
(1, 'E4', 'Economy'),
(1, 'F4', 'Economy'),
(1, 'A5', 'Economy'),
(1, 'B5', 'Economy'),
(1, 'C5', 'Economy'),
(1, 'D5', 'Economy'),
(1, 'E5', 'Economy'),
(1, 'F5', 'Economy'),
(1, 'A6', 'Economy'),
(1, 'B6', 'Economy'),
(1, 'C6', 'Economy'),
(1, 'D6', 'Economy'),
(1, 'E6', 'Economy'),
(1, 'F6', 'Economy'),
(1, 'A7', 'Economy'),
(1, 'B7', 'Economy'),
(1, 'C7', 'Economy'),
(1, 'D7', 'Economy'),
(1, 'E7', 'Economy'),
(1, 'F7', 'Economy'),
(1, 'A8', 'Economy'),
(1, 'B8', 'Economy'),
(1, 'C8', 'Economy'),
(1, 'D8', 'Economy'),
(1, 'E8', 'Economy'),
(1, 'F8', 'Economy'),
(1, 'A9', 'Economy'),
(1, 'B9', 'Economy'),
(1, 'C9', 'Economy'),
(1, 'D9', 'Economy'),
(1, 'E9', 'Economy'),
(1, 'F9', 'Economy'),
(1, 'A10', 'Economy'),
(1, 'B10', 'Economy'),
(1, 'C10', 'Economy'),
(1, 'D10', 'Economy'),
(1, 'E10', 'Economy'),
(1, 'F10', 'Economy'),
(1, 'A11', 'Economy'),
(1, 'B11', 'Economy'),
(1, 'C11', 'Economy'),
(1, 'D11', 'Economy'),
(1, 'E11', 'Economy'),
(1, 'F11', 'Economy'),
(1, 'A12', 'Economy'),
(1, 'B12', 'Economy'),
(1, 'C12', 'Economy'),
(1, 'D12', 'Economy'),
(1, 'E12', 'Economy'),
(1, 'F12', 'Economy'),
(1, 'A13', 'Economy'),
(1, 'B13', 'Economy'),
(1, 'C13', 'Economy'),
(1, 'D13', 'Economy'),
(1, 'E13', 'Economy'),
(1, 'F13', 'Economy'),
(2, 'A1', 'Business'),
(2, 'B1', 'Business'),
(2, 'C1', 'Business'),
(2, 'D1', 'Business'),
(2, 'E1', 'Business'),
(2, 'F1', 'Business'),
(2, 'G1', 'Business'),
(2, 'H1', 'Business'),
(2, 'I1', 'Business'),
(2, 'A2', 'Comfort'),
(2, 'B2', 'Comfort'),
(2, 'C2', 'Comfort'),
(2, 'D2', 'Comfort'),
(2, 'E2', 'Comfort'),
(2, 'F2', 'Comfort'),
(2, 'G2', 'Comfort'),
(2, 'H2', 'Comfort'),
(2, 'I2', 'Comfort'),
(2, 'A3', 'Economy'),
(2, 'B3', 'Economy'),
(2, 'C3', 'Economy'),
(2, 'D3', 'Economy'),
(2, 'E3', 'Economy'),
(2, 'F3', 'Economy'),
(2, 'G3', 'Economy'),
(2, 'H3', 'Economy'),
(2, 'I3', 'Economy'),
(2, 'A4', 'Economy'),
(2, 'B4', 'Economy'),
(2, 'C4', 'Economy'),
(2, 'D4', 'Economy'),
(2, 'E4', 'Economy'),
(2, 'F4', 'Economy'),
(2, 'G4', 'Economy'),
(2, 'H4', 'Economy'),
(2, 'I4', 'Economy'),
(2, 'A5', 'Economy'),
(2, 'B5', 'Economy'),
(2, 'C5', 'Economy'),
(2, 'D5', 'Economy'),
(2, 'E5', 'Economy'),
(2, 'F5', 'Economy'),
(2, 'G5', 'Economy'),
(2, 'H5', 'Economy'),
(2, 'I5', 'Economy'),
(2, 'A6', 'Economy'),
(2, 'B6', 'Economy'),
(2, 'C6', 'Economy'),
(2, 'D6', 'Economy'),
(2, 'E6', 'Economy'),
(2, 'F6', 'Economy'),
(2, 'G6', 'Economy'),
(2, 'H6', 'Economy'),
(2, 'I6', 'Economy'),
(2, 'A7', 'Economy'),
(2, 'B7', 'Economy'),
(2, 'C7', 'Economy'),
(2, 'D7', 'Economy'),
(2, 'E7', 'Economy'),
(2, 'F7', 'Economy'),
(2, 'G7', 'Economy'),
(2, 'H7', 'Economy'),
(2, 'I7', 'Economy'),
(2, 'A8', 'Economy'),
(2, 'B8', 'Economy'),
(2, 'C8', 'Economy'),
(2, 'D8', 'Economy'),
(2, 'E8', 'Economy'),
(2, 'F8', 'Economy'),
(2, 'G8', 'Economy'),
(2, 'H8', 'Economy'),
(2, 'I8', 'Economy'),
(2, 'A9', 'Economy'),
(2, 'B9', 'Economy'),
(2, 'C9', 'Economy'),
(2, 'D9', 'Economy'),
(2, 'E9', 'Economy'),
(2, 'F9', 'Economy'),
(2, 'G9', 'Economy'),
(2, 'H9', 'Economy'),
(2, 'I9', 'Economy'),
(2, 'A10', 'Economy'),
(2, 'B10', 'Economy'),
(2, 'C10', 'Economy'),
(2, 'D10', 'Economy'),
(2, 'E10', 'Economy'),
(2, 'F10', 'Economy'),
(2, 'G10', 'Economy'),
(2, 'H10', 'Economy'),
(2, 'I10', 'Economy'),
(2, 'A11', 'Economy'),
(2, 'B11', 'Economy'),
(2, 'C11', 'Economy'),
(2, 'D11', 'Economy'),
(2, 'E11', 'Economy'),
(2, 'F11', 'Economy'),
(2, 'G11', 'Economy'),
(2, 'H11', 'Economy'),
(2, 'I11', 'Economy'),
(2, 'A12', 'Economy'),
(2, 'B12', 'Economy'),
(2, 'C12', 'Economy'),
(2, 'D12', 'Economy'),
(2, 'E12', 'Economy'),
(2, 'F12', 'Economy'),
(2, 'G12', 'Economy'),
(2, 'H12', 'Economy'),
(2, 'I12', 'Economy'),
(2, 'A13', 'Economy'),
(2, 'B13', 'Economy'),
(2, 'C13', 'Economy'),
(2, 'D13', 'Economy'),
(2, 'E13', 'Economy'),
(2, 'F13', 'Economy'),
(2, 'G13', 'Economy'),
(2, 'H13', 'Economy'),
(2, 'I13', 'Economy'),
(2, 'A14', 'Economy'),
(2, 'B14', 'Economy'),
(2, 'C14', 'Economy'),
(2, 'D14', 'Economy'),
(2, 'E14', 'Economy'),
(2, 'F14', 'Economy'),
(2, 'G14', 'Economy'),
(2, 'H14', 'Economy'),
(2, 'I14', 'Economy'),
(2, 'A15', 'Economy'),
(2, 'B15', 'Economy'),
(2, 'C15', 'Economy'),
(2, 'D15', 'Economy'),
(2, 'E15', 'Economy'),
(2, 'F15', 'Economy'),
(2, 'G15', 'Economy'),
(2, 'H15', 'Economy'),
(2, 'I15', 'Economy'),
(2, 'A16', 'Economy'),
(2, 'B16', 'Economy'),
(2, 'C16', 'Economy'),
(2, 'D16', 'Economy'),
(2, 'E16', 'Economy'),
(2, 'F16', 'Economy'),
(2, 'G16', 'Economy'),
(2, 'H16', 'Economy'),
(2, 'I16', 'Economy'),
(3, 'A1', 'Business'),
(3, 'B1', 'Business'),
(3, 'C1', 'Business'),
(3, 'D1', 'Business'),
(3, 'A2', 'Comfort'),
(3, 'B2', 'Comfort'),
(3, 'C2', 'Comfort'),
(3, 'D2', 'Comfort'),
(3, 'A3', 'Economy'),
(3, 'B3', 'Economy'),
(3, 'C3', 'Economy'),
(3, 'D3', 'Economy'),
(3, 'A4', 'Economy'),
(3, 'B4', 'Economy'),
(3, 'C4', 'Economy'),
(3, 'D4', 'Economy'),
(3, 'A5', 'Economy'),
(3, 'B5', 'Economy'),
(3, 'C5', 'Economy'),
(3, 'D5', 'Economy'),
(3, 'A6', 'Economy'),
(3, 'B6', 'Economy'),
(3, 'C6', 'Economy'),
(3, 'D6', 'Economy'),
(3, 'A7', 'Economy'),
(3, 'B7', 'Economy'),
(3, 'C7', 'Economy'),
(3, 'D7', 'Economy'),
(3, 'A8', 'Economy'),
(3, 'B8', 'Economy'),
(3, 'C8', 'Economy'),
(3, 'D8', 'Economy'),
(3, 'A9', 'Economy'),
(3, 'B9', 'Economy'),
(3, 'C9', 'Economy'),
(3, 'D9', 'Economy'),
(3, 'A10', 'Economy'),
(3, 'B10', 'Economy'),
(3, 'C10', 'Economy'),
(3, 'D10', 'Economy'),
(3, 'A11', 'Economy'),
(3, 'B11', 'Economy'),
(3, 'C11', 'Economy'),
(3, 'D11', 'Economy'),
(4, 'A1', 'Business'),
(4, 'B1', 'Business'),
(4, 'C1', 'Business'),
(4, 'D1', 'Business'),
(4, 'E1', 'Business'),
(4, 'F1', 'Business'),
(4, 'A2', 'Comfort'),
(4, 'B2', 'Comfort'),
(4, 'C2', 'Comfort'),
(4, 'D2', 'Comfort'),
(4, 'E2', 'Comfort'),
(4, 'F2', 'Comfort'),
(4, 'A3', 'Economy'),
(4, 'B3', 'Economy'),
(4, 'C3', 'Economy'),
(4, 'D3', 'Economy'),
(4, 'E3', 'Economy'),
(4, 'F3', 'Economy'),
(4, 'A4', 'Economy'),
(4, 'B4', 'Economy'),
(4, 'C4', 'Economy'),
(4, 'D4', 'Economy'),
(4, 'E4', 'Economy'),
(4, 'F4', 'Economy'),
(4, 'A5', 'Economy'),
(4, 'B5', 'Economy'),
(4, 'C5', 'Economy'),
(4, 'D5', 'Economy'),
(4, 'E5', 'Economy'),
(4, 'F5', 'Economy'),
(4, 'A6', 'Economy'),
(4, 'B6', 'Economy'),
(4, 'C6', 'Economy'),
(4, 'D6', 'Economy'),
(4, 'E6', 'Economy'),
(4, 'F6', 'Economy'),
(4, 'A7', 'Economy'),
(4, 'B7', 'Economy'),
(4, 'C7', 'Economy'),
(4, 'D7', 'Economy'),
(4, 'E7', 'Economy'),
(4, 'F7', 'Economy'),
(4, 'A8', 'Economy'),
(4, 'B8', 'Economy'),
(4, 'C8', 'Economy'),
(4, 'D8', 'Economy'),
(4, 'E8', 'Economy'),
(4, 'F8', 'Economy'),
(4, 'A9', 'Economy'),
(4, 'B9', 'Economy'),
(4, 'C9', 'Economy'),
(4, 'D9', 'Economy'),
(4, 'E9', 'Economy'),
(4, 'F9', 'Economy'),
(4, 'A10', 'Economy'),
(4, 'B10', 'Economy'),
(4, 'C10', 'Economy'),
(4, 'D10', 'Economy'),
(4, 'E10', 'Economy'),
(4, 'F10', 'Economy'),
(4, 'A11', 'Economy'),
(4, 'B11', 'Economy'),
(4, 'C11', 'Economy'),
(4, 'D11', 'Economy'),
(4, 'E11', 'Economy'),
(4, 'F11', 'Economy'),
(4, 'A12', 'Economy'),
(4, 'B12', 'Economy'),
(4, 'C12', 'Economy'),
(4, 'D12', 'Economy'),
(4, 'E12', 'Economy'),
(4, 'F12', 'Economy'),
(4, 'A13', 'Economy'),
(4, 'B13', 'Economy'),
(4, 'C13', 'Economy'),
(4, 'D13', 'Economy'),
(4, 'E13', 'Economy'),
(4, 'F13', 'Economy'),
(4, 'A14', 'Economy'),
(4, 'B14', 'Economy'),
(4, 'C14', 'Economy'),
(4, 'D14', 'Economy'),
(4, 'E14', 'Economy'),
(4, 'F14', 'Economy'),
(4, 'A15', 'Economy'),
(4, 'B15', 'Economy'),
(4, 'C15', 'Economy'),
(4, 'D15', 'Economy'),
(4, 'E15', 'Economy'),
(4, 'F15', 'Economy'),
(4, 'A16', 'Economy'),
(4, 'B16', 'Economy'),
(4, 'C16', 'Economy'),
(4, 'D16', 'Economy'),
(4, 'E16', 'Economy'),
(4, 'F16', 'Economy'),
(4, 'A17', 'Economy'),
(4, 'B17', 'Economy'),
(4, 'C17', 'Economy'),
(4, 'D17', 'Economy'),
(4, 'E17', 'Economy'),
(4, 'F17', 'Economy'),
(4, 'A18', 'Economy'),
(4, 'B18', 'Economy'),
(4, 'C18', 'Economy'),
(4, 'D18', 'Economy'),
(4, 'E18', 'Economy'),
(4, 'F18', 'Economy'),
(4, 'A19', 'Economy'),
(4, 'B19', 'Economy'),
(4, 'C19', 'Economy'),
(4, 'D19', 'Economy'),
(4, 'E19', 'Economy'),
(4, 'F19', 'Economy'),
(5, 'A1', 'Business'),
(5, 'B1', 'Business'),
(5, 'C1', 'Business'),
(5, 'D1', 'Business'),
(5, 'E1', 'Business'),
(5, 'F1', 'Business'),
(5, 'A2', 'Comfort'),
(5, 'B2', 'Comfort'),
(5, 'C2', 'Comfort'),
(5, 'D2', 'Comfort'),
(5, 'E2', 'Comfort'),
(5, 'F2', 'Comfort'),
(5, 'A3', 'Economy'),
(5, 'B3', 'Economy'),
(5, 'C3', 'Economy'),
(5, 'D3', 'Economy'),
(5, 'E3', 'Economy'),
(5, 'F3', 'Economy'),
(5, 'A4', 'Economy'),
(5, 'B4', 'Economy'),
(5, 'C4', 'Economy'),
(5, 'D4', 'Economy'),
(5, 'E4', 'Economy'),
(5, 'F4', 'Economy'),
(5, 'A5', 'Economy'),
(5, 'B5', 'Economy'),
(5, 'C5', 'Economy'),
(5, 'D5', 'Economy'),
(5, 'E5', 'Economy'),
(5, 'F5', 'Economy'),
(5, 'A6', 'Economy'),
(5, 'B6', 'Economy'),
(5, 'C6', 'Economy'),
(5, 'D6', 'Economy'),
(5, 'E6', 'Economy'),
(5, 'F6', 'Economy'),
(5, 'A7', 'Economy'),
(5, 'B7', 'Economy'),
(5, 'C7', 'Economy'),
(5, 'D7', 'Economy'),
(5, 'E7', 'Economy'),
(5, 'F7', 'Economy'),
(5, 'A8', 'Economy'),
(5, 'B8', 'Economy'),
(5, 'C8', 'Economy'),
(5, 'D8', 'Economy'),
(5, 'E8', 'Economy'),
(5, 'F8', 'Economy'),
(5, 'A9', 'Economy'),
(5, 'B9', 'Economy'),
(5, 'C9', 'Economy'),
(5, 'D9', 'Economy'),
(5, 'E9', 'Economy'),
(5, 'F9', 'Economy'),
(5, 'A10', 'Economy'),
(5, 'B10', 'Economy'),
(5, 'C10', 'Economy'),
(5, 'D10', 'Economy'),
(5, 'E10', 'Economy'),
(5, 'F10', 'Economy');

CREATE TABLE TICKET (
  ticketID     INT             NOT NULL AUTO_INCREMENT,
  seatID       INT             NOT NULL,
  flightID     INT             NOT NULL,
  userID       INT			   NOT NULL,  
  insurance	   BOOL			   NOT NULL DEFAULT FALSE,
  PRIMARY KEY (ticketID),
  FOREIGN KEY (seatID) REFERENCES SEAT(seatID),
  FOREIGN KEY (userID) REFERENCES USER(userID),
  FOREIGN KEY (flightID) REFERENCES FLIGHT(flightID)
);

INSERT INTO TICKET (seatID, flightID, userID, insurance) VALUES
(1, 1, 4, FALSE);

#SELECT * FROM FLIGHT
#LEFT JOIN SEAT ON aircraftID
#LEFT JOIN TICKET ON seatID;
