import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'store.json');

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: string;
    image: string | null;
    description?: string;
    category?: string;
    specifications?: { [key: string]: string };
    sku?: string;
    brand?: string;
};

export type Order = {
    id: string;
    customer: string;
    status: string;
    total: number;
    date: string;
    items: any[];
};

type DB = {
    products: Product[];
    orders: Order[];
    siteImages: { [key: string]: string };
};

async function readDB(): Promise<DB> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return default
        return { products: [], orders: [], siteImages: {} };
    }
}

async function writeDB(data: DB): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getProducts() {
    const db = await readDB();
    return db.products;
}

export async function saveProduct(product: Product) {
    const db = await readDB();
    const index = db.products.findIndex((p) => p.id === product.id);

    if (index >= 0) {
        db.products[index] = product;
    } else {
        db.products.push(product);
    }

    await writeDB(db);
    return product;
}

export async function deleteProduct(id: number) {
    const db = await readDB();
    db.products = db.products.filter((p) => p.id !== id);
    await writeDB(db);
    return true;
}

export async function getOrders() {
    const db = await readDB();
    return db.orders;
}

export async function getSiteImages() {
    const db = await readDB();
    return db.siteImages;
}

export async function saveSiteImages(images: { [key: string]: string }) {
    const db = await readDB();
    db.siteImages = { ...db.siteImages, ...images };
    await writeDB(db);
    return db.siteImages;
}
