import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/product.model';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  loadedProduct: Product;
  constructor(
    private productsService : ProductsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')) {return;}
      const productId = paramMap.get('productId');
      this.loadedProduct = this.productsService.getProduct(productId);
    });
  }
  onSubmit(){
  }

  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: "Edit Product",
      message: 'Do you really want to edit this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Edit',
          handler: () => this.editProduct()
        }
      ]
    });
    await alert.present();
  }

  editProduct(){
    this.presentLoading().then(() => {
      this.productsService.editProduct(this.loadedProduct);
      this.router.navigate(['./admin']);
      this.presentToast();
    })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Editing product...',
      duration: 2000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product edited.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

}
