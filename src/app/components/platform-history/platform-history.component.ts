import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-platform-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './platform-history.component.html',
  styleUrl: './platform-history.component.css'
})
export class PlatformHistoryComponent implements OnInit {
  historyEvents = [
    {
      date: '2024-09-15',
      title: 'Запуск платформы',
      description: 'Наша краудфандинговая платформа была запущена и сразу привлекла внимание первых пользователей.'
    },
    {
      date: '2024-10-10',
      title: 'Первый успешный проект',
      description: 'Первый проект собрал 100% своей цели в течение месяца.'
    },
    {
      date: '2024-11-20',
      title: 'Добавление новых категорий',
      description: 'Мы расширили возможности для создателей проектов, добавив новые категории.'
    },
    {
      date: '2024-12-13',
      title: 'Достижение миллиона BYN',
      description: 'Общая сумма финансирования на платформе превысила 1 миллион BYN!'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
