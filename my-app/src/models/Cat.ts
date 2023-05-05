export interface Cat {
    id: number;
    name: string;
    price: number;
    origin: string;
    avatar: string;
}
export interface Response {
    cats: Cat[]
  }