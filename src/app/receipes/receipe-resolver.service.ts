import { Injectable, Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Receipe } from "./receipe.model";
import { ReceipeService } from "./receipe.service";
import { ReceipesComponent } from "./receipes.component";

@Injectable()
export class ReceipeResolverService implements Resolve<Receipe[]>{
 constructor(private dataStore: DataStorageService,
  private receipeServ: ReceipeService){}
 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   const receipe = this.receipeServ.getReceipe();
   if(receipe.length === 0){
     return this.dataStore.fetchReceipes();
   }
   else{
     return receipe;
   }
 }
}
