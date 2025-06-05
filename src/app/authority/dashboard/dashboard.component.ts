import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface DepartmentChart {
  department: string;
  total: number;
  chartData: {
    labels: string[],
    datasets: [{
      data: number[],
      backgroundColor: string[],
      borderWidth: number
    }]
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard_data: any[] = [];
  totalCount = 0;

  kpiOverviewData: any = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#a78bfa', '#8b5cf6', '#c084fc', '#d8b4fe', '#facc15', '#4ade80', '#60a5fa', '#f87171'],
      borderWidth: 0,
    }]
  };

  departmentCharts: DepartmentChart[] = [];

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            const label = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
            return `${label}:  ${value}`;
          }
        },
        backgroundColor: '#8b5cf6',
        titleColor: '#ffffff',
        titleAlign: 'center',
        bodyColor: '#ffffff',
        padding: 10,
        cornerRadius: 8,
      }
    }
  };

  private colorPalette = ['#a78bfa', '#8b5cf6', '#c084fc', '#d8b4fe', '#facc15', '#4ade80', '#60a5fa', '#f87171'];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get_Dashboard<[]>('Principle/Dashboard').subscribe((res: any[]) => {
      this.dashboard_data = res;
      console.log(res);

      this.totalCount = res.reduce((acc, val) => acc + val.count, 0);

      const tableMap = new Map<string, number>();
      res.forEach(item => {
        tableMap.set(item.source_table, (tableMap.get(item.source_table) || 0) + item.count);
      });
      this.kpiOverviewData.labels = Array.from(tableMap.keys());
      this.kpiOverviewData.datasets[0].data = Array.from(tableMap.values());

      const deptMap = new Map<string, any[]>();
      res.forEach(item => {
        if (!deptMap.has(item.department)) {
          deptMap.set(item.department, []);
        }
        deptMap.get(item.department)!.push(item);
      });

      this.departmentCharts = [];
      deptMap.forEach((items, dept) => {
        const sourceMap = new Map<string, number>();
        let deptTotal = 0;

        items.forEach(i => {
          const current = sourceMap.get(i.source_table) || 0;
          sourceMap.set(i.source_table, current + i.count);
          deptTotal += i.count;
        });

        const labels = Array.from(sourceMap.keys());
        const data = Array.from(sourceMap.values());
        const backgroundColor = labels.map((_, i) => this.colorPalette[i % this.colorPalette.length]);

        this.departmentCharts.push({
          department: dept,
          total: deptTotal,
          chartData: {
            labels,
            datasets: [{
              data,
              backgroundColor,
              borderWidth: 0
            }]
          }
        });
      });
    });
  }
}
