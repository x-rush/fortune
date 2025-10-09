import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { PlayArrow, Code, Visibility, Refresh } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LiveCodeDemoProps {
  isDarkMode?: boolean;
}

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  demoComponent?: React.ReactNode;
}

const LiveCodeDemo: React.FC<LiveCodeDemoProps> = ({ isDarkMode = true }) => {
  const [selectedExample, setSelectedExample] = useState<string>('react-hook');
  const [isPlaying, setIsPlaying] = useState(false);
  const [output, setOutput] = useState<string>('');

  const codeExamples: CodeExample[] = [
    {
      id: 'react-hook',
      title: 'React Custom Hook',
      description: '创建一个自定义React Hook来管理状态',
      language: 'typescript',
      tags: ['React', 'TypeScript', 'Hook'],
      code: `import { useState, useEffect } from 'react';

const useCustomHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateValue = async (newValue: string) => {
    setLoading(true);
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      setValue(newValue);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    loading,
    error,
    updateValue,
  };
};

// 使用示例
const MyComponent = () => {
  const { value, loading, error, updateValue } = useCustomHook('Hello World');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => updateValue(e.target.value)}
        disabled={loading}
      />
      {loading && <p>加载中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};`,
    },
    {
      id: 'threejs-scene',
      title: 'Three.js 3D场景',
      description: '使用Three.js创建一个基本的3D场景',
      language: 'typescript',
      tags: ['Three.js', 'WebGL', '3D'],
      code: `import * as THREE from 'three';

class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;

  constructor(container: HTMLElement) {
    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011);

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00bfff,
      shininess: 100
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // 添加光源
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    // 启动动画循环
    this.animate();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // 旋转立方体
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  public resize = () => {
    const container = this.renderer.domElement.parentElement;
    if (container) {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
  };
}

// 使用示例
const container = document.getElementById('scene-container');
const scene = new ThreeScene(container);
window.addEventListener('resize', () => scene.resize());`,
    },
    {
      id: 'api-handler',
      title: 'API Handler',
      description: '创建一个优雅的API请求处理器',
      language: 'typescript',
      tags: ['API', 'TypeScript', 'Async'],
      code: `interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface ApiError {
  message: string;
  code: string;
  details?: any;
}

class ApiHandler {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = \`\${this.baseUrl}\${endpoint}\`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return {
        data,
        message: 'Success',
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          message: 'Request timeout',
          code: 'TIMEOUT',
        };
      }
      return {
        message: error.message,
        code: 'NETWORK_ERROR',
      };
    }
    return {
      message: 'Unknown error',
      code: 'UNKNOWN_ERROR',
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// 使用示例
const api = new ApiHandler('https://api.example.com');

// 获取数据
try {
  const response = await api.get<User>('/users/1');
  console.log(response.data);
} catch (error) {
  console.error('API Error:', error);
}

// 发送数据
try {
  const response = await api.post<Post>('/posts', {
    title: 'Hello World',
    content: 'This is a post',
  });
  console.log(response.data);
} catch (error) {
  console.error('API Error:', error);
}`,
    },
  ];

  const selectedCode = codeExamples.find(example => example.id === selectedExample);

  const executeCode = async () => {
    setIsPlaying(true);
    setOutput('正在执行代码...\n');

    // 模拟代码执行
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 根据不同的代码示例生成不同的输出
    if (selectedExample === 'react-hook') {
      setOutput(`✅ 代码执行成功！

📝 执行结果：
- Custom Hook 创建成功
- 状态管理正常工作
- 异步操作处理正确
- 错误处理机制完善

🎯 可以在React组件中使用：
const { value, loading, error, updateValue } = useCustomHook('Hello World');

📊 性能指标：
- 内存使用: 2.5MB
- 执行时间: 0.8ms
- 渲染性能: 优秀`);
    } else if (selectedExample === 'threejs-scene') {
      setOutput(`✅ 3D场景创建成功！

🎨 场景组成：
- 立方体几何体: 1x1x1
- 材质: 蓝色发光材质
- 光源: 方向光 x1
- 相机: 透视相机 (75° FOV)

🔧 功能特性：
- 实时动画循环
- 自适应尺寸调整
- 抗锯齿渲染
- 性能优化

🎮 交互控制：
- 自动旋转动画
- 响应式设计
- 窗口大小适配

📈 渲染统计：
- FPS: 60
- Draw Calls: 2
- 内存使用: 15MB`);
    } else if (selectedExample === 'api-handler') {
      setOutput(`✅ API处理器创建成功！

🔧 核心功能：
- RESTful API 支持
- 请求超时控制
- 错误处理机制
- 类型安全保证

🛡️ 安全特性：
- HTTPS 支持
- 请求头设置
- 错误信息过滤
- 超时保护

📊 性能优化：
- 请求去重
- 缓存机制
- 并发控制
- 内存管理

🎯 使用示例：
GET  /api/users/1     → 200 OK
POST /api/posts       → 201 Created
PUT  /api/users/1     → 200 OK
DELETE /api/users/1   → 204 No Content`);
    }

    setIsPlaying(false);
  };

  useEffect(() => {
    // 组件卸载时清理
    return () => {
      setIsPlaying(false);
    };
  }, []);

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      maxWidth: 1000,
      mx: 'auto',
      p: 3,
    }}>
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{
          textAlign: 'center',
          mb: 4,
          background: isDarkMode
            ? 'linear-gradient(45deg, #00bfff, #1e90ff, #00bfff)'
            : 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}>
          实时代码演示
        </Typography>
      </motion.div>

      {/* 代码示例选择 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, justifyContent: 'center' }}>
        {codeExamples.map((example) => (
          <Chip
            key={example.id}
            label={example.title}
            onClick={() => setSelectedExample(example.id)}
            color={selectedExample === example.id ? 'primary' : 'default'}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,191,255,0.3)',
              },
            }}
          />
        ))}
      </Box>

      {/* 代码展示区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCode && (
            <Paper
              sx={{
                p: 3,
                mb: 3,
                background: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,191,255,0.3)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: isDarkMode ? '#fff' : '#000', mb: 1 }}>
                  {selectedCode.title}
                </Typography>
                <Typography variant="body2" sx={{ color: isDarkMode ? '#aaa' : '#666', mb: 2 }}>
                  {selectedCode.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedCode.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(0,191,255,0.2)',
                        color: '#00bfff',
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* 代码编辑器 */}
              <Box sx={{
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid rgba(0,191,255,0.3)',
              }}>
                <SyntaxHighlighter
                  language={selectedCode.language}
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    background: isDarkMode ? '#1e1e1e' : '#f8f9fa',
                  }}
                >
                  {selectedCode.code}
                </SyntaxHighlighter>
              </Box>
            </Paper>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 控制按钮 */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          onClick={executeCode}
          disabled={isPlaying}
          startIcon={isPlaying ? <Refresh /> : <PlayArrow />}
          sx={{
            background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0099cc, #1e7acc)',
            },
          }}
        >
          {isPlaying ? '执行中...' : '运行代码'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOutput('')}
          startIcon={<Visibility />}
          sx={{
            borderColor: '#00bfff',
            color: '#00bfff',
            '&:hover': {
              backgroundColor: 'rgba(0,191,255,0.1)',
            },
          }}
        >
          清空输出
        </Button>
      </Box>

      {/* 输出区域 */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              sx={{
                p: 3,
                background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,255,0,0.3)',
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: '1.6',
              }}
            >
              <Typography variant="h6" sx={{ color: '#00ff00', mb: 2 }}>
                <Code sx={{ mr: 1, fontSize: '1rem' }} />
                执行结果
              </Typography>
              <Typography
                component="pre"
                sx={{
                  color: '#00ff00',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {output}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LiveCodeDemo;