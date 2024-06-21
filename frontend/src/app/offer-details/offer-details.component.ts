import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.scss',
  imports: [MatCardModule, NavbarComponent],
})
export class OfferDetailsComponent {
  private route = inject(ActivatedRoute);
  private offerService = inject(OfferService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  protected imagePath: SafeUrl | undefined;

  public offer: Offer | undefined;

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId) {
      this.offerService
        .getOfferById(offerId)
        .pipe(
          tap((offer) => {
            switch (offer.type) {
              case 'Type1':
                offer.type = 'Brauche';
                break;
              case 'Type2':
                offer.type = 'Biete';
                break;
              default:
                offer.type = 'Tausch';
                break;
            }
            this.offer = offer;
            this.offerService
              .getOfferImageByOfferId(this.offer.id)
              .subscribe((imageBlob) => {
                const objectURL = URL.createObjectURL(imageBlob);
                this.imagePath =
                  this.sanitizer.bypassSecurityTrustUrl(objectURL);
              });
          })
        )
        .subscribe();
    }
  }
}
