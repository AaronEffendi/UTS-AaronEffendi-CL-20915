import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      ImageURL: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/6/13/48616025/48616025_577ca5aa-7d09-4d32-9b26-044af6fb225c_346_346',
      merek: 'Intel',
      model: 'i5-9400F',
      price: 2150000,
      stock: 10,
      type: 'CPU',
      baseClock: 2.90, 
      boostClock: 4.10, 
      core : 6, 
      thread: 6, 
      speed: null, 
      size: null, 
      chipset: '', 
      support: '', 
    },
    {
      id: '2',
      ImageURL: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/11/b8e7fd02-227f-4aeb-8122-6f6a915aa423.png',
      merek: 'Nvidia',
      model: 'GeForce RTX 3080',
      price: 14500000,
      stock: 3,
      type: 'GPU',
      baseClock: null, 
      boostClock: null, 
      core : null, 
      thread: null, 
      speed: null, 
      size: null, 
      chipset: '', 
      support: '', 
    },
    {
      id: '3',
      ImageURL: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/4/5373285/5373285_be8a4729-3f89-4a57-ae95-d51ffb365bbe_800_800',
      merek: 'MSI',
      model: 'B450',
      price: 1999000,
      stock: 5,
      type: 'Motherboard',
      baseClock: null, 
      boostClock: null, 
      core : null, 
      thread: null, 
      speed: null, 
      size: null, 
      chipset: 'AM4', 
      support: 'AMD', 
    },
    {
      id: '4',
      ImageURL: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/7/1157156/1157156_39747046-78ea-4d4a-8336-e7c26b09aaef.jpg',
      merek: 'Team',
      model: 'Elit Plus',
      price: 486000,
      stock: 7,
      type: 'RAM',
      baseClock: null, 
      boostClock: null, 
      core : null, 
      thread: null, 
      speed: 2666, 
      size: 8, 
      chipset: '', 
      support: '', 
    },
    {
      id: '5',
      ImageURL: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/8/1/9651507/9651507_10d2162a-7ece-4ace-bed2-596e13f7d4bd_700_700',
      merek: 'Gigabyte',
      model: 'B450',
      price: 1969000,
      stock: 0,
      type: 'Motherboard',
      baseClock: null, 
      boostClock: null, 
      core : null, 
      thread: null, 
      speed: null, 
      size: null, 
      chipset: 'AM4', 
      support: 'AMD', 
    },
  ]

  constructor() { }
  
  getAllProducts(){
    return [...this.products];
  }
  
  getProduct(productId : string){
    return {...this.products.find(product=>{
      return product.id === productId;
    })};
  }
  
  deleteProduct(productId : string){
    this.products = this.products.filter(product=> {
      return product.id !== productId;
    });
  }
  
  addProduct(addedproduct : Product){
    this.products.push(addedproduct);
  }

  editProduct(edited:Product){
    this.products.find(product=>{
      if(product.id == edited.id){
        product.id = edited.id;
        product.ImageURL = edited.ImageURL;
        product.merek = edited.merek;
        product.model = edited.model;
        product.price = edited.price;
        product.stock = edited.stock;
        product.type = edited.type;
        if(edited.type == 'CPU'){
          product.baseClock = edited.baseClock; 
          product.boostClock = edited.boostClock;
          product.core = edited.core; 
          product.thread = edited.thread;
          product.speed = null; 
          product.size = null; 
          product.chipset = '';
          product.support = '';    
        }else if(edited.type == 'RAM'){
          product.baseClock = null; 
          product.boostClock = null;
          product.core = null; 
          product.thread = null;
          product.speed = edited.speed; 
          product.size = edited.size; 
          product.chipset = '';
          product.support = '';    
        }else if(edited.type == 'Motherboard'){
          product.baseClock = null; 
          product.boostClock = null;
          product.core = null; 
          product.thread = null;
          product.speed = null; 
          product.size = null; 
          product.chipset = edited.chipset;
          product.support = edited.support;   
        }else if(edited.type == 'GPU'){
          product.baseClock = null; 
          product.boostClock = null;
          product.core = null; 
          product.thread = null;
          product.speed = null; 
          product.size = null; 
          product.chipset = '';
          product.support = '';   
        }
      }
    });
  }
}
