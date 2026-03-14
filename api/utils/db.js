import { Pool } from '@neondatabase/serverless';

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/postgres'
});
