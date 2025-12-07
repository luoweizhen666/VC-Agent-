const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const config = require('./config');

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 5000;

// 配置中间件
app.use(cors());
app.use(express.json());

// 初始化 Supabase 客户端
const supabase = createClient(config.supabase.url, config.supabase.key);

// 管理员验证中间件
const adminAuth = (req, res, next) => {
  const { username, password } = req.body;
  
  if (username === config.admin.username && password === config.admin.password) {
    next();
  } else {
    res.status(401).json({ error: '无效的管理员账号或密码' });
  }
};

// API 路由

// 1. 新增订阅数据
app.post('/api/subscribe', async (req, res) => {
  try {
    const { username, phone, version } = req.body;
    
    // 验证必填字段
    if (!username || !phone || !version) {
      return res.status(400).json({ error: '用户名、手机号和版本不能为空' });
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: '请输入正确的11位手机号' });
    }
    
    console.log('准备插入数据到 Supabase:', { username, phone, version });
    
    // 插入数据到 Supabase
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{
        username,
        phone,
        version
        // 不手动设置 submit_time，使用数据库默认值 NOW()
      }]);
    
    if (error) {
      console.error('Supabase 插入失败:', error);
      return res.status(500).json({ error: `数据库插入失败: ${error.message}` });
    }
    
    console.log('数据插入成功:', data);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('订阅失败:', error);
    res.status(500).json({ error: `服务器错误: ${error.message}` });
  }
});

// 2. 查询订阅数据（需要管理员验证）
app.post('/api/admin/subscriptions', adminAuth, async (req, res) => {
  try {
    const { version } = req.body;
    
    // 构建查询条件
    let query = supabase
      .from('subscriptions')
      .select('*')
      .order('submit_time', { ascending: false });
    
    // 如果指定了版本，则添加过滤条件
    if (version) {
      query = query.eq('version', version);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('查询订阅数据失败:', error);
    res.status(500).json({ error: '查询失败，请稍后重试' });
  }
});

// 3. 管理员登录验证
app.post('/api/admin/login', adminAuth, (req, res) => {
  res.status(200).json({ success: true, message: '登录成功' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('API 端点:');
  console.log('  - POST /api/subscribe (新增订阅)');
  console.log('  - POST /api/admin/subscriptions (查询订阅数据，需要管理员验证)');
  console.log('  - POST /api/admin/login (管理员登录)');
});
