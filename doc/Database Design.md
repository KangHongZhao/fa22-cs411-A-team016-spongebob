# Stage 3: Database Implementation and Indexing
In this stage, we will show the DDL we use to construct tables and results of them.

We also develop two advanced SQL and will show their results, including comparsions between **before indexing** and **after indexing**.

## Data Definition Language (DDL) commands

~~~
create table UserInfos(UserId int primary key AUTO_INCREMENT NOT NULL, Name VARCHAR(32), Gender CHAR(16), Birth_date DATE, Phone_Number CHAR(10), Email VARCHAR(64) UNIQUE NOT NULL, Password VARCHAR(32) );

create Table Locations( LocationId INT AUTO_INCREMENT NOT NULL, Zipcode INT, Street VARCHAR(64), City VARCHAR(32), State VARCHAR(16), primary key (Zipcode ,Street  dataid ,City , State ) );

create table CompanyInfos(CompanyId INT primary key AUTO_INCREMENT NOT NULL, LocationID INT REFERENCES Locations(LocationID), CompanyName VARCHAR(128)) ;

create table Favorites (FavoriteId INT primary key AUTO_INCREMENT NOT NULL, UserId INT REFERENCES UserInfos(UserId), CompanyId INT REFERENCES CompanyInfos(CompanyId) ) ;

create Table TempRanks(TransactionId INT primary key AUTO_INCREMENT NOT NULL, CompanyId INT REFERENCES CompanyInfos(CompanyID), Ranking INT);

create Table Jobs(JobId INT primary key AUTO_INCREMENT NOT NULL, JobTitle VARCHAR(64) UNIQUE NOT NULL);

create Table Releases(CompanyID INT REFERENCES CompanyInfos(CompanyID), JobId INT REFERENCES jobs(JobID),  primary key (JobId, CompanyID));
~~~
Above is the latest version of DDL, this part will look a little bit different from the relational schema in Stage 2 in that, after we get the true data, we find that the length of some strings is not enough.

## Tables looklike
### CompanyInfo

### Favorites
### Jobs
### Locations
### Releases
### TempRanks
### UserInfos

## Tables with at least 1000 records
