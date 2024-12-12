import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { ChartComponent } from 'ngx-apexcharts';

@Component({
  selector: 'app-project-analytics',
  standalone: true,
  imports: [NgIf, NgForOf, ChartComponent],
  templateUrl: './project-analytics.component.html',
  styleUrls: ['./project-analytics.component.css'],
})
export class ProjectAnalyticsComponent implements OnInit {
  @Input() projectId!: number;
  analyticsData: any = null;
  contributions: any[] = [];
  chartOptions: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
    this.loadContributions();
  }

  loadAnalytics(): void {
    this.analyticsService.getAnalytics(this.projectId).subscribe(
      (data) => {
        this.analyticsData = data;
      },
      (error) => {
        console.error('Ошибка при загрузке аналитики:', error);
      }
    );
  }

  loadContributions(): void {
    this.analyticsService.getContributions(this.projectId).subscribe(
      (data) => {
        this.contributions = data;
        this.prepareChartOptions();
      },
      (error) => {
        console.error('Ошибка при загрузке вкладов:', error);
      }
    );
  }

  prepareChartOptions(): void {
    const contributionsByDate = this.contributions.reduce((acc, contribution) => {
      const date = new Date(contribution.date).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + parseFloat(contribution.amount);
      return acc;
    }, {} as Record<string, number>);

    const sortedDates = Object.keys(contributionsByDate).sort();
    const categories: string[] = [];
    const seriesData: number[] = [];

    sortedDates.forEach((date) => {
      categories.push(date);
      seriesData.push(contributionsByDate[date]);
    });

    this.chartOptions = {
      series: [
        {
          name: 'Собрано за день (BYN)',
          data: seriesData,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Сумма собранных средств по дням',
        align: 'left',
      },
      xaxis: {
        categories,
        title: {
          text: 'Дата',
        },
      },
      yaxis: {
        title: {
          text: 'Собрано (BYN)',
        },
      },
    };
  }
}
