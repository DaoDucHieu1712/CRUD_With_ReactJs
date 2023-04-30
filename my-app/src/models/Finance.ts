export interface Finance {
  id: number
  createdAt: Date
  description: string
  price: number
  type: string
}

export interface Response {
  finances: Finance[]
}
