import { NgModule } from "@angular/core";
import { PreloadAllModules, Router, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { ReceipeDetailComponent } from "./receipes/receipe-detail/receipe-detail.component";
import { ReceipeEditComponent } from "./receipes/receipe-edit/receipe-edit.component";
import { ReceipeItemComponent } from "./receipes/receipe-list/receipe-item/receipe-item.component";
import { ReceipeListComponent } from "./receipes/receipe-list/receipe-list.component";
import { ReceipeResolverService } from "./receipes/receipe-resolver.service";
import { ReceipeStartComponent } from "./receipes/receipe-start/receipe-start.component";
import { ReceipesComponent } from "./receipes/receipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoutes: Routes = [
  {path:'', redirectTo:'/receipes', pathMatch:'full'},
  {path: 'receipes', loadChildren:()=>import('./receipes/receipes.module').then(m => m.ReceipesModule)},
  {path: 'shopping-list', loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}

]

@NgModule({imports:[
  RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})
],
exports:[RouterModule]
})
export class AppRoutingModule {

}
