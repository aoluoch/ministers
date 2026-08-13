import { Reveal } from '@/components/layout/Reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { TrainingSectionProps, TrainingTopic } from '@/types/content'

function TopicList({ topics, offset = 0 }: { topics: TrainingTopic[]; offset?: number }) {
  if (!topics.length) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic, index) => (
        <AccordionItem key={topic.title} value={`topic-${offset + index}`}>
          <AccordionTrigger>{topic.title}</AccordionTrigger>
          <AccordionContent>
            {topic.summary ? <p>{topic.summary}</p> : null}
            {topic.points.length ? (
              <ul className={topic.summary ? 'mt-3 list-disc space-y-1 pl-5' : 'list-disc space-y-1 pl-5'}>
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function TrainingTopics({ title, intro, topics }: TrainingSectionProps) {
  if (!topics.length) return null

  const fundamental = topics.filter((topic) => topic.category === 'fundamental')
  const specialised = topics.filter((topic) => topic.category === 'specialised')
  const showGroups = fundamental.length > 0 && specialised.length > 0

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {(title || intro) ? (
          <Reveal className="max-w-3xl">
            {title ? (
              <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        {topics.length ? (
          <Reveal className={title || intro ? 'mt-8' : undefined}>
            {showGroups ? (
              <div className="space-y-10">
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-purple">
                    Fundamental training
                  </h3>
                  <div className="mt-4">
                    <TopicList topics={fundamental} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-purple">
                    Specialised training
                  </h3>
                  <div className="mt-4">
                    <TopicList topics={specialised} offset={fundamental.length} />
                  </div>
                </div>
              </div>
            ) : (
              <TopicList topics={topics} />
            )}
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
