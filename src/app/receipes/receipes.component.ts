// import { Receipe } from './receipe.model';
import { Component, OnInit } from '@angular/core';
import { ReceipeService } from './receipe.service';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css'],
})
export class ReceipesComponent implements OnInit {
  // selectedAsReceipe : Receipe;
  constructor() { }

  ngOnInit(): void {
    // this.receipeServ.receipeSelected.subscribe((receipe: Receipe)=>{
    //     this.selectedAsReceipe = receipe;
    // });
  }

}
