import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from './angular-matreial.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import 'leaflet.smooth_marker_bouncing';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HeaderComponent } from './header/header.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterInterceptor } from './http/http-inter.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    DeliveryPageComponent,
    OrderListComponent,
    HeaderComponent,
    OrderFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LeafletModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
