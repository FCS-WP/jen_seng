import { useState, useEffect } from "react";
import { fetchProducts, fetchFilterOptions } from "./api.js";
import useFilters from "./useFilters.js";
import ProductGrid from "./components/ProductGrid.jsx";
import "./shop-filter.scss";

export default function ShopFilter({ config }) {
	const [options, setOptions] = useState(null);
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);

	const {
		filters,
		updateFilter,
		toggleCategory,
	} = useFilters({ per_page: config.per_page || 12 });

	// Load filter options once
	useEffect(() => {
		fetchFilterOptions().then(setOptions).catch(console.error);
	}, []);

	// Load products when filters change
	useEffect(() => {
		setLoading(true);
		fetchProducts(filters)
			.then((data) => {
				setProducts(data.products);
				setTotal(data.total);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [filters]);

	const activeCategory = filters.category ? filters.category.split(',')[0] : 'all';

	const handleCategoryClick = (catSlug) => {
		if (catSlug === 'all') {
			updateFilter("category", "");
		} else {
			updateFilter("category", catSlug);
		}
	};

	if (!options) {
		return (
			<div className="sf sf--loading">
				<div className="shop-header">
          <div className="shop-header-inner">
            <div className="skeleton" style={{ height: '20px', width: '200px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '44px', width: '300px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '22px', width: '100%', marginBottom: '32px' }} />
            <div className="filter-bar">
               {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: '40px', width: '120px' }} />)}
            </div>
          </div>
        </div>
			</div>
		);
	}

	return (
		<div className="sf">
      <div className="shop-header">
        <div className="shop-header-inner">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            Shop
          </div>
          <h1>Our Products</h1>
          <p>Browse our range of traditional Chinese herbs, tonics, and wellness remedies — curated from 30 years of expertise.</p>
          
          <div className="filter-bar">
            <button 
              className={`filter-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Products
            </button>
            {options.categories.map(cat => (
              <button 
                key={cat.id}
                className={`filter-tab ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="shop-body">
        <div className="shop-body-inner">
          <div className="shop-meta">
            <div className="shop-count">Showing <strong>{total}</strong> products</div>
            <select 
              className="sort-select" 
              value={`${filters.orderby}-${filters.order}`}
              onChange={(e) => {
                const [orderby, order] = e.target.value.split('-');
                updateFilter("orderby", orderby);
                setTimeout(() => updateFilter("order", order), 0);
              }}
            >
              <option value="menu_order-ASC">Sort by: Featured</option>
              <option value="price-ASC">Price: Low to High</option>
              <option value="price-DESC">Price: High to Low</option>
              <option value="date-DESC">Newest First</option>
            </select>
          </div>

          <ProductGrid
            products={products}
            loading={loading}
            perPage={filters.per_page}
          />

          {total > products.length && (
            <div className="load-more">
              <button 
                className="btn-outline" 
                onClick={() => updateFilter("per_page", filters.per_page + 12)}
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
		</div>
	);
}

