import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ECommerceComponent } from './component/e-commerce/e-commerce.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ECommerceComponent
            ],
        }).compileComponents();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            expect(app).toBeTruthy();
        });

        it('should render "My E-Commerce Application" heading', () => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h2').textContent).toContain('My E-Commerce Application');
        });

        it('should render app-ecommerce component', () => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('app-ecommerce')).toBeTruthy();
        });
    });
});
