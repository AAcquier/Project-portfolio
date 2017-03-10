-- DATABASE PROJECT
-- Alex Acquier - ID#: G00293624

-- WARNING: This  SQL file is not an export of the database used for the project,it is the collection of the commands used to generate 
--			the database.


-- Part 1b


-- Find under this comment the query to create the assesment table. The CREATE TABLE command allows the table to be created giving 
-- the values Ass_ID, Student_ID, Lecturer_ID, Due_Date and Grade for columns entry names. Ass_ID and Grade are of type
-- varchar, Student_ID and Lecturer_ID are of type int, and Due-Date is of a type date which will allow to do some calculations if 
-- needed. All of them have been established as NOT NULL even though the grade could be allowed to be null if the lecturer reconize
--  some exceptional circumstances in which a given student is dispensed of an assement (business rule). The Primary key is designed 
-- as Student_ID which justifies its is NOT NULL  status under Codd's 10th rule.
CREATE TABLE ASSESMENT (
  Ass_ID varchar(20) NOT NULL,
  Student_ID int(4) NOT NULL,
  Lecturer_ID int(4) NOT NULL,
  Due_Date date NOT NULL,
  Grade varchar(20) NOT NULL,
  PRIMARY KEY (Student_ID)
);



-- The courses table (see below) is composed of two columns (Course_ID and Course_Name) which both use the varchar type. Both columns 
-- have been established as NOT NULL because course_ID is the primary key meaning that none of the entry can be null and  Course_Name 
-- is Foreign key which means it is linked to a primary key and as stated earlier an entry in a primary key column can not be null.
CREATE TABLE COURSES (
  Course_ID varchar(6) NOT NULL,
  Course_Name varchar(25) NOT NULL,
  PRIMARY KEY (Course_ID)
);



-- The lecturers table is composed of four columns (Lecturer_ID, Lecturer_Name, Course_ID and Dept_ID), Lecturer_ID uses an int type 
-- when Lecturer_Name, Course_ID and Dept_ID use varchar types. All columns are set as NOT NULL, by Codd's rules Lecturer_ID and 
-- Course_ID have to be NOT NULL as they are respectively primary and foreign keys. Concerning Lecturer_Name and Dept_ID that the 
-- business rules that make them not null as every person has a name and colleges always put their staff in different departments
-- for organization purposes.
CREATE TABLE LECTURERS (
  Lecturer_ID int(4) NOT NULL,
  Lecturer_Name varchar(20) NOT NULL,
  Course_ID varchar(6) NOT NULL,
  Dept_ID varchar(12) NOT NULL,
  PRIMARY KEY (Lecturer_ID)
);



-- The students table is composed of four columns (Student_ID, Student_Name, Student_DOB and Course_Name), Student_ID is an int type,
-- Student_Name and Course_Name are varchar types, and Student_DOB is date type which may allow to make calculation later on; they are 
-- all set to not null. Course_Name and Student_ID are  set to not nul because they are respectively primary and foreign keys, and 
-- Student_Name, Student_DOB are set as not null because of the business rule: every person has name and birthday.
CREATE TABLE STUDENTS (
  Student_ID int(4) NOT NULL,
  Student_Name varchar(20) NOT NULL,
  Student_DOB date NOT NULL,
  Course_Name varchar(25) NOT NULL,
  PRIMARY KEY (Course_Name)
);



-- Part 2

-- This query allows to populate the assesment table. The INSERT INTO keyword allows to select which table needs to be populated and 
-- the five elements in the first bracket are the columns names, they also indicate the order in which the values should be input
-- if you want the right data in the right cell. The keyword VALUES annonces that what is contained in the brackets after it are the
-- values to be inserted in each row. Here the values of the first row inserted in assesment are: Ass_ID='DB_Test', Student_ID=21,
-- Lecturer_ID=11, Due_Date='2016-11-01', Grade='72%'.
INSERT INTO ASSESMENT (Ass_ID, Student_ID, Lecturer_ID, Due_Date, Grade) VALUES
('DB_Test', 21, 11,  '2016-11-01', '72%'),
('Java_Test', 22, 13, '2016-12-15', 'Need Grading'),
('Pres_Conn', 23, 14, '2016-10-01', '62%'),
('Car_ass', 24, 15, '2016-11-15', 'Need Grading');



