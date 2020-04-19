import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import User from '../models/User';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  title: string;
  private user: User;
  public latitude: number;
  public longitude: number;

  constructor(private loginService: LoginService, private camera: Camera, private geolocation: Geolocation, private localNotifications: LocalNotifications) {}

  ngOnInit(): void {
 
    let watch = this.geolocation.watchPosition().pipe(filter((p) => p.coords !== undefined));
    watch.subscribe((data) => {

      this.longitude = data.coords.longitude
      this.latitude = data.coords.latitude

    });

    console.log(watch);
  }

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
    this.user = this.loginService.login('AZEAZEAZE', 'P@ssw0rd');
    console.log(this.user);
  }

  maNouvelleMethodeQuiNeSeraPasTestee() {
    this.title = 'Mon Nouveau Titre';
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  notificationTest() {

  // Multiple notification
  this.localNotifications.schedule([{
   id: 1,
   text: 'Notification multiple',
  }
]);


// Notification à un instant données
this.localNotifications.schedule([{
   id: 1,
   text: 'Notification dans le temps',
   trigger: {at: new Date(new Date().getTime() + 3600)},}
  ]);
}

}
