import { Component } from '@angular/core';
import { ApiDocumentation, RouteComponent } from '../../route/route.component';
import { LogoComponent } from "../../logo/logo.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [RouteComponent, LogoComponent, RouterModule],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.css'
})
export class DocComponent {

  apiDoc: ApiDocumentation[] = [
    {
      endpoint: "/products",
      method: "GET",
      description: "Obter todos os produtos.",
      contentType: "application/json",
      responses: [
        {
          status: 200,
          description: "Resposta contendo uma lista de produtos."
        }
      ],
      curl: `curl -X GET -H "Accept: application/json" "http://localhost:8080/products"`,
      schema: [
        {
          name: 'photo',
          description: 'URL da imagem do produto (proporção 1:1 recomendada).',
          type: 'string'
        },
        {
          name: 'name',
          description: 'Nome do produto.',
          type: 'string'
        },
        {
          name: 'price',
          description: 'Preço do produto.',
          type: 'number'
        },
        {
          name: 'is_promotion',
          description: 'Se verdadeiro, aplica um desconto de 20% no valor do preço.',
          type: 'boolean'
        }
      ]
    },

    {
      endpoint: "/info",
      method: "GET",
      description: "Obter informações da loja.",
      contentType: "application/json",
      responses: [
        {
          status: 200,
          description: "Resposta contendo as informações da loja."
        }
      ],
      curl: `curl -X GET -H "Accept: application/json" "http://localhost:8080/info"`,
      schema: [
        {
          name: 'name',
          description: 'Nome da loja.',
          type: 'string'
        },
        {
          name: 'color',
          description: 'Cor da loja no formato hexadecimal.',
          type: 'string'
        },
        {
          name: 'owner',
          description: 'Nome completo do proprietário da loja.',
          type: 'string'
        },
        {
          name: 'department',
          description: 'Departamento da loja.',
          type: 'string'
        }
      ]
    }
  ]
}
