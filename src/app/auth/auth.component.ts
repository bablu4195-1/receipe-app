import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective,{static: false}) alertHost: PlaceholderDirective;
  constructor(private authServ: AuthService,
    private router: Router,
    private componentFactResolve: ComponentFactoryResolver) { }
    private closeSub: Subscription;
  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if(!form.valid){
     return;
    }
   const email = form.value.email;
   const password =  form.value.password;
   let authObs: Observable<AuthResponseData>
   this.isLoading = true;
   if(this.isLoginMode){
     authObs = this.authServ.login(email, password)
   } else {
    authObs = this.authServ.signUp(email, password)
   }
    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/receipes']);
    },errorMessage => {
     console.log(errorMessage);
     this.error = errorMessage;
    this.showErrorAlert(errorMessage);
     this.isLoading = false;
    })

   form.reset();
  }
  onHandleError(){
    this.error = null;
  }
  private showErrorAlert(message: string){
    const alertCompFact = this.componentFactResolve.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();


    hostViewContainerRef.createComponent(alertCompFact);
    const componentRef = hostViewContainerRef.createComponent(alertCompFact);
    componentRef.instance.message = message;
    componentRef.instance.close.subscribe(()=>{
      this.closeSub = componentRef.instance.close.subscribe(()=>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      })
    })
  }
 ngOnDestroy(){
   if(this.closeSub){
     this.closeSub.unsubscribe();
   }
 }
}
