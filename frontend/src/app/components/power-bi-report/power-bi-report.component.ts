import { Component, ElementRef } from '@angular/core';
import * as pbi from 'powerbi-client';
import { PowerbiService } from './service/powerbi-auth.service';

@Component({
  selector: 'app-power-bi-report',
  standalone: false,
  templateUrl: './power-bi-report.component.html',
  styleUrl: './power-bi-report.component.scss'
})

export class PowerBiReportComponent {
  reportId="e4e1827f-7826-40c2-ae6b-8e606b3ecb72";
  groupId="43f75457-3e2a-4177-ac16-a00b71de170d";
  datasetId="cec66f70-881a-4e8a-9d44-cf57f4bbf9be";
  dataSetsData:any=[]
  onSwitch:boolean=false;
  constructor(private el: ElementRef,private powerbiService:PowerbiService) {}

  async ngAfterViewInit() {
      const body={
        reportId:this.reportId,
        groupId: this.groupId,
      }
      this.powerbiService.getToken(body).subscribe((accessToken:any)=>{
        this.initPowerBi(accessToken,this.reportId)
      })
      this.powerbiService.getDataSets({datasetId:this.datasetId}).subscribe((data)=>{
          this.dataSetsData=data;
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
    const report=powerbi.embed(reportContainer,embedConfig);
    report.off("rendered");
  }
}
