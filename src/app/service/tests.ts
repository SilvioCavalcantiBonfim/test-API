export const errorResults: { [key: string]: Result } = {
    network: {
        test: 'Network error',
        description: 'Ocorre quando não há conexão com a rede, geralmente devido a problemas como uma conexão de internet instável ou uma falha na rede local. Também pode acontecer quando o endpoint de destino não pode ser alcançado.',
        status: false,
        icon: "language"
    },
    cors: {
        test: 'CORS error',
        description: 'Ocorre quando o navegador bloqueia a solicitação devido a restrições de segurança impostas por políticas de CORS. Geralmente acontece quando a origem da solicitação não corresponde à origem do servidor acessado.',
        status: false,
        icon: "security"
    },
    client: {
        test: 'Client error',
        description: 'Erros gerais para status HTTP na faixa de 400 a 499. Inclui erros como requisição malformada (400 Bad Request), não autorizado (401 Unauthorized), ou não encontrado (404 Not Found). Indica que o problema está relacionado à solicitação enviada pelo cliente.',
        status: false,
        icon: "devices"
    },
    server: {
        test: 'Server error',
        description: 'Erros gerais para status HTTP na faixa de 500 ou superior. Indica que o servidor encontrou um problema ao processar a solicitação. Exemplos incluem erro interno do servidor (500 Internal Server Error) ou serviço indisponível (503 Service Unavailable).',
        status: false,
        icon: "dns"
    },
    timeout: {
        test: 'Request timeout',
        description: 'Ocorre quando a solicitação leva mais tempo do que o tempo limite especificado para ser processada. Pode acontecer se o servidor estiver muito lento para responder ou se houver problemas de rede.',
        status: false,
        icon: "timer"
    },
    unknown: {
        test: 'Unknown error',
        description: 'Captura qualquer situação não prevista nos casos anteriores. Inclui erros inesperados ou problemas que não se enquadram nas categorias definidas.',
        status: false,
        icon: "unknown_5"
    }
};


export class Result {
    constructor(public test: string, public description: string, public icon: string, public status: boolean) { }
}


export class Test {

    private test: string;
    private description: string;
    private icon: string;
    private action: (data: any) => boolean;

    constructor(test: string, description: string,icon: string, action: (data: any) => boolean) {
        this.test = test;
        this.description = description;
        this.action = action;
        this.icon = icon;
    }

    execute(data: any): Result {
        return {
            test: this.test,
            description: this.description,
            icon: this.icon,
            status: this.action(data)
        }
    }
}


export const v1Tests = [
    {
        method: 'get',
        endpoint: '/products',
        tests: [
            new Test(
                "GET /products - keys",
                "Verifica se o objeto retornado contém todas as chaves necessárias ('photo', 'name', 'price', 'is_promotion') e nenhuma chave a mais.",
                "key",
                (data: any) => hasExactKeys(data, ['photo', 'name', 'price', 'is_promotion'])
            ),
            new Test(
                "GET /products - Value Types",
                "Verifica se os valores das chaves 'photo' e 'name' são do tipo string, 'price' é do tipo number e 'is_promotion' é do tipo boolean.",
                "info",
                (data: any) => {
                    return typeof data.photo === 'string' &&
                        typeof data.name === 'string' &&
                        typeof data.price === 'number' &&
                        typeof data.is_promotion === 'boolean';
                }
            ),
            new Test(
                "GET /products - Non Null Values",
                "Verifica se os valores das chaves 'photo', 'name', 'price', e 'is_promotion' não são nulos ou indefinidos.",
                "check_box_outline_blank",
                (data: any) => {
                    return data.photo != null &&
                        data.name != null &&
                        data.price != null &&
                        data.is_promotion != null;
                }
            ),
            new Test(
                "GET /products - String Lengths",
                "Verifica se os valores das chaves 'photo' e 'name' têm comprimento mínimo de 1 caractere.",
                "straighten",
                (data: any) => {
                    return data.photo.length > 0 &&
                        data.name.length > 0;
                }
            ),
            new Test(
                "GET /products - Price Value",
                "Verifica se o valor da chave 'price' é um número não negativo.",
                "attach_money",
                (data: any) => typeof data.price === 'number' && data.price >= 0
            ),
            new Test(
                "GET /products - Promotion Status",
                "Verifica se o valor da chave 'is_promotion' é um booleano.",
                "star",
                (data: any) => typeof data.is_promotion === 'boolean'
            )
        ]
    },
    {
        method: 'get',
        endpoint: '/info',
        tests: [
            new Test(
                "GET /info - keys",
                "Verifica se o objeto retornado contém todas as chaves necessárias ('name', 'color', 'owner', 'department') e nenhuma chave a mais.",
                "key",
                (data: any) => hasExactKeys(data, ['name', 'color', 'owner', 'department'])
            ),
            new Test(
                "GET /info - Value Types",
                "Verifica se os valores das chaves 'name', 'color', 'owner', e 'department' são do tipo string.",
                "info",
                (data: any) => {
                    return typeof data.name === 'string' &&
                        typeof data.color === 'string' &&
                        typeof data.owner === 'string' &&
                        typeof data.department === 'string';
                }
            ),
            new Test(
                "GET /info - Non Null Values",
                "Verifica se os valores das chaves 'name', 'color', 'owner', e 'department' não são nulos ou indefinidos.",
                "check_box_outline_blank",
                (data: any) => {
                    return data.name != null &&
                        data.color != null &&
                        data.owner != null &&
                        data.department != null;
                }
            ),
            new Test(
                "GET /info - String Lengths",
                "Verifica se os valores das chaves 'name', 'color', 'owner', e 'department' têm comprimento mínimo de 1 caractere.",
                "straighten",
                (data: any) => {
                    return data.name.length > 0 &&
                        data.color.length > 0 &&
                        data.owner.length > 0 &&
                        data.department.length > 0;
                }
            ),
            new Test(
                "GET /info - Color Format",
                "Verifica se o valor da chave 'color' está no formato hexadecimal (#RRGGBB).",
                "palette",
                (data: any) => /^#[0-9A-Fa-f]{6}$/.test(data.color)
            )
        ]
    }
];


const hasExactKeys = (obj: any, requiredKeys: string[]): boolean => {
    // const requiredKeys = ['name', 'color', 'owner', 'department'];
    const objKeys = Object.keys(obj);
    return requiredKeys.length === objKeys.length && requiredKeys.every(key => objKeys.includes(key));
};