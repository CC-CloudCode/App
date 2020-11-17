INSERT INTO databettingspree.user (username, birthdate, password, email, name, followers, following) values 
				 ("teste01", "1998-01-01", "123456", "teste01@gmail.com", "Luizzz", 0, 0),
                 ("teste02", "1998-01-02", "123456", "teste02@gmail.com", "Tone", 0, 0),
                 ("teste03", "1998-01-03", "123456", "teste03@gmail.com", "Gervásio", 0, 0),
                 ("teste04", "1998-01-04", "123456", "teste04@gmail.com", "Estacionâncio", 0, 0),
                 ("teste05", "1998-01-05", "123456", "teste05@gmail.com", "Zeca", 0, 0);
                 
Insert Into databettingspree.group (createdby, name) values
								   (1, "Luizzz Boy's"),
                                   (3, "Gervásio é que bate");
                                   
Insert Into databettingspree.usergroup (idgroup, iduser) values 
									   (1, 2),
                                       (2, 4),
                                       (2, 5);
                                       
Insert Into databettingspree.follower (me, following) values 
									  (1, 2),
                                      (2, 1),
                                      (3, 1),
                                      (3, 2),
                                      (3, 4),
                                      (3, 5);
                                      
Insert into databettingspree.post (text, public, date, iduser, idbet, betpublic, idgroup) values
								  ("Boa tarde, alguém me sabe dizer onde se come bem?", false, now(), 3, null, null, null),
                                  ("Boa tarde, alguém me pode ensinar a roubar?", false, now(), 3, null, null, null),
                                  ("Boa tarde, alguém me sabe dizer como acabo o curso?", false, now(), 2, null, null, null),
                                  ("Boa tarde, alguém me sabe dizer qual a casa de mulheres de vida mais próxima?", true, now(), 4, null, null, null);
                                  
Insert into databettingspree.comment (text, date, iduser, idpost) values
									 ("Come-se bem na tasquinha, se quiseres ser roubado!", now(), 1, 1);
                                     