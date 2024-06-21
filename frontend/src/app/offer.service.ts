import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Offer } from './offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private httpClient: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8080';

  public getAllOffers(searchQuery: string = ''): Observable<Offer[]> {
    // Check for http query parameters
    let params = new HttpParams();
    if (searchQuery) {
      params = params.set('title', searchQuery);
    }

    // Fetch offers from DB
    return this.httpClient.get<any>(`${this.apiUrl}/offers`, { params }).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  public getOfferById(id: string): Observable<Offer> {
    return this.httpClient
      .get<{ data: Offer }>(`${this.apiUrl}/offer/${id}`)
      .pipe(map((response) => response.data));
  }

  public getOfferImageByOfferId(offerId: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/offer-image/${offerId}`, {
      responseType: 'blob',
    });
  }

  public postOffer(newOffer: FormData) {
    return this.httpClient.post(`${this.apiUrl}/offers`, newOffer);
  }
}
