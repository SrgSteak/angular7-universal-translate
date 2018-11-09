import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { LocalizeRouterModule } from "@gilsdav/ngx-translate-router";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class SchoolRoutingModule {}