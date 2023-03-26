import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PosteService } from '../services/poste.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  public postes: any[] = [];
  public services: any[] = [];
  public service: any;
  public posteForm!: FormGroup;
  public loading: boolean = false;
  public saving: boolean = false;
  public showPosteForm: boolean = false;
  constructor(
    private posteService: PosteService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {
    this.posteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    await this.getPostes();
  }

  public async getPostes() {
    this.loading = true;
    (await this.posteService.getPostes()).subscribe((postes: any) => {
      this.postes = postes;
      this.loading = false;
    }, (error: any) => {
      if (error.status === 0) {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Directions', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
      } else {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Directions', detail: `${error.error.message}` });
      }
      this.loading = false;
    });
  }

  public async addPoste() {
    this.saving = true;
    if (this.posteForm.valid) {
      this.posteService.addPoste(this.posteForm.value).subscribe(async (poste: any) => {
        this.messageService.add({ key: 'infos', severity: 'success', summary: 'Enregistrement', detail: `Poste ${poste?.name} ajouté avec succes` });
        this.posteForm.reset();
        this.saving = false;
        await this.getPostes();
      }, (error: any) => {
        if (error.status === 0) {
          this.messageService.add({ key: 'infos', severity: 'error', summary: 'Enregistrement', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
        } else {
          this.messageService.add({ key: 'infos', severity: 'error', summary: 'Enregistrement', detail: `${error.error.message}` });
        }
        this.saving = false;
      });
    } else {
      this.messageService.add({ key: 'infos', severity: 'error', summary: 'Enregistrement', detail: 'veuillez renseigner correctement les champs' });
      this.saving = false;
    }
  }

  onRowEditSave(poste: any) {
    this.posteService.updatePoste(poste).subscribe((success: any) => {
      this.messageService.add({ key: 'infos', severity: 'success', summary: 'Mise à jour', detail: 'Mise à jour du rôle effectuée' });
    }, (error: any) => {
      if (error.status === 0) {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Mise à jour', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
      } else {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Mise à jour', detail: `${error.error.message}` });
      }
    });
  }

}
