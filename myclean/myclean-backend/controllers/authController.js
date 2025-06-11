const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
}

// 注册（保持不变）
exports.register = (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const users = readUsers();

  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ success: false, message: 'Username or email already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    role
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ success: true, user: newUser });
};

// 登录（修改版，增加role校验和异常处理）
exports.login = (req, res) => {
  const { usernameOrEmail, password, role } = req.body;
  if (!usernameOrEmail || !password || !role) {
    return res.status(400).json({ success: false, message: 'Username/email, password and role are required' });
  }

  const users = readUsers();

  const user = users.find(u =>
    (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
    u.password === password &&
    u.role === role
  );

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials or role' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
};
