import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(express.json());


// Routes
import movieRoutes from './routes/movies.js';
app.use('/api/movies', movieRoutes);

// MongoDB connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
