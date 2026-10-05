CREATE TABLE IF NOT EXISTS submissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(40),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS submissions_email_idx ON submissions(email);
CREATE INDEX IF NOT EXISTS submissions_created_idx ON submissions(created_at DESC);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_submissions_modtime ON submissions;
CREATE TRIGGER update_submissions_modtime
    BEFORE UPDATE ON submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();