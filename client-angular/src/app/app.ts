import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  /* Variables */
  protected theme = 'default';
  protected readonly title = signal('angular-example');

  /* Methods */
  protected readonly clientContext = signal(
    JSON.stringify({ theme: this.theme })
  );
  setTheme(event: Event): void {
    this.theme = (event.target as HTMLSelectElement).value;
    this.clientContext.set(JSON.stringify({ theme: this.theme }));
  }
}
