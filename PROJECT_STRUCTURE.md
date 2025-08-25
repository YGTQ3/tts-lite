# Qwen-TTS 开源版项目结构说明

## 项目概述

本项目是 Qwen-TTS 语音合成平台的开源简化版本，移除了用户认证和付费功能，提供匿名访问体验。

## 项目结构

```
.
├── README.md                 # 项目说明文档
├── LICENSE                   # MIT许可证
└── frontend/                 # 前端项目目录
    ├── package.json          # 项目配置和依赖
    ├── .env.local.example    # 环境变量示例配置
    ├── pages/                # 页面组件
    │   ├── _app.js           # 全局应用组件（已简化）
    │   ├── index.js          # 首页（主功能页面）
    │   └── api/              # API路由
    │       ├── health.js     # 健康检查接口
    │       └── tts/          # 语音合成接口
    │           └── generate.js # 语音生成接口（已简化）
    ├── components/           # UI组件
    │   ├── AudioPlayer.js    # 音频播放器组件
    │   ├── LoadingAnimation.js # 加载动画组件
    │   └── Navbar.js         # 导航栏组件（已简化）
    ├── hooks/                # React Hooks
    │   ├── useClientState.js # 客户端状态Hook（保留通用功能）
    │   ├── useErrorHandler.js # 错误处理Hook（保留通用功能）
    │   ├── useFormState.js   # 表单状态Hook（保留通用功能）
    │   ├── useSupabaseReady.js # Supabase状态Hook（已简化）
    │   └── useUserInfo.js    # 用户信息Hook（已简化）
    ├── constants/            # 常量定义
    │   └── styles.js         # 样式常量
    ├── styles/               # 样式文件
    ├── public/               # 静态资源
    └── node_modules/         # 依赖包（构建时自动生成）
```

## 主要变更

### 1. 移除用户认证依赖
- 删除了 `_app.js` 中的 Supabase 认证逻辑
- 移除了 `useAuth` 和 `useUserInfo` hooks 中的认证相关代码
- 简化了 `Navbar` 组件，移除了用户相关功能

### 2. 简化TTS接口
- 修改了 `/api/tts/generate` 接口，移除了用户认证检查
- 移除了使用次数限制和数据库操作
- 保留了核心的语音合成功能

### 3. 移除付费功能
- 删除了所有支付相关的API路由
- 删除了登录/注册页面
- 简化了套餐介绍页面，仅作信息展示

### 4. 环境变量清理
- 移除了所有与Supabase相关的环境变量
- 移除了所有与支付相关的环境变量
- 只保留了必要的 `DASHSCOPE_API_KEY` 环境变量

### 5. 移除后端服务
- 删除了独立的后端服务目录，使用 Next.js API Routes 实现所有后端功能

## 配置要求

只需要配置阿里云 DashScope API Key 即可使用：

```bash
DASHSCOPE_API_KEY=sk-your-api-key
```

## 部署方式

支持部署到 Vercel、Netlify 等静态网站托管平台，无需数据库支持。

## 注意事项

1. 文本长度限制为500字符
2. 无使用次数限制（开源版）
3. 无用户认证功能
4. 无付费功能