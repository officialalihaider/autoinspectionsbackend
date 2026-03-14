const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const auth = require('./middlewares/authMiddleware');

app.use(express.static("public"));

// app.use(cors({ origin: '*' }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get("/", (req, res) => {
  res.send("AutoGemz Backend Running Successfully 🚗");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inspections', auth, require('./routes/inspectionRoutes'));
app.use('/api/users', auth, require('./routes/userRoutes'));
app.use('/api/pdf', auth, require('./routes/pdfRoutes'));
app.get('/api/health', (_, res) => res.json({ status: 'ok', version: 'v4' }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://aliseeyam1_db_user:rGM7MBNtwEVd4yHV@cluster0.90tv2yy.mongodb.net/')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚗 AutoGemz v4 running on port ${PORT}`));
