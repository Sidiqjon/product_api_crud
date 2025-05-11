import React from "react"
import book from "../../assets/book.jpg"

const ProductCard = ({ product, onDelete, onUpdate }) => {
  if (!product) return null

  const { img, name, price, description } = product

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <div className="h-64 w-full mb-4">
        <img
          src={img}
          onError={(e) => (e.currentTarget.src = book)}
          alt={name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-green-600 font-semibold mb-4">{price} USD</p>
      <div className="flex justify-between">
        <button
          onClick={() => onUpdate(product)}
          className="bg-yellow-500 px-4 py-2 rounded text-white"
        >
          Update
        </button>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this product?")) {
              onDelete(product.id)
            }
          }}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard
