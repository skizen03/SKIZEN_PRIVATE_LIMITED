export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ravi Kumar',
    role: 'Director',
    company: 'Kasam',
    text: 'SKIZEN delivered a complete ERP system for our business in record time. The team understood our requirements precisely and built exactly what we needed. Post-launch support has been excellent.',
  },
  {
    name: 'Dr. Sunita Reddy',
    role: 'Administrator',
    company: 'St Anns Hospital',
    // eslint-disable-next-line quotes
    text: "The hospital management portal SKIZEN built has transformed how we handle patient records, appointments, and billing. It's robust, fast, and our staff adapted to it within days.",
  },
  {
    name: 'Mohammed Farhan',
    role: 'Owner',
    company: 'Pista House',
    // eslint-disable-next-line quotes
    text: "We needed a custom ordering and inventory system that matched our unique workflow. SKIZEN didn't just deliver software — they delivered a solution that actually fits our operations.",
  },
  {
    name: 'Ananya Sharma',
    role: 'Principal',
    company: 'St Anns Jr College',
    text: 'The student and staff management portal exceeded all our expectations. The team was responsive throughout and delivered on every milestone they committed to.',
  },
  {
    name: 'Thomas George',
    role: 'Founder',
    company: 'Marluce Bakers',
    text: 'From our e-commerce platform to backend automation, SKIZEN handled everything seamlessly. Our online orders doubled within the first month of launch.',
  },
  {
    name: 'Priya Nair',
    role: 'CTO',
    company: 'HealthTech Startup',
    // eslint-disable-next-line quotes
    text: "We were impressed by SKIZEN's technical depth. They asked the right questions before writing a single line of code, which saved us a huge amount of rework down the line.",
  },
  {
    name: 'Arjun Mehta',
    role: 'Operations Head',
    company: 'Retail Chain',
    text: 'The custom CRM built by SKIZEN streamlined our sales pipeline and cut our reporting time by 70%. Clean UI, fast performance, and absolutely reliable.',
  },
];
