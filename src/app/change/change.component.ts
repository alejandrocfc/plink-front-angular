import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.sass']
})
export class ChangeComponent implements OnInit {

  form: FormGroup;
  options = [];
  result;
  loading;
  fetch;
  message;

  constructor(
    public coinService: CoinsService,
    private formBuilder: FormBuilder) {
    this.fetch = true;
    this.form = this.formBuilder.group({
      from: [''],
      to: [''],
      qty: [''],
    });
  }

  ngOnInit() {
    const digital = this.coinService.GetDigital();
    const fiat = this.coinService.GetFiat();
    forkJoin([digital, fiat]).subscribe(results => {
      const digitalCurrencies = results[0];
      const fiatCurrencies = results[1];
      if (digitalCurrencies.success && fiatCurrencies.success) {
        const list = [...digitalCurrencies.digital_currencies, ...fiatCurrencies.fiat_currencies];
        this.options = list.map(item => {
          const info = Object.entries(item)[0];
          return {value: info[0], label: info[1]};
        });
        if (window.history.state.data) {
          this.form.controls.from.patchValue(window.history.state.data);
        } else {
          this.form.controls.from.patchValue('BTC');
        }
        this.form.controls.to.patchValue('USD');
      } else {
        this.message = digitalCurrencies.error + fiatCurrencies.error;
      }
      this.fetch = false;
    }, error => {
      this.fetch = false;
      this.message = error;
    });
  }

  submit() {
    this.loading = true;
    const {qty, from, to} = this.form.value;
    this.coinService.ChangeCoin( qty, from, to).subscribe((data) => {
      if (data.success) {
        this.result = data.to_quantity;
      } else {
        this.message = data.error;
      }
      this.loading = false;
    });
  }

  reset() {
    this.result = null;
    this.form.controls.to.patchValue('USD');
    this.form.controls.from.patchValue('BTC');
    this.form.controls.qty.patchValue('');
  }

}
