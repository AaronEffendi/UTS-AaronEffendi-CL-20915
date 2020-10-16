import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Toggle: boolean = true;
  products: Product[]

  constructor(private productsService: ProductsService) {}

  ngOnInit(){}

  ionViewWillEnter(){
    this.products = this.productsService.getAllProducts();
  }
  
  toggleBtn(){
    if(this.Toggle){
      this.Toggle = false;
    }else{
      this.Toggle = true;
    }
  }

}
