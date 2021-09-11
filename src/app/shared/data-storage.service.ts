import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Receipe } from "../receipes/receipe.model";
import { ReceipeService } from "../receipes/receipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators"
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService {
 constructor(private receipeServ: ReceipeService,
  private authServ: AuthService,
  private http: HttpClient){}

    storeReceipes(){
      const receipes = this.receipeServ.getReceipe();
      this.http.put('https://receipe-58213-default-rtdb.asia-southeast1.firebasedatabase.app/receipes.json',
      receipes).subscribe(response => {
        console.log(response);
      })
    }
    fetchReceipes(){

        return this.http.get<Receipe[]>('https://receipe-58213-default-rtdb.asia-southeast1.firebasedatabase.app/receipes.json')
        .pipe(map(receipes => {
        return receipes.map(receipe =>{
          return {...receipe, ingredients: receipe.ingredients ? receipe.ingredients: []}
        })
      }),
      tap(response => {
        this.receipeServ.setReceipes(response);
      }));
    }

}
function fetchReceipes() {
  throw new Error("Function not implemented.");
}

