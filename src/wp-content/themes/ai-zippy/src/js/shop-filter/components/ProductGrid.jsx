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
                        onClick={async (e) => {
                            e.preventDefault();
                            const btn = e.currentTarget;
                            if (btn.classList.contains('loading')) return;

                            btn.classList.add('loading');
                            const originalText = btn.textContent;
                            btn.textContent = 'Adding...';

                            try {
                                const homeUrl = window.zippyShopData?.homeUrl || window.location.origin + '/';
                                const ajaxUrl = homeUrl.endsWith('/') ? homeUrl : homeUrl + '/';
                                const storeNonce = window.wcBlocksMiddlewareConfig?.storeApiNonce || window.zippyShopData?.storeNonce;
                                
                                let success = false;
                                let cartData = null;

                                // 1. PRIMARY ATTEMPT: Use Store API (Best for modern WooCommerce Blocks)
                                try {
                                    const storeResponse = await fetch(`${ajaxUrl}wp-json/wc/store/v1/cart/add-item`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Nonce': storeNonce,
                                            'X-WC-Store-API-Nonce': storeNonce
                                        },
                                        body: JSON.stringify({
                                            id: product.id,
                                            quantity: 1
                                        }),
                                        credentials: 'include'
                                    });

                                    if (storeResponse.ok) {
                                        cartData = await storeResponse.json();
                                        success = true;
                                    }
                                } catch (storeError) {
                                    console.warn('Store API failed:', storeError);
                                }

                                // 2. FALLBACK: Use Legacy AJAX if Store API failed
                                if (!success) {
                                    try {
                                        const formData = new FormData();
                                        formData.append('product_id', product.id);
                                        formData.append('quantity', 1);

                                        const response = await fetch(`${ajaxUrl}?wc-ajax=add_to_cart`, {
                                            method: 'POST',
                                            body: formData,
                                            credentials: 'include'
                                        });

                                        const responseJSON = await response.json().catch(() => null);
                                        if (responseJSON && !responseJSON.error) {
                                            success = true;
                                        }
                                    } catch (legacyError) {
                                        console.warn('Legacy Fallback failed:', legacyError);
                                    }
                                }

                                if (!success) {
                                    throw new Error('FAILED');
                                }

                                // SUCCESS UI STATE
                                btn.textContent = '✓ Added';
                                btn.classList.remove('loading');
                                btn.classList.add('added');
                                
                                // REFRESH LOGIC (Sync with Mini Cart)
                                try {
                                    // A. Update Block Mini Cart via @wordpress/data
                                    if (window.wp?.data?.dispatch) {
                                        const store = window.wp.data.dispatch('wc/store/cart');
                                        if (store) {
                                            if (cartData && store.receiveCart) {
                                                store.receiveCart(cartData);
                                            }
                                            // Force re-fetch to ensure all components are in sync
                                            store.invalidateResolution?.('getCart');
                                        }
                                    }

                                    // B. Trigger WC Block Events (specifically bubbles for React listeners)
                                    const blockEvent = new CustomEvent('wc-blocks_added_to_cart', {
                                        bubbles: true,
                                        cancelable: true,
                                        detail: { preserveCartData: !!cartData }
                                    });
                                    document.body.dispatchEvent(blockEvent);
                                    window.dispatchEvent(blockEvent);

                                    // C. Trigger Legacy jQuery Events (for classic mini-carts/header icons)
                                    if (window.jQuery) {
                                        const $ = window.jQuery;
                                        $(document.body).trigger('added_to_cart');
                                        $(document.body).trigger('wc_fragment_refresh');
                                    }
                                } catch (syncError) {
                                    console.warn('Sync Warning:', syncError);
                                }

                                setTimeout(() => {
                                    btn.textContent = originalText;
                                    btn.classList.remove('added');
                                }, 2000);

                            } catch (error) {
                                console.error('Final Catch:', error);
                                btn.textContent = 'Error: ' + error.message;
                                btn.classList.remove('loading');
                                setTimeout(() => {
                                    btn.textContent = originalText;
                                    btn.classList.remove('added');
                                }, 3000);
                            }
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
