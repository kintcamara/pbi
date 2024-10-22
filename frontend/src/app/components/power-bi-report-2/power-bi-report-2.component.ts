import { Component, ElementRef } from '@angular/core';
import * as pbi from 'powerbi-client';
import { PowerbiService } from '../power-bi-report/service/powerbi-auth.service';

@Component({
  selector: 'app-power-bi-report2',
  standalone: false,
  templateUrl: './power-bi-report-2.component.html',
  styleUrl: './power-bi-report-2.component.scss'
})

export class PowerBiReport2Component {
  reportId="8655950c-beb7-484c-957a-6879c6004e96"
  groupId="667d1f75-3ef5-40a1-b978-e01e880d3e4d"
 
  constructor(private el: ElementRef,private powerbiService:PowerbiService) {}

  async ngAfterViewInit() {
    const body={
      reportId:this.reportId,
      groupId: this.groupId,
    }
    this.powerbiService.getToken(body).subscribe((accessToken:any)=>{
      this.initPowerBi(accessToken,this.reportId)
    })   
  }

  initPowerBi(accessToken:string,reportId:string): void | null {
    if(!accessToken){
      return null;
    }
    const embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}`,
      accessToken,
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.All,
      viewMode: 0,
      settings: {
        layoutType: pbi.models.LayoutType.MobileLandscape,
        panes: {
          filters: {
            visible: false
          },
          pageNavigation: {
            visible: false
          }
        },
        filterPaneEnabled: false,
        navContentPaneEnabled: true
      }
    };
    const reportContainer = this.el.nativeElement.querySelector('#reportContainer');
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    powerbi.embed(reportContainer,embedConfig);
  }

}