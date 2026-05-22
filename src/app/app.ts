import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false // <-- Forzamos a que NO sea standalone
})
export class AppComponent {
  title = 'lifegoals';
}
