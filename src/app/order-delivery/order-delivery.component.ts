import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ChartControlsService } from '../chart-controls.service';
import { AreaChartComponent } from '../area-chart/area-chart.component';

export class DeliveryMetric {
  state: string;
  stateDisplayValue: string;
  mean: number;
  stdDev: number;

  constructor(stateIn: string, stateDisplayValueIn: string, meanIn: number, stdDevIn: number) {
    this.state = stateIn;
    this.stateDisplayValue = stateDisplayValueIn;
    this.mean = meanIn;
    this.stdDev = stdDevIn;
  }
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss']
})
export class OrderDeliveryComponent implements OnInit, AfterContentInit{

  @ViewChild('areaChart', {static: true})
  chart!: AreaChartComponent;

  chartData: any[] = [];
  deliveryMetrics: DeliveryMetric[] | undefined;

  constructor(private router: Router, public chartControlsService: ChartControlsService) {
    this.chartControlsService.fullScreen = false;
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.initialize();
  }

  initialize() {
    // if (this.refreshInterval) {
    //   clearInterval(this.refreshInterval);
    // }
    this.generateData();
    this.chart.data = [...this.chartData];
    // this.refreshInterval = setInterval(() => {
    //   if(document.hasFocus()) {
    //     this.generateData();
    //     this.chart.data = [...this.chartData];
    //   }
    // }, 1000);

  }

  generateData() {
    this.chartData = [];
    this.deliveryMetrics = [];
    const meanPrepTime = randomInt(10, 11);
    const meanWaitTime = randomInt(8, 9);
    const meanTransitTime = randomInt(9, 10);

    const sigmaPrepTime = randomInt(1, 1);
    const sigmaWaitTime = randomInt(2, 3);
    const sigmaTransitTime = randomInt(1, 2);

    // DELIVERY METRICS
    const meanTotalTime = meanPrepTime + meanWaitTime + meanTransitTime;
    const sigmaTotalTime = Math.floor(
      Math.sqrt(Math.pow(sigmaPrepTime, 2) +
        Math.pow(sigmaWaitTime, 2) +
        Math.pow(sigmaTransitTime, 2))
    );

      this.deliveryMetrics.push(new DeliveryMetric(
        'preparing',
        'Preparation',
        meanPrepTime,
        sigmaPrepTime
      ));
      this.deliveryMetrics.push(new DeliveryMetric(
        'ready',
        'Waiting',
        meanWaitTime,
        sigmaWaitTime
      ));
      this.deliveryMetrics.push(new DeliveryMetric(
        'inTransit',
        'In Transit',
        meanTransitTime,
        sigmaTransitTime
      ));
      this.deliveryMetrics.push(new DeliveryMetric(
        'delivered',
        'Total delivery',
        meanTotalTime,
        sigmaTotalTime
      ));

    // CHART DATA
      const prandomizer = d3.randomNormal(meanPrepTime, sigmaPrepTime);
      const wrandomizer = d3.randomNormal(meanWaitTime, sigmaWaitTime);
      const trandomizer = d3.randomNormal(meanTransitTime, sigmaTransitTime);

      const ptimes = [];
      const wtimes = [];
      const ttimes = [];
      const totaltimes = [];
      for (let i = 0; i < 500; i++) {
        const p = Math.floor(prandomizer());
        const w = Math.floor(wrandomizer());
        const t = Math.floor(trandomizer());
        const total = p + w + t;
        ptimes.push(p);
        wtimes.push(w);
        ttimes.push(t);
        totaltimes.push(total);
      }
      this.chartData.push(ptimes);
      this.chartData.push(wtimes);
      this.chartData.push(ttimes);
      this.chartData.push(totaltimes);
  }
}
