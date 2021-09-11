import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static: false}) shopListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredient;
  constructor(private shoppingServ: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingServ.startedEditing.subscribe((index: number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingServ.gotIngredients(index);
      this.shopListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }
  onAddingItem(form: NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.shoppingServ.updateIngredients(this.editedItemIndex, newIngredient)
  }else{
    this.shoppingServ.addIngredient(newIngredient)
  }
  this.editMode = false;
  form.reset();
  }
  onClear(){
    this.shopListForm.reset();
    this.editMode = false;
  }
  onDeleting(){
    this.shoppingServ.deletingingrdients(this.editedItemIndex);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}

