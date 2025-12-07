import { useState, useEffect } from 'react';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterVersion, setFilterVersion] = useState('');
  const [error, setError] = useState('');

  // 格式化日期时间
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 获取订阅数据
  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');

    try {
      // 为了简化，这里直接使用 admin 账号密码进行请求
      // 在实际生产环境中，应该使用更安全的认证方式，如 JWT
      const response = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'admin',
          password: '123456',
          version: filterVersion
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptions(data.data);
      } else {
        setError(data.error || '获取订阅数据失败');
      }
    } catch (err) {
      console.error('获取订阅数据请求失败:', err);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    fetchSubscriptions();
  }, [filterVersion]);

  // 处理版本筛选变化
  const handleVersionChange = (e) => {
    setFilterVersion(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">订阅数据管理</h2>
        
        {/* 筛选区域 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label htmlFor="version-filter" className="text-sm font-medium text-gray-700">按版本筛选：</label>
              <select
                id="version-filter"
                value={filterVersion}
                onChange={handleVersionChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">全部版本</option>
                <option value="基础版">基础版</option>
                <option value="增益版">增益版</option>
                <option value="顶配版">顶配版</option>
              </select>
            </div>
            
            <button
              onClick={fetchSubscriptions}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? '刷新中...' : '刷新数据'}
            </button>
          </div>
        </div>
        
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* 数据表格 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订阅版本</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    暂无订阅数据
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.version}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(sub.submit_time)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
