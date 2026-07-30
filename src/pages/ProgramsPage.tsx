import { useLoaderData } from 'react-router-dom'
import { EventList } from '@/components/sections/EventList'
import type { ProgramsPageContent } from '@/types/content'

export function ProgramsPage() {
  const { list } = useLoaderData() as ProgramsPageContent
  return <EventList {...list} />
}
