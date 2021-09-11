import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  receipeForm: FormGroup;
  constructor(
    private receipeServ: ReceipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.editMode)
    })
  }
  onSubmit(){
    // const receipe = new Receipe(this.receipeForm.value['name'],
    // this.receipeForm.value['description'],
    // this.receipeForm.value['imagePath'],
    // this.receipeForm.value['ingredients']);
   if(this.editMode){
     this.receipeServ.updateReceipe(this.id,this.receipeForm.value);
   } else {
     this.receipeServ.addReceipe(this.receipeForm.value);
   }
   this.onCancel();
  }
  onAddingIngredient(){
  (<FormArray>this.receipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  )
  }
  onDeletingIngredient(index: number){
    (<FormArray>this.receipeForm.get('ingredients')).clear();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }
  get controls() { // a getter!
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }
  private initForm(){
    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let receipeIngredients = new FormArray([])
    if(this.editMode){
      const receipe = this.receipeServ.getReceipes(this.id);
      receipeName = receipe.name;
      receipeImagePath = receipe.imagePath;
      receipeDescription = receipe.description;
      if(receipe['ingredients']){
        for(let ingredient of receipe.ingredients){
          receipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.receipeForm = new FormGroup({
    'name': new FormControl(receipeName, Validators.required),
    'imagePath': new FormControl(receipeImagePath,Validators.required),
    'description': new FormControl(receipeDescription, Validators.required),
    'ingredients': receipeIngredients
  })
  }

}
