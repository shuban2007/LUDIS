// Ludis — EventCard
// Displays an event with optional environmental context, tied to performance interpretation.

import { Card } from '@/components/ui/card';
import type { Event, EnvironmentalContext } from '@/lib/types';
import { formatRelativeDate, formatFullDate } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  environmentalContext?: EnvironmentalContext;
}

export function EventCard({ event, environmentalContext }: EventCardProps) {
  const relative = formatRelativeDate(event.date);
  const isUpcoming = new Date(event.date) > new Date();
  const typeLabel = event.type === 'competition' ? '🏆 Competition' : event.type === 'training_camp' ? '🏋️ Training' : event.type === 'assessment' ? '📋 Assessment' : '⚽ Friendly';

  return (
    <Card interactive>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] text-text-muted">{typeLabel}</span>
          <h4 className="text-sm font-semibold text-text-primary mt-0.5">{event.title}</h4>
        </div>
        {isUpcoming && (
          <span className="text-xs font-medium text-brand-primary bg-brand-primary-muted px-2 py-0.5 rounded-full">
            {relative}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
        <span>{formatFullDate(event.date)}</span>
        {event.location && <span>• {event.location}</span>}
      </div>

      {event.description && (
        <p className="mt-2 text-xs text-text-secondary leading-relaxed">{event.description}</p>
      )}

      {/* Environmental context — when available for this event */}
      {environmentalContext && (
        <div className="mt-3 rounded-md bg-surface-overlay p-2.5">
          <span className="ludis-section-title text-[10px]">Environmental Context</span>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
            {environmentalContext.temperature !== undefined && (
              <span>🌡 {environmentalContext.temperature}°{environmentalContext.temperatureUnit === 'celsius' ? 'C' : 'F'}</span>
            )}
            {environmentalContext.humidity !== undefined && (
              <span>💧 {environmentalContext.humidity}%</span>
            )}
            {environmentalContext.weather && (
              <span>☁️ {environmentalContext.weather}</span>
            )}
            {environmentalContext.aqi !== undefined && (
              <span>🌬 AQI {environmentalContext.aqi}</span>
            )}
          </div>
          {environmentalContext.performanceNote && (
            <p className="mt-1.5 text-[11px] text-text-muted leading-relaxed">
              {environmentalContext.performanceNote}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
