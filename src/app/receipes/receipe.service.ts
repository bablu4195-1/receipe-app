import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Receipe } from "./receipe.model";

@Injectable()
export class ReceipeService {
  receipeChanged = new Subject<Receipe[]>();
  // private receipes: Receipe[] = [
  //   new Receipe('A Test Receipe',
  //   'This is a Test',
  //    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8246835.jpg&q=85',
  //    [
  //      new Ingredient('Chicken', 1),
  //     new Ingredient('Lollipop',2)
  //   ]),
  //   new Receipe('A test for sure',
  //    'This is another test',
  //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8246835.jpg&q=85',
  //     [
  //     new Ingredient('Cakes',1),
  //     new Ingredient('Lollipop',2)
  //   ])
  //   ];
  private receipes: Receipe[] = [];
    constructor(private shoppingServ: ShoppingService){}
    setReceipes(receipe: Receipe[]){
     this.receipes = receipe;
     this.receipeChanged.next(this.receipes.slice());
    }
    getReceipe(){
     return this.receipes.slice();
    }
    getReceipes(index: number){
     return this.receipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]){
     this.shoppingServ.addIngredients(ingredients);
    }
    addReceipe(receipe: Receipe){
      this.receipes.push(receipe);
      this.receipeChanged.next(this.receipes.slice())
    }
    updateReceipe(index: number, newReceipe: Receipe){
      this.receipes[index] = newReceipe;
      this.receipeChanged.next(this.receipes.slice())
    }
    deleteReceipe(index: number){
       this.receipes.splice(index, 1);
       this.receipeChanged.next(this.receipes.slice())
    }
}
