import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { NavbarComponent } from '../navbar/navbar.component';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-create',
  standalone: true,
  templateUrl: './offer-create.component.html',
  styleUrl: './offer-create.component.scss',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class OfferCreateComponent {
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private offerService: OfferService = inject(OfferService);

  protected offerForm: FormGroup;
  protected selectedImage: string | null = null;
  protected compressedFile: File | null = null;

  constructor() {
    this.offerForm = this.formBuilder.group({
      id: [uuidv4()],
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: [uuidv4()],
      type: ['', Validators.required],
      active: [true],
      views: [0],
    });
  }

  protected onSubmit(): void {
    if (this.offerForm.valid && this.compressedFile) {
      const newOffer = this.offerForm.value;
      const formData = new FormData();
      formData.append('id', newOffer.id);
      formData.append('title', newOffer.title);
      formData.append('description', newOffer.description);
      formData.append('user_id', newOffer.userId);
      formData.append('type', newOffer.type);
      formData.append('active', newOffer.active.toString());
      formData.append('views', newOffer.views.toString());
      formData.append('image', this.compressedFile, this.compressedFile.name);
      this.offerService.postOffer(formData).subscribe();

      this.offerForm.reset({
        id: uuidv4(),
        userId: uuidv4(),
        active: true,
        views: 0,
      });

      this.router.navigate(['offers']);
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        this.compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(this.compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  }
}
