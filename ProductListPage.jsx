import React, { useState, useEffect } from 'react';
import './ProductListPage.css'; 

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(30); 

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setVisibleProductsCount(30); 
  };

  const loadMoreProducts = () => {
    setVisibleProductsCount(visibleProductsCount + 30);
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="product-list">
        {filteredProducts.slice(0, visibleProductsCount).map((product) => {
          console.log('Product Image URL:', product.image);
          return (
            <div key={product.id} className="product-card">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">No Image</div>
              )}
              
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      
      {filteredProducts.length > visibleProductsCount && (
        <button className="load-more-btn" onClick={loadMoreProducts}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductListPage;
