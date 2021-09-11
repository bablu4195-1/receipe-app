import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Receipe } from './receipes/receipe.model';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 constructor(private authServ: AuthService, private loggingService: LoggingService){}
  ngOnInit(){
  this.authServ.autoLogin();
  this.loggingService.printLog('Hello from AppComponent ngOnInIt')
}
}
