import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-monitor',
  templateUrl: './crypto-monitor.component.html',
  styleUrls: ['./crypto-monitor.component.css']
})
export class CryptoMonitorComponent implements OnInit {
  pair: string = 'btcusdt'; // Par padrão (Bitcoin/USDT)
  price: string = '';
  percentageChange: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.startMonitoring(this.pair);
    console.log('CryptoMonitorComponent foi inicializado');
  }

  startMonitoring(pair: string): void {
    this.loading = true;
    this.error = null;

    // Conectar ao WebSocket
    this.cryptoService.connect(pair).subscribe({
      next: () => {
        console.log(`Connected to ${pair}`);
        this.fetchData(pair);
      },
      error: (err) => {
        this.error = `Error connecting to ${pair}: ${err.message}`;
        this.loading = false;
      }
    });
  }

  fetchData(pair: string): void {
    // Buscar os dados da moeda
    setInterval(() => {
      this.cryptoService.getData(pair).subscribe({
        next: (response) => {
          if (response.success) {
            this.price = response.data.price;
            this.percentageChange = response.data.percentageChange;
          }
        },
        error: (err) => {
          this.error = `Error fetching data: ${err.message}`;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }, 3000); // Atualiza a cada 3 segundos
  }

  stopMonitoring(pair: string): void {
    this.cryptoService.disconnect(pair).subscribe({
      next: () => {
        console.log(`Disconnected from ${pair}`);
      },
      error: (err) => {
        this.error = `Error disconnecting from ${pair}: ${err.message}`;
      }
    });
  }
}
