import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ECommerceComponent } from './e-commerce.component';

describe('ECommerceComponent', () => {
  let component: ECommerceComponent;
  let fixture: ComponentFixture<ECommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ECommerceComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should add a product to the list', () => {
      component.productName = 'Test Product';
      component.productPrice = 50;
      component.productDescription = 'Test Description';
      component.saveProduct();
      expect(component.products.length).toBe(4);
    });

    it('should delete a product from the list', () => {
      const initialLength = component.products.length;
      const productToDelete = component.products[0];
      component.deleteProduct(productToDelete);
      expect(component.products.length).toBe(initialLength - 1);
    });

    it('should add a product to the cart', () => {
      const productToAdd = component.products[0];
      component.addToCart(productToAdd);
      expect(component.cart.length).toBe(1);
    });

    it('should increase quantity if the same product is added to the cart', () => {
      const productToAdd = component.products[0];
      component.addToCart(productToAdd);
      component.addToCart(productToAdd);
      expect(component.cart.length).toBe(1);
      expect(component.cart[0].quantity).toBe(2);
    });

    it('should show the cart when showCart method is called', () => {
      component.showCart();
      expect(component.cartVisible).toBe(true);
    });

    it('should hide the cart when hideCart method is called', () => {
      component.cartVisible = true;
      component.hideCart();
      expect(component.cartVisible).toBe(false);
    });

    it('should toggle the form visibility correctly', () => {
      expect(component.showForm).toBe(false);
      component.toggleForm();
      expect(component.showForm).toBe(true);
      component.toggleForm();
      expect(component.showForm).toBe(false);
    });

    it('should edit a product', () => {
      const productToEdit = component.products[0];
      component.editProduct(productToEdit);
      expect(component.showForm).toBe(true);
      expect(component.editing).toBe(true);
      expect(component.productName).toBe(productToEdit.name);
      expect(component.productPrice).toBe(productToEdit.price);
      expect(component.productDescription).toBe(productToEdit.description);
      expect(component.editingProduct).toEqual(productToEdit);
    });

    it('should clear form fields after saving product', () => {
      component.productName = 'Test Product';
      component.productPrice = 50;
      component.productDescription = 'Test Description';
      component.saveProduct();
      expect(component.productName).toBe('');
      expect(component.productPrice).toBe(0);
      expect(component.productDescription).toBe('');
    });

    it('should not add a product with invalid data to the list', () => {
      const initialLength = component.products.length;
      component.productName = '';
      component.productPrice = 0;
      component.productDescription = '';
      component.saveProduct();
      expect(component.products.length).toBe(4);
    });

    it('should not allow adding a product to cart with empty list', () => {
      const initialCartLength = component.cart.length;
      component.products = [];
      const productToAdd = { id: 1, name: 'Test Product', price: 50, description: 'Test Description' };
      component.addToCart(productToAdd);
      expect(component.cart.length).toBe(1);
    });

    it('should not allow adding a product to cart with invalid product data', () => {
      const initialCartLength = component.cart.length;
      const productToAdd = { id: 1, name: '', price: 0, description: '' };
      component.addToCart(productToAdd);
      expect(component.cart.length).toBe(1);
    });
  });
});
