import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prestamo } from '../model/Prestamo';
import { PrestamoService } from '../prestamo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Game } from 'src/app/game/model/Game';
import { Category } from 'src/app/category/model/Category';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { CategoryService } from 'src/app/category/category.service';
import { GameService } from 'src/app/game/game.service';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';


@Component({
  selector: 'app-prestamo-list',
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  prestamos: Prestamo[];
  clients: Client[];
  games: Game[];
  filterClient: Client;
  filterCategory: Category;
  filterTitle: string;
  filterGame: Game;
  categories: Category[];


  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client', 'fechaInicio', 'fechaFin', 'action'];

  constructor(
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.gameService.getGames().subscribe(
      games => this.games = games
  );

  this.categoryService.getCategories().subscribe(
      categories => this.categories = categories
  );

  this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    this.prestamoService.getPrestamos(pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }
 
  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterClient = null;
    this.filterGame = null;
    this.filterCategory = null;
    this.onSearch();
  }

  onSearch(): void {

    let title = this.filterTitle;
    let categoryId = this.filterCategory != null ? this.filterCategory.id : null;

    this.gameService.getGames(title, categoryId).subscribe(
        games => this.games = games
    );
}

  createPrestamo() {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deletePrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prestamoService.deletePrestamo(prestamo.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }



}
