import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ListingPage from './pages/ListingPage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<ListingPage />} />
      </Routes>
    </MotionConfig>
  )
}

export default App
