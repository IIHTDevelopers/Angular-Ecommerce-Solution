import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', price: 30, description: 'Description for Product 3' }
  ];

  showForm: boolean = false;
  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';
  editing: boolean = false;
  editingProduct: Product | null = null;
  cart: CartItem[] = []; // Array to store added products for the cart

  toggleForm() {
    this.showForm = !this.showForm;
    this.editing = false;
    this.productName = '';
    this.productPrice = 0;
    this.productDescription = '';
    this.editingProduct = null;
  }

  editProduct(product: Product) {
    this.showForm = true;
    this.editing = true;
    this.productName = product.name;
    this.productPrice = product.price;
    this.productDescription = product.description;
    this.editingProduct = product;
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p.id !== product.id);
  }

  saveProduct() {
    if (this.editing && this.editingProduct) {
      // Update existing product
      this.editingProduct.name = this.productName;
      this.editingProduct.price = this.productPrice;
      this.editingProduct.description = this.productDescription;
    } else {
      // Add new product
      const newProduct: Product = {
        id: this.products.length + 1,
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription
      };
      this.products.push(newProduct);
    }
    this.toggleForm();
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  showCart() {
    this.cartVisible = true;
  }

  cartVisible: boolean = false;

  hideCart() {
    this.cartVisible = false;
  }
}
