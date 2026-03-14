import express from 'express';
import cors from 'cors';
import { pool } from './utils/db.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'ok',
            time: result.rows[0].now,
            environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        console.error('Database connection failed', error);
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Backend server listening on port ${port}`);
    });
}

export default app;
