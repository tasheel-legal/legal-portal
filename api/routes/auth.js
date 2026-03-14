import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../utils/db.js';

const router = express.Router();

// Register a new client user
router.post('/register', async (req, res) => {
    const { firm_id, name, email, password } = req.body;

    if (!firm_id || !name || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ status: 'error', message: 'User with this email already exists' });
        }

        // Verify firm exists
        const firm = await pool.query('SELECT * FROM Firms WHERE id = $1', [firm_id]);
        if (firm.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Firm not found' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert new Client user
        const newUser = await pool.query(
            'INSERT INTO Users (firm_id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, firm_id',
            [firm_id, name, email, password_hash, 'Client']
        );

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Create JWT Payload
        const payload = {
            id: user.id,
            role: user.role,
            firm_id: user.firm_id
        };

        // Sign Token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1d' }
        );

        res.json({
            status: 'success',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                firm_id: user.firm_id
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;
