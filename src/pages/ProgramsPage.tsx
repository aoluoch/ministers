import { programsContent } from '@/content/programs'
import { EventList } from '@/components/sections/EventList'

export function ProgramsPage() {
  return <EventList {...programsContent.list} />
}
