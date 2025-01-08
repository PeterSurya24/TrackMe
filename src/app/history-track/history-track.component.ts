import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
interface CarbonData {
  date: string;
  carbonEmission: number;
}
@Component({
  selector: 'app-history-track',
  templateUrl: './history-track.component.html',
  styleUrls: ['./history-track.component.css']
})
export class HistoryTrackComponent {
  startDate!: Date;
  endDate!: Date;
  chartData: any = null;
  chartDescriptions: { date: string; value: number; description: string }[] = []; // Declare the property
  selectedTarget: string = '';
  selectedCategory: string = '';
  goalSet: boolean = false;


  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Carbon Footprint (kg CO₂)',
        },
        beginAtZero: true, // Start the y-axis at 0
      },
    },
  };

  carbonFootprintData = [
    { date: '2024-10-01', value: 30 },
    { date: '2024-10-02', value: 45 },
    { date: '2024-10-03', value: 50 },
    { date: '2024-10-04', value: 25 },
    { date: '2024-10-05', value: 35 },
    { date: '2024-10-06', value: 60 },
    { date: '2024-10-07', value: 70 },
    { date: '2024-10-08', value: 15 },
    { date: '2024-10-09', value: 30 },
    { date: '2024-10-10', value: 15 },
    { date: '2024-10-11', value: 80 },
    { date: '2024-10-12', value: 40 },
    { date: '2024-10-13', value: 44 },
    { date: '2024-10-14', value: 28 },
    { date: '2024-10-15', value: 22 },
    { date: '2024-10-16', value: 38 },
    { date: '2024-10-17', value: 37 },
    { date: '2024-10-18', value: 19 },
    { date: '2024-10-19', value: 23 },
    { date: '2024-10-20', value: 21 },
    { date: '2024-10-21', value: 25 },
    { date: '2024-10-22', value: 18 },
    { date: '2024-10-23', value: 27 },
    { date: '2024-10-24', value: 22 },
    { date: '2024-10-25', value: 88 },
    { date: '2024-10-26', value: 30 },
    { date: '2024-10-27', value: 59 },
    { date: '2024-10-28', value: 20 },
    { date: '2024-10-29', value: 40 },
    { date: '2024-10-30', value: 35 },
    { date: '2024-10-31', value: 98 },
    { date: '2024-11-01', value: 25 },
    { date: '2024-11-02', value: 62 },
    { date: '2024-11-03', value: 68 },
    { date: '2024-11-04', value: 30 },
    { date: '2024-11-05', value: 65 },
    { date: '2024-11-06', value: 20 },
    { date: '2024-11-07', value: 50 },
    { date: '2024-11-08', value: 25 },
    { date: '2024-11-09', value: 48 },
    { date: '2024-11-10', value: 78 },
    { date: '2024-12-01', value: 82 },
    { date: '2024-12-15', value: 30 },
  ];
  
  generateChart() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    if (this.endDate < this.startDate) {
      alert('End date must be later than start date.');
      return;
    }

    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0); // Start of the day

    const end = new Date(this.endDate);
    end.setHours(23, 59, 59, 999); // End of the day

    console.log('Start Date:', start);
    console.log('End Date:', end);

    const filteredData = this.carbonFootprintData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });

    console.log('Filtered Data:', filteredData);

    if (filteredData.length === 0) {
      alert('No data available for the selected date range.');
      return;
    }

    this.chartData = {
      labels: filteredData.map((entry) => entry.date),
      datasets: [
        {
          data: filteredData.map((entry) => entry.value),
          label: 'Carbon Footprint (kg CO₂)',
          borderColor: '#3e95cd',
          fill: false,
        },
      ],
    };

    this.chartDescriptions = filteredData.map((entry) => ({
      date: entry.date,
      value: entry.value,
      description: `The carbon footprint on ${entry.date} was ${entry.value} kg CO₂.`, // Example description
    }));

    const ctx = (document.getElementById('carbonFootprintChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }
  setGoal() {
    if (!this.selectedTarget || !this.selectedCategory) {
      alert('Please select both a target and a category.');
      return; // Exit the function if validation fails
  }
    // Logic to set the goal
    this.goalSet = true;

    // Optionally, reset the form fields
    this.selectedTarget = '';
    this.selectedCategory = '';
  }
}
