/*
 *
 * NOTE: This demo does not use the server in `/server` - that's for the react and vue clients
 *
 */
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Uncomment the correct region
const BASE_URL = 'https://api.eu.embeddable.com'; // EU region
// const BASE_URL = 'https://api.us.embeddable.com'; // US region

const API_KEY = ''; // Your API Key
const EMBEDDABLE_ID = ''; // Your Embeddable ID
const USER_KEY = 'example@yourdomain.com'; // unique key (usually email address) representing current user

@Component({
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  /* Variables */
  token: string | null = null;
  protected theme = 'default';
  protected readonly title = signal('angular-example');

  /* Constructor */
  constructor(private http: HttpClient) {}

  /* On Init */
  ngOnInit() {
    this.fetchToken();
  }

  /* Methods */
  protected readonly clientContext = signal(
    JSON.stringify({ theme: this.theme })
  );
  setTheme(event: Event): void {
    this.theme = (event.target as HTMLSelectElement).value;
    this.clientContext.set(JSON.stringify({ theme: this.theme }));
  }

  private fetchToken() {
    this.http
      .post<{ token: string }>(
        `${BASE_URL}/api/v1/security-token`,
        {
          embeddableId: EMBEDDABLE_ID,
          expiryInSeconds: 60 * 60 * 24 * 7,
          securityContext: {}, // Add your security context here
          user: USER_KEY,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`, // Add your API key here
          },
        }
      )
      .subscribe((json) => {
        this.token = json.token;
      });
  }
}
