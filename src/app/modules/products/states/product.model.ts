
export interface Product {
	id: number,
   serial: string,
   name: string,
   category: string,
   description: string,
   price: number,
   weight: string,
   stock: number,
   status: 'approved' | 'rejected' | 'pending';
   company?: string,
   deleteAt?: any,
}