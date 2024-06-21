import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  schemas: [],
})
export class NavbarComponent {
  private router = inject(Router);

  @Output() private search = new EventEmitter<string>();

  protected searchQuery: string = '';

  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.search$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.search.emit(query);
      });
  }

  onSearchChange() {
    this.search$.next(this.searchQuery);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected isOffersRouteActive(): boolean {
    return this.router.url === '/offers';
  }

  protected onLogoTitleClick() {
    this.router.navigate(['/offers']);
  }

  protected onCreateClick() {
    this.router.navigate(['/create']);
  }

  protected onProfileClick() {
    this.router.navigate(['/profile']);
  }

  protected onLogoutClick() {
    this.router.navigate(['/login']);
  }
}
