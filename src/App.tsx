import { useState } from 'react'
import Login from "./Login"
import Dashboard from "./Dashboard"

import Detail from "./Detail"

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'detail'>('login')

  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} />
  }

  if (currentPage === 'detail') {
    return <Detail onBack={() => setCurrentPage('dashboard')} />
  }

  return <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
}

export default App
