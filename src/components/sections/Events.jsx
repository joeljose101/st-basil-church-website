import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { upcomingEvents, scheduleOfEvents, sundaySchoolCalendar } from '@/data/content';

function ScheduleTable({ title, columns, rows }) {
  return (
    <Reveal>
      <h3 className="text-center font-serif text-charcoal text-lg mb-7 uppercase tracking-wide">
        {title}
      </h3>
      <div className="bg-white shadow-divine overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-burgundy text-pearl">
              {columns.map((col) => (
                <th key={col} className="py-3 px-4 text-left font-serif uppercase tracking-wide text-xs">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-3 px-4 ${j === 0 ? 'text-muted' : 'text-charcoal font-medium'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section id="events" className="bg-pearl px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-14">
            <SectionLabel>Parish Life</SectionLabel>
            <SectionHeading>Upcoming Events</SectionHeading>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-20">
          {upcomingEvents.map((event, i) => (
            <Reveal key={event.title} delay={i * 90}>
              <div className="media-zoom-card">
                <div className="relative h-[160px] rounded-curve-tl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover media-zoom"
                  />
                </div>
                <h3 className="font-serif text-burgundy text-base mb-2">{event.title}</h3>
                <p className="text-muted text-sm font-body font-normal leading-relaxed">
                  {event.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-14">
          <ScheduleTable
            title="Schedule of Events"
            columns={['Time', 'Program', 'Presider / Speaker']}
            rows={scheduleOfEvents.map((r) => [r.time, r.program, r.presider])}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <ScheduleTable
            title="Sunday School — Yearly Calendar"
            columns={['Date', 'Event']}
            rows={sundaySchoolCalendar.map((r) => [r.date, r.event])}
          />
        </div>
      </div>
    </section>
  );
}
