import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModelDataService } from '../model/model-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Modello } from '../model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateResult } from '../model/update-result';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.scss']
})
export class UpdateModelComponent implements OnInit {

  @Input() nModello: Modello ;
  @Output() conferma = new EventEmitter<boolean>();
  modelloFG: FormGroup;

  nomeCtrl = false;
  cilindrataCtrl = false;
  potenzaCtrl = false;

  messaggio: string;
  messaggioCtrl = false;

  constructor(private fb: FormBuilder, private modelSvc: ModelDataService, private modalSvc: NgbModal) { }

  ngOnInit() {
    this.modelloFG = this.fb.group({
    nome: [
      this.nModello.nome,
      Validators.required
    ],
    cilindrata: [
      this.nModello.cilindrata,
      Validators.compose([
        Validators.required, Validators.pattern(/^[0-9]{3,5}$/)
      ])
    ],
    potenza: [
      this.nModello.potenza,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{3,5}$/)
      ])
    ]
  });
  }


  check(element: string) {
    const ctrl = (this.modelloFG.get(element).touched || this.modelloFG.get(element).dirty) && this.modelloFG.get(element).invalid;
    switch (element) {
      case 'nome':
        this.nomeCtrl = ctrl;
        break;
      case 'cilindrata':
        this.cilindrataCtrl = ctrl;
        break;
      case 'potenza':
        this.potenzaCtrl = ctrl;
    }
  }

  onSubmit(content: any) {
    this.nModello.nome = this.modelloFG.value.nome;
    this.nModello.cilindrata = this.modelloFG.value.cilindrata;
    this.nModello.potenza = this.modelloFG.value.potenza;
    this.modelSvc.updateModel(this.nModello)
      .subscribe((response: any) => {
        const updateResult: UpdateResult = response;
        this.messaggio = (updateResult.esito.modello.aggiorna ? 'Updated model data!' : 'Error! Model data not updated!');
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
