import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { ProductService } from '../../service/product.service';
import { Product } from 'src/app/view/home/product';
import { FilterService } from '../../service/filter/filter.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  products: Product[] = [];
  searchQuery: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  dialogRef!: MatDialogRef<ProfileComponent>;
  constructor(
    public dialog: MatDialog,
    ) { }

  openDialog() {
    this.dialog.open(ProfileComponent, {
      disableClose: true,
      width: '300px',
      height: '350px',
      position: { right: '0px', top: '70px' },
      panelClass: ['animate__animated', 'animate__slideInRight'],
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchEvent.emit('');
  }

  onSearch(): void {
    this.searchEvent.emit(this.searchQuery.trim());
  }


}
