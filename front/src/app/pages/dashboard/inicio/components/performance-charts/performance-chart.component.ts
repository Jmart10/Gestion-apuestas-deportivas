import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartRef!: ElementRef;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    const ctx = this.chartRef.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Oct`),
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
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: {
              callback: value => value + '%'
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}
