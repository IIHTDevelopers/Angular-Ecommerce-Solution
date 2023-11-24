import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {
  product: Product = new Product();
  productForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isEditMode = true;
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
        this.productForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          quantity: this.product.quantity
        });
      });
    }
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.product = { id: this.product.id, ...this.productForm.value };
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
