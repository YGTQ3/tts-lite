import { useState, useEffect } from 'react';
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
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const maxChars = 500;
  const charCount = text.length;
  const isOverLimit = charCount > maxChars;
  const isNearLimit = charCount > maxChars * 0.8 && !isOverLimit;
  
  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('tts-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('加载历史记录失败:', e);
      }
    }
  }, []);
  
  // 保存到历史记录
  const saveToHistory = (text, dialect, audioUrl) => {
    const newRecord = {
      id: Date.now(),
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      fullText: text,
      dialect,
      audioUrl,
      createdAt: new Date().toISOString()
    };
    
    const updatedHistory = [newRecord, ...history].slice(0, 10); // 只保留最近 10 条
    setHistory(updatedHistory);
    localStorage.setItem('tts-history', JSON.stringify(updatedHistory));
  };
  
  // 清除历史记录
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tts-history');
  };
  
  // 从历史记录中删除单条
  const deleteHistoryItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('tts-history', JSON.stringify(updatedHistory));
  };
  
  // 使用历史记录
  const useHistoryItem = (item) => {
    setText(item.fullText);
    setDialect(item.dialect);
    setAudioUrl(item.audioUrl);
    setShowHistory(false);
  };

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
          // 保存到历史记录
          saveToHistory(text, dialect, data.audio_url);
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
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white bg-opacity-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all text-sm sm:text-base ${
                isOverLimit 
                  ? 'border-red-500 border-opacity-100' 
                  : isNearLimit 
                    ? 'border-yellow-500 border-opacity-80' 
                    : 'border-white border-opacity-50'
              }`}
              placeholder="请输入要转换为语音的文本..."
              style={{ minHeight: '100px' }}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-1 sm:space-y-0">
              <div className={`text-xs sm:text-sm font-medium ${
                isOverLimit 
                  ? 'text-red-600' 
                  : isNearLimit 
                    ? 'text-yellow-600' 
                    : 'secondary-text'
              }`}>
                {charCount}/{maxChars} 字符
                {isOverLimit && '（已超出限制）'}
                {isNearLimit && '（接近限制）'}
              </div>
              {/* 进度条 */}
              <div className="w-full sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    isOverLimit 
                      ? 'bg-red-500' 
                      : isNearLimit 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((charCount / maxChars) * 100, 100)}%` }}
                />
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
          
          {/* 历史记录按钮 */}
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>历史记录 ({history.length})</span>
            </button>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerateButtonDisabled || isOverLimit}
            className={`btn-primary w-full py-4 rounded-lg font-medium flex items-center justify-center ${
              isOverLimit ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
          
          {/* 历史记录面板 */}
          {showHistory && (
            <div className="mt-6 p-4 bg-white bg-opacity-70 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-900">最近生成记录</h3>
                <div className="flex space-x-2">
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-red-600 hover:text-red-800 transition-colors"
                    >
                      清空全部
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {history.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">暂无历史记录</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item) => (
                    <div key={item.id} className="p-3 bg-white bg-opacity-60 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {item.dialect === 'mandarin' && '普通话'}
                          {item.dialect === 'shanghai' && '上海话'}
                          {item.dialect === 'beijing' && '北京话'}
                          {item.dialect === 'cantonese' && '粤语'}
                          {item.dialect === 'sichuan' && '四川话'}
                          {item.dialect === 'wu' && '吴语'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString('zh-CN')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.text}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => useHistoryItem(item)}
                          className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          使用
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          <p>© 2024 TTS-lite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
