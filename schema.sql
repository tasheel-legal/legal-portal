-- schema.sql
-- Raw PostgreSQL queries to set up the NeonDB schema for Tasheel Legal SaaS

-- Table: Firms (For white-labeling)
CREATE TABLE IF NOT EXISTS Firms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Users
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    firm_id INT NOT NULL REFERENCES Firms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Superadmin', 'Admin', 'Client')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Services
CREATE TABLE IF NOT EXISTS Services (
    id SERIAL PRIMARY KEY,
    firm_id INT NOT NULL REFERENCES Firms(id) ON DELETE CASCADE,
    name JSONB NOT NULL, -- e.g., {"en": "Corporate", "ar": "شركات"}
    description JSONB NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Cases
CREATE TABLE IF NOT EXISTS Cases (
    id SERIAL PRIMARY KEY,
    firm_id INT NOT NULL REFERENCES Firms(id) ON DELETE CASCADE,
    client_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    service_id INT NOT NULL REFERENCES Services(id) ON DELETE CASCADE,
    status VARCHAR(100) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Documents
CREATE TABLE IF NOT EXISTS Documents (
    id SERIAL PRIMARY KEY,
    firm_id INT NOT NULL REFERENCES Firms(id) ON DELETE CASCADE,
    case_id INT NOT NULL REFERENCES Cases(id) ON DELETE CASCADE,
    uploaded_by INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Invoices
CREATE TABLE IF NOT EXISTS Invoices (
    id SERIAL PRIMARY KEY,
    firm_id INT NOT NULL REFERENCES Firms(id) ON DELETE CASCADE,
    case_id INT NOT NULL REFERENCES Cases(id) ON DELETE CASCADE,
    client_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Unpaid',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
