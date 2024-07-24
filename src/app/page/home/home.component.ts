import { Component } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { FormComponent } from "../../form/form.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestService } from '../../service/test.service';
import { CardResultComponent } from "../../card-result/card-result.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, FormComponent, RouterModule, CommonModule, CardResultComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public testService: TestService){}

}
