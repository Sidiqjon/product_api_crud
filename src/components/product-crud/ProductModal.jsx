import React, { useEffect, useRef, useState } from "react"
import book from "../../assets/book.jpg"

const ProductModal = ({ onClose, onSubmit, edit, loading }) => {
  const name = useRef(null)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [img, setImg] = useState("")
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    if (edit) {
      name.current.value = edit.name || ""
      setDescription(edit.description || "")
      setPrice(edit.price || "")
      setImg(edit.img || "")
      setCategoryId(edit.categoryId?.toString() || "")
    }
  }, [edit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const product = {
      name: name.current.value,
      description,
      price,
      img,
      categoryId,
    }
    onSubmit(product)
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40"
      ></div>
      <div className="fixed top-1/2 left-1/2 bg-white z-50 p-6 rounded-lg shadow w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={onClose}
          className="absolute top-[8px] right-[8px] text-[16px] bg-transparent border-none cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 hover:text-red-600"
        >
          ❌
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Update Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            ref={name}
            required
            placeholder="Name"
            className="border rounded px-3 py-2 w-full"
            type="text"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
            className="border rounded px-3 py-2 w-full"
            type="text"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Price"
            className="border rounded px-3 py-2 w-full"
            type="number"
          />
          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            placeholder="Category ID"
            className="border rounded px-3 py-2 w-full"
            type="number"
          />
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            placeholder="Image URL"
            className="border rounded px-3 py-2 w-full"
            type="text"
          />
          {img && (
            <img
              src={img}
              onError={(e) => (e.currentTarget.src = book)}
              alt="Preview"
              className="w-full h-40 object-cover rounded"
            />
          )}
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : edit ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </>
  )
}

export default ProductModal
