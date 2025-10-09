import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { Code, Storage, Cloud, Devices, Memory, Security, Speed, Analytics } from '@mui/icons-material';

interface TechStackMatrixProps {
  isDarkMode?: boolean;
}

interface Technology {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const TechStackMatrix: React.FC<TechStackMatrixProps> = ({ isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);
  
  const technologies: Technology[] = [
    // Frontend
    { name: 'React', category: 'frontend', icon: <Code />, color: '#61dafb', description: '构建现代用户界面的JavaScript库' },
    { name: 'TypeScript', category: 'frontend', icon: <Code />, color: '#3178c6', description: 'JavaScript的超集，添加静态类型' },
    { name: 'Next.js', category: 'frontend', icon: <Code />, color: '#000000', description: 'React框架，支持SSR和SSG' },
    { name: 'Material-UI', category: 'frontend', icon: <Code />, color: '#0081cb', description: 'React组件库，快速构建UI' },

    // Backend
    { name: 'Node.js', category: 'backend', icon: <Memory />, color: '#339933', description: 'JavaScript运行时环境' },
    { name: 'Golang', category: 'backend', icon: <Code />, color: '#00add8', description: 'Go语言，高性能并发编程' },
    { name: 'Java', category: 'backend', icon: <Code />, color: '#007396', description: '企业级编程语言，跨平台应用开发' },
    { name: 'Python', category: 'backend', icon: <Code />, color: '#3776ab', description: '高级编程语言' },
    { name: 'PHP', category: 'backend', icon: <Code />, color: '#777bb4', description: 'Web开发语言，Laravel生态系统' },
    { name: 'GraphQL', category: 'backend', icon: <Code />, color: '#e10098', description: 'API查询语言' },

    // Database
    { name: 'MongoDB', category: 'database', icon: <Storage />, color: '#47a248', description: 'NoSQL文档数据库' },
    { name: 'PostgreSQL', category: 'database', icon: <Storage />, color: '#336791', description: '关系型数据库' },
    { name: 'Redis', category: 'database', icon: <Memory />, color: '#dc382d', description: '内存数据结构存储' },
    { name: 'Firebase', category: 'database', icon: <Cloud />, color: '#ffca28', description: '实时数据库和认证' },

    // DevOps
    { name: 'Docker', category: 'devops', icon: <Devices />, color: '#2496ed', description: '容器化平台' },
    { name: 'Kubernetes', category: 'devops', icon: <Devices />, color: '#326ce5', description: '容器编排平台' },
    { name: 'CI/CD', category: 'devops', icon: <Speed />, color: '#ff6b6b', description: '持续集成和部署' },
    { name: 'AWS', category: 'devops', icon: <Cloud />, color: '#ff9900', description: '云计算服务' },

    // AI/ML
    { name: 'TensorFlow', category: 'ai', icon: <Analytics />, color: '#ff6f00', description: '机器学习框架' },
    { name: 'PyTorch', category: 'ai', icon: <Analytics />, color: '#ee4c2c', description: '深度学习框架' },
    { name: 'OpenAI', category: 'ai', icon: <Analytics />, color: '#10a37f', description: 'AI API集成' },

    // Security
    { name: 'OAuth', category: 'security', icon: <Security />, color: '#eb5424', description: '身份验证框架' },
    { name: 'JWT', category: 'security', icon: <Security />, color: '#000000', description: 'JSON Web Token' },
    { name: 'SSL/TLS', category: 'security', icon: <Security />, color: '#003e92', description: '加密通信协议' },
  ];

  const categories = [
    { id: 'all', name: '全部技术', count: technologies.length },
    { id: 'frontend', name: '前端开发', count: technologies.filter(t => t.category === 'frontend').length },
    { id: 'backend', name: '后端开发', count: technologies.filter(t => t.category === 'backend').length },
    { id: 'database', name: '数据库', count: technologies.filter(t => t.category === 'database').length },
    { id: 'devops', name: 'DevOps', count: technologies.filter(t => t.category === 'devops').length },
    { id: 'ai', name: 'AI/ML', count: technologies.filter(t => t.category === 'ai').length },
    { id: 'security', name: '安全', count: technologies.filter(t => t.category === 'security').length },
  ];

  const filteredTechs = selectedCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      maxWidth: 1200,
      mx: 'auto',
      p: { xs: 2, sm: 3, md: 4 },
    }}>
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{
          textAlign: 'center',
          mb: { xs: 3, sm: 4, md: 5 },
          background: isDarkMode
            ? 'linear-gradient(45deg, #00bfff, #1e90ff, #00bfff)'
            : 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textShadow: isDarkMode ? '0 0 30px rgba(0,191,255,0.3)' : 'none',
        }}>
          技术栈矩阵
        </Typography>
      </motion.div>

      {/* 分类标签 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.8, sm: 1, md: 1.5 }, mb: { xs: 3, sm: 4, md: 5 }, justifyContent: 'center' }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={`${category.name} (${category.count})`}
            onClick={() => handleCategoryChange(category.id)}
            color={selectedCategory === category.id ? 'primary' : 'default'}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              px: { xs: 1, sm: 1.5, md: 2 },
              py: { xs: 1.5, sm: 2, md: 2.5 },
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              fontWeight: 'medium',
              borderRadius: '20px',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,191,255,0.3)',
              },
              ...(selectedCategory === category.id && {
                background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
                color: '#fff',
              }),
            }}
          />
        ))}
      </Box>

      {/* 技术矩阵 */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(250px, 1fr))',
          sm: 'repeat(auto-fit, minmax(280px, 1fr))',
          md: 'repeat(auto-fit, minmax(320px, 1fr))',
          lg: 'repeat(auto-fit, minmax(350px, 1fr))',
        },
        gap: { xs: 2, sm: 2.5, md: 3 },
        minHeight: { xs: 350, sm: 400, md: 450 },
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'contents' }}
          >
            {filteredTechs.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredTech(tech)}
                onHoverEnd={() => setHoveredTech(null)}
              >
                <Paper
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5 },
                    height: '100%',
                    background: isDarkMode
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
                      : 'linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${tech.color}22`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: `linear-gradient(90deg, ${tech.color}, ${tech.color}88, transparent)`,
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                    },
                    '&:hover': {
                      boxShadow: `0 12px 40px ${tech.color}33, 0 4px 20px rgba(0,191,255,0.2)`,
                      transform: 'translateY(-6px) scale(1.02)',
                      '&::before': {
                        transform: 'translateX(0)',
                      },
                      border: `1px solid ${tech.color}44`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      color: tech.color,
                      mr: 2,
                      fontSize: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${tech.color}22, ${tech.color}11)`,
                      border: `1px solid ${tech.color}33`,
                    }}>
                      {tech.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{
                        color: isDarkMode ? '#fff' : '#000',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        mb: 0.5,
                      }}>
                        {tech.name}
                      </Typography>
                      <Typography variant="caption" sx={{
                        color: isDarkMode ? '#aaa' : '#666',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        opacity: 0.8,
                      }}>
                        {categories.find(c => c.id === tech.category)?.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{
                    color: isDarkMode ? '#bbb' : '#555',
                    lineHeight: 1.6,
                    fontSize: '0.9rem',
                  }}>
                    {tech.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* 悬浮信息提示 */}
      {hoveredTech && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          <Paper
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.85))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${hoveredTech.color}44`,
              borderRadius: '16px',
              maxWidth: { xs: 320, sm: 360, md: 400 },
              boxShadow: `0 8px 32px ${hoveredTech.color}33, 0 4px 16px rgba(0,0,0,0.3)`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${hoveredTech.color}, ${hoveredTech.color}88, transparent)`,
                borderRadius: '16px 16px 0 0',
              },
            }}
          >
            <Typography variant="h6" sx={{
              color: hoveredTech.color,
              mb: 1.5,
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textShadow: `0 0 20px ${hoveredTech.color}33`,
            }}>
              {hoveredTech.name}
            </Typography>
            <Typography variant="body2" sx={{
              color: isDarkMode ? '#ddd' : '#555',
              lineHeight: 1.6,
              fontSize: '0.95rem',
            }}>
              {hoveredTech.description}
            </Typography>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default TechStackMatrix;