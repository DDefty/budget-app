import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Budget App</h1>
          <p className="text-blue-600">Tailwind CSS is working! 🎉</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Count is {count}
          </button>
          
          <div className="flex justify-center space-x-4">
            <a href="https://vite.dev" target="_blank" className="text-blue-500 hover:text-blue-700">
              <img src={viteLogo} className="w-8 h-8" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="text-blue-500 hover:text-blue-700">
              <img src={reactLogo} className="w-8 h-8 animate-spin" alt="React logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
