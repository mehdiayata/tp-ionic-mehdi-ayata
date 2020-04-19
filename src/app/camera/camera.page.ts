import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

export class CameraPage implements OnInit {

    private pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };

   picture : string

  constructor(private cameraPreview: CameraPreview, private storage: NativeStorage, private base64ToGallery: Base64ToGallery) { }

  ngOnInit() {

    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });


  }

  stopCamera() {
    // Stop the camera preview
    this.cameraPreview.stopCamera();

    
  }

  switchCamera() {    
    // Switch camera
    this.cameraPreview.switchCamera();
  }



  takePicture() {

    console.log('take picture ');
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      
    console.log('take picture ');
      this.picture = 'data:image/jpeg;base64,' + imageData;
      
      this.saveImage();
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

  }

  
saveImage() {
    this.base64ToGallery.base64ToGallery(
        this.picture,
        {
            prefix: 'img_',
            mediaScanner: true
        }
    )
}
}
