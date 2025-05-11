import React from "react"
import book from "../../assets/book.jpg"

const ProductCard = ({ product, onDelete, onUpdate }) => {
  if (!product) return null

  const { img, name, price, description } = product

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col gap-3">
      <div className="h-60 w-full overflow-hidden rounded-xl mb-2">
        <img
          src={img}
          onError={(e) => (e.currentTarget.src = book)}
          alt={name}
          className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      <p className="text-lg font-semibold text-green-600">{price} USD</p>
      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={() => onUpdate(product)}
          className="bg-yellow-500 hover:bg-yellow-600 transition-colors px-4 py-2 rounded-lg text-white font-medium"
        >
          Update
        </button>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this product?")) {
              onDelete(product.id)
            }
          }}
          className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard
