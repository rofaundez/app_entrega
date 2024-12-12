import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonInput, IonRow, IonGrid, IonCardTitle, IonCard, IonLabel, IonButton, IonIcon, IonContent, IonList, IonItem, IonAvatar, IonCardHeader, IonCardContent, IonCol, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { TranslateModule } from '@ngx-translate/core';
import { trash, add } from 'ionicons/icons';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonCol, IonCardContent, IonCardHeader, 
    IonContent, IonRow,
    IonButton, IonIcon, IonCol, IonGrid,TranslateModule,
    CommonModule, IonCard, IonCardTitle] 
})
export class UsuariosComponent  implements OnInit {
  usuarios : User[] = [];

  constructor(private databaseService: DatabaseService) { 
    addIcons({add,trash});
  }

  async ngOnInit() {
    try {
      this.usuarios = await this.databaseService.getAllUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async deleteUser(userName: string) {
    try {
      const confirmation = confirm('¿Estás seguro de que deseas eliminar este usuario?');
      if (confirmation) {
        await this.databaseService.deleteByUserName(userName);
        this.ngOnInit(); // Recarga la lista de usuarios después de eliminar
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

}