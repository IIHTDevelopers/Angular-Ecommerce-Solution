import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../models/cart.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCartItems: jest.fn(),
            removeCartItem: jest.fn(),
            clearCart: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have Shopping Cart heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h2');
      expect(heading.textContent).toContain('Shopping Cart');
    });

    it('should have Checkout button', () => {
      const compiled = fixture.nativeElement;
      const checkoutButton = compiled.querySelector('button');
      expect(checkoutButton.textContent).toContain('Checkout');
    });

    it('should display name, price, and quantity fields for each cart item', () => {
      const mockCartItems = [
        {
          product: {
            id: 1,
            name: 'Product 1',
            price: 10,
            description: 'Description 1',
            quantity: 5
          },
          quantity: 2,
          id: 101
        },
        {
          product: {
            id: 2,
            name: 'Product 2',
            price: 20,
            description: 'Description 2',
            quantity: 8
          },
          quantity: 1,
          id: 102
        }
      ] as CartItem[];

      jest.spyOn(cartService, 'getCartItems').mockReturnValue(of(mockCartItems));

      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const cartItemElements = compiled.querySelectorAll('li');

      expect(cartItemElements.length).toEqual(mockCartItems.length);

      cartItemElements.forEach((itemElement: { textContent: any; }, index: number) => {
        const cartItem = mockCartItems[index];
        expect(itemElement.textContent).toContain(cartItem.product.name);

        expect(itemElement.textContent).toContain(`Quantity: ${cartItem.quantity}`);
      });
    });
  });
});
