import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
   // ------------------------------------------------------------------------------------------
   // @ Public Methods
   // ------------------------------------------------------------------------------------------
   
   generateRandomId(): string {
      return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
   }
}
