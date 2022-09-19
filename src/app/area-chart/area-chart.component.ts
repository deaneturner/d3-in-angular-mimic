import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() data: number[] | undefined;
  hostElement; // Native element hosting the SVG container
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined; // Top level SVG element

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateChart(changes['data'].currentValue);
    }
  }

  public updateChart(data: number[]) {
    if (!this.svg) {
      this.createChart(data);
      return;
    }
  }

  private createChart(data: number[]) {

    this.removeExistingChartFromParent();

    this.setChartDimensions();
  }

  private setChartDimensions() {
    let viewBoxHeight = 100;
    let viewBoxWidth = 200;
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }
}
