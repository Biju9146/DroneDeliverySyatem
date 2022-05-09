import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from './angular-matreial.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsMenusComponent } from './components/restaurants-menus/restaurants-menus.component';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import 'leaflet.smooth_marker_bouncing';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantsMenusComponent,
    DeliveryPageComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LeafletModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
