# Next.js 迁移计划文档

## 📋 项目概述

### 当前架构
- **前端**: React 19.1.0 + Vite + TypeScript + Material-UI
- **后端**: Express.js + JSON文件存储
- **数据存储**: db.json (产品数据) + contact-messages.json (联系表单)
- **功能**: 产品展示、管理后台、联系表单、JWT认证
- **部署**: Vercel就绪

### 目标架构
- **全栈**: Next.js 14+ (App Router) + TypeScript + Material-UI
- **数据存储**: 保持JSON文件存储，无需数据库
- **功能**: 保持现有功能，增强性能和用户体验
- **部署**: Vercel 零配置部署

## 🎯 迁移目标

### 技术目标
1. **统一技术栈**: 从 React+Express 迁移到纯 Next.js
2. **性能优化**: 利用 SSR/SSG 提升首屏加载速度
3. **SEO优化**: 服务端渲染提升搜索引擎排名
4. **开发效率**: 简化技术栈，提升开发体验

### 业务目标
1. **用户体验**: 更快的加载速度，更好的交互体验
2. **维护成本**: 减少技术栈复杂度，降低维护成本
3. **扩展性**: 为未来功能扩展提供更好的架构基础
4. **部署简化**: 利用 Vercel 实现零配置部署

## 🏗️ 技术架构设计

### 新的项目结构
```
nextjs-project/
├── app/
│   ├── (public)/              # 公开路由组
│   │   ├── page.tsx           # 首页
│   │   ├── products/
│   │   │   └── page.tsx       # 产品展示
│   │   ├── about/
│   │   │   └── page.tsx       # 关于页面
│   │   └── contact/
│   │       └── page.tsx       # 联系表单
│   ├── (admin)/               # 管理路由组
│   │   ├── page.tsx           # 管理后台主页
│   │   ├── products/
│   │   │   ├── page.tsx       # 产品管理
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx # 编辑产品
│   │   │       └── page.tsx   # 产品详情
│   │   └── contact/
│   │       └── page.tsx       # 联系表单管理
│   ├── api/                   # API路由
│   │   ├── products/
│   │   │   ├── route.ts       # 产品CRUD
│   │   │   └── [id]/
│   │   │       └── route.ts   # 单个产品操作
│   │   ├── contact/
│   │   │   └── route.ts       # 联系表单
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts   # 登录
│   │       └── verify/
│   │           └── route.ts   # 验证
│   ├── actions/               # Server Actions
│   │   ├── products.ts        # 产品操作
│   │   ├── contact.ts         # 联系表单操作
│   │   └── auth.ts            # 认证操作
│   ├── components/            # React组件
│   │   ├── ui/                # 基础UI组件
│   │   ├── forms/             # 表单组件
│   │   ├── layout/            # 布局组件
│   │   └── hero/              # 首页组件
│   ├── lib/                   # 工具函数
│   │   ├── auth.ts            # 认证工具
│   │   ├── file-storage.ts    # 文件存储工具
│   │   ├── validation.ts      # 数据验证
│   │   └── utils.ts           # 通用工具
│   ├── middleware.ts          # 路由中间件
│   ├── layout.tsx             # 根布局
│   └── globals.css            # 全局样式
├── data/                      # 数据文件
│   ├── db.json                # 产品数据
│   ├── contact-messages.json  # 联系表单数据
│   └── auth.json              # 认证数据
├── public/                    # 静态资源
├── types/                     # TypeScript类型定义
├── next.config.mjs            # Next.js配置
├── tailwind.config.ts         # Tailwind CSS配置
├── tsconfig.json              # TypeScript配置
└── package.json               # 依赖管理
```

## 📦 依赖和配置

### 核心依赖
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^6.0.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^6.0.0",
    "framer-motion": "^10.16.0",
    "three": "^0.158.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.114.0",
    "axios": "^1.6.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "react-i18next": "^13.5.0",
    "i18next": "^23.7.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/bcrypt": "^5.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

### Next.js 配置 (next.config.mjs)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 支持文件系统存储
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
```

## 🔧 API 路由实现

### 产品 API (app/api/products/route.ts)
```typescript
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/db.json');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    let filteredProducts = db.products;
    if (search) {
      filteredProducts = db.products.filter((product: any) =>
        product.name.includes(search) ||
        product.description.includes(search)
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const newProduct = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString()
    };

    db.products.push(newProduct);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
```

### 认证 API (app/api/auth/login/route.ts)
```typescript
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = NextResponse.json({
        success: true,
        token,
        username,
        role: 'admin'
      });

      // 设置HTTP-only cookie
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
```

## 🎮 Server Actions 实现

### 产品 Server Actions (app/actions/products.ts)
```typescript
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
  category: z.string().min(1, 'Category is required'),
  features: z.array(z.string()),
  link: z.string().optional(),
});

