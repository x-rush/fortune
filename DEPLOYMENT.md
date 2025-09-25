# 部署指南

## 环境变量配置

### 开发环境
复制 `.env.example` 到 `.env` 并设置你的凭据：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
ADMIN_USERNAME=your_dev_username
ADMIN_PASSWORD=your_dev_password
JWT_SECRET=your_dev_secret
```

### 生产环境
复制 `.env.production` 并修改为生产环境配置：
```bash
cp .env.production .env
```

**重要：** 生产环境必须修改以下值：
- `ADMIN_USERNAME` - 使用强用户名
- `ADMIN_PASSWORD` - 使用强密码
- `JWT_SECRET` - 使用复杂的随机字符串

## Docker 部署

### 方式一：Docker Compose (一键部署)

#### 快速启动
```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 使用 Nginx 代理
```bash
# 启动应用 + Nginx
docker-compose --profile nginx up -d
```

#### 环境变量文件
创建 `.env` 文件用于 Docker Compose：
```env
ADMIN_USERNAME=your_production_username
ADMIN_PASSWORD=your_strong_password
JWT_SECRET=your_super_secret_key
```

#### 数据持久化
数据将保存在 `./data` 目录中：
- 数据库文件
- 联系消息
- 上传的文件

### 方式二：单独容器部署 (推荐已有 Nginx 的用户)

#### 1. 构建 Docker 镜像
```bash
# 构建镜像
docker build -t indexoob:latest .

# 或者指定标签
docker build -t indexoob:v1.0 .
```

#### 2. 运行容器
```bash
# 创建数据目录
mkdir -p ./data

# 运行容器
docker run -d \
  --name indexoob \
  --restart unless-stopped \
  -p 3001:3001 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/server:/app/server \
  -e ADMIN_USERNAME=your_username \
  -e ADMIN_PASSWORD=your_password \
  -e JWT_SECRET=your_jwt_secret \
  -e NODE_ENV=production \
  indexoob:latest
```

#### 3. 容器管理
```bash
# 查看容器状态
docker ps

# 查看日志
docker logs -f indexoob

# 停止容器
docker stop indexoob

# 启动容器
docker start indexoob

# 删除容器
docker rm indexoob

# 进入容器
docker exec -it indexoob sh
```

#### 4. 更新部署
```bash
# 构建新镜像
docker build -t indexoob:latest .

# 停止旧容器
docker stop indexoob

# 删除旧容器
docker rm indexoob

# 运行新容器
docker run -d \
  --name indexoob \
  --restart unless-stopped \
  -p 3001:3001 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/server:/app/server \
  -e ADMIN_USERNAME=your_username \
  -e ADMIN_PASSWORD=your_password \
  -e JWT_SECRET=your_jwt_secret \
  -e NODE_ENV=production \
  indexoob:latest
```

### 方式三：连接现有 Nginx

#### 1. 配置 Nginx
复制 `nginx-indexoob.conf` 到你的 nginx 配置目录：
```bash
# 复制配置文件
sudo cp nginx-indexoob.conf /etc/nginx/conf.d/indexoob.conf

# 修改配置文件中的域名和证书路径
sudo nano /etc/nginx/conf.d/indexoob.conf
```

#### 2. 测试 Nginx 配置
```bash
# 测试配置文件
sudo nginx -t

# 重新加载 Nginx
sudo systemctl reload nginx
```

#### 3. 配置示例
```nginx
# 在你的 nginx 配置中添加：
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 直接部署

### 使用 Node.js
```bash
# 安装依赖
npm install

# 设置环境变量
export ADMIN_USERNAME=your_username
export ADMIN_PASSWORD=your_password
export JWT_SECRET=your_secret

# 启动服务
npm start
```

### 使用 PM2
```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server/index.js --name indexoob

# 保存 PM2 配置
pm2 save
pm2 startup
```

## Vercel 部署

### 环境变量设置
在 Vercel 控制台中设置：
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

### 部署步骤
1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量
3. 部署会自动进行

## 安全建议

1. **强密码**: 使用至少 12 位包含大小写字母、数字和特殊字符的密码
2. **JWT 密钥**: 使用至少 32 位的随机字符串
3. **定期更换**: 定期更换密码和密钥
4. **HTTPS**: 生产环境必须使用 HTTPS
5. **防火墙**: 限制访问端口
6. **监控**: 监控服务器日志和访问情况

## 故障排除

### 常见问题
1. **环境变量缺失**: 确保所有必要的环境变量都已设置
2. **端口冲突**: 检查端口 3001 是否被占用
3. **权限问题**: 确保数据目录有正确的读写权限
4. **数据库文件**: 确保 `db.json` 和 `contact-messages.json` 存在

### 日志查看
```bash
# Docker 日志
docker-compose logs -f app

# 应用日志
tail -f /var/log/syslog
```

### 健康检查
应用提供了健康检查端点：
```bash
curl http://localhost:3001/api/products
```

## 备份策略

1. **数据库备份**: 定期备份 `data` 目录
2. **配置备份**: 保存 `.env` 文件的副本
3. **代码备份**: 使用 Git 版本控制