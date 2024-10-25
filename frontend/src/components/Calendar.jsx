// src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendarStyles.css'; // Importa tu archivo CSS personalizado

// Configuración del localizador de fechas
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  // Simulación de obtención de eventos desde un backend
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para obtener eventos
    const fetchedEvents = [
      {
        title: 'Cita con el psicólogo',
        start: new Date(2024, 10, 25, 10, 0), // Año, mes, día, hora, minuto
        end: new Date(2024, 10, 25, 11, 0),
      },
      {
        title: 'Reunión de equipo',
        start: new Date(2024, 10, 26, 14, 0),
        end: new Date(2024, 10, 26, 15, 0),
      },
    ];
    setEvents(fetchedEvents);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calendario de Citas</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }} // Aumentar la altura para mejor visualización
          className="rounded-lg"
          formats={{
            dayFormat: (date) => moment(date).format('dddd'),
            monthHeaderFormat: (date) => moment(date).format('MMMM YYYY'), // Formato de mes
            dayHeaderFormat: (date) => moment(date).format('MMMM DD, YYYY'), // Formato de encabezado de día
            agendaDateFormat: (date) => moment(date).format('MMMM DD, YYYY'), // Formato de fecha en la agenda
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
