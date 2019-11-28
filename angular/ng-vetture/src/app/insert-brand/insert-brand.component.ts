import { Component, OnInit } from '@angular/core';
import { BrandDataService } from '../model/brand-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateResult } from '../model/update-result';

@Component({
  selector: 'app-insert-brand',
  templateUrl: './insert-brand.component.html',
  styleUrls: ['./insert-brand.component.scss']
})
export class InsertBrandComponent implements OnInit {

  marcaFG: FormGroup;

  nomeCtrl = false;
  fondazioneCtrl = false;
  websiteCtrl = false;

  messaggio: string;
  messaggioCtrl = false;

  constructor(private fb: FormBuilder, private brandSvc: BrandDataService, private modalSvc: NgbModal) { }

  ngOnInit() {
    this.marcaFG = this.fb.group({
      nome: [
        '',
        Validators.required
      ],
      fondazione: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{4}$/)
        ])
      ],
      website: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)
        ])
      ]
    });
  }

  check(element: string) {
    const ctrl = (this.marcaFG.get(element).touched || this.marcaFG.get(element).dirty) && this.marcaFG.get(element).invalid;
    switch (element) {
      case 'nome':
        this.nomeCtrl = ctrl;
        break;
      case 'fondazione':
        this.fondazioneCtrl = ctrl;
        break;
      case 'website':
        this.websiteCtrl = ctrl;
    }
  }

  onSubmit(content: any) {
    this.brandSvc.insertBrand(this.marcaFG.value)
      .subscribe((response: any) => {
        const updateResult: UpdateResult = response;
        this.messaggio = (updateResult.esito.marca.inserisci ? 'Added brand data!' : 'Error! Brand data not added!');
        this.messaggioCtrl = false;
        this.openModal(content);
      }, (error: any) => {
        this.messaggio = 'HTTP error!<br><br>' + error.message;
        this.messaggioCtrl = true;
        this.openModal(content);
      });
  }

  openModal(content: any) {
    this.modalSvc.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then(() => this.marcaFG.reset());
  }

}
