import {type FC, type PropsWithChildren} from 'react'

const Shop: FC<PropsWithChildren> = ({children}) => {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  )
}

export default Shop
