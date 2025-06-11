const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.json');

// 读取所有用户
router.get('/', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read users file' });
  }
});

// 根据id获取用户
router.get('/:id', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to read users file' });
  }
});

// 根据id更新用户，保留密码字段，返回更新后的用户对象
router.put('/:id', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 保留原密码
    const originalPassword = users[idx].password;

    // 合并更新内容，保持id和password不变
    const updatedUser = {
      ...req.body,
      id: users[idx].id,
      password: originalPassword,
    };

    users[idx] = updatedUser;

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    // 返回更新后的用户数据
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
