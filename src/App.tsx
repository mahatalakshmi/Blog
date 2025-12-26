import { Routes, Route } from 'react-router-dom'
import MagicalBackground from './components/MagicalBackground'
import MagicalHeader from './components/MagicalHeader'
import Home from './pages/Home'
import AllPosts from './pages/AllPosts'
import BlogPost from './pages/BlogPost'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <div className="relative min-h-screen">
      <MagicalBackground />
      <div className="relative z-10">
        <MagicalHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

