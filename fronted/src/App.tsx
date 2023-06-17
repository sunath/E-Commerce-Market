import { useInsertionEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { writeAllCustomProperites } from './variables'
import { HeaderTop } from './components/Header/HeaderTop'
import { Header } from './components/Header/Header'
import { DiscountProducts } from './components/DicountProducts/DiscountProducts'
import { TrendingPopularProducts } from './components/Trending/TrendingProductTypes'
import { PopularProducts } from './components/PopularProducts/PopularProducts'
import { TopSale } from './components/DicountProducts/TopSale'

import "./styles/Components.css"
import { Recommands } from './components/PopularProducts/Recommands'
import { Services } from './components/Services'
import { FeedBacks } from './components/Feedbacks'
import { Sponsers } from './components/Sponsers'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)


  useInsertionEffect(() => {
    writeAllCustomProperites()
  })

  return (
    <>
      <Header></Header>
      <DiscountProducts />
      <TrendingPopularProducts />
      <PopularProducts />
      <TopSale />
      <Recommands />
      <Services />
      <FeedBacks />
      <Sponsers />
      <Footer />
    </>
  )
}

export default App