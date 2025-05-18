import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: string[] = ['soukaina', 'said', 'abdelaknir', 'mouad'];
  nouveauNom: string = '';

  ajouter(nom: string) {
    if (nom.trim()) {
      this.user.push(nom.trim());
      this.nouveauNom = '';
    }
  }

  supprimer() {
    this.user.pop();
  }

  vider() {
    this.user = [];
  }
}
