import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ListShoppingComponent } from './components/list-shopping/list-shopping.component';
import { OrderbyPipe } from './shared/pipes/orderby.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ShoppingCartComponent,
    ListShoppingComponent,
    OrderbyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
  ],
  providers: [OrderbyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
