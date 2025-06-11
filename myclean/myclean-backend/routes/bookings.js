const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFilePath = path.join(__dirname, '../data/bookings.json');

// 读取现有订单数据
function readBookings() {
  if (!fs.existsSync(bookingsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(bookingsFilePath, 'utf8');
  return JSON.parse(data);
}

// 写入订单数据
function writeBookings(bookings) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf8');
}
router.get('/:id', (req, res) => {
  const bookings = readBookings();
  const booking = bookings.find(b => String(b.id) === req.params.id); // ✅ 修复 parseInt 问题
  if (!booking) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  res.json(booking);
});

router.patch('/:id', (req, res) => {
  const bookings = readBookings();
  const bookingIndex = bookings.findIndex(b => String(b.id) === req.params.id); // ✅ 同样修复
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  const updatedBooking = {
    ...bookings[bookingIndex],
    ...req.body,
  };

  bookings[bookingIndex] = updatedBooking;
  writeBookings(bookings);
  res.json(updatedBooking);
});

// 获取所有订单列表
router.get('/', (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

// 创建新订单接口
router.post('/', (req, res) => {
  const {
    customerId, providerId, date, startTime, endTime,
    duration, notes, status, price, createdAt
  } = req.body;

  if (!customerId || !providerId || !date || !startTime || !endTime || !price) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const bookings = readBookings();

  const newBooking = {
    id: Date.now(), // 用时间戳作为简单 ID
    customerId,
    providerId,
    date,
    startTime,
    endTime,
    duration,
    notes,
    status,
    price,
    createdAt
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.status(201).json(newBooking); // 返回完整订单
});

module.exports = router;
