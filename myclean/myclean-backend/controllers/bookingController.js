const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/bookings.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllBookings = (req, res) => {
  const bookings = readData();
  res.json(bookings);
};

exports.getBookingById = (req, res) => {
  const bookings = readData();
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

exports.createBooking = (req, res) => {
  const bookings = readData();
  const newBooking = { id: Date.now(), ...req.body };
  bookings.push(newBooking);
  writeData(bookings);
  res.status(201).json(newBooking);
};

exports.updateBooking = (req, res) => {
  let bookings = readData();
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    writeData(bookings);
    res.json(bookings[index]);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

exports.deleteBooking = (req, res) => {
  let bookings = readData();
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = bookings.splice(index, 1);
    writeData(bookings);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};
