CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses (category);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses (expense_date);

INSERT INTO expenses (description, category, amount, expense_date)
VALUES
    ('Grocery shopping', 'Food', 86.45, CURRENT_DATE - INTERVAL '2 days'),
    ('Monthly internet bill', 'Utilities', 59.99, CURRENT_DATE - INTERVAL '1 day'),
    ('Train pass', 'Transport', 42.00, CURRENT_DATE)
ON CONFLICT DO NOTHING;
