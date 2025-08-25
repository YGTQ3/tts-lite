# 🎵 Qwen-TTS 语音合成平台（开源精简版）

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

## 📋 项目简介

这是一个基于阿里云 Qwen-TTS 技术的语音合成网站的开源精简版本。原项目包含用户认证和付费系统，此版本移除了这些功能，提供一个无需登录即可使用的简化语音合成服务。

## ✨ 功能特性

- 无需注册/登录，直接使用
- 支持多种中文方言（普通话、上海话、北京话、粤语、四川话、吴语等）
- 文本到语音的实时转换
- 音频播放和下载功能
- 简洁直观的用户界面

## 🛠️ 技术栈

- 前端：Next.js（React框架）
- UI：Tailwind CSS
- 语音合成：阿里云 DashScope Qwen-TTS API

## 🚀 快速开始

### 前置要求
- Node.js 16+ 
- 阿里云 DashScope API Key

### 安装和运行

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/tts-website.git
cd tts-website
```

2. **安装依赖**
```bash
cd frontend
npm install
```

3. **配置环境变量**
```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local` 文件，添加您的阿里云DashScope API Key：
```bash
DASHSCOPE_API_KEY=sk-your-actual-api-key-here
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
打开浏览器并访问 `http://localhost:3000`

## ⚠️ 安全说明

> **重要！** 请务必保护您的 API 密钥安全：
> - 不要将真实的 API 密钥提交到 GitHub
> - `.env.local` 文件已经被添加到 `.gitignore` 中
> - 只使用 `.env.local.example` 作为模板

## 📚 详细部署指南

### 本地开发

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置环境变量

复制示例环境变量文件并配置您的阿里云DashScope API Key：

```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local` 文件，添加您的阿里云DashScope API Key：

```
DASHSCOPE_API_KEY=sk-your-actual-api-key-here
```

### 3. 启动开发服务器

```bash
npm run dev
```

默认情况下，项目将在 `http://localhost:3000` 上运行。

### 4. 访问应用

打开浏览器并访问 `http://localhost:3000`，您将看到语音合成界面，可以直接使用文本转语音功能。

### 🚀 生产环境部署

### 1. 构建生产版本

```bash
npm run build
```

### 2. 启动生产服务器

```bash
npm run start
```

## 📋 配置要求

只需要配置阿里云 DashScope API Key 即可使用：

```bash
DASHSCOPE_API_KEY=sk-your-api-key
```

## 📝 注意事项

1. 文本长度限制为500字符
2. 无使用次数限制（开源版）
3. 无用户认证功能
4. 无付费功能

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📞 联系方式

如果您有任何问题或建议，请通过 GitHub Issues 联系我们。

## 📜 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。