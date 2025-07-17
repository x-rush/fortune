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
- ✅ 可视化产品管理界面
- ✅ 实时CRUD操作
- ✅ 产品图片管理
- ✅ 产品特性标签管理
- ✅ 分类筛选功能

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

## 🛠️ 快速开始

### 1. 安装依赖
```bash
# 克隆项目
git clone [your-repo-url]
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
cd server && npx json-server --watch db.json --port 3001

# 启动前端开发服务器 (端口3000)
npm run dev
```

### 3. 访问应用
- 🏠 **官网首页**: http://localhost:3000
- 🎛️ **管理后台**: http://localhost:3000/admin
- 🔧 **API接口**: http://localhost:3001/products

## 📋 管理后台使用指南

### 添加新产品
1. 访问 `http://localhost:3000/admin`
2. 点击右上角 **"添加新产品"** 按钮
3. 填写产品信息：
   - **产品名称** - 产品标题
   - **价格** - 产品价格
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
│   │   └── TechFeatures.tsx # 技术特色
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
│   ├── 📁 hooks/           # 自定义Hooks
│   ├── 📁 utils/           # 工具函数
│   └── 📁 constants/       # 常量定义
├── 📁 server/              # 后端模拟数据
│   └── db.json             # 产品数据库
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
```

### 生产环境
```env
VITE_API_URL=https://your-production-api.com
VITE_APP_TITLE=indexoob - 企业官网
```

## 🎨 主题定制

### 修改主色调
编辑 `src/index.css` 中的CSS变量：
```css
:root {
  --primary-color: #00bfff;
  --secondary-color: #1e90ff;
  --background-gradient: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
}
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
- 📧 邮箱: [your-email@example.com]
- 🐛 提交Issue: [GitHub Issues链接]

---

**⭐ 如果这个项目对你有帮助，请给个Star！**
