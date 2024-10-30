import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendarStyles.css'; 


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para obtener eventos
    const fetchedEvents = [
      {
        
      }
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
          style={{ height: 600 }} 
          className="rounded-lg"
          formats={{
            dayFormat: (date) => moment(date).format('dddd'),
            monthHeaderFormat: (date) => moment(date).format('MMMM YYYY'), 
            dayHeaderFormat: (date) => moment(date).format('MMMM DD, YYYY'), 
            agendaDateFormat: (date) => moment(date).format('MMMM DD, YYYY'), 
          }}
        />
      </div>

      {/* Botón para volver al menú */}
      <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#FF5733', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px', display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
        Volver al Menú
      </Link>
    </div>
  );
};

export default MyCalendar;
