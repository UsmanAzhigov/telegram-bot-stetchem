CREATE TABLE IF NOT EXISTS quotes (
                        id SERIAL PRIMARY KEY,
                        quote_text TEXT NOT NULL,
                        author TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);