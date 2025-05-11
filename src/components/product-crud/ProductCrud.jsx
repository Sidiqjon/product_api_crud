import React, { useEffect, useState } from "react"
import { api } from "../../api"
import toast from "react-hot-toast"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"

const ProductCrud = () => {
  const [products, setProducts] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    api.get("/products?limit=1000").then((res) => {
      setProducts(res.data.data)
    })
  }, [])

  const openPopup = (product = null) => {
    setEdit(product)
    setPopupOpen(true)
  }

  const closePopup = () => {
    setEdit(null)
    setPopupOpen(false)
  }

  const handleCreateOrUpdate = (product) => {
    setLoading(true)
    if (edit) {
      if (!confirm("Are you sure you want to update this product?")) {
        setLoading(false)
        return
      }
      if (product.categoryId) {
        product.categoryId = Number(product.categoryId)
      }
      if (product.price) {
        product.price = Number(product.price)
      }
      const payload = {
        ...product, 
      }
      api
        .patch(`/products/${edit.id}`, payload)
        .then(() => {
          toast.success("Product updated")
          setProducts((prev) =>
            prev.map((item) =>
              item.id === edit.id ? { ...item, ...product } : item
            )
          )
          closePopup()
        })
        .catch(() => toast.error("Update failed"))
        .finally(() => setLoading(false))
    } else {
      
      const payload = { ...product, categoryId: Number(product.categoryId), price: Number(product.price) }

      api
        .post("/products", payload)
        .then((res) => {
          toast.success("Product created")
          setProducts((prev) => [...prev, res.data])
          closePopup()
        })
        .catch(() => toast.error("Creation failed"))
        .finally(() => setLoading(false))
    }
  }

  const handleDelete = (id) => {
    api.delete(`/products/${id}`).then(() => {
      toast.success("Product deleted")
      setProducts((prev) => prev.filter((item) => item.id !== id))
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <button
          onClick={() => openPopup()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={openPopup}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {popupOpen && (
        <ProductModal
          onClose={closePopup}
          onSubmit={handleCreateOrUpdate}
          edit={edit}
          loading={loading}
        />
      )}
    </div>
  )
}

export default ProductCrud
