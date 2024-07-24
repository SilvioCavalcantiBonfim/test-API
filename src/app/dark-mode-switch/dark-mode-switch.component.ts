import { Component, Input, OnInit } from '@angular/core';
import { ColorModeService } from '../service/color-mode.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dark-mode-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-switch.component.html',
  styleUrl: './dark-mode-switch.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 , transform: "rotate(180deg)"}),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: "rotate(180deg)" }))
      ])
    ])
  ]
})
export class DarkModeSwitchComponent implements OnInit {
  @Input() mode!: string;

  constructor(public colorModeService: ColorModeService) { }
  ngOnInit(): void {
    this.colorModeService.ngOnInit();
  }
}

