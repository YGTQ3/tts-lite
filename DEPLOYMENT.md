# 🚀 部署指南

## 概述
本文档详细说明了如何将 TTS Website 部署到各种平台上。

## 支持的部署平台

### 1. Vercel (推荐)
Vercel 是 Next.js 的官方部署平台，提供最佳的性能和简单的部署体验。

#### 自动部署步骤：
1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 使用 GitHub 账号登录
4. 点击 "New Project"
5. 选择您的 tts-website 仓库
6. 在 "Environment Variables" 中添加：
   ```
   DASHSCOPE_API_KEY=your-actual-api-key
   ```
7. 点击 "Deploy"

#### 手动部署：
```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录中
cd frontend
vercel --prod
```

### 2. Netlify
#### 步骤：
1. 将代码推送到 GitHub
2. 访问 [netlify.com](https://netlify.com)
3. 点击 "New site from Git"
4. 选择 GitHub 并授权
5. 选择您的仓库
6. 设置构建设置：
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/.next`
7. 在 Environment variables 中添加：
   ```
   DASHSCOPE_API_KEY=your-actual-api-key
   ```

### 3. Railway
#### 步骤：
1. 访问 [railway.app](https://railway.app)
2. 使用 GitHub 登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择您的仓库
6. Railway 会自动检测到 Next.js 项目
7. 添加环境变量：
   ```
   DASHSCOPE_API_KEY=your-actual-api-key
   ```

## 环境变量配置

无论选择哪个平台，都需要配置以下环境变量：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DASHSCOPE_API_KEY` | 阿里云 DashScope API 密钥 | ✅ |

## 自定义域名

### Vercel
1. 在 Vercel Dashboard 中，进入您的项目
2. 点击 "Settings" → "Domains"
3. 添加您的自定义域名
4. 按照提示配置 DNS 记录

### Netlify
1. 在 Netlify Dashboard 中，进入您的站点
2. 点击 "Domain settings"
3. 点击 "Add custom domain"
4. 按照提示配置 DNS 记录

## 性能优化建议

1. **启用 CDN**: 大多数平台默认提供 CDN
2. **启用压缩**: 确保启用 gzip/brotli 压缩
3. **缓存策略**: 利用平台的缓存功能
4. **监控**: 设置性能监控和错误追踪

## 故障排除

### 常见问题

1. **API 密钥错误**
   - 确保 `DASHSCOPE_API_KEY` 正确设置
   - 检查 API 密钥是否有效

2. **构建失败**
   - 检查 Node.js 版本 (需要 16+)
   - 确保所有依赖都正确安装

3. **环境变量未生效**
   - 重新部署应用
   - 检查变量名是否正确

### 日志查看
- **Vercel**: Dashboard → Project → Functions → View Function Logs
- **Netlify**: Dashboard → Site → Functions → View Logs
- **Railway**: Dashboard → Project → Deployments → View Logs

## 安全注意事项

1. **API 密钥保护**
   - 永远不要在客户端代码中暴露 API 密钥
   - 使用环境变量存储敏感信息

2. **HTTPS**
   - 确保网站使用 HTTPS
   - 大多数平台默认提供免费 SSL 证书

3. **访问控制**
   - 考虑添加访问频率限制
   - 监控 API 使用情况

## 成本预估

| 平台 | 免费额度 | 付费计划 |
|------|----------|----------|
| Vercel | 100GB 带宽/月 | $20/月起 |
| Netlify | 100GB 带宽/月 | $19/月起 |
| Railway | $5 免费额度 | $5/月起 |

## 联系支持

如果在部署过程中遇到问题，请：
1. 查看平台的官方文档
2. 在 GitHub Issues 中提问
3. 联系平台客服