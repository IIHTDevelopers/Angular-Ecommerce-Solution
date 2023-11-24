// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';
// import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
// import { ProductListComponent } from './components/product-list/product-list.component';

// describe('AppComponent', () => {
//     let fixture: ComponentFixture<AppComponent>;
//     let app: AppComponent;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [AppComponent, AddUpdateProductComponent, ProductListComponent],
//             imports: [RouterTestingModule]
//         });
//         fixture = TestBed.createComponent(AppComponent);
//         app = fixture.componentInstance;
//     });

//     describe('boundary', () => {
//         it('should create the app', () => {
//             expect(app).toBeTruthy();
//         });

//         it('should display the Welcome to My E-Commerce App title', () => {
//             const compiled = fixture.debugElement.nativeElement;
//             expect(compiled.querySelector('h1').textContent).toContain('Welcome to My E-Commerce App');
//         });
//     });
// });
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should display welcome heading', () => {
            const headingElement = fixture.nativeElement.querySelector('h1');
            expect(headingElement.textContent).toContain('Welcome to My E-Commerce App');
        });

        it('should have anchor tag for Products', () => {
            const productAnchor = fixture.debugElement.nativeElement.querySelector('a[href="/products"]');
            expect(productAnchor).toBeTruthy();
            expect(productAnchor.textContent).toContain('Products');
        });

        it('should have anchor tag for Cart', () => {
            const cartAnchor = fixture.debugElement.nativeElement.querySelector('a[href="/cart"]');
            expect(cartAnchor).toBeTruthy();
            expect(cartAnchor.textContent).toContain('Cart');
        });

        it('should have router link for Products', () => {
            const productRouterLink = fixture.debugElement.query(By.directive(RouterLinkWithHref));
            expect(productRouterLink).toBeTruthy();
            expect(productRouterLink.attributes['routerLink']).toBe('/products');
        });
    });
});
