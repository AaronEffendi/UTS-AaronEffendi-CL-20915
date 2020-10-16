import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/product.model';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addedProduct: Product = {
    id: undefined,
    ImageURL: undefined,
    type: undefined,
    merek: undefined,
    model: undefined,
    price: undefined,
    stock: undefined,
    baseClock: undefined,
    boostClock: undefined,
    core: undefined,
    thread: undefined,
    speed: undefined,
    size: undefined,
    chipset: undefined,
    support: undefined,
  };
  type: String = "";
  
  constructor(
    private productsService : ProductsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router : Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.presentAlert(form);
  }

  async presentAlert(form: NgForm){
    const alert = await this.alertCtrl.create({
      header: "Add Product",
      message: 'Do you really want to Add this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: () => this.addProduct(form)
        }
      ]
    });
    await alert.present();
  }

  addProduct(form: NgForm){
    this.presentLoading().then(() => {
      this.addedProduct.id = String(++this.productsService.getAllProducts().length);
      this.addedProduct.ImageURL = form.value.ImageURL;
      this.addedProduct.type = form.value.type;
      this.addedProduct.merek = form.value.merek;
      this.addedProduct.model = form.value.model;
      this.addedProduct.price = form.value.price;
      this.addedProduct.stock = form.value.stock;
      if(this.addedProduct.type == 'CPU'){
        this.addedProduct.baseClock = form.value.baseClock;
        this.addedProduct.boostClock = form.value.boostClock;
        this.addedProduct.core = form.value.core;
        this.addedProduct.thread = form.value.thread;
        this.addedProduct.speed = null; 
        this.addedProduct.size = null; 
        this.addedProduct.chipset = '';
        this.addedProduct.support = '';    
      }else if(this.addedProduct.type == 'RAM'){
        this.addedProduct.baseClock = null; 
        this.addedProduct.boostClock = null;
        this.addedProduct.core = null; 
        this.addedProduct.thread = null;
        this.addedProduct.speed = form.value.speed;
        this.addedProduct.size = form.value.size;
        this.addedProduct.chipset = '';
        this.addedProduct.support = '';    
      }else if(this.addedProduct.type == 'Motherboard'){
        this.addedProduct.baseClock = null; 
        this.addedProduct.boostClock = null;
        this.addedProduct.core = null; 
        this.addedProduct.thread = null;
        this.addedProduct.speed = null; 
        this.addedProduct.size = null; 
        this.addedProduct.chipset = form.value.chipset;
        this.addedProduct.support = form.value.support;
      }else if(this.addedProduct.type == 'GPU'){
        this.addedProduct.baseClock = null; 
        this.addedProduct.boostClock = null;
        this.addedProduct.core = null; 
        this.addedProduct.thread = null;
        this.addedProduct.speed = null; 
        this.addedProduct.size = null; 
        this.addedProduct.chipset = '';
        this.addedProduct.support = '';   
      }
      this.productsService.addProduct(this.addedProduct);
      this.router.navigate(['./admin']);
      this.presentToast();
    })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding product...',
      duration: 2000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product added.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

}
