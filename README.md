# VC Agent - 产品订阅全栈应用

## 项目结构

```
vc-agent-app/
├── frontend/             # 前端React项目
│   ├── src/
│   │   ├── admin/        # 管理后台组件
│   │   │   ├── Login.jsx          # 登录页
│   │   │   └── Subscriptions.jsx  # 订阅数据列表页
│   │   ├── App.jsx       # 主应用组件（产品介绍页 + 路由配置）
│   │   ├── main.jsx      # 应用入口
│   │   └── index.css     # 全局样式
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/              # 后端Express项目
│   ├── index.js          # 后端入口文件
│   ├── config.js         # 配置文件（Supabase + 管理员账号）
│   └── package.json
└── README.md             # 项目说明文档
```

## 功能说明

### 前端产品介绍页
- 响应式设计，适配电脑
- 顶部导航栏显示产品名称
- 免费体验区提供产品试用链接
- 产品介绍区包含核心功能描述和视频占位符
- 版本选择区展示3个产品版本（基础版、增益版、顶配版）
- 订阅表单弹窗，支持用户名和手机号输入，手机号格式验证
- 提交成功后显示成功提示

### 后端功能
- 提供订阅数据的新增接口和查询接口
- 适配Supabase数据库，自动创建subscriptions表
- 管理后台接口需要管理员认证（默认账号：admin，密码：123456）

### 管理后台
- 登录页：输入管理员账号密码登录
- 订阅数据列表页：展示所有订阅数据，支持按版本筛选，按提交时间排序

## 技术栈

- 前端：React + Tailwind CSS + React Router
- 后端：Node.js + Express
- 数据库：Supabase

## 运行步骤

### 1. 配置Supabase

修改 `backend/config.js` 文件中的Supabase配置：

```javascript
module.exports = {
  supabase: {
    url: 'your-supabase-url',  // 替换为你的Supabase项目URL
    key: 'your-supabase-key',  // 替换为你的Supabase项目密钥
  },
  // 管理员账号配置
  admin: {
    username: 'admin',
    password: '123456'
  }
};
```

### 2. 安装依赖

#### 前端

```bash
cd frontend
npm install
```

#### 后端

```bash
cd backend
npm install
```

### 3. 启动项目

#### 后端（首先启动）

```bash
cd backend
npm run dev  # 使用nodemon启动，支持热重载
```

或

```bash
npm start  # 正常启动
```

后端服务将运行在 http://localhost:5000

#### 前端

```bash
cd frontend
npm run dev
```

前端服务将运行在 http://localhost:3000

## 访问地址

- 产品介绍页：http://localhost:3000
- 管理后台登录页：http://localhost:3000/admin
- 管理后台数据列表页：http://localhost:3000/admin/subscriptions

## API接口

### 1. 新增订阅数据

- URL: `POST /api/subscribe`
- 请求体：
  ```json
  {
    "username": "用户名",
    "phone": "11位手机号",
    "version": "产品版本"
  }
  ```
- 响应：
  ```json
  {
    "success": true,
    "data": [...]
  }
  ```

### 2. 查询订阅数据（需要管理员认证）

- URL: `POST /api/admin/subscriptions`
- 请求体：
  ```json
  {
    "username": "admin",
    "password": "123456",
    "version": "可选，产品版本筛选"
  }
  ```
- 响应：
  ```json
  {
    "success": true,
    "data": [...]
  }
  ```

### 3. 管理员登录验证

- URL: `POST /api/admin/login`
- 请求体：
  ```json
  {
    "username": "admin",
    "password": "123456"
  }
  ```
- 响应：
  ```json
  {
    "success": true,
    "message": "登录成功"
  }
  ```

## 注意事项

1. 确保Supabase项目已创建，并且subscriptions表已存在或允许自动创建
2. 本地开发时，前端通过Vite的代理配置自动转发API请求到后端
3. 生产环境部署时，需要配置正确的环境变量
4. 管理员密码建议在生产环境中修改为更安全的密码

## 开发说明

- 代码中添加了中文注释，便于理解和维护
- 支持本地联调，可直接运行前端和后端服务进行测试
- 前端使用Tailwind CSS实现响应式设计，适配不同屏幕尺寸
- 后端使用Express框架，代码结构清晰，易于扩展
