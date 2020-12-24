BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values ('Tim', 'tim@gmail.com', 0, '2020-12-22');
INSERT INTO login (email, password) values ('tim@gmail.com', '$2a$10$Xv6qcRYlhOf201T24Jfdbu2e7wVF01e6i079XRzV.lyH4R1Hwn97W');

INSERT INTO users (name, email, entries, joined) values ('Tom', 'tom@gmail.com', 4, '2020-12-20');
INSERT INTO login (email, password) values ('tom@gmail.com', '$2a$10$2ZWImLoDwao2vBUSEROSiOehRO3gziX5pWZ34NnV6v1SAW4o2E8Iu');


COMMIT;
