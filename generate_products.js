const fs = require('fs');

// Generate sample products
function generateProducts() {
    const categories = [
        { name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Smart Watches', 'Gaming'] },
        { name: 'Clothing & Shoes', subcategories: ['Running Shoes', 'Casual Wear', 'Formal Wear', 'Sportswear', 'Accessories'] },
        { name: 'Home & Garden', subcategories: ['Kitchen Appliances', 'Cleaning', 'Furniture', 'Decor', 'Tools'] },
        { name: 'Books', subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Biography'] },
        { name: 'Sports & Outdoors', subcategories: ['Fitness', 'Camping', 'Cycling', 'Swimming', 'Team Sports'] },
        { name: 'Beauty & Health', subcategories: ['Skincare', 'Makeup', 'Supplements', 'Personal Care'] }
    ];

    const brands = {
        'Electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Microsoft', 'Google', 'Dell', 'HP', 'Lenovo', 'Asus'],
        'Clothing & Shoes': ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'New Balance', 'Zara', 'H&M'],
        'Home & Garden': ['Dyson', 'KitchenAid', 'Instant Pot', 'Roomba', 'Black & Decker', 'IKEA'],
        'Books': ['Penguin', 'Random House', 'HarperCollins', 'Simon & Schuster', 'Macmillan'],
        'Sports & Outdoors': ['Nike', 'Adidas', 'Under Armour', 'Coleman', 'REI', 'Patagonia'],
        'Beauty & Health': ['L\'Oreal', 'Maybelline', 'CeraVe', 'Neutrogena', 'Olay', 'Clinique']
    };

    const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Silver', 'Gold', 'Pink', 'Purple'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

    const productNames = {
        'Smartphones': ['Pro Max', 'Ultra', 'Edge', 'Plus', 'Lite', 'Mini', 'Standard'],
        'Laptops': ['MacBook', 'ThinkPad', 'Inspiron', 'Pavilion', 'Surface', 'ZenBook'],
        'Running Shoes': ['Air Max', 'Ultraboost', 'Pegasus', 'React', 'Free Run', 'Gel'],
        'Kitchen Appliances': ['Mixer', 'Blender', 'Coffee Maker', 'Toaster', 'Air Fryer', 'Pressure Cooker']
    };

    const products = [];
    let id = 0;

    for (let i = 0; i < 2500; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];
        const brand = brands[category.name][Math.floor(Math.random() * brands[category.name].length)];
        
        const basePrice = Math.random() * 2000 + 10;
        const hasDiscount = Math.random() > 0.7;
        const discountPercentage = hasDiscount ? Math.floor(Math.random() * 50) + 5 : 0;
        const price = hasDiscount ? basePrice * (1 - discountPercentage / 100) : basePrice;
        
        const product = {
            name: generateProductName(subcategory, brand, i),
            category: category.name,
            subcategory: subcategory,
            brand: brand,
            price: Math.round(price * 100) / 100,
            original_price: hasDiscount ? Math.round(basePrice * 100) / 100 : undefined,
            rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
            review_count: Math.floor(Math.random() * 5000) + 10,
            description: generateDescription(subcategory, brand),
            in_stock: Math.random() > 0.15, // 85% in stock
            stock_quantity: Math.floor(Math.random() * 200) + 1,
            tags: generateTags(subcategory, category.name),
            color: shouldHaveColor(category.name) ? colors[Math.floor(Math.random() * colors.length)] : undefined,
            size: shouldHaveSize(category.name) ? sizes[Math.floor(Math.random() * sizes.length)] : undefined,
            weight: Math.round((Math.random() * 5000 + 50) * 100) / 100,
            release_date: generateReleaseDate(),
            discount_percentage: discountPercentage > 0 ? discountPercentage : undefined
        };

        products.push(product);
    }

    return products;
}

// More realistic product names
function generateProductName(subcategory, brand, index) {
    const productTypes = {
        'Smartphones': ['Galaxy', 'iPhone', 'Pixel', 'Xperia', 'OnePlus', 'Mi'],
        'Laptops': ['MacBook', 'ThinkPad', 'Inspiron', 'Pavilion', 'Surface', 'ZenBook', 'ROG', 'Predator'],
        'Running Shoes': ['Air Max', 'Ultraboost', 'Pegasus', 'React', 'Free Run', 'Gel', 'Wave', 'Zoom'],
        'Headphones': ['AirPods', 'WH', 'QuietComfort', 'Studio', 'Elite', 'Momentum']
    };
    
    const types = productTypes[subcategory] || ['Pro', 'Max', 'Ultra'];
    const type = types[Math.floor(Math.random() * types.length)];
    const model = Math.floor(Math.random() * 50) + 1;
    
    return `${brand} ${type} ${model}`;
}

function generateDescription(subcategory, brand) {
    const descriptions = {
        'Smartphones': 'Advanced smartphone with high-quality camera, fast processor, and long battery life',
        'Laptops': 'High-performance laptop perfect for work, gaming, and entertainment',
        'Running Shoes': 'Comfortable running shoes with advanced cushioning and support technology',
        'Kitchen Appliances': 'Professional-grade kitchen appliance for home cooking enthusiasts',
        'Skincare': 'Premium skincare product for healthy, radiant skin',
        'Fitness': 'Professional fitness equipment for home and gym workouts'
    };
    
    return descriptions[subcategory] || `Quality ${subcategory.toLowerCase()} from ${brand} with premium features and reliable performance`;
}

function generateTags(subcategory, category) {
    const tagMap = {
        'Smartphones': ['mobile', 'phone', '5G', 'camera', 'wireless'],
        'Laptops': ['computer', 'portable', 'work', 'gaming', 'productivity'],
        'Running Shoes': ['athletic', 'sport', 'comfort', 'performance', 'training'],
        'Kitchen Appliances': ['cooking', 'kitchen', 'appliance', 'home', 'chef']
    };
    
    const baseTags = tagMap[subcategory] || ['product', 'quality', 'popular'];
    return baseTags.slice(0, Math.floor(Math.random() * 3) + 2);
}

function shouldHaveColor(category) {
    return ['Electronics', 'Clothing & Shoes', 'Beauty & Health'].includes(category);
}

function shouldHaveSize(category) {
    return ['Clothing & Shoes'].includes(category);
}

function generateReleaseDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}

// Add seasonal trends
function addSeasonalPricing(price, category) {
    const month = new Date().getMonth();
    const isHolidaySeason = [10, 11].includes(month); // Nov, Dec
    const isSummerSale = [5, 6, 7].includes(month); // Jun, Jul, Aug
    
    if (isHolidaySeason && category === 'Electronics') {
        return price * 0.85; // 15% holiday discount
    }
    if (isSummerSale && category === 'Clothing & Shoes') {
        return price * 0.7; // 30% summer sale
    }
    return price;
}

// Generate and save products
const products = generateProducts();
const jsonlData = products.map(product => JSON.stringify(product)).join('\n');

fs.writeFileSync('bulk_products.jsonl', jsonlData);
console.log(`Generated ${products.length} products and saved to bulk_products.jsonl`);