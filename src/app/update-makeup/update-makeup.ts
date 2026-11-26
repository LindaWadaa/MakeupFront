import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Makeup } from '../model/makeup.model';
import { Image } from '../model/image.model';
import { Makeup as MakeupService } from '../services/makeup';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-makeup',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-makeup.html',
  styleUrl: '../add-makeup/add-makeup.css',
})
export class UpdateMakeup implements OnInit {

  message = '';
  currentMakeup: Makeup = new Makeup();
  dateExpiration = '';
  marques: Marque[] = [];
  updatedMarqueId?: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
  private makeupService: MakeupService){
  }




  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageProduit() {
    if (!this.uploadedImage || !this.currentMakeup.id) return;
    this.makeupService
      .uploadImageProd(this.uploadedImage, this.uploadedImage.name, this.currentMakeup.id)
      .subscribe((img: Image) => {
        this.currentMakeup.images = this.currentMakeup.images || [];
        this.currentMakeup.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.makeupService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentMakeup.images?.indexOf(img, 0) ?? -1;
        if (index > -1) {
          this.currentMakeup.images?.splice(index, 1);
        }
      });
  }

  updateMakeup() {
    this.currentMakeup.marque = this.marques.find(
      item => (item.id ?? item.idMarque ?? item.idmarque) === this.updatedMarqueId,
    );
    this.currentMakeup.dateExpiration = this.dateExpiration;
    delete this.currentMakeup.date_expiration;

    if (this.isImageUpdated && this.uploadedImage) {
      this.makeupService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentMakeup.image = img;
          this.makeupService.updateMakeup(this.currentMakeup).subscribe(() => {
            if (this.currentMakeup.id) {
              this.makeupService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, this.currentMakeup.id)
                .subscribe(() => this.router.navigate(['makeups']));
            } else {
              this.router.navigate(['makeups']);
            }
          });
        });
    } else {
      this.makeupService.updateMakeup(this.currentMakeup).subscribe(() => {
        this.router.navigate(['makeups']);
      });
    }
  }
  ngOnInit(): void {
    this.makeupService.listeMarques().subscribe(
      marques => {
        this.marques = marques;
      },
      () => {
        this.message = "Impossible de charger les marques.";
      },
    );
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!idParam || !Number.isInteger(id)) {
      this.message = "Identifiant du makeup invalide.";
      return;
    }

    this.makeupService.consulterMakeup(id).subscribe({
      next: (makeup) => {
        this.currentMakeup = makeup;
        this.updatedMarqueId =
          makeup.marque?.id ?? makeup.marque?.idMarque ?? makeup.marque?.idmarque;
        this.dateExpiration = this.formatDateForInput(
          makeup.date_expiration ?? makeup.dateExpiration,
        );
        if (this.currentMakeup.image?.idImage) {
          this.makeupService.loadImage(this.currentMakeup.image.idImage).subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
        } else if (this.currentMakeup.id) {
          this.myImage = this.makeupService.apiURL + '/image/loadfromFS/' + this.currentMakeup.id;
        }
      },
      error: () => {
        this.message = "Impossible de charger le makeup.";
      },
    });
  }

  private formatDateForInput(date: Date | string | undefined): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return date.substring(0, 10);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
