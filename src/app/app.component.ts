import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeSwitchComponent } from './dark-mode-switch/dark-mode-switch.component';
import { FormComponent } from "./form/form.component";
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DarkModeSwitchComponent, FormComponent, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-api';
  currentMode = "light"
}
