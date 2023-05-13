export interface User{
    id: number;
    username: string;
    age: number;
    avatar: string;
}

export interface Response {
    cats: User[]
  }