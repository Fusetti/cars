import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrandDataService } from '../model/brand-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Marca } from '../model/brand';
import { QueryResult } from '../model/query-result';

@Component({
  selector: 'app-search-brands',
  templateUrl: './search-brands.component.html',
  styleUrls: ['./search-brands.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBrandsComponent implements OnInit {

  info: FormGroup = this.fb.group({
    nome: ['', Validators.required]
  });
  listaMarche: Array<Marca>;
  marcheTrovate: number;

  messaggio: string;

  isCollapsed = true;

  constructor(private fb: FormBuilder, private brandSvc: BrandDataService) { }

  ngOnInit() {
  }

  onSubmit(toolTip: any) {
    if (this.info.valid) {
      if (toolTip.isOpen()) {
        toolTip.close();
      }
      this.brandSvc.getBrandByName(this.info.value.nome)
        .subscribe((response: any) => {
          const queryResult: QueryResult = response;
          this.listaMarche = queryResult.esito.marca;
          this.marcheTrovate = this.listaMarche.length;
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
