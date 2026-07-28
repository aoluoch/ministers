import { siteContent } from '@/content/site'
import type { CtaBannerProps, FaqAccordionProps } from '@/types/content'

export const faqContent = {
  faq: {
    items: [
      {
        question: 'What does the Young Ministers’ Summit do?',
        answer:
          'We mentor, impart, and equip young ministers of the gospel so they can have greater impact in the Kingdom of God.',
      },
      {
        question: 'Who can get involved — is this open to everyone?',
        answer:
          'Yes. Any young minister in apostolic, preaching, teaching, prophetic, evangelistic, or music ministry is welcome.',
      },
      {
        question: 'Do I need to pay to participate or join?',
        answer: "No, it's completely free.",
      },
      {
        question: 'Do I need to be a member of Grace Arena Ministries to join?',
        answer:
          'No. This is an inter-denominational community, open to ministers from any church background.',
      },
      {
        question:
          "I already have my own spiritual father — won't this feel like betraying them?",
        answer:
          "Not at all. Think of this as training, just like attending any other training event or school — it doesn't replace your existing spiritual covering.",
      },
      {
        question: "Can I participate even if I'm not in Nairobi?",
        answer:
          "Yes. This is a countrywide summit, and young ministers from all over the country attend. You're welcome to make your way to Nairobi to join us.",
      },
      {
        question: 'How can I volunteer?',
        answer:
          "Send us a message on social media or reach out by phone, and we'll guide you through the next steps.",
      },
      {
        question: 'Where are you located, and where do you operate?',
        answer:
          'Our first-ever Summit is being held at Grace Arena Ministries, with quarterly classes held online.',
      },
      {
        question: 'How often do you host events or programs?',
        answer: 'The Summit happens annually. Classes are held quarterly.',
      },
      {
        question: "How can I stay updated on what you're doing?",
        answer: 'Follow us on our social media pages for the latest updates.',
      },
      {
        question: 'How can my organization or business partner with you?',
        answer:
          'Send us a message on social media or by phone, and our team will follow up with you.',
      },
    ],
  } satisfies FaqAccordionProps,

  cta: {
    title: 'Still have questions, or ready to join us?',
    primaryCta: {
      label: 'Register for the Summit',
      href: siteContent.registerCtaHref,
    },
    secondaryCta: {
      label: 'Contact Us',
      href: '/contact',
    },
    tone: 'purple',
  } satisfies CtaBannerProps,
}
