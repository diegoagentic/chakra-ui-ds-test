import { useState } from 'react'
import Login from "./Login"
import Dashboard from "./Dashboard"

import Detail from "./Detail"

import Workspace from "./Workspace"

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'detail' | 'workspace'>('login')

  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} />
  }

  if (currentPage === 'detail') {
    return <Detail onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'workspace') {
    return <Workspace onBack={() => setCurrentPage('dashboard')} />
  }

  return <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
}

export default App
