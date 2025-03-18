
export interface Product {
	id: string,
   serial: string,
   name: string,
   category: string,
   description: string,
   price: number,
   weight: number,
   stock: number,
   status: 'approved' | 'rejected' | 'pending';
   company?: string,
   deleteAt?: any,
}