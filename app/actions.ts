"use server"

import { getProducts, saveProduct, deleteProduct, getOrders, getSiteImages, saveSiteImages, Product } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function fetchProducts() {
    return await getProducts()
}

export async function upsertProduct(product: Product) {
    await saveProduct(product)
    revalidatePath("/admin/dashboard")
    revalidatePath("/")
    revalidatePath("/shop")
    return { success: true }
}

export async function removeProduct(id: number) {
    await deleteProduct(id)
    revalidatePath("/admin/dashboard")
    revalidatePath("/")
    revalidatePath("/shop")
    return { success: true }
}

export async function fetchOrders() {
    return await getOrders()
}

export async function fetchSiteImages() {
    return await getSiteImages()
}

export async function updateSiteImages(images: { [key: string]: string }) {
    await saveSiteImages(images)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    return { success: true }
}
