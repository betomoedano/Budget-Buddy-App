-- 1. create DB
sqlite3 mySQLiteDB.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income'))
);

CREATE TABLE IF NOT EXISTS Transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  amount REAL NOT NULL,
  date INTEGER NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income')),
  FOREIGN KEY (category_id) REFERENCES Categories (id)
 );

-- 3. insert data
INSERT INTO Categories (name, type) VALUES ('Utilities', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Electronics', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Dining Out', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Breakfast Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Household Items', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Christmas Gifts', 'Expense');
INSERT INTO Categories (name, type) VALUES ('New Year Party Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Groceries', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Consulting Work', 'Income');
INSERT INTO Categories (name, type) VALUES ('Part-time Job', 'Income');
INSERT INTO Categories (name, type) VALUES ('Online Sales', 'Income');
INSERT INTO Categories (name, type) VALUES ('Freelance Writing', 'Income');
INSERT INTO Categories (name, type) VALUES ('End of Year Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Freelance', 'Income');


-- 4. confirm data was inserted
select * from Categories;
-- 1|Groceries|Expense
-- 2|Rent|Expense
-- 3|Salary|Income
-- 4|Freelancing|Income

-- Expenses
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 100.50, 1709814000, 'Weekly groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 75.25, 1709900400, 'More groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 1200, 1707740400, 'Monthly rent', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 45.99, 1710082800, 'Snacks and drinks', 'Expense');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 60.00, 1707154800, 'Breakfast supplies', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 110.75, 1707241200, 'Household items', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 50.25, 1707327600, 'Utilities bill', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 200.50, 1707414000, 'Electronics', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 15.99, 1707500400, 'Dining out', 'Expense');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 90.00, 1704562800, 'Christmas Gifts', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 120.75, 1704649200, 'New Year Party Supplies', 'Expense');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 85.50, 1701970800, 'Thanksgiving Groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 900, 1702057200, 'Rent November', 'Expense');


-- Income
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3000, 1709914800, 'Monthly salary', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 500, 1710001200, 'Freelance project', 'Income');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3200, 1707266800, 'Bonus', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 450, 1707353200, 'Consulting work', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 2800, 1707439600, 'Part-time job', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 600, 1707526000, 'Online sales', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 1500, 1707612400, 'Freelance writing', 'Income');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3100, 1704675600, 'End of Year Bonus', 'Income');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 700, 1702083600, 'Thanksgiving Freelance', 'Income');

-- 5. confirm again
select * from Transactions;
-- 1|1|100.5|2023-01-10|Weekly groceries|Expense
-- 2|1|75.25|2023-01-17|More groceries|Expense
-- 3|2|1200.0|2023-01-01|Monthly rent|Expense
-- 4|1|45.99|2023-01-24|Snacks and drinks|Expense
-- 5|3|3000.0|2023-01-15|Monthly salary|Income
-- 6|4|500.0|2023-01-20|Freelance project|Income

-- 6. exit db
.quit