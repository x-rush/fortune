#!/bin/bash
echo "🚀 启动开发环境..."

# 启动后端服务器
echo "📡 启动后端服务器..."
if [ ! -d "server" ]; then
  echo "❌ server目录不存在，请在正确的位置运行此脚本"
  exit 1
fi
cd server
npm install
npm run setup-auth
node index.js &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端
echo "⚛️  启动前端应用..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ 开发环境已启动！"
echo "📱 前端: http://localhost:3000"
echo "🔧 后端: http://localhost:3001"
echo "🎛️  管理后台: http://localhost:3000/admin-access"
echo "🔑 管理员账号: 请查看 .env 文件中的 ADMIN_USERNAME 和 ADMIN_PASSWORD"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 捕获中断信号
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# 等待用户输入
wait