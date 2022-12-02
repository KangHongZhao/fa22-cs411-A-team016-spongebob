CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ZIP`(IN var_zip INT)
BEGIN
	declare num int;
    declare finished int default 0;
	declare com_name VARCHAR(128);
	
	
	DECLARE cur CURSOR FOR 
	(select CompanyName, count(CompanyName) as num_fav
	from CompanyInfos natural join Locations natural join Favorites
	where abs(zipcode- var_zip)<100 
	group by CompanyName);
	
	DECLARE continue HANDLER FOR NOT FOUND SET finished = 1;
	
	drop table if exists res_Table;

	CREATE TABLE res_Table(
		ResId INT AUTO_INCREMENT NOT NULL, 
		CompanyName VARCHAR(128),
		Fav_Num INT,
		PRIMARY KEY (ResId)
		);

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

	select * from res_Table;
END
