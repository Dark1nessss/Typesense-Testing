# Typesense Product Search

A simple e-commerce search interface powered by Typesense with faceted filtering and 2500+ sample products.

## Quick Start

### 1. Start Typesense
```bash
docker-compose up -d
```

### 2. Generate Sample Products
```bash
# Generate 2500+ products
node generate_products.js

# Import them into Typesense
curl -X POST 'http://localhost:8108/collections/products_v2/documents/import?action=create' \
  -H 'X-TYPESENSE-API-KEY: xyz' \
  -H 'Content-Type: text/plain' \
  --data-binary @bulk_products.jsonl
```

### 3. Open Search Interface
```bash
open search.html
# or just double-click search.html
```

## What You'll See

### Search Features
- **Real-time search** as you type
- **Faceted filtering** by category, brand, color, etc.
- **Multiple filter selection** with checkboxes
- **Sort options** by price, rating, reviews
- **Active filter tags** you can remove individually

### Sample Data
- **2500+ products** across 6 categories
- **Electronics**: Smartphones, Laptops, Tablets, etc.
- **Clothing & Shoes**: Running shoes, casual wear, etc.
- **Home & Garden**: Kitchen appliances, furniture, etc.
- **Books**: Fiction, non-fiction, educational, etc.
- **Sports & Outdoors**: Fitness, camping, cycling, etc.
- **Beauty & Health**: Skincare, makeup, supplements, etc.

### Try These Searches
- `apple` - Find Apple products
- `running shoes` - Athletic footwear
- `laptop` - Computer products
- `nike` - Nike brand items
- `discount` - Products on sale

## How It Works

1. **Typesense** runs in Docker (port 8108)
2. **Products** are stored in `products_v2` collection
3. **Search interface** queries Typesense API directly
4. **Facets** show real-time filter counts
5. **Filters** combine with AND logic between categories, OR within categories

## Files

- `docker-compose.yml` - Typesense container setup
- `generate_products.js` - Creates sample product data
- `search.html` - Search interface
- `bulk_products.jsonl` - Generated product data (2500+ items)

## API Endpoints

- Health check: `http://localhost:8108/health`
- Collections: `http://localhost:8108/collections`
- Search: `http://localhost:8108/collections/products_v2/documents/search`

That's it! You now have a fully functional e-commerce search with thousands of products.