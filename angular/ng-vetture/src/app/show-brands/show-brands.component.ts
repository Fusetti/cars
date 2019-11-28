import { Component, OnInit } from '@angular/core';
import { BrandDataService } from '../model/brand-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Marca } from '../model/brand';
import { QueryResult } from '../model/query-result';
import { UpdateResult } from '../model/update-result';

@Component({
  selector: 'app-show-brands',
  templateUrl: './show-brands.component.html',
  styleUrls: ['./show-brands.component.scss']
})
export class ShowBrandsComponent implements OnInit {

  listaMarche: Array<Marca>;

  messaggio: string;

  page = 1;
  pageSize = 4;
  collectionSize: number;

  nuovaMarca: Marca;

  alertCtrl = false;

  constructor(private brandSvc: BrandDataService, private modalSvc: NgbModal) { }

  ngOnInit() {
    this.brandSvc.getAllBrands()
      .subscribe((response: any) => {
        const queryResult: QueryResult = response;
        this.listaMarche = queryResult.esito.marca;
        this.collectionSize = this.listaMarche.length;
      }, (error: any) => {
        setTimeout(() => {
          this.messaggio = 'No brands found!<br><br>HTTP error!<br><br>' + error.message;
        }, 7000);
      });
  }

  updateBrand(marca: Marca, modalUpdate: any) {
    this.nuovaMarca = marca;
    this.modalSvc.open(modalUpdate, {ariaLabelledBy: 'modal1-basic-title'});
  }

  finishUpdate() {
    this.modalSvc.dismissAll();
  }

  removeBrand(id: number, modalRemove: any) {
    this.modalSvc.open(modalRemove, {ariaLabelledBy: 'modal2-basic-title'}).result
    .then((res) => {
      if (res) {
        this.brandSvc.removeBrand(id)
          .subscribe((response: any) => {
            const updateResult: UpdateResult = response;
            if (updateResult.esito.marca.rimuovi) {
              this.listaMarche = this.listaMarche.filter((m: Marca) => m.idMarca !== id);
              this.collectionSize = this.listaMarche.length;
              this.messaggio = 'Brand data removed!';
            } else {
              this.messaggio = 'Error! Brand data not removed!';
            }
            this.alertCtrl = true;
          }, (err: any) => {
            this.messaggio = 'HTTP error! ' + err.message;
            this.alertCtrl = true;
          });
      }
    });
  }

  closeAlert() {
    this.alertCtrl = false;
  }

}
