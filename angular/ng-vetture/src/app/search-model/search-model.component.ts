import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelDataService } from '../model/model-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Modello } from '../model/model';
import { QueryResult } from '../model/query-result';
import { BrandDataService } from '../model/brand-data.service';

@Component({
  selector: 'app-search-model',
  templateUrl: './search-model.component.html',
  styleUrls: ['./search-model.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchModelComponent implements OnInit {

  info: FormGroup = this.fb.group({
    nome: ['', Validators.required]
  });
  listaModelli: Array<Modello>;
  modelliTrovati: number;
  marca: string;
  messaggio: string;
  isCollapsed = true;
  web:string;
  fondazione:number;

  constructor(private fb: FormBuilder, private modelSvc: ModelDataService, private brandSvc: BrandDataService) { }

  ngOnInit() {
  }

  onSubmit(toolTip: any) {
    if (this.info.valid) {
      if (toolTip.isOpen()) {
        toolTip.close();
      }
      this.modelSvc.getModelByName(this.info.value.nome)
        .subscribe((response: any) => {
          const queryResult: QueryResult = response;
          this.listaModelli = queryResult.esito.modello;
          this.modelliTrovati = this.listaModelli.length;
          this.isCollapsed = false;
          this.brandSvc.getBrandById(this.listaModelli[0].idMarca)
            .subscribe((response: any) => {
              const queryResult: QueryResult = response;
              this.marca = queryResult.esito.marca[0].nome;
              this.fondazione = queryResult.esito.marca[0].fondazione;
              this.web = queryResult.esito.marca[0].website;
              this.isCollapsed = false;
            }, (error: any) => {
              this.messaggio = 'HTTP error!<br><br>' + error.message;
              this.isCollapsed = false;
            });

          this.isCollapsed = false;
        }, (error: any) => {
          this.messaggio = 'HTTP error!<br><br>' + error.message;
          this.isCollapsed = false;
        });


    } else {
      if (!toolTip.isOpen()) {
        toolTip.open();
      }
      this.isCollapsed = true;
    }
  }


}
