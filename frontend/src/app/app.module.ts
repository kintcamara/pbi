import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PowerBiReportComponent } from './components/power-bi-report/power-bi-report.component';
import { AuthAzureService } from './service/azure/auth-azure.service';
import { MenuComponent } from './components/menu/menu.component';
import { PowerbiService } from './components/power-bi-report/service/powerbi-auth.service';
import { PowerBiReport2Component } from './components/power-bi-report-2/power-bi-report-2.component';

@NgModule({
  declarations: [
    AppComponent,
    PowerBiReportComponent,
    MenuComponent,
    PowerBiReport2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PowerBIEmbedModule
  ],
  providers: [PowerbiService,AuthAzureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
