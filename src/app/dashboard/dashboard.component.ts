import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

// Daftarkan elemen, skala, dan controller yang dibutuhkan secara eksplisit
Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController // Mendaftarkan controller untuk chart bar
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    var xValues = ["Transportation", "Energy usage", "Dietary Preference"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green", "blue"];

    new Chart("myChart", {
      type: "bar", // Jenis chart bar
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Agar chart tetap sesuai dengan kontainer
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Breakdown of Emissions"
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
