// Supabase 配置文件
// 请替换为您自己的 Supabase 项目信息
module.exports = {
  supabase: {
    url: process.env.SUPABASE_URL || 'https://whtzelaoybafrxmktxay.supabase.co',
    key: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodHplbGFveWJhZnJ4bWt0eGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjYzMzIsImV4cCI6MjA4MDUwMjMzMn0.Sc7WY13idQbbB1WcyC66v5E1UXdhNPx67ZzvVJ1zI4w',
  },
  // 管理员账号配置
  admin: {
    username: 'admin',
    password: '123456'
  }
};
