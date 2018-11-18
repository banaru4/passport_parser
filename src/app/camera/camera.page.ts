import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  myPicture: any = null;

  cropperOptions: any;
  scaleValX = 1;
  scaleValY = 1;
  cropping = false;

  cameraOptions: CameraOptions;

  constructor(private camera: Camera
  ) {
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
    };
    this.cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
  }

  ngOnInit() {
  }

  capturePicture() {
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        this.myPicture = 'data:image/jpeg;base64,' + imageData;
        console.log(this.myPicture);
      },
          (err) => console.log(err)
      );
  }

  cropPicture() {
    this.cropping = true;
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }

  rotate() {
    this.angularCropper.cropper.rotate(90);
  }

  zoom(zoomIn: boolean) {
    const factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }

  scaleX() {
    this.scaleValX *= -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  scaleY() {
    this.scaleValY *= -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

  save() {
    this.cropping = false;
    this.myPicture = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
  }

}
