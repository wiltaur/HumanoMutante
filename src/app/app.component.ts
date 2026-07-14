import { Component } from '@angular/core';
import { MutantComponent } from './mutant/mutant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MutantComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'detector-mutantes';
}