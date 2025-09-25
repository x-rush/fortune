# Vercel 部署流程

## 项目支持 Vercel 无缝部署！

该项目已经配置为支持 Vercel 全栈部署，包括：
- 🚀 React 前端自动构建和部署
- 🛠️ Node.js 后端 API 自动转换为 Serverless Functions
- 📦 文件系统数据持久化
- 🔒 JWT 认证和授权
- 🌍 全局 CDN 加速

## 1. 准备工作

### 安装 Vercel CLI
```bash
npm install -g vercel
```

### 登录 Vercel
```bash
vercel login
```

## 2. 部署步骤

### 方法一：通过 Vercel CLI 部署

1. **初始化项目**
```bash
vercel
```

2. **配置环境变量**
```bash
vercel env add VITE_API_URL
```

3. **部署到生产环境**
```bash
vercel --prod
```

### 方法二：通过 GitHub 连接部署

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **在 Vercel 控制台中**
   - 登录 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 配置环境变量：
     - `VITE_API_URL`: `/api` (使用相对路径，Vercel 会自动处理)
     - `JWT_SECRET`: 你的 JWT 密钥（生产环境请使用强密码）

3. **自动部署**
   - Vercel 会自动检测项目配置并部署
   - 每次推送代码都会自动重新部署

## 3. 环境变量配置

### 生产环境变量
在 Vercel 控制台中设置：
```
VITE_API_URL=/api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 本地开发环境
复制 `.env.example` 到 `.env.local`：
```bash
cp .env.example .env.local
```

## 4. 自定义域名配置

1. **在 Vercel 控制台中**
   - 进入项目设置
   - 点击 "Domains"
   - 添加你的域名

2. **DNS 配置**
   - 添加 CNAME 记录指向 `cname.vercel-dns.com`
   - 或配置 A 记录指向 Vercel 的 IP 地址

## 5. 部署后检查

### 构建输出
- 构建文件输出到 `build/` 目录
- 静态资源自动优化并部署到 CDN

### 性能优化
- 自动启用 Gzip 压缩
- 静态资源缓存优化
- 全球 CDN 分发

## 6. 故障排除

### 常见问题
1. **构建失败**
   - 检查 `npm run build` 是否在本地通过
   - 确认所有依赖都已正确安装

2. **API 请求失败**
   - 检查 `VITE_API_URL` 环境变量是否正确
   - 确认生产 API 服务器可访问

3. **路由问题**
   - Vercel 自动支持 React Router 的 SPA 路由
   - 确保所有路由都以 `/` 开头

### 调试命令
```bash
# 查看部署日志
vercel logs

# 本地预览生产构建
npm run build && npm run preview
```

## 7. 持续集成

### 自动化部署
- GitHub 集成：每次 push 自动部署
- 分支预览：每个 PR 生成预览链接
- 自动回滚：构建失败时自动回滚到上一个版本

### 监控和分析
- Vercel Analytics：访问分析和性能监控
- Speed Insights：页面性能优化建议
- 错误监控：集成 Sentry 或其他错误监控工具