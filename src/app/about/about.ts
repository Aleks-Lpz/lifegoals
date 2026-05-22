import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  standalone: false // <-- Forzamos a que NO sea standalone
})
export class AboutComponent {
}
