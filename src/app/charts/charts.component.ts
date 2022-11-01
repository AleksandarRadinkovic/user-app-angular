import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  lineChartData = {
    labels: ['ProductOne', 'ProductTwo', 'ProductThree', 'ProductFour', 'ProductFive'],
    datasets: [
      {
        data: [22, 44, 60, 70, 33],
        label: 'Sales Percent%',
        fill: true,
        backgroundColor: 'blue',
        borderColor: 'black',
        tension: 0.5
      },
    ],
  };
  barChartData = {
    labels: ['ProductOne', 'ProductTwo', 'ProductThree', 'ProductFour', 'ProductFive'],
    datasets: [
      {
        data: [76, 14, 50, 45, 3],
        label: 'Sold Products',
        backgroundColor: 'red',
      },
    ],
  };
  pieChartData = {
    labels: ['ProductOne', 'ProductTwo', 'ProductThree', 'ProductFour', 'ProductFive'],
    datasets: [
      {
        data: [5, 55, 70, 33, 68],
        label: 'Products total',
        backgroundColor: [
          'red',
          'blue',
          'green',
          'yellow',
          'gray'
        ]
      },
    ],
  };

  ngOnInit(): void {}
  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
