export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }
  
  export interface CheckoutFormData {
    firstName: string
    lastName: string
    companyName: string
    country: string
    streetAddress: string
    townCity: string
    province: string
    zipCode: string
    phone: string
    email: string
    additionalInfo: string
  }
  
  