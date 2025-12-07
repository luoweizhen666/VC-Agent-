import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './admin/Login'
import Subscriptions from './admin/Subscriptions'

// 产品介绍页组件
const ProductPage = () => {
  // 状态管理
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    phone: ''
  })
  const [phoneError, setPhoneError] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // 产品版本数据
  const plans = [
    {
      id: 1,
      name: '基础版',
      price: 99,
      coPrice: 29,
      features: [
        '财务发票批量下载',
        '物流单据批量下载'
      ]
    },
    {
      id: 2,
      name: '增益版',
      price: 199,
      coPrice: 89,
      features: [
        '财务发票批量下载',
        '物流单据批量下载',
        '自动索赔'
      ]
    },
    {
      id: 3,
      name: '顶配版',
      price: 399,
      coPrice: 189,
      features: [
        '财务发票批量下载',
        '物流单据批量下载',
        '自动索赔',
        'AI数据分析'
      ]
    }
  ]

  // 打开订阅模态框
  const handleSubscribe = (plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
    setPhoneError('')
  }

  // 关闭订阅模态框
  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ username: '', phone: '' })
    setPhoneError('')
  }

  // 关闭成功模态框
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
  }

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除手机号错误信息
    if (name === 'phone') {
      setPhoneError('')
    }
  }

  // 验证手机号
  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 验证表单
    if (!formData.username.trim()) {
      alert('请输入用户名')
      return
    }
    
    if (!formData.phone.trim()) {
      alert('请输入手机号')
      return
    }
    
    if (!validatePhone(formData.phone)) {
      setPhoneError('请输入正确的11位手机号')
      return
    }
    
    try {
      // 发送订阅请求到后端
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
          version: selectedPlan.name
        })
      })
      
      const data = await response.json();
      
      if (response.ok) {
        // 显示成功信息
        setIsSuccessModalOpen(true)
        // 重置表单
        closeModal()
      } else {
        console.error('订阅失败:', data)
        alert(`订阅失败: ${data.error || '请稍后重试'}`)
      }
    } catch (error) {
      console.error('订阅请求失败:', error)
      alert(`网络错误: ${error.message || '请稍后重试'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">VC Agent</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 免费体验区 */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">免费体验产品</h2>
          <a 
            href="https://vc-assistant-2.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-lg"
          >
            https://vc-assistant-2.netlify.app/
          </a>
        </div>
      </section>

      {/* 产品介绍区 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">VC Agent - 智能财务助手</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              为企业提供高效的财务发票管理、物流单据处理、自动索赔和AI数据分析服务
            </p>
          </div>

          {/* 核心功能 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">📥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">发票与单据一键批量下载</h3>
              <p className="text-gray-600">快速批量下载各类财务发票和物流单据，提高工作效率</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">自动索赔</h3>
              <p className="text-gray-600">智能识别可索赔单据，自动生成索赔申请，减少人工操作</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI数据分析</h3>
              <p className="text-gray-600">通过AI技术对财务数据进行深度分析，提供有价值的业务 insights</p>
            </div>
          </div>

          {/* 产品视频占位符 */}
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-16">
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-xl">产品介绍视频占位符</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 版本选择区 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">选择适合您的版本</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">元/月</span>
                    <p className="text-sm text-green-600 mt-1">共创会员 {plan.coPrice}元/月</p>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300"
                  >
                    订阅
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">VC Agent</span>
            </div>
            <div className="flex space-x-8">
              <div>
                <p className="text-sm text-gray-400">联系电话</p>
                <p>400-123-4567</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">邮箱</p>
                <p>contact@vcagent.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 订阅表单模态框 */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">订阅 {selectedPlan.name}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">用户名 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入用户名"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">手机号 <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="请输入11位手机号"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">已选中版本</label>
                <input 
                  type="text" 
                  value={selectedPlan.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">共创会员价格</label>
                <input 
                  type="text" 
                  value={`${selectedPlan.coPrice}元/月`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                />
              </div>
              
              <div className="flex space-x-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300"
                >
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 成功提示模态框 */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">订阅成功</h3>
            <p className="text-gray-600 mb-6">我们会尽快联系您</p>
            <button 
              onClick={closeSuccessModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// 管理后台组件
const AdminPanel = () => {
  // 这里可以添加管理后台的布局和状态管理
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
    </Routes>
  )
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        {/* 产品介绍页路由 */}
        <Route path="/" element={<ProductPage />} />
        
        {/* 管理后台路由 */}
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
