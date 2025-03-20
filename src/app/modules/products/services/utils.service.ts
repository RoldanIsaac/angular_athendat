import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
   // ------------------------------------------------------------------------------------------
   // @ Public Methods
   // ------------------------------------------------------------------------------------------
   
   generateRandomId(): number {
      return Math.floor(Math.random() * 1000000);
   }
}
