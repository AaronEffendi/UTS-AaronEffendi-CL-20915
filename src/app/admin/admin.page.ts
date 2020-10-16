import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  products:Product[];
  constructor(
    private productsService : ProductsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router : Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.products = this.productsService.getAllProducts();
  }

  async presentAlert(productId){
    const alert = await this.alertCtrl.create({
      header: "Delete Product",
      message: 'Do you really want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteProduct(productId)
        }
      ]
    });
    await alert.present();
  }

  deleteProduct(productId){
    this.presentLoading().then(() => {
      this.productsService.deleteProduct(productId);
      this.ionViewWillEnter();
      this.presentToast()
    })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting product...',
      duration: 2000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product deleted.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  goEdit(productId){
    this.router.navigate(['./admin/edit', productId]);
  }

}
