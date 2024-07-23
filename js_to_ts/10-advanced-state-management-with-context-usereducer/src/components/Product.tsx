import {useContext, type FC} from 'react'
import {type PRODUCT_TYPE} from '../data'
import {CartContext} from '../store/shopping'

const Product: FC<PRODUCT_TYPE> = ({id, title, image, price, description}) => {
  const {addItemToCart} = useContext(CartContext)
  return (
    <>
      <article className="product">
        <img src={image} alt={title} />
        <div className="product-content">
          <div>
            <h3>{title}</h3>
            <p className="product-price">${price}</p>
            <p>{description}</p>
          </div>
          <p className="product-actions">
            <button onClick={() => addItemToCart(id)}>Add to Cart</button>
          </p>
        </div>
      </article>
    </>
  )
}

export default Product
