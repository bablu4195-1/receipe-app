import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
private userSub: Subscription;
isAuthenticated = false;
constructor(private dataStorageServ: DataStorageService,
private authServ: AuthService){}
ngOnInit(){
  this.userSub = this.authServ.user.subscribe(user => {
  this.isAuthenticated = !!user;
  console.log(!user);
  console.log(!!user);
  })
  }
onSaveData(){
 this.dataStorageServ.storeReceipes();
}
onFetchData(){
 this.dataStorageServ.fetchReceipes().subscribe();
}
onLogout(){
  this.authServ.logout();
}
ngOnDestroy(){
  this.userSub.unsubscribe();
}
}
