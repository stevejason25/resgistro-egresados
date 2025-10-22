import React from 'react'
import { createRoot } from 'react-dom/client' // Importa desde react-dom/client
import './index.css'
import { App } from './App'

// Nueva forma de renderizar en React 18
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}