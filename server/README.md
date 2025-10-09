# Indexoob Express Server

这是用纯 Express.js 实现的后端服务器，完全替代了 JSON Server，提供了完整的 RESTful API 和管理员认证功能。

## 🚀 功能特性

- ✅ **纯 Express.js 实现** - 无需 JSON Server 依赖
- ✅ **完整的 RESTful API** - 支持产品的 CRUD 操作
- ✅ **JWT 身份认证** - 安全的管理员登录系统
- ✅ **联系表单处理** - 完整的消息收集和管理
- ✅ **文件存储** - 使用 JSON 文件进行数据持久化
- ✅ **TypeScript 支持** - 前端完全类型安全
- ✅ **生产环境就绪** - 支持静态文件服务和 SPA 路由

## 📡 API 端点

### 公开路由
- `GET /api/health` - 健康检查
- `GET /api/products` - 获取所有产品
- `GET /api/products/:id` - 获取单个产品
- `POST /api/contact` - 提交联系表单
- `POST /api/login` - 管理员登录
- `POST /api/verify-auth` - 验证 JWT Token

### 管理员路由（需要认证）
- `POST /admin/products` - 创建产品
- `PUT /admin/products/:id` - 更新产品
- `DELETE /admin/products/:id` - 删除产品
- `GET /api/admin/contact-messages` - 获取所有联系消息
- `PUT /api/admin/contact-messages/:id/read` - 标记消息为已读
- `DELETE /api/admin/contact-messages/:id` - 删除消息
- `DELETE /api/admin/contact-messages` - 清空所有消息

## 🔧 配置

### 环境变量
在项目根目录的 `.env` 文件中配置：

```env
# 服务器配置
PORT=3001
ADMIN_USERNAME=admin
ADMIN_PASSWORD=indexoob@2025
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 数据文件
- `db.json` - 产品数据存储
- `contact-messages.json` - 联系消息存储

## 🛠️ 开发

### 启动开发服务器
```bash
# 启动后端服务器
cd server
npm install
node index.js

# 或使用项目根目录的启动脚本
./start-dev.sh
```

### 安装依赖
```bash
cd server
npm install
```

### 设置管理员认证
```bash
cd server
npm run setup-auth
```

## 🏗️ 架构

```
server/
├── index.js              # 主服务器文件
├── db.json               # 产品数据
├── contact-messages.json # 联系消息
├── setup-auth.js         # 认证设置脚本
├── package.json          # 依赖配置
└── node_modules/         # 依赖包
```

## 📝 主要依赖

- `express` - Web 框架
- `cors` - 跨域支持
- `bcrypt` - 密码加密
- `jsonwebtoken` - JWT 认证
- `dotenv` - 环境变量管理

## 🎯 与前端集成

前端通过 `src/services/api.ts` 与后端通信，支持：
- 产品的完整 CRUD 操作
- 管理员身份认证
- 联系表单提交和管理
- TypeScript 类型安全

## 🔒 安全特性

- JWT Token 认证
- 密码 bcrypt 加密
- 管理员权限控制
- CORS 跨域保护
- 输入验证和错误处理

## 🚀 部署

生产环境部署时：
1. 确保 `JWT_SECRET` 是强密码
2. 修改默认的 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD`
3. 构建前端到 `build/` 目录
4. 启动服务器即可

## 🔄 迁移说明

此服务器完全替代了 JSON Server，提供了：
- 更好的性能和稳定性
- 完整的身份认证
- 自定义业务逻辑
- 生产环境就绪的架构