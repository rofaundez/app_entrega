import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentOutline, homeOutline, pawOutline, pencilOutline, peopleOutline, qrCodeOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonFooter,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonIcon
  ]
})
export class FooterComponent implements OnInit{
  user: User = new User();
  isUserCorrect: boolean = false;
  selectedButton = 'welcome';  // Aseguramos que el valor por defecto sea 'welcome'
  isScanning = false;
  @Output() footerClick = new EventEmitter<string>();

  constructor(private auth: AuthService) { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline, peopleOutline, documentOutline });
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

  async ngOnInit(){
    this.auth.readAuthUser().then((user) => {
      if (user) {
        this.user = user;
        
        if (this.user.userName === 'atorres'){
          this.isUserCorrect = true;
          
        } else {
          this.isUserCorrect = false;
          
        }
      }
    });
  
  }

}
