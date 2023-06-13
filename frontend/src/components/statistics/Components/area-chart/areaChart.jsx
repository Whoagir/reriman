import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1 / 4,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    elements: {
        point: {
            radius: 3, // радиус точек на графике
        },
        line: {
            borderWidth: 1, // ширина линии графика
        },
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(60, 60, 60, 0.6)', // цвет вертикальных линий сетки по оси X
            },
        },
        y: {
            grid: {
                color: 'rgba(100, 100, 100, 0.6)', // цвет горизонтальных линий сетки по оси Y
            },
        },
    },
    layout: {
        padding: {
            left: 10, // отступ слева
            right: 10, // отступ справа
            top: 20, // отступ сверху
            bottom: 10, // отступ снизу
        },
    },
};

const today = new Date();

const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

const day = today.getDate();
const month = months[today.getMonth()];

const labels = [`${day} ${month}`];

for (let i = 1; i <= 6; i++) {
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - i);
    const day = previousDay.getDate();
    const month = months[previousDay.getMonth()];
    labels.unshift(`${day} ${month}`);
}

export const data = {
    labels,
    datasets: [
        {
            fill: false,
            label: 'Тестовый график',
            data: [40, 50, 60, 70],
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(255, 255, 255)',
        },
    ],
};

export function Graph() {
    return <Line options={options} data={data} />;
}