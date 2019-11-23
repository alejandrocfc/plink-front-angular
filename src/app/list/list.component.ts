import { Component, OnInit } from '@angular/core';
import {CoinsService} from '../coins.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  coins;
  loading;
  show = [];
  message = 'No hay nada que mostrar';
  size = 20;
  page = 1;

  constructor(
    public coinService: CoinsService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadCoins();
  }

  // Issues list
  loadCoins() {
    return this.coinService.GetCoins().subscribe((data) => {
      if (data.success) {
        const coins = data.prices.map(({name, price, crypto}) => ({name, price, crypto: crypto === '1' }));
        this.coins = coins;
        this.show = coins.slice(0, 20);
      } else {
        this.message = data.error;
      }
      this.loading = false;
    });
  }

  change(coin) {
    console.log(coin);
  }

  onScroll() {
    this.show = this.show.concat(this.coins.slice(this.page * this.size, (this.page + 1) * this.size));
    this.page += 1;
  }

}
