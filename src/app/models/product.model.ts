
import { Category } from "./category.model"

export interface Product {
   id: string,
   title: string,
   price: number,
   images: string[],
   description: string,
   category: Category,
   taxes?: number
}
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
   categoryId: number
}

// Partial => hace que todos los atributos sean obsionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

