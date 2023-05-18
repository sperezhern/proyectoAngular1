import { Game } from "src/app/game/model/Game";
import { Client } from "src/app/client/model/Client";

export class Prestamo {
    id: number;
    fechaInicio: string;
    fechaFin: string;
    game: Game;
    client: Client;
}