CREATE TABLE form(
	ID 	SERIAL	NOT NULL,
	firstName	VARCHAR(30)	NOT NULL,
	lastName	VARCHAR(30)	NOT NULL,
	email	    VARCHAR(50)	NOT NULL,
	age	        INT	        NOT NULL,
    ticketType  VARCHAR(5)  NOT NULL,
    adultsTickets INT     NOT NULL,
	studentsTickets INT     NOT NULL,
	childrenTickets INT     NOT NULL,
	price			INT		NOT NULL,
	CONSTRAINT id_pkey PRIMARY KEY (id));