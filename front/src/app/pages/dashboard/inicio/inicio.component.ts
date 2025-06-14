import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  imports: [CommonModule]
})

export class InicioComponent  implements OnInit {
  @ViewChild('performanceChart', { static: true }) performanceChartRef!: ElementRef;
  
  // Datos del usuario
  userName = 'Alex Fernández';
  
  // Métricas
  betsPlaced = 42;
  betsChange = 12.5;
  betsFollowed = 18;
  followedChange = -3.2;
  betsCreated = 7;
  createdChange = 25;
  hitRate = 68.3;
  hitRateChange = 4.2;
  
  // Últimas apuestas
  recentBets = [
    { title: 'Junior Vs Medellín', date: new Date(), result: 'won', amount: 2.16 },
    { title: 'Colombia Vs Argentina', date: new Date(Date.now() - 86400000), result: 'lost', amount: 2.10 },
    { title: 'Brasil Vs Paraguay', date: new Date(Date.now() - 172800000), result: 'pending', amount: 2.00 },
    { title: 'Millonarios Vs Nacional', date: new Date(Date.now() - 259200000), result: 'won', amount: 1.80 },
    { title: 'América Vs Tolima', date: new Date(Date.now() - 345600000), result: 'lost', amount: 2.50 }
  ];
  
  ngOnInit(): void {
    this.initPerformanceChart();
  }
  
  initPerformanceChart(): void {
    Chart.register(...registerables);
    
    const ctx = this.performanceChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({length: 30}, (_, i) => `${i+1} Oct`),
        datasets: [{
          label: 'Rendimiento',
          data: [65, 59, 80, 81, 56, 55, 40, 60, 65, 70, 72, 75, 70, 68, 72, 78, 75, 72, 70, 68, 65, 70, 75, 80, 82, 85, 82, 80, 78, 75],
          fill: true,
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}