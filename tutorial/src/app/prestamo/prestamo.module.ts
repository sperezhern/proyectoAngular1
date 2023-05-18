import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoListComponent } from './prestamo-list/prestamo-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PrestamoEditComponent } from './prestamo-edit/prestamo-edit.component';
import { PrestamoItemComponent } from './prestamo-list/prestamo-item/prestamo-item.component';



@NgModule({
  declarations: [
    PrestamoListComponent,
    PrestamoEditComponent,
    PrestamoItemComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatIconModule, 
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,

  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ]
})
export class PrestamoModule { }
