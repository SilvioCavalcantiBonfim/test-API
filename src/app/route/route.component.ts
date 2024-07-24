import { Component, Input } from '@angular/core';
import { Attribute, AttributeComponent } from "../attribute/attribute.component";

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [AttributeComponent],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent {
  @Input()
  route!: ApiDocumentation;
}

export type ApiDocumentation = {
  endpoint: string; // URL endpoint, e.g., "/products"
  method: string; // HTTP method, e.g., "GET"
  description: string; // Description of the endpoint functionality
  contentType: string; // Content-Type header, e.g., "application/json"
  responses: Response[]; // Array of responses
  curl: string; // Curl command example
  schema: Attribute[]; // Schema of the response data
}

export type Response = {
  status: number; // HTTP status code, e.g., 200
  description: string; // Description of the response, e.g., "Resposta contendo uma lista de produtos"
}