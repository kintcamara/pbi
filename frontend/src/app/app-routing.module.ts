import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerBiReportComponent } from './components/power-bi-report/power-bi-report.component';
import { PowerBiReport2Component } from './components/power-bi-report-2/power-bi-report-2.component';

const routes: Routes = [
  { path: 'report', component: PowerBiReportComponent },
  { path: 'report-2', component: PowerBiReport2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