-- This query populates the courses table, each set in the parentheses after the INSERT INTO COURSES (Course_ID , Course_Name) are the
-- heading of the columns and precise the order in which the data should be input,the VALUES command represents the values 
-- which are going to populate each row. The first values in the parentheses are the values of the Course_ID column and the other one 
-- being the values of the Course_Name column.
INSERT INTO COURSES (Course_ID, Course_Name) VALUES
('T_159', 'BA Tourism'),
('E_99', 'BEng. Mechanical'),
('CS_13', 'BSc. Computer Science'),
('X_55', 'BSc. Webtechnologies');



-- This query populates the lecturers table, each set in the parentheses after the INSERT INTO COURSES (Lecturer_ID, Lecturer_Name,
-- Course_ID,  Dept_ID) are the heading of the columns and precise the order in which the data should be input, the
-- VALUES represents the values which are going to populate each row. The first values in the parentheses are the values of 
-- the Lecturer_ID column, the second one being the values of the Lecturer_Name column, the third the values of Course_ID, and the 
-- final one the values of Dept_ID column.
INSERT INTO LECTURERS (Lecturer_ID, Lecturer_Name, Course_ID, Dept_ID) VALUES
(11, 'Dave Dooley', 'X_55', 'Sc&Comp'),
(12, 'Frank Ferguson', 'X_55', 'Sc&Comp'),
(13, 'Dan Bogey', 'CS_13', 'Sc&Comp'),
(14, 'Leo Vinci', 'T_159', 'Art&skills'),
(15, 'Mark Healy', 'E_99', 'Eng.');



-- This query populates the students table, each set in the parentheses after the INSERT INTO COURSES (Student_ID, Student_Name, 
-- Student_DOB, Course_Name)are the heading of the columns and precise the order in which the data should be input, the VALUES 
-- command represents the values which are going to populate each row. The first values in the parentheses are the values of 
-- the Student_ID column, the second one being the values of the Student_Name column, the third the values of Student_DOB, and the 
-- final one the values of the Course_Name column.
INSERT INTO STUDENTS (Student_ID, Student_Name, Student_DOB, Course_Name) VALUES
(23, 'Jane Doe', '1995-02-13', 'BA Tourism'),
(24, 'Dan Smith', '1989-05-13', 'BEng. Mechanical'),
(22, 'Mary Reilly', '1997-02-01', 'BSc. Computer Science'),
(21, 'Joe Blogg', '1996-09-21', 'BSc. Webtechnologies');




-- Next is the ALTER TABLE command allowing the creation of the Assesment table foreign key. It is Lecturer_ID which allows to link 
-- the Assesment table to the lecturers table as Lecturer_ID is the primary key of the lecturers table. The constraint is named 
-- Assesment_Lecturers, if not stated when created foreign key columnn name would have been used by default. The ALTER TABLE command 
-- allows to select the table in which we want the foreign key to be created, the ADD CONSTRAINT command allows to tell which name 
-- we wnt to give to the constraint, the FOREIGN KEY command allows to select which column is used as foreign key in the assesment 
-- table and finally the REFERENCES command tells to which table and column the primary key should be linked to (in this case the 
-- lecturers table which has Lecturer_ID as a primary key).
ALTER TABLE ASSESMENT
ADD CONSTRAINT Assesment_Lecturers
FOREIGN KEY (Lecturer_ID)
REFERENCES LECTURERS(Lecturer_ID);


-- The query below sets Course_Name as the foreign key for the courses table, links it to the primary key of the students table and 
-- the constraint is given the name courses_Students.
ALTER TABLE COURSES
ADD CONSTRAINT courses_Students
FOREIGN KEY (Course_Name)
REFERENCES STUDENTS(Course_Name);


-- The query below sets Course_ID as the foreign key for the courses table, links it to the primary key of the courses table and 
-- the constraint is given the name Lecturers_Course.
ALTER TABLE LECTURERS
ADD CONSTRAINT Lecturers_Course
FOREIGN KEY (Course_ID)
REFERENCES COURSES(Course_ID);



-- The query below sets Student_ID as the foreign key for the student table, links it to the primary key of the assesment table and 
-- the constraint is given the name Student_Assesment.
ALTER TABLE STUDENTS
ADD CONSTRAINT Student_Assesment
FOREIGN KEY (Student_ID)
REFERENCES ASSESMENT(Student_ID);