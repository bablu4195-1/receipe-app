import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';


@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
receipe: Receipe
id: number;
  constructor(private recipeService: ReceipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
     this.id = +params['id'];
     this.receipe = this.recipeService.getReceipes(this.id);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.receipe.ingredients);
  }
  onEditing(){
   this.router.navigate(['edit'],{relativeTo: this.route})
  }
  onDeleting(){
   this.recipeService.deleteReceipe(this.id)
   this.router.navigate(['/receipes']);
  }
  onCancel(){
   this.router.navigate(['../'],{relativeTo: this.route})
  }
}