const dbPath = path.join(process.cwd(), 'data/db.json');

export async function getProducts() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data).products;
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function createProduct(productData: any) {
  try {
    const validatedData = ProductSchema.parse(productData);
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const newProduct = {
      id: Date.now(),
      ...validatedData,
      createdAt: new Date().toISOString()
    };

    db.products.push(newProduct);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    revalidatePath('/products');
    revalidatePath('/admin/products');

    return { success: true, product: newProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function updateProduct(id: number, productData: any) {
  try {
    const validatedData = ProductSchema.parse(productData);
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const productIndex = db.products.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return { success: false, error: 'Product not found' };
    }

    const updatedProduct = {
      ...db.products[productIndex],
      ...validatedData,
      updatedAt: new Date().toISOString()
    };

    db.products[productIndex] = updatedProduct;
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);

    return { success: true, product: updatedProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: number) {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const productIndex = db.products.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return { success: false, error: 'Product not found' };
    }

    db.products.splice(productIndex, 1);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    revalidatePath('/products');
    revalidatePath('/admin/products');

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}
```

## 🛡️ 认证和授权

### 中间件 (middleware.ts)
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // 保护管理路由
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
```

### 认证工具 (lib/auth.ts)
```typescript
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface User {
  username: string;
  role: string;
}

export function verifyAuth(): User | null {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    return decoded;
  } catch {
    return null;
  }
}

export function createToken(user: User): string {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '24h' });
}

export function setAuthCookie(response: any, token: string) {
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60,
  });
}
```

## 📁 文件存储工具

### 文件存储管理 (lib/file-storage.ts)
```typescript
import fs from 'fs/promises';
import path from 'path';

export interface FileStorageOptions {
  encoding?: BufferEncoding;
  createIfNotExists?: boolean;
}

export class FileStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.join(process.cwd(), filePath);
  }

  async read(options: FileStorageOptions = {}): Promise<any> {
    const { encoding = 'utf8', createIfNotExists = false } = options;

    try {
      const data = await fs.readFile(this.filePath, encoding);
      return JSON.parse(data);
    } catch (error) {
      if ((error as any).code === 'ENOENT' && createIfNotExists) {
        await this.write({});
        return {};
      }
      throw error;
    }
  }

  async write(data: any, options: FileStorageOptions = {}): Promise<void> {
    const { encoding = 'utf8' } = options;
    const dir = path.dirname(this.filePath);

    // 确保目录存在
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), encoding);
  }

  async update(updater: (data: any) => any): Promise<void> {
    const currentData = await this.read({ createIfNotExists: true });
    const updatedData = updater(currentData);
    await this.write(updatedData);
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.filePath);
      return true;
    } catch {
      return false;
    }
  }

  async delete(): Promise<void> {
    await fs.unlink(this.filePath);
  }
}

// 预定义的存储实例
export const productStorage = new FileStorage('data/db.json');
export const contactStorage = new FileStorage('data/contact-messages.json');
export const authStorage = new FileStorage('data/auth.json');
```

## 🎨 组件迁移策略

### 1. 基础组件迁移
- **Material-UI 组件**: 直接迁移，保持现有样式
- **布局组件**: 适配 Next.js App Router
- **导航组件**: 使用 Next.js Link 组件
- **动画组件**: Framer Motion 直接复用

### 2. 页面组件迁移
- **静态页面**: 转换为 Server Components
- **动态页面**: 使用 Client Components + Server Actions
- **管理页面**: 实现认证保护

### 3. 特色组件适配
- **3D 组件**: Three.js + React Three Fiber
- **代码演示**: 转换为真正的交互式演示
- **粒子效果**: tsparticles 适配

## 🚀 迁移实施计划

### 阶段1: 基础搭建 (第1-2周)
1. **项目初始化**
   - 创建 Next.js 项目
   - 安装必要依赖
   - 配置 TypeScript 和 ESLint
   - 设置目录结构

2. **数据迁移**
   - 创建 data 目录
   - 迁移现有的 JSON 文件
   - 实现文件存储工具

3. **基础配置**
   - 配置环境变量
   - 设置 Tailwind CSS
   - 配置 Material-UI
   - 设置 ESLint 规则

### 阶段2: 后端实现 (第2-3周)
1. **API 路由开发**
   - 产品 CRUD API
   - 联系表单 API
   - 认证 API
   - 错误处理中间件

2. **Server Actions**
   - 产品操作 Actions
   - 联系表单 Actions
   - 认证 Actions
   - 数据验证

3. **认证系统**
   - JWT 实现
   - 中间件保护
   - Cookie 管理
   - 权限控制

### 阶段3: 前端迁移 (第3-5周)
1. **公共页面**
   - 首页迁移
   - 产品展示页面
   - 联系表单页面
   - 关于页面

2. **管理页面**
   - 管理员登录
   - 产品管理界面
   - 联系表单管理
   - 权限保护

3. **组件迁移**
   - 基础组件适配
   - 复杂组件重构
   - 动画组件优化
   - 3D 组件适配

### 阶段4: 功能完善 (第5-6周)
1. **特色功能**
   - 3D 粒子背景
   - 代码演示功能
   - 国际化支持
   - 响应式设计

2. **性能优化**
   - 图片优化
   - 代码分割
   - 缓存策略
   - SEO 优化

3. **测试和调试**
   - 单元测试
   - 集成测试
   - 性能测试
   - 兼容性测试

### 阶段5: 部署上线 (第6周)
1. **部署准备**
   - Vercel 配置
   - 环境变量设置
   - 域名配置
   - SSL 证书

2. **上线测试**
   - 生产环境测试
   - 性能监控
   - 错误监控
   - 用户反馈收集

3. **文档完善**
   - 技术文档
   - 部署文档
   - 维护文档
   - 用户手册

## ⚠️ 风险评估和应对策略

### 技术风险
1. **文件存储并发问题**
   - **风险**: 多个请求同时读写文件
   - **应对**: 实现文件锁机制，考虑升级数据库

2. **数据丢失风险**
   - **风险**: JSON 文件损坏
   - **应对**: 实现自动备份，数据恢复机制

3. **性能瓶颈**
   - **风险**: 大量数据时文件读取缓慢
   - **应对**: 实现数据分页，缓存策略

### 业务风险
1. **服务中断**
   - **风险**: 迁移过程中服务不可用
   - **应对**: 渐进式迁移，保持服务可用

2. **数据一致性**
   - **风险**: 数据迁移过程中的不一致
   - **应对**: 完整的测试和验证流程

3. **用户体验**
   - **风险**: 新系统用户不适应
   - **应对**: 保持UI一致性，提供过渡期

## 📊 预期收益

### 技术收益
- **性能提升**: 50-70% 的首屏加载速度提升
- **SEO优化**: 搜索引擎排名提升
- **维护成本**: 降低 40% 的维护工作量
- **开发效率**: 提升 30% 的开发速度

### 业务收益
- **用户体验**: 更快的响应速度，更好的交互体验
- **扩展性**: 为未来功能扩展提供坚实基础
- **竞争力**: 采用现代技术栈，提升技术形象
- **成本节约**: 减少服务器和运维成本

## 🔍 验收标准

### 功能验收
- [ ] 所有现有功能正常工作
- [ ] 管理员认证和权限控制
- [ ] 产品 CRUD 操作正常
- [ ] 联系表单功能正常
- [ ] 响应式设计适配

### 性能验收
- [ ] 首屏加载时间 < 2s
- [ ] SEO 评分 > 90
- [ ] 移动端性能评分 > 85
- [ ] 无重大性能问题

### 质量验收
- [ ] 代码覆盖率 > 80%
- [ ] 无安全漏洞
- [ ] 完整的文档
- [ ] 通过用户验收测试

## 📝 后续规划

### 短期优化 (迁移后1-2个月)
- 性能监控和优化
- 用户反馈收集和改进
- 功能完善和bug修复
- 文档和培训

### 中期发展 (迁移后3-6个月)
- 新功能开发和上线
- 数据分析和用户行为研究
- A/B测试和用户体验优化
- 技术架构持续优化

### 长期规划 (迁移后6-12个月)
- 考虑数据库升级
- 微服务架构演进
- 国际化和多语言支持
- 移动端应用开发

---

## 📞 联系信息

如有任何问题或需要技术支持，请联系开发团队：
- **技术负责人**: [姓名]
- **邮箱**: [邮箱地址]
- **电话**: [电话号码]
- **项目群**: [群链接]

---

*本文档最后更新时间: 2024年当前日期*