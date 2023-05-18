import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/game/model/Game';

@Component({
  selector: 'app-prestamo-item',
  templateUrl: './prestamo-item.component.html',
  styleUrls: ['./prestamo-item.component.scss']
})
export class PrestamoItemComponent {

  @Input() game: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
