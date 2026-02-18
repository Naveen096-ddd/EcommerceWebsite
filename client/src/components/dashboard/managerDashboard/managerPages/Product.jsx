import React, { useEffect, useState } from "react";
import {
  createProductApi,
  getProductsApi,
  updateProductApi,
  deleteProductApi,
} from "../../../../apis/Api";
import { furnitureProducts } from "../../../../assets/Assets";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    image: null,
    name: "",
    description: "",
    color: "",
    size: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProductsApi();
    setProducts(res.data);
  };

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    console.log("Picked file:", files[0]); // must show File
    setProduct((prev) => ({
      ...prev,
      image: files[0],
    }));
  } else {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("color", product.color);
  formData.append("size", product.size);
  formData.append("price", product.price);

  if (product.image) {
    formData.append("image", product.image); // 🔥 MUST MATCH upload.single("image")
  }
  for (let [k, v] of formData.entries()) {
    console.log(k, v); // image must be File, not {}
  }
  if (editId) {
    await updateProductApi(editId, formData);
  } else {
    await createProductApi(formData);
  }

  await fetchProducts();
  setOpen(false);
  setEditIndex(null);
  setEditId(null);
  setProduct({
    image: null,
    name: "",
    description: "",
    color: "",
    size: "",
    price: "",
  });
};


  const handleEdit = (item, index) => {
    setProduct({
      image: null, // image optional on update
      name: item.Product_name,
      description: item.description,
      color: item.color,
      size: item.size,
      price: item.price,
    });
    setEditIndex(index);
    setEditId(item.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProductApi(id);
    fetchProducts();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => {
            setOpen(true);
            setEditIndex(null);
            setEditId(null);
            setProduct({
              image: null,
              name: "",
              description: "",
              color: "",
              size: "",
              price: "",
            });
          }}
          className="ml-auto bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-md shadow"
        >
          + Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt="product"
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.Product_name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <span>🎨 {item.color}</span>
                <span>📏 {item.size}</span>
              </div>
              <p className="text-xl font-bold text-green-600">₹{item.price}</p>
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => handleEdit(item, index)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-1.5 rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <h2 className="text-2xl font-semibold mb-4">
              {editIndex !== null ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={product.color}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                  required
                />

                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={product.size}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                  required
                />
              </div>

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  {editIndex !== null ? "Update" : "Save"}
                </button>
              </div>
            </form>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
