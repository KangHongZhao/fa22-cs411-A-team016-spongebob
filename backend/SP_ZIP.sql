CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ZIP`(IN var_zip INT)
BEGIN
	declare num int;
    declare finished int default 0;
	declare com_name VARCHAR(128);
	
	
	DECLARE cur CURSOR FOR 
	(select CompanyName, count(CompanyName) as num_fav
	from CompanyInfos natural join Locations natural join Favorites
	where abs(zipcode- var_zip )<100 
	group by CompanyName);
	
	DECLARE continue HANDLER FOR NOT FOUND SET finished = 1;
	
	if not exists (SELECT table_name 
		FROM INFORMATION_SCHEMA.TABLES
	   WHERE table_schema = 'test1'
		 AND table_name LIKE 'res_Table')
	then
		CREATE TABLE res_Table(
		ResId INT AUTO_INCREMENT NOT NULL, 
		CompanyName VARCHAR(128),
		Fav_Num INT,
		PRIMARY KEY (ResId)
		);
	end if;
	OPEN cur;

	REPEAT
		Fetch cur INTO com_name, num;
		IF NOT EXISTS (select * from res_Table where CompanyName=com_name and Fav_Num=num) Then
			INSERT IGNORE INTO res_Table(CompanyName, Fav_Num)
			values(com_name, num);
		End if;
		UNTIL finished
		END REPEAT;

	close cur;

	select * from res_Table order by Fav_Num desc limit 100;
END