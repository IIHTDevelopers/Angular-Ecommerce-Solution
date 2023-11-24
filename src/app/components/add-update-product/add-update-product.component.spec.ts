import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUpdateProductComponent } from './add-update-product.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('AddUpdateProductComponent', () => {
  let component: AddUpdateProductComponent;
  let fixture: ComponentFixture<AddUpdateProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateProductComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProductById: jest.fn(),
            updateProduct: jest.fn(),
            addProduct: jest.fn()
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1 // You can provide any dummy ID here
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain a name field with proper validation', () => {
      const nameField = component.productForm.get('name');
      expect(nameField).toBeTruthy();
      nameField?.setValue('');
      expect(nameField?.valid).toBeFalsy();
      nameField?.setValue('Product Name');
      expect(nameField?.valid).toBeTruthy();
    });

    it('should contain a description field with proper validation', () => {
      const descriptionField = component.productForm.get('description');
      expect(descriptionField).toBeTruthy();
      descriptionField?.setValue('');
      expect(descriptionField?.valid).toBeFalsy();
      descriptionField?.setValue('Product Description');
      expect(descriptionField?.valid).toBeTruthy();
    });

    it('should contain a price field with proper validation', () => {
      const priceField = component.productForm.get('price');
      expect(priceField).toBeTruthy();
      priceField?.setValue('');
      expect(priceField?.valid).toBeFalsy();
      priceField?.setValue(10);
      expect(priceField?.valid).toBeTruthy();
    });

    it('should contain a quantity field with proper validation', () => {
      const quantityField = component.productForm.get('quantity');
      expect(quantityField).toBeTruthy();
      quantityField?.setValue('');
      expect(quantityField?.valid).toBeFalsy();
      quantityField?.setValue(5);
      expect(quantityField?.valid).toBeTruthy();
    });

    it('should contain a Save button', () => {
      const compiled = fixture.nativeElement;
      const saveButton = compiled.querySelector('button[type="submit"]');
      expect(saveButton).toBeTruthy();
    });
  });
});
