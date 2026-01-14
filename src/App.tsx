import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import { Home } from './pages/Home/Home'
import { Products } from './pages/Products/Products'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
