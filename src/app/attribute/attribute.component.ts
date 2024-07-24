import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css'
})
export class AttributeComponent {
  @Input()
  attr!: Attribute
}

export type Attribute = {
  name: string,
  description: string,
  type: string
}