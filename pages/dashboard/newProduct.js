import React, { useState, useEffect } from 'react';

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    n_product: '',
    description: '',
    photo: '',
    id_category: '',
    a_stock: '',
    unit_price:''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (selectedProduct) {
      await fetch(`/api/updateproduct/${selectedProduct.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch('/api/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    }
    fetchProducts();
    setFormData({
      n_product: '',
      description: '',
      photo: '',
      id_category: '',
      a_stock: '',
      unit_price:''
    });
    setSelectedProduct(null);
    document.getElementById('submitBtn').innerText = 'Add Product';
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  const handleDelete = async (productId) => {
    try {
      await fetch(`/api/addproduct/${productId}`)
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (productId) => {
    const productToUpdate = products.find((product) => product.id === productId);
    if (productToUpdate) {
      setSelectedProduct(productToUpdate);
      setFormData({
        n_product: productToUpdate.n_product,
        description: productToUpdate.description,
        photo: productToUpdate.photo,
        id_category: productToUpdate.id_category,
        a_stock: productToUpdate.a_stock,
        unit_price : productToUpdate.unit_price
      });
      document.getElementById('submitBtn').innerText = 'Update Product';
    }
  };
  
  return (

    <div class="mt-4 mx-4">
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
    <div className="container h-full ml-14 mt-14 mb-10 md:ml-64 p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Add new product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div >
     
          {/* <!-- component --> */}
        <div class="bg-white w-full  shadow-md">
            <div class="py-8 px-8 rounded-xl">
                <h1 class="font-medium text-2xl mt-3 text-center">Login</h1>
                <form action="" class="mt-6" onSubmit={handleSubmit}>
                    <div class="my-5 text-sm">
                        <label for="Product Name" class="block text-black">Product Name</label>
                        <input type="text" autofocus id="Product name" name="n_product" value={formData.n_product} onChange={handleChange} class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-black" placeholder="Product Name" />
                     
                    </div>
                    <div class="my-5 text-sm">
                        <label for="description" class="block text-black">Description</label>
                        <input type="text" id="description" value={formData.description} onChange={handleChange} class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-black" placeholder="Description" />
                        
                    </div>
                    <div class="my-5 text-sm">
                        <label for="photo" class="block text-black">Photo</label>
                        <input type="text" id="photo"  value={formData.photo} onChange={handleChange} class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-black" placeholder="Photo Url" />
                        
                    </div>
                    <div class="my-5 text-sm">
                        <label for="a_stock" class="block text-black">Quantity</label>
                        <input type="text" id="a_stock" value={formData.a_stock} onChange={handleChange} class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-black" placeholder="Quantity" />
                        
                    </div>
                    <div class="my-5 text-sm">
                        <label for="unit_price" class="block text-black">unit_price</label>
                        <input type="number" id="unit_price" value={formData.unit_price} onChange={handleChange} class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full text-black" placeholder="unit_price" />
                        
                    </div>
                    

                    <button type="submit"
              id='submitBtn' class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">Add Product</button>
                </form>

            </div>
        </div>
        {/* ----- */}
        </div>
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id} className=" p-4 mb-4 rounded-md flex space-x-10 ">
                <div>
                  <p className="font-semibold">{product.n_product}</p>
                  <p>{product.description}</p>
                  <p>Available Stock: {product.a_stock}</p>
                </div>
                <div className="flex ">
                  <button className="bg-red-500 text-white p-2 rounded-md mr-2" onClick={() => handleDelete(product.id)}>Delete</button>
                  <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => handleUpdate(product.id)}>Update</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>

  );
};

export default NewProduct;
