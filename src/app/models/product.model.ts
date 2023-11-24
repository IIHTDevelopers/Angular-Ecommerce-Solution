export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.price = 0;
        this.quantity = 0;
    }
}