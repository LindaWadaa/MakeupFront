import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Makeups } from './makeups/makeups';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Makeups],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MesMakeup');
}
