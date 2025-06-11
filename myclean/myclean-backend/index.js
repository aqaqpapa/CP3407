const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users'); // 确保写在上面

app.use('/api', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // ✅ 修复后的路径
app.use('/api/orders', bookingRoutes); // 添加这一行 ✅


app.get('/', (req, res) => {
  res.send('Hello MyClean Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
