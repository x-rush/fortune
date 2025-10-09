# 🚀 indexoob - 企业官网 + 产品管理系统

一个基于 **Vite + React 19 + TypeScript** 构建的现代化企业官网，包含完整的产品展示和后台管理系统。

## ✨ 功能特点

### 🏢 企业官网
- ✅ 响应式设计，完美适配所有设备
- ✅ 现代化3D粒子背景动画
- ✅ 产品特色展示区
- ✅ 服务介绍页面
- ✅ 关于我们页面
- ✅ 联系我们表单

### 🎛️ 管理后台
- ✅ JWT 认证和授权
- ✅ 可视化产品管理界面
- ✅ 实时CRUD操作
- ✅ 产品图片管理
- ✅ 产品特性标签管理
- ✅ 分类筛选功能
- ✅ 联系表单消息管理
- ✅ 安全路由保护

## 🚀 技术栈

| 技术 | 版本 | 用途 |
|---|---|---|
| **Vite** | 7.x | 极速构建工具 |
| **React** | 19.x | 前端框架 |
| **TypeScript** | 5.8.x | 类型安全 |
| **Material-UI** | 7.x | 现代化UI组件库 |
| **Framer Motion** | 12.x | 动画效果 |
| **Three.js** | 0.178.x | 3D渲染 |
| **Axios** | 最新 | HTTP客户端 |
| **Node.js** | 18.x+ | 后端运行时 |
| **Express** | 4.x | 后端框架 |
| **JSON 文件存储** | 自定义 | 数据持久化 |
| **JWT** | 9.x | 身份认证 |
| **bcrypt** | 5.x | 密码加密 |

## 🛠️ 快速开始

### 1. 安装依赖
```bash
# 克隆项目
git clone git@github.com:x-rush/fortune.git
cd indexoob

# 安装依赖
npm install
```

### 2. 启动开发环境
```bash
# 一键启动（推荐）
./start-dev.sh

# 或者分别启动：
# 启动后端API (端口3001)
cd server && node index.js

# 启动前端开发服务器 (端口3000)
npm run dev
```

### 3. 访问应用
- 🏠 **官网首页**: http://localhost:3000 (或自动分配的端口)
- 🎛️ **管理后台**: http://localhost:3000/admin-access
- 🔧 **API接口**: http://localhost:3001/products
- 🔑 **管理员登录**: http://localhost:3000/admin-access

## 📋 管理后台使用指南

### 管理员登录
1. 访问 `http://localhost:3000/admin-access`
2. 使用 `.env` 文件中的管理员凭据登录
3. 默认凭据：
   - **用户名**: `admin`
   - **密码**: `indexoob@2025`

### 添加新产品
1. 登录管理后台
2. 点击右上角 **"添加新产品"** 按钮
3. 填写产品信息：
   - **产品名称** - 产品标题
   - **详细描述** - 产品详细介绍
   - **产品图片URL** - 产品图片链接
   - **产品分类** - 产品所属分类
   - **产品特性** - 可添加多个特性标签
   - **外部链接** - 详情页链接

### 编辑产品
1. 在产品卡片上点击 **"编辑"** 图标
2. 修改产品信息
3. 点击 **"更新"** 保存更改

### 删除产品
1. 在产品卡片上点击 **"删除"** 图标
2. 确认删除操作

## 📁 项目结构

```
indexoob/
├── 📁 public/              # 静态资源
│   ├── favicon.ico
│   ├── logo192.png
│   └── manifest.json
├── 📁 src/                 # 源代码
│   ├── 📁 components/      # 通用组件
│   │   ├── Navbar.tsx      # 导航栏
│   │   ├── TechHero.tsx    # 首页英雄区
│   │   ├── Services.tsx    # 服务介绍
│   │   ├── TechFeatures.tsx # 技术特色
│   │   ├── AdminProtectedRoute.tsx # 管理员路由保护
│   │   └── hero/           # Hero组件子目录
│   │       └── TechStackMatrix.tsx # 技术栈矩阵
│   ├── 📁 pages/           # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Products.tsx    # 产品展示
│   │   ├── Admin.tsx       # 管理后台
│   │   ├── About.tsx       # 关于我们
│   │   └── Contact.tsx     # 联系我们
│   ├── 📁 services/        # API服务
│   │   └── api.ts          # 产品API接口
│   ├── 📁 types/           # 类型定义
│   │   └── index.ts        # 全局类型
│   ├── theme.ts            # Material-UI主题配置
│   ├── App.tsx             # 应用根组件
│   └── main.tsx            # 应用入口
├── 📁 server/              # 后端服务
│   ├── index.js            # Express服务器主文件
│   ├── dataStore.js        # JSON文件数据存储层
│   ├── queryParser.js      # 查询解析中间件
│   ├── productRoutes.js    # 产品CRUD路由
│   ├── setup-auth.js       # 认证设置脚本
│   ├── db.json             # 产品数据库
│   ├── contact-messages.json # 联系消息数据库
│   └── package.json        # 后端依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── .env.example            # 环境变量模板
└── package.json            # 项目配置
```

## 🚀 部署指南

### 一键部署到Vercel
```bash
# 1. 构建项目
npm run build

# 2. 安装Vercel CLI
npm install -g vercel

# 3. 部署
vercel --prod
```

### 其他部署平台
- **Netlify**: 拖拽 `dist/` 文件夹即可
- **GitHub Pages**: 使用 GitHub Actions
- **Docker**: 支持容器化部署

## 🔧 环境配置

### 开发环境
复制 `.env.example` 为 `.env`：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=indexoob

# 服务器配置
ADMIN_USERNAME=admin
ADMIN_PASSWORD=indexoob@2025
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 生产环境
```env
VITE_API_URL=https://your-production-api.com
VITE_APP_TITLE=indexoob - 企业官网

# 服务器配置 (生产环境请修改为强密码)
ADMIN_USERNAME=your_production_admin
ADMIN_PASSWORD=your_strong_production_password
JWT_SECRET=your-super-production-secret-key-with-32-chars
```

## 🎨 主题定制

### 修改主题颜色
编辑 `src/theme.ts` 文件来定制 Material-UI 主题：
```typescript
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bfff', // 修改主色调
    },
    secondary: {
      main: '#1e90ff', // 修改次要颜色
    },
  },
});
```

### 添加新产品分类
编辑 `server/db.json`：
```json
{
  "products": [
    {
      "id": "1",
      "name": "新产品",
      "price": 99.99,
      "category": "新分类",
      ...
    }
  ]
}
```

## 🛡️ 开发规范

### 代码风格
- 使用 **Prettier** 进行代码格式化
- 使用 **ESLint** 进行代码检查
- 所有组件使用 **TypeScript** 编写

### Git工作流
```bash
# 提交前检查
npm run lint
npm run type-check
npm run format
```

## 🎯 性能优化

- ✅ **代码分割**: 路由级代码分割
- ✅ **懒加载**: 组件级懒加载
- ✅ **图片优化**: 支持WebP格式
- ✅ **缓存策略**: 智能缓存处理
- ✅ **构建优化**: 自动代码压缩和优化

## 📞 技术支持

如有问题或建议，请通过以下方式联系：
- 🐛 提交Issue: [GitHub Issues链接]

---

**⭐ 如果这个项目对你有帮助，请给个Star！**
