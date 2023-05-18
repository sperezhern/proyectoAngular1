import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/author/author.service';
import { Author } from 'src/app/author/model/Author';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/model/Category';
import { Prestamo } from '../model/Prestamo';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { PrestamoService } from 'src/app/prestamo/prestamo.service';

@Component({
    selector: 'app-prestamo-edit',
    templateUrl: './prestamo-edit.component.html',
    styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

    game: Game; 
    prestamo: Prestamo;
    clients: Client[];
    games: Game[];
    authors: Author[];
    categories: Category[];

    constructor(
        public dialogRef: MatDialogRef<PrestamoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private prestamoService: PrestamoService,
        private clientService: ClientService,

    ) { }

    ngOnInit(): void {
        if (this.data.prestamo != null) {
            this.prestamo = Object.assign({}, this.data.prestamo);
        }
        else {
            this.prestamo = new Prestamo();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.game.title != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.prestamo.title.id);
                    if (gameFilter != null) {
                        this.prestamo.game = gameFilter[0];
                    }
                }
            }
        );

        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients

                if (this.prestamo.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.prestamo.client.id);
                    if (clientFilter != null) {
                        this.prestamo.client = clientFilter[0];
                    }
                }
            }
        );
    }

    onSave() {
        this.prestamoService.savePrestamo(this.prestamo).subscribe(result => {
            this.dialogRef.close();
        });    
    }  

    onClose() {
        this.dialogRef.close();
    }

}