import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import AudioPlayer from '../components/AudioPlayer';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Home() {
  const [text, setText] = useState('');
  const [dialect, setDialect] = useState('mandarin'); // 默认为普通话
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    // 输入验证
    if (!text.trim()) {
      setError('请输入要转换的文本');
      return;
    }

    // 字数限制检查
    if (text.length > 500) {
      setError(`文本长度超出限制，当前 ${text.length} 字，最多 500 字`);
      return;
    }

    setIsLoading(true);
    setError('');
    setAudioUrl(''); // 清除之前的音频

    try {
      console.log('开始语音生成:', { text: text.substring(0, 50), dialect });

      const response = await fetch('/api/tts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, dialect })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('语音生成成功:', data);

        if (data.audio_url) {
          setAudioUrl(data.audio_url);
        } else {
          setError('语音生成失败：未返回音频文件');
        }
      } else {
        const errorData = await response.json();
        console.error('语音生成失败:', errorData);
        setError(errorData.error || '生成失败');
      }
    } catch (err) {
      console.error('语音生成错误:', err);
      setError('网络错误，请检查网络连接后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const charCount = text.length;
  const maxChars = 500;
  const isGenerateButtonDisabled = isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Qwen-TTS 语音生成</title>
        <meta name="description" content="AI 语音生成，支持多种方言" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>" />
      </Head>

      <Navbar />

      {/* 英雄区 */}
      <section id="hero" className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="glass-card p-6 sm:p-8 md:p-12 max-w-4xl mx-auto fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-blue-900">AI 语音生成</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 secondary-text">将文本转换为自然语音，支持多种方言和情感表达</p>
          

          
          <div className="mb-6">
            <label htmlFor="textInput" className="block mb-2 text-blue-900 text-sm sm:text-base">输入文本</label>
            <textarea
              id="textInput"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white bg-opacity-50 border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all text-sm sm:text-base"
              placeholder="请输入要转换为语音的文本..."
              style={{ minHeight: '100px' }}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-1 sm:space-y-0">
              <div className="text-xs sm:text-sm secondary-text">
                {charCount}/{maxChars} 字符
              </div>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <label className="block mb-2 text-blue-900 text-sm sm:text-base">语音选择</label>
            <div className="dialect-selector grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setDialect('mandarin')}
                className={`dialect-option ${dialect === 'mandarin' ? 'active' : ''}`}
              >
                <span className="dialect-icon">普</span>
                <span className="dialect-name">普通话 (Cherry)</span>
              </button>
              <button
                onClick={() => setDialect('shanghai')}
                className={`dialect-option ${dialect === 'shanghai' ? 'active' : ''}`}
              >
                <span className="dialect-icon">沪</span>
                <span className="dialect-name">上海话 (Serena)</span>
              </button>
              <button
                onClick={() => setDialect('beijing')}
                className={`dialect-option ${dialect === 'beijing' ? 'active' : ''}`}
              >
                <span className="dialect-icon">京</span>
                <span className="dialect-name">北京话 (Ethan)</span>
              </button>
              <button
                onClick={() => setDialect('cantonese')}
                className={`dialect-option ${dialect === 'cantonese' ? 'active' : ''}`}
              >
                <span className="dialect-icon">粤</span>
                <span className="dialect-name">粤语 (Chelsie)</span>
              </button>
              <button
                onClick={() => setDialect('sichuan')}
                className={`dialect-option ${dialect === 'sichuan' ? 'active' : ''}`}
              >
                <span className="dialect-icon">川</span>
                <span className="dialect-name">四川话 (Sunny)</span>
              </button>
              <button
                onClick={() => setDialect('wu')}
                className={`dialect-option ${dialect === 'wu' ? 'active' : ''}`}
              >
                <span className="dialect-icon">吴</span>
                <span className="dialect-name">吴语 (Jada)</span>
              </button>
            </div>
          </div>
          
          {/* 错误信息 */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            onClick={handleGenerate}
            disabled={isGenerateButtonDisabled}
            className="btn-primary w-full py-4 rounded-lg font-medium flex items-center justify-center"
          >
            <span>{isLoading ? '正在生成语音，请稍候...' : '生成语音'}</span>
            {isLoading && (
              <svg className="loading-spinner ml-2 h-5 w-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>

          {/* 生成进度提示 */}
          {isLoading && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <svg className="animate-spin h-4 w-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 text-sm">
                  正在调用 AI 语音合成服务，预计需要 10-30 秒...
                </span>
              </div>
            </div>
          )}
          
          {/* 音频播放区域 */}
          {audioUrl && (
            <AudioPlayer
              audioUrl={audioUrl}
              onClose={() => setAudioUrl('')}
            />
          )}
        </div>

        {/* 加载动画 */}
        <LoadingAnimation isVisible={isLoading} />
      </section>

      {/* 功能特点区 */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">功能特点</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-blue-900">多方言支持</h3>
            <p className="secondary-text">支持四川话、上海话、北京话等多种方言，让语音更具地方特色。</p>
          </div>
          
          <div className="glass-card p-8 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-blue-900">高自然度</h3>
            <p className="secondary-text">采用先进的深度学习模型，生成的语音自然流畅，接近真人发音。</p>
          </div>
          
          <div className="glass-card p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-blue-900">快速生成</h3>
            <p className="secondary-text">极速响应，文本输入后秒级生成语音，大幅提升工作效率。</p>
          </div>
        </div>
      </section>

      
      

      

      {/* 页脚 */}
      <footer className="py-12">
        <div className="container mx-auto px-6 text-center secondary-text">
          <p>© 2024 Qwen-TTS. All rights reserved.</p>
          <p className="mt-4">页面内容均由 AI 生成，仅供参考</p>
        </div>
      </footer>
    </div>
  );
}
