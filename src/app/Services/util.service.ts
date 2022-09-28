import { Injectable, NgZone } from '@angular/core';

import { AlertController, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';

// import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Events } from './events';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@capacitor/geolocation';
// import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    public static booking1: any;
    public static paymentSummary: any = {};
    // public apiUrl: any = environment.host;
    public static deviceToken: any;
    public pictureUrl: any = '';
    public loader = null;
    public isOnline = true;
    location: any;
    myImage = null;
    // fileTransfer: FileTransferObject;

    constructor(
        public router: Router,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        // public events: Events,
        // private transfer: FileTransfer,
        // private translate: TranslateService
    ) {
        // this.fileTransfer = this.transfer.create();
    }

    setOnline(flag) {
        this.isOnline = flag;
    }

    // async showToast(message: string = '') {
    //     this.translate.get(['COMMON.SOMETHIG_WENTP_WRONG']).subscribe(async languageRes => {
    //         message = (message) ? message : languageRes['COMMON.SOMETHIG_WENTP_WRONG'];
    //         const toast = await this.toastCtrl.create({
    //             message,
    //             duration: 3000
    //         });
    //         toast.present();
    //     });
    // }

    async showAlert(title, subTitle, message, callback?: any, buttonText = 'Ok') {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: subTitle,
            message,
            backdropDismiss: false,
            buttons: [{
                text: buttonText,
                role: 'cancel',
                handler: (blah) => {
                    if (callback) { callback(); }
                }
            }]
        });

        await alert.present();
    }

    async showConfirmationPopup(title, msg, callback, buttonText = ['Yes', 'No']) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: msg,
            buttons: [
                {
                    text: buttonText[1],
                    role: 'cancel',
                    handler: (blah) => {
                        callback(0);
                    }
                }, {
                    text: buttonText[0],
                    handler: () => {
                        callback(1);
                    }
                }
            ]
        });

        await alert.present();
    }

    async showLoading(message: string = 'Please wait') {
        await this.loadingCtrl.create({
            message,
            animated: true
        }).then(loader => {
            this.loader = loader;
            this.loader.present();
        });
    }
    async showToastSucccess(message: string = '') {
        const toast = await this.toastCtrl.create({
            message,
            duration: 3000,
            color: 'success',
        });
        toast.present();
    }
    async showToastError(message: string = '') {
        const toast = await this.toastCtrl.create({
            message,
            duration: 3000,
            color: 'danger',
        });
        toast.present();
    }
    async dismissLoading() {
        if (this.loader) {
            this.loader.dismiss();
        }
    }

    // async showImageActionSheet(isDocSelection, callback) {
    //     const messages = [
    //         'COMMON.IMAGE_FROM_LIBRARY',
    //         'COMMON.CAPTURE_IMAGE',
    //         'COMMON.VIDEO_FROM_LIBRARY',
    //         'COMMON.SELECT_SOURCE'
    //     ];
    //     this.translate.get(messages).subscribe(async languageRes => {
    //         const options: any = [
    //             {
    //                 text: languageRes['COMMON.IMAGE_FROM_LIBRARY'],
    //                 handler: () => {
    //                     callback(CameraSource.Photos);
    //                 }
    //             },
    //             {
    //                 text: languageRes['COMMON.CAPTURE_IMAGE'],
    //                 handler: () => {
    //                     callback(CameraSource.Camera);
    //                 }
    //             }
    //         ];

    //         if (isDocSelection) {
    //             options.push({
    //                 text: languageRes['COMMON.VIDEO_FROM_LIBRARY'],
    //                 handler: () => {
    //                     callback('video');
    //                 }
    //             });
    //         }

    //         options.push({
    //             text: 'Cancel',
    //             role: 'cancel'
    //         });

    //         const actionSheet = await this.actionSheetCtrl.create({
    //             header: languageRes['COMMON.SELECT_SOURCE'],
    //             buttons: options
    //         });

    //         await actionSheet.present();
    //     });
    // }

    // pickCamera(type, callback) {
    //     Camera.getPhoto({
    //         quality: 100,
    //         allowEditing: false,
    //         resultType: CameraResultType.DataUrl,
    //         source: type
    //     })
    //         .then((ImageData) => {
    //             callback(ImageData.dataUrl.split(',')[1]);
    //         })
    //         .catch((err) => {
    //         })
    //         ;
    // }

    // public showErrorCall(err, showErrToast: boolean = false, errMsg?: string) {
    //     if (err.status === 401
    //         && this.router.url.indexOf('/forgot-psw/') < 0
    //         && this.router.url.indexOf('/reset-psw/') < 0
    //         && this.router.url.indexOf('/verifiaction-code/') < 0
    //     ) {
    //         this.logout();
    //     }
    //     if (err.error) {
    //         try {
    //             const errBody = err.error;
    //             errMsg = errBody.message;
    //             if (typeof errMsg === 'object') {
    //                 let errTypes: any = [];
    //                 Object.keys(errMsg).forEach(key => {
    //                     errTypes = errTypes.concat(errMsg[key]);
    //                 });
    //                 errMsg = errTypes.join(',');
    //             }
    //         } catch (error) {
    //             this.showToast();
    //         }
    //     } else {
    //         this.showToast();
    //     }

    //     if (errMsg) {
    //         this.showToast(errMsg);
    //     } else {
    //         this.showToast(errMsg);
    //     }
    // }

    // logout() {
    //     const messages = [
    //         'COMMON.ALERT',
    //         'COMMON.SESSION_EXPIRED',
    //         'COMMON.PLEASE_TAP_LOGIN',
    //         'COMMON.LOGIN'
    //     ];
    //     this.translate.get(messages).subscribe(languageRes => {
    //         this.showAlert(languageRes['COMMON.ALERT'], languageRes['COMMON.SESSION_EXPIRED'], languageRes['COMMON.PLEASE_TAP_LOGIN'], () => {
    //             localStorage.clear();
    //             this.router.navigate(['/login'], { replaceUrl: true });
    //             this.events.publish("user:logout", true);
    //         }, languageRes['COMMON.LOGIN']);
    //     });
    // }
    // clearStorageData() {
    //     localStorage.clear();
    //     this.router.navigate(['/login']);
    //     this.events.publish("user:logout", true);
    // }
    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else { byteString = unescape(dataURI.split(',')[1]); }

        // separate out the mime component
        const mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];

        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    setStorageData(key, value) {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }

    getStorageData(key, callback) {
        callback(localStorage.getItem(key));
    }

    public formatNumber(value): string {
        if (!value) {
            return '';
        }
        const regex = /[-+*/()=,\s]/g;
        value = value.replace(regex, '');
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    redirectToBrowser(link) {
        window.open(link, '_system');
    }

    getUserType() {
        return (Number(localStorage.getItem('user_type')) === 2) ? true : false;
    }

    // uploadVideo(data, specialities_id, isNew, callback) {
    //     const options: FileUploadOptions = {
    //         fileKey: 'media_name',
    //         fileName: new Date().getTime() + '.mp4',
    //         chunkedMode: false,
    //         mimeType: 'video/mp4',
    //         headers: {
    //             Authorization: localStorage.getItem('token')
    //         },
    //         httpMethod: 'POST',
    //         params: {
    //             specialities_id: specialities_id,
    //             'media_type': 2
    //         }
    //     };
    //     if (!isNew) {
    //         this.showLoading();
    //     }
    //     return this.fileTransfer.upload(data, environment.host + '/addSpecialitiesMedia', options)
    //         .then((resp: any) => {
    //             this.dismissLoading();
    //             const response = JSON.parse(resp.response);
    //             if (response.success) {
    //                 callback(response.data);
    //                 if (!isNew) {
    //                     this.showToastSucccess(response.message);
    //                 }
    //             } else {
    //                 this.showToastError(resp.message);
    //             }
    //         }).catch((error) => {
    //             this.dismissLoading();
    //             console.log('Error:', error);
    //             this.showToastError(JSON.parse(error.body).message);
    //         });
    // }

    async getCurrentLocation(callback) {
        const position = {
            latitude: 0,
            longitude: 0
        };
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            if (coordinates && coordinates.coords) {
                position.latitude = coordinates.coords.latitude;
                position.longitude = coordinates.coords.longitude;
            }
            callback(position);
        } catch (error) {
            callback(position);
        }
    }
}
