import { Component, Input } from '@angular/core';
import { Result } from '../service/tests';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-result.component.html',
  styleUrl: './card-result.component.css'
})
export class CardResultComponent {
  @Input()
  result!: Result;
}
