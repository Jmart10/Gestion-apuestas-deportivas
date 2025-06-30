import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartRef!: ElementRef;
  @Input() data: number[] = [];
  @Input() labels: string[] = [];

  chart!: Chart;

  ngOnChanges() {
    if (this.data.length && this.chartRef?.nativeElement) {
      this.rngAfterViewInit();
    }
  }

  rngAfterViewInit(): void {
  Chart.register(...registerables);
  const ctx = this.chartRef.nativeElement.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Rendimiento',
        data: this.data,
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