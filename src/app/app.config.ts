import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routes';  // Import your routing module
import { RouterModule } from '@angular/router';  // Import RouterModule
import { NgxApexchartsModule } from 'ngx-apexcharts';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpInterceptor } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule,   
    NgxApexchartsModule,
  ],
  providers: [
    {
    useClass: AuthInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
    }
  ],
  bootstrap: [AppComponent]  
})
export class AppModule {}
