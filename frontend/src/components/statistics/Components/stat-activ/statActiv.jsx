import React from 'react'
import activ from './statActiv.module.scss'
import { Link } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'

export const StatActiv = () => {
    const months = [];
    const currentDate = new Date();
    const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const timeOfColumn = ['00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-00'];
    months.push(monthNames[currentDate.getMonth()]);
    for (let i = 1; i <= 4; i++) {
        const previousDate = new Date();
        previousDate.setMonth(currentDate.getMonth() - i);
        months.push(monthNames[previousDate.getMonth()]);
    }

    return (
        <div className={activ.main}>
            <div className={`${activ.nav} df w100`}>
                <div className="regwindow__leftarrow">
                    <Link to="/tasks/statistics"><BiLeftArrowAlt size={22} className="regwindow__leftarrowico" /></Link>
                </div>
            </div>
            <div className={`${activ.content} w100`}>
                <div className={activ['content-tasks']}>
                    <span>Задачи</span>
                    <div className={activ['content-tasks-table']}>
                        <div className={`${activ['content-tasks-table-months']} df jcfe aic w100`}>
                            {months.reverse().map((arr, ind) => (
                                <span key={ind}>{arr}</span>
                            ))}
                        </div>
                        <div className={activ['content-tasks-table-table']}>
                            <table className='w100'>
                                <tbody>
                                    {daysOfWeek.map((day) => (
                                        <tr key={day}>
                                            <td className="dayOfWeek">{day}</td>
                                            {[...Array(36)].map((_, index) => (
                                                <td key={index} className={activ['content-tasks-cell']} />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={activ['content-tasks-table-columns']}>
                            <table className='w100'>
                                <tbody>
                                    <tr className={activ['content-tr1']}>
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                    </tr>
                                    <tr className={activ['content-tr2']}>
                                        {timeOfColumn.map((arr, ind) => (
                                            <td key={ind} className={`${activ['content-tr2-column']} tac`}>
                                                {arr}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={activ['content-math']}>
                    <span>Мат бои</span>
                    <div className={activ['content-tasks-table']}>
                        <div className={`${activ['content-tasks-table-months']} df jcfe aic w100`}>
                            {months.map((arr, ind) => (
                                <span key={ind}>{arr}</span>
                            ))}
                        </div>
                        <div className={activ['content-tasks-table-table']}>
                            <table className='w100'>
                                <tbody>
                                    {daysOfWeek.map((day) => (
                                        <tr key={day}>
                                            <td className="dayOfWeek">{day}</td>
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                            <td className={activ['content-tasks-cell']} />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={activ['content-tasks-table-columns']}>
                            <table className='w100'>
                                <tbody>
                                    <tr className={activ['content-tr1']}>
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                        <td className={activ['content-tr1-column']} />
                                    </tr>
                                    <tr className={activ['content-tr2']}>
                                        {timeOfColumn.map((arr, ind) => (
                                            <td key={ind} className={`${activ['content-tr2-column']} tac`}>
                                                {arr}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
