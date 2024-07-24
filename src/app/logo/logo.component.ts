import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent implements OnInit {

  @Input()
  size: number = 24;
  ngOnInit() {
  }
}