import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrandDataService } from '../model/brand-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Marca } from '../model/brand';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateResult } from '../model/update-result';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {

  @Input() nMarca: Marca;
  @Output() conferma = new EventEmitter<boolean>();
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
        this.nMarca.nome,
        Validators.required
      ],
      fondazione: [
        this.nMarca.fondazione,
        Validators.compose([
          Validators.required, Validators.pattern(/^[0-9]{4}$/)
        ])
      ],
      website: [
        this.nMarca.website,
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
    this.nMarca.nome = this.marcaFG.value.nome;
    this.nMarca.fondazione = this.marcaFG.value.fondazione;
    this.nMarca.website = this.marcaFG.value.website;
    this.brandSvc.updateBrand(this.nMarca)
      .subscribe((response: any) => {
        const updateResult: UpdateResult = response;
        this.messaggio = (updateResult.esito.marca.aggiorna ? 'Updated brand data!' : 'Error! Brand data not updated!');
        this.messaggioCtrl = false;
        this.openModal(content);
      }, (error: any) => {
        this.messaggio = 'HTTP error!<br><br>' + error.message;
        this.messaggioCtrl = true;
        this.openModal(content);
      });
  }

  openModal(content: any) {
    this.modalSvc.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result
      .then(() => {
        if (this.messaggio) {
          this.conferma.emit();
        }
      });
  }

}
