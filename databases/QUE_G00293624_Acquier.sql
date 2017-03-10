-- DATABASE PROJECT
-- Alex Acquier - ID#: G00293624

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