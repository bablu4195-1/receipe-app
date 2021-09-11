import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSubs: Subscription
  constructor(private shoppingServ: ShoppingService,
    private logginService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingServ.getIngredients();
    this.igChangeSubs = this.shoppingServ.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
    this.logginService.printLog('Hello from bablu4195');
  }
  onEditItem(index: number){
   this.shoppingServ.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.igChangeSubs.unsubscribe();
  }
}
