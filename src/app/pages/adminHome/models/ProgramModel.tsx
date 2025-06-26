export interface Major {
  id: string
  name: string
  description: string
}

export interface Campus {
  id: string
  name: string
  address: string
  description: string
}

export interface Specialization {
  id: string
  name: string
  description: string
  major: Major
}

export interface Offering {
  id: string
  year: number
  target: number
  price: number
  campus: Campus
  specialization: Specialization
}

export interface Program {
  id: string
  name: string
  description: string
  duration: number
  degree: string
}