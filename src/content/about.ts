import { siteContent } from '@/content/site'
import type {
  BeliefsListProps,
  CtaBannerProps,
  DifferenceBlockProps,
  LeadershipListProps,
  MissionBlockProps,
  TextBlockProps,
} from '@/types/content'

export const aboutContent = {
  whyWeExist: {
    title: 'Why We Exist',
    paragraphs: [
      "There's a burden that has lived in the heart of our founder for many years.",
      'As a prophet and apostle, he has traveled across churches, conferences, and communities, and along the way, he has met some of the most remarkably gifted young ministers imaginable. Prophets with astonishing accuracy. Worshippers whose voices could soften the hardest hearts. Preachers who could hold thousands spellbound with the Word of God.',
      'They had the gift. They had the passion. They had the anointing.',
      'But years later, many of those same ministers had disappeared. Some grew discouraged. Some fell into avoidable mistakes. Some damaged relationships with the very leaders meant to guide them. Others became isolated, believing gifting alone was enough. Many simply stopped growing.',
      'Not because they lacked anointing — but because they lacked guidance.',
      "Anointing can introduce you to ministry, but it can't teach you how to carry it. No amount of prophetic gifting teaches submission to spiritual authority. No powerful sermon automatically produces wise leadership. No worship anointing replaces character, discipline, and healthy ministry practice. Without guidance, even the brightest flame can begin to fade.",
      "Our founder has watched this happen far too many times — gifted servants of God losing years to mistakes that could have been prevented if someone had simply walked with them, trained them, corrected them, and believed in them.",
      'That burden became a vision.',
      "The Young Ministers' Summit exists because we believe no minister should have to navigate their calling alone.",
      'Our mission is to raise ministers who are not only anointed, but equipped — ministers who know how to serve before they lead, who understand biblical ethics, who honor spiritual authority, who steward influence wisely, and who build ministries that endure.',
      "Because the Kingdom doesn't simply need more gifted people. It needs healthy ministers who will still be standing, serving, and bearing fruit decades from now.",
    ],
  } satisfies TextBlockProps,

  mission: {
    title: 'Our Mission',
    body: 'To identify, gather, and disciple young ministers across denominations and countries into a sustained mentorship community — one where real healing, practical equipping, and genuine accountability produce lasting transformation in their lives and ministries.',
  } satisfies MissionBlockProps,

  beliefs: {
    title: 'What We Believe',
    intro:
      "We're committed to raising Christ-centered, Spirit-empowered, biblically grounded leaders who serve with integrity, pursue excellence, embrace unity, and transform generations through the Gospel.",
    beliefs: [
      {
        title: 'Christ First',
        description: 'Everything begins and ends with Him.',
      },
      {
        title: 'Biblical Truth',
        description: 'Our foundation, not a footnote.',
      },
      {
        title: 'Integrity',
        description: 'Who you are matters as much as what you carry.',
      },
      {
        title: 'Character before Charisma',
        description:
          'Gifting can open doors, but character sustains ministry. We develop ministers whose integrity, humility, and ethical conduct reflect Christ.',
      },
      {
        title: 'Excellence',
        description: 'In how we serve, teach, and lead.',
      },
      {
        title: 'Servant Leadership',
        description: 'Leading by serving first.',
      },
      {
        title: 'Discipleship',
        description: 'Growth that goes deeper than information.',
      },
      {
        title: 'Generational Impact',
        description:
          "Our desire isn't just to raise gifted ministers, but ministers who finish well. Through mentorship, biblical training, and practical guidance, we prepare leaders for lifelong impact.",
      },
    ],
  } satisfies BeliefsListProps,

  difference: {
    title: 'What Makes Us Different',
    paragraphs: [
      "We don't stop at attendance. We follow through.",
      "After the Summit ends, the relationship doesn't. We check in. We stay in touch. We open our doors to whatever challenges you're facing. If you're hosting an event, we mobilize to support you. We're building a community where ministers genuinely support one another — because the goal was never just to fill a room. It's the quality of minister you become afterward, and we intend to walk that road with you.",
    ],
    quotes: ['We raise ministers, not attendees.', "Discipleship doesn't end when the event does."],
  } satisfies DifferenceBlockProps,

  leadership: {
    title: 'Leadership',
    leaders: [
      {
        role: 'Founder',
        name: 'Apostle Dr. David Owusu',
        bio: 'Bio to be added.',
      },
      {
        role: 'General Secretary',
        name: 'Pastor Bonny Kihiko',
        affiliation: 'Kratos Church International',
      },
      {
        role: 'Organising Secretary',
        name: 'Pastor Charles Finney',
        affiliation: 'Grace Arena Thika',
      },
      {
        role: 'Head of Governors',
        name: 'Pastor Maxwell Mwathi',
        affiliation: 'GAM Nakuru',
      },
      {
        role: 'Prayer Secretary',
        name: 'Minister Phyllis Wambui',
        affiliation: 'Intercessory',
      },
      {
        role: 'Media & PR',
        name: 'Minister Selestinah Nyagha',
        affiliation: 'Media',
      },
      {
        role: 'Administration',
        name: 'Racheal Njoroge',
        affiliation: 'Administration',
      },
    ],
  } satisfies LeadershipListProps,

  joinCta: {
    title: 'Join the Story',
    body: 'We believe every denomination can carry one mission: young ministers who finish well.',
    primaryCta: {
      label: 'Learn About Our Programs',
      href: '/programs',
    },
    secondaryCta: {
      label: 'Register for the Summit',
      href: siteContent.registerCtaHref,
    },
    tone: 'purple',
  } satisfies CtaBannerProps,
}
