import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';

const routes: Routes = [
  // { path: '', component: AreaChartComponent },
  // { path: 'delivery', component: OrderDeliveryComponent },
  { path: '', component: OrderDeliveryComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
