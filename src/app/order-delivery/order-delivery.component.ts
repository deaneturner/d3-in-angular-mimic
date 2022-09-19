import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartControlsService } from '../chart-controls.service';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit {

  chartData = [];

  constructor(private router: Router, public chartControlsService: ChartControlsService) {
    this.chartControlsService.fullScreen = false;
  }

  ngOnInit(): void {
  }

}
