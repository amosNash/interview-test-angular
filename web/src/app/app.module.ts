import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { StudentFormComponent } from './student-form/student-form.component';

function getBaseUrl() {
  return "http://localhost:5000/";
}

@NgModule({
  declarations: [AppComponent, HomeComponent, NavMenuComponent, StudentFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "home", component: HomeComponent, pathMatch: "full" },
      {path: "add-student", component: StudentFormComponent, pathMatch: "full"},
    ]),
    HttpClientModule,
  ],
  providers: [{ provide: "BASE_URL", useFactory: getBaseUrl, deps: [] }],
  bootstrap: [AppComponent],
})
export class AppModule {}
