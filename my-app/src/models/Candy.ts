export interface Candy {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface Response {
    candys: Candy[];
}
