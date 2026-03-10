export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TableSchema {
  name: string;
  columns: { name: string; type: string }[];
  sampleData: Record<string, string | number | null>[];
}

export interface Assignment {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  details: string;
  constraints: string[];
  tables: TableSchema[];
  hints: string[];
  expectedColumns: string[];
  mockResult: Record<string, string | number | null>[];
}

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Select All Employees",
    difficulty: "Easy",
    description: "Retrieve all records from the employees table.",
    details:
      "Write a query to fetch every row and column from the employees table. This is a basic SELECT exercise to get you started.",
    constraints: ["Use a single SELECT statement", "Return all columns"],
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "department", type: "VARCHAR" },
          { name: "salary", type: "DECIMAL" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
          { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
          { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
          { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
        ],
      },
    ],
    hints: [
      "Think about which SQL keyword retrieves data from a table.",
      "The wildcard character * can be used to select all columns.",
      "The basic syntax is: SELECT ... FROM ...;",
    ],
    expectedColumns: ["id", "name", "department", "salary", "hire_date"],
    mockResult: [
      { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
      { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
      { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
      { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
      { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
    ],
  },
  {
    id: "2",
    title: "Filter by Department",
    difficulty: "Easy",
    description: "Find all employees in the Engineering department.",
    details:
      "Write a query that returns only the employees who belong to the Engineering department. Practice using the WHERE clause.",
    constraints: ["Use a WHERE clause", "Filter on the department column"],
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "department", type: "VARCHAR" },
          { name: "salary", type: "DECIMAL" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
          { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
          { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
          { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
        ],
      },
    ],
    hints: [
      "You need to add a condition to your SELECT statement.",
      "The WHERE clause filters rows based on a condition.",
      "String comparisons in SQL use single quotes: 'value'",
    ],
    expectedColumns: ["id", "name", "department", "salary", "hire_date"],
    mockResult: [
      { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
      { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
    ],
  },
  {
    id: "3",
    title: "Aggregate Salaries",
    difficulty: "Medium",
    description: "Calculate the average salary per department.",
    details:
      "Write a query that groups employees by their department and computes the average salary for each group. Round results to 2 decimal places.",
    constraints: ["Use GROUP BY", "Use AVG() aggregate function", "Round to 2 decimal places"],
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "department", type: "VARCHAR" },
          { name: "salary", type: "DECIMAL" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
          { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
          { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
          { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
        ],
      },
    ],
    hints: [
      "Think about how to group rows that share a common value.",
      "SQL has built-in functions for calculating averages.",
      "ROUND() can help you format decimal results.",
    ],
    expectedColumns: ["department", "avg_salary"],
    mockResult: [
      { department: "Engineering", avg_salary: 100000.0 },
      { department: "HR", avg_salary: 68000.0 },
      { department: "Marketing", avg_salary: 75000.0 },
    ],
  },
  {
    id: "4",
    title: "Join Orders with Customers",
    difficulty: "Medium",
    description: "List all orders alongside the customer name who placed them.",
    details:
      "Write a query that combines the orders and customers tables to display each order with its associated customer name.",
    constraints: ["Use an INNER JOIN", "Include order_id, order_date, amount, and customer name"],
    tables: [
      {
        name: "customers",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "email", type: "VARCHAR" },
          { name: "city", type: "VARCHAR" },
        ],
        sampleData: [
          { id: 1, name: "Acme Corp", email: "contact@acme.com", city: "New York" },
          { id: 2, name: "Globex Inc", email: "info@globex.com", city: "Chicago" },
          { id: 3, name: "Initech", email: "hello@initech.com", city: "Austin" },
        ],
      },
      {
        name: "orders",
        columns: [
          { name: "order_id", type: "INT" },
          { name: "customer_id", type: "INT" },
          { name: "order_date", type: "DATE" },
          { name: "amount", type: "DECIMAL" },
        ],
        sampleData: [
          { order_id: 101, customer_id: 1, order_date: "2024-01-15", amount: 1500.0 },
          { order_id: 102, customer_id: 2, order_date: "2024-02-20", amount: 3200.0 },
          { order_id: 103, customer_id: 1, order_date: "2024-03-10", amount: 800.0 },
          { order_id: 104, customer_id: 3, order_date: "2024-03-22", amount: 2100.0 },
        ],
      },
    ],
    hints: [
      "You need to combine data from two tables - think about how tables relate.",
      "The customer_id in orders references the id in customers.",
      "JOIN ... ON lets you specify the relationship between tables.",
    ],
    expectedColumns: ["order_id", "customer_name", "order_date", "amount"],
    mockResult: [
      { order_id: 101, customer_name: "Acme Corp", order_date: "2024-01-15", amount: 1500.0 },
      { order_id: 102, customer_name: "Globex Inc", order_date: "2024-02-20", amount: 3200.0 },
      { order_id: 103, customer_name: "Acme Corp", order_date: "2024-03-10", amount: 800.0 },
      { order_id: 104, customer_name: "Initech", order_date: "2024-03-22", amount: 2100.0 },
    ],
  },
  {
    id: "5",
    title: "Subquery: Above-Average Salary",
    difficulty: "Hard",
    description: "Find employees earning more than the company average salary.",
    details:
      "Write a query using a subquery to find all employees whose salary exceeds the overall average salary across the company.",
    constraints: ["Use a subquery", "Do not hard-code the average value", "Return name, department, salary"],
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "department", type: "VARCHAR" },
          { name: "salary", type: "DECIMAL" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
          { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
          { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
          { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
        ],
      },
    ],
    hints: [
      "A subquery is a query nested inside another query.",
      "You can use a subquery in the WHERE clause to compute a dynamic value.",
      "Think: WHERE salary > (SELECT ... )",
    ],
    expectedColumns: ["name", "department", "salary"],
    mockResult: [
      { name: "Alice", department: "Engineering", salary: 95000 },
      { name: "Charlie", department: "Engineering", salary: 105000 },
    ],
  },
  {
    id: "6",
    title: "Window Functions: Rank Employees",
    difficulty: "Hard",
    description: "Rank employees by salary within each department.",
    details:
      "Use a window function to assign a rank to each employee based on their salary within their department (highest salary = rank 1).",
    constraints: ["Use RANK() or DENSE_RANK()", "Partition by department", "Order by salary descending"],
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR" },
          { name: "department", type: "VARCHAR" },
          { name: "salary", type: "DECIMAL" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice", department: "Engineering", salary: 95000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob", department: "Marketing", salary: 72000, hire_date: "2020-07-01" },
          { id: 3, name: "Charlie", department: "Engineering", salary: 105000, hire_date: "2019-11-20" },
          { id: 4, name: "Diana", department: "HR", salary: 68000, hire_date: "2022-01-10" },
          { id: 5, name: "Eve", department: "Marketing", salary: 78000, hire_date: "2021-09-05" },
        ],
      },
    ],
    hints: [
      "Window functions perform calculations across a set of rows related to the current row.",
      "PARTITION BY divides the result set into groups - similar to GROUP BY but without collapsing rows.",
      "The syntax is: RANK() OVER (PARTITION BY ... ORDER BY ...)",
    ],
    expectedColumns: ["name", "department", "salary", "rank"],
    mockResult: [
      { name: "Charlie", department: "Engineering", salary: 105000, rank: 1 },
      { name: "Alice", department: "Engineering", salary: 95000, rank: 2 },
      { name: "Diana", department: "HR", salary: 68000, rank: 1 },
      { name: "Eve", department: "Marketing", salary: 78000, rank: 1 },
      { name: "Bob", department: "Marketing", salary: 72000, rank: 2 },
    ],
  },
];


