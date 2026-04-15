import React from 'react';

const ProductCard = ({ product }) => {
    const mainCategory = product.categories?.[0]?.name || '';
    const onSale = product.on_sale;
    const isOos = product.stock_status === 'outofstock';
    const badge = onSale ? 'Sale' : (isOos ? 'Sold Out' : '');

    return (
        <div className="product-card">
            <a href={product.permalink} className="product-card-img">
                <img src={product.image} alt={product.name} loading="lazy" />
                {badge && <span className="product-badge">{badge}</span>}
            </a>
            <div className="product-card-body">
                <div className="product-cat">{mainCategory}</div>
                <a href={product.permalink} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-name">{product.name}</h3>
                </a>
                <p className="product-desc">{product.short_description || ''}</p>
                <div className="product-footer">
                    <div className="product-price">
                        {product.price_html ? (
                            <span dangerouslySetInnerHTML={{ __html: product.price_html }} />
                        ) : (
                            `$${product.price}`
                        )}
                    </div>
                    <button 
                        className="btn-cart"
                        disabled={isOos}
                        onClick={(e) => {
                            e.preventDefault();
                            const btn = e.currentTarget;
                            btn.textContent = '✓ Added';
                            btn.classList.add('added');
                            
                            // Trigger WooCommerce added_to_cart event if needed
                            document.body.dispatchEvent(new CustomEvent('added_to_cart', {
                                detail: {
                                    product_id: product.id,
                                    quantity: 1
                                }
                            }));

                            setTimeout(() => {
                                btn.textContent = 'Add to Cart';
                                btn.classList.remove('added');
                            }, 2000);
                        }}
                    >
                        {isOos ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductGrid = ({ products, loading, perPage }) => {
    if (loading && products.length === 0) {
        return (
            <div className="shop-product-grid">
                {Array.from({ length: perPage || 12 }).map((_, i) => (
                    <div key={i} className="product-card skeleton" style={{ height: '380px' }} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="shop-no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
                <p>No products found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className={`shop-product-grid ${loading ? 'is-loading' : ''}`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
