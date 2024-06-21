import {} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [MatCardModule, RouterModule, NavbarComponent],
})
export class HomepageComponent {
  private offerService: OfferService = inject(OfferService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  public offers: Offer[] = [];

  ngOnInit() {
    this.loadOffers();
  }

  protected onSearch(query: string) {
    this.loadOffers(query);
  }

  private loadOffers(query: string = '') {
    this.offerService
      .getAllOffers(query)
      .pipe(
        tap((offers) => {
          this.offers = offers;
          for (let offer of this.offers) {
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
            this.offerService
              .getOfferImageByOfferId(offer.id)
              .subscribe((imageBlob) => {
                const objectURL = URL.createObjectURL(imageBlob);
                offer.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              });
          }
        })
      )
      .subscribe();
  }
}
