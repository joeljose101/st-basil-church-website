export const siteConfig = {
  name: 'St. Basil Jacobite Syrian Orthodox Church',
  shortName: 'St. Basil',
  location: 'Coburg North, Melbourne',
  address: '21A Glyndon Avenue, Coburg North, VIC 3058, Australia',
  email: 'info@stbasilmelbourne.org',
  mapEmbedSrc:
    'https://www.google.com/maps?q=21A+Glyndon+Avenue+Coburg+North+VIC+3058+Australia&output=embed',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Worship', href: '#worship' },
  { label: 'Ministries', href: '#ministries' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
];

export const serviceSchedule = [
  { time: '3:00', period: 'PM', label: 'Evening Prayer' },
  { time: '3:30', period: 'PM', label: 'Holy Qurbana' },
  { time: '5:00', period: 'PM', label: 'Sunday School' },
  { time: '6:00', period: 'PM', label: 'Fellowship' },
];

export const heritageCards = [
  {
    icon: '\u262F',
    title: 'Apostolic Roots',
    body: 'We safeguard the sacred liturgical legacy, offering a direct spiritual connection to the early Church fathers.',
  },
  {
    icon: '\u2727',
    title: 'Sacramental Life',
    body: 'Through the Holy Qurbana and seasonal fasts, we invite believers into a transcendent relationship with Christ.',
  },
  {
    icon: '\u{1F54A}',
    title: 'Grace in Action',
    body: 'Faith manifests in love. Our community extends compassionate support and fellowship to those in need.',
  },
];

export const ministries = [
  {
    numeral: 'I',
    title: 'Sunday School',
    body: 'Nurturing children in the Orthodox faith through Scripture, church history, prayers, and hymns following each Holy Qurbana.',
    image: '/images/family-outing.jpg',
    imageAlt: 'Sunday School placeholder — replace with parish photo',
    isPlaceholder: true,
  },
  {
    numeral: 'II',
    title: 'Vanitha Samajam',
    body: 'A fellowship where women grow in faith, build friendships, and serve God through prayer, charity, and community outreach.',
    image: '/images/vanitha-fellowship.jpg',
    imageAlt: "Vanitha Samajam women's fellowship",
  },
  {
    numeral: 'III',
    title: 'Youth Association',
    body: 'Bringing together young people to grow in faith, build friendships, and lead church events and community initiatives.',
    image: '/images/family-outing.jpg',
    imageAlt: 'Parish youth and families gathered for an evening fellowship',
  },
  {
    numeral: 'IV',
    title: 'SOSMA',
    body: 'The Society of St. Mary upholds devotion to the Theotokos through prayer, hymns, and charitable works.',
    image: '/images/onam-pookalam.jpg',
    imageAlt: 'Onam pookalam floral decoration, a parish cultural celebration',
  },
];

export const upcomingEvents = [
  {
    title: 'Sunday School Annual Festival',
    body: 'Engaging activities, cultural programs, and faith-based sessions led by our Rev. Father.',
    image: '/images/family-outing.jpg',
  },
  {
    title: 'Onam Celebration',
    body: 'A traditional Ona Sadya, vibrant cultural activities, and joyful fellowship for the whole parish.',
    image: '/images/onam-pookalam.jpg',
  },
  {
    title: 'Parish Family Outing',
    body: 'A day of fellowship, games, and shared meals \u2014 strengthening friendships across our community.',
    image: '/images/community-group.jpg',
  },
  {
    title: 'Parish Feast Celebration',
    body: 'Holy Qurbana followed by a community gathering, bringing the parish together in thanksgiving.',
    image: '/images/cathedral-interior.jpg',
  },
];

export const galleryItems = [
  { category: 'community', image: '/images/community-group.jpg', alt: 'Parish community gathered outside St Basil Church' },
  { category: 'interior', image: '/images/cathedral-interior.jpg', alt: 'Sanctuary interior with stained glass' },
  { category: 'interior', image: '/images/cathedral-light.jpg', alt: 'Light through stained glass windows' },
  { category: 'interior', image: '/images/cathedral-rays.jpg', alt: 'Light rays inside the sanctuary' },
  { category: 'festival', image: '/images/onam-pookalam.jpg', alt: 'Onam pookalam floral decoration' },
  { category: 'community', image: '/images/family-outing.jpg', alt: 'Parish evening fellowship gathering' },
  { category: 'community', image: '/images/vanitha-fellowship.jpg', alt: "Vanitha Samajam women's fellowship" },
  { category: 'interior', image: '/images/stone-window.jpg', alt: 'Cross-shaped light through a stone window' },
];

export const galleryFilters = ['all', 'community', 'interior', 'festival'];

export const scheduleOfEvents = [
  { time: '--:--', program: 'Service', presider: 'Rev. Fr. [Name]' },
  { time: '--:--', program: 'Message', presider: 'Guest Speaker' },
  { time: '--:--', program: 'Community Gathering', presider: 'Parish Committee' },
  { time: '--:--', program: 'Special Program', presider: 'Church Ministry' },
  { time: '--:--', program: 'Closing', presider: 'Rev. Fr. [Name]' },
];

export const sundaySchoolCalendar = [
  { date: 'March', event: 'Academic Year Begins' },
  { date: 'June', event: 'Mid-Year Assessment' },
  { date: 'August', event: 'Bible Quiz Competition' },
  { date: 'September', event: 'Sunday School Festival' },
  { date: 'November', event: 'Annual Examinations' },
  { date: 'December', event: 'Christmas Program and Prize Distribution' },
];

export const pastVicars = [
  { name: 'Rev. Fr. [Name]', years: '2025 \u2013 2026' },
  { name: 'Rev. Fr. [Name]', years: '2024 \u2013 2025' },
  { name: 'Rev. Fr. [Name]', years: '20__ \u2013 20__' },
  { name: 'Rev. Fr. [Name]', years: '20__ \u2013 20__' },
];

export const administration = [
  { name: '[Name]', role: 'President' },
  { name: '[Name]', role: 'Vice President' },
  { name: '[Name]', role: 'Secretary' },
  { name: '[Name]', role: 'Trustee' },
  { name: '[Name]', role: 'Committee' },
  { name: '[Name]', role: 'Committee' },
];
