import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // <--- Add this line

import { AppComponent } from './app.component';
import { PlanetsComponent } from './components/planets/planets.component'; //<--- Line should already be added when component generated

@NgModule({
  declarations: [AppComponent, PlanetsComponent], //<--- PlanetsComponent should already be added
  imports: [BrowserModule, HttpClientModule], //<--- Add HttpClientModule
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}