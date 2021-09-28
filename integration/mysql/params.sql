--tre
-- TABLA rule_types
INSERT INTO rule_types                 ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO rule_types                 ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO rule_types                 ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO rule_types                 ("name", "create_time", "update_time") VALUES ("d", now(), now());
						               
-- TABLA comparators                   
INSERT INTO comparators                ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO comparators                ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO comparators                ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO comparators                ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
-- TABLA event_severities              
INSERT INTO event_severities           ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO event_severities           ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO event_severities           ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO event_severities           ("name", "create_time", "update_time") VALUES ("d", now(), now());
-- counter                             
-- TABLA counter_families              
INSERT INTO counter_families           ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO counter_families           ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO counter_families           ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO counter_families           ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
-- TABLA vendors                       
INSERT INTO vendors                    ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO vendors                    ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO vendors                    ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO vendors                    ("name", "create_time", "update_time") VALUES ("d", now(), now());
					                   
-- TABLA domains                       
INSERT INTO domains                    ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO domains                    ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO domains                    ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO domains                    ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
-- TABLA teches                        
INSERT INTO teches                     ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO teches                     ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO teches                     ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO teches                     ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
							           
-- alarm status                        
-- TABLA alarm_status                  
INSERT INTO alarm_status               ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO alarm_status               ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO alarm_status               ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO alarm_status               ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
-- KQI                                 
-- TABLA kqi_categories                
INSERT INTO kqi_categories             ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO kqi_categories             ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO kqi_categories             ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO kqi_categories             ("name", "create_time", "update_time") VALUES ("d", now(), now());
							           
-- TABLA kqi_perspectives              
INSERT INTO kqi_perspectives           ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO kqi_perspectives           ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO kqi_perspectives           ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO kqi_perspectives           ("name", "create_time", "update_time") VALUES ("d", now(), now());
									   
-- TABLA kqi_temporal_frecuencies      
INSERT INTO kqi_temporal_frecuencies   ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO kqi_temporal_frecuencies   ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO kqi_temporal_frecuencies   ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO kqi_temporal_frecuencies   ("name", "create_time", "update_time") VALUES ("d", now(), now());
									   
-- TABLA kqi_sources                   
INSERT INTO kqi_sources 			   ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO kqi_sources 			   ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO kqi_sources 			   ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO kqi_sources 			   ("name", "create_time", "update_time") VALUES ("d", now(), now());

-- recommendations
-- TABLA recommendations_categories
INSERT INTO recommendations_categories ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO recommendations_categories ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO recommendations_categories ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO recommendations_categories ("name", "create_time", "update_time") VALUES ("d", now(), now());

-- TABLA recommendations_sources
INSERT INTO recommendations_sources    ("name", "create_time", "update_time") VALUES ("a", now(), now());
INSERT INTO recommendations_sources    ("name", "create_time", "update_time") VALUES ("b", now(), now());
INSERT INTO recommendations_sources    ("name", "create_time", "update_time") VALUES ("c", now(), now());
INSERT INTO recommendations_sources    ("name", "create_time", "update_time") VALUES ("d", now(), now());

COMMIT;