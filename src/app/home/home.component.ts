import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<h1>Welcome to {{ title() }} Page!</h1>`,
})
export class HomeComponent {
  protected readonly title = signal('Twenty-One');
}
