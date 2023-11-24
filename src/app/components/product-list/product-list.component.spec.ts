import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [ProductService, CartService],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display "Product List" heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h2');
      expect(heading.textContent).toContain('Product List');
    });

    it('should have "Add Product" button to redirect to /products/add', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('button[routerLink="/products/add"]');
      expect(addButton).toBeTruthy();
      expect(addButton.textContent).toContain('Add Product');
    });

    it('should display product details when products are available', () => {
      const productsMock = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 5 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20, quantity: 10 }
      ];
      jest.spyOn(productService, 'getProducts').mockReturnValue(of(productsMock));
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const productRows = compiled.querySelectorAll('tbody tr');
      expect(productRows.length).toBe(2);
      const firstProductColumns = productRows[0].querySelectorAll('td');
      expect(firstProductColumns[0].textContent).toContain('1');
      expect(firstProductColumns[1].textContent).toContain('Product 1');
      expect(firstProductColumns[2].textContent).toContain('Description 1');
      expect(firstProductColumns[3].textContent).toContain('10');
      expect(firstProductColumns[4].textContent).toContain('5');
      const buttons = productRows[0].querySelectorAll('button');
      expect(buttons.length).toBe(3);
    });

    it('should contain Add to Cart, Edit, and Delete buttons for each product', () => {
      const productsMock = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 5 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20, quantity: 10 }
      ];
      jest.spyOn(productService, 'getProducts').mockReturnValue(of(productsMock));
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const productRows = compiled.querySelectorAll('tbody tr');
      productRows.forEach((row: { querySelectorAll: (arg0: string) => any; }) => {
        const buttons = row.querySelectorAll('button');
        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toContain('Add to Cart');
        expect(buttons[1].textContent).toContain('Edit');
        expect(buttons[2].textContent).toContain('Delete');
      });
    });
  });
});
