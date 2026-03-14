export interface Activity {
  time: string;
  title: string;
  locationId: string;
  description: string;
  isAlternative: boolean;
  tip?: string;
}

export interface TripDay {
  day: number;
  date: string;
  title: string;
  region: 'kyoto' | 'okinawa';
  emoji: string;
  activities: Activity[];
}

export const tripDays: TripDay[] = [
  // ─── DAY 1 ────────────────────────────────────────────────────────────
  {
    day: 1,
    date: 'Monday, April 20',
    title: 'Arrival & East Kyoto',
    region: 'kyoto',
    emoji: '⛩',
    activities: [
      {
        time: '15:00',
        title: "Philosopher's Path",
        locationId: 'philosophers-path',
        description:
          'Beautiful canal walkway \u2013 in April often still last cherry blossoms.',
        isAlternative: false,
      },
      {
        time: '17:00',
        title: 'Kamo River heading north',
        locationId: 'kamo-river',
        description:
          'The further north, the quieter and more local. Perfect for an evening stroll.',
        isAlternative: false,
      },
      {
        time: '18:00',
        title: 'ZIRAEL Vegan Restaurant (Gion)',
        locationId: 'zirael-vegan',
        description:
          'Vegan dumplings & chocolate cake, right in Gion. Mon until 7 PM \u2013 arrive early!',
        isAlternative: false,
      },
      {
        time: '18:00',
        title: 'AWOMB Nishikiyamachi (Vegan Sushi!)',
        locationId: 'awomb-nishikiyamachi',
        description:
          'Roll-your-own temaki. Creative, romantic, unique. From 6 PM. Reservation required!',
        isAlternative: true,
      },
      {
        time: '19:30',
        title: 'Gion by night',
        locationId: 'zirael-vegan',
        description:
          'After dinner: Gion is nearly empty at night and magically lit.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 2 ────────────────────────────────────────────────────────────
  {
    day: 2,
    date: 'Tuesday, April 21',
    title: 'Temple classics & street food',
    region: 'kyoto',
    emoji: '⛩',
    activities: [
      {
        time: '09:00',
        title: 'Kiyomizu-dera',
        locationId: 'kiyomizu-dera',
        description: 'Wooden terrace above the city.',
        isAlternative: false,
      },
      {
        time: '10:30',
        title: 'Ninenzaka & Teapot lanes',
        locationId: 'ninenzaka',
        description: 'Charming lanes downhill from the temple.',
        isAlternative: false,
      },
      {
        time: '11:30',
        title: 'Murin-an Garden',
        locationId: 'murin-an-garden',
        description:
          "Locals say it's Kyoto's most beautiful garden. Tea included. Closed Wed!",
        isAlternative: false,
      },
      {
        time: '13:00',
        title: 'VOG Kyoto',
        locationId: 'vog-kyoto',
        description: 'Vegan Butter Keema Masala & Mango Lassi.',
        isAlternative: false,
      },
      {
        time: '15:00',
        title: 'Kinkaku-ji (Golden Pavilion)',
        locationId: 'kinkaku-ji',
        description: 'If only one temple, make it this one.',
        isAlternative: false,
      },
      {
        time: '16:30',
        title: 'Story Coffee',
        locationId: 'story-coffee',
        description: 'One of the best espressos in Kyoto. Has oat milk!',
        isAlternative: false,
      },
      {
        time: '17:30',
        title: 'Sanjo Shopping Street',
        locationId: 'sanjo-shopping-street',
        description: 'Local alternative to touristy Nishiki Market.',
        isAlternative: false,
      },
      {
        time: '19:00',
        title: 'Nishiki Market & dinner',
        locationId: 'nishiki-market',
        description: 'Quick walk through Nishiki. Try tsukemono & yuba.',
        isAlternative: false,
      },
      {
        time: '19:00',
        title: 'AWOMB Nishikiyamachi',
        locationId: 'awomb-nishikiyamachi',
        description: 'Also open Tue from 6 PM. Closed Wed/Thu!',
        isAlternative: true,
      },
    ],
  },

  // ─── DAY 3 ────────────────────────────────────────────────────────────
  {
    day: 3,
    date: 'Wednesday, April 22',
    title: 'Bamboo, temple cuisine & Kurama Onsen',
    region: 'kyoto',
    emoji: '♨',
    activities: [
      {
        time: '09:30',
        title: 'Arashiyama Bamboo Grove',
        locationId: 'arashiyama-bamboo-grove',
        description: 'Tourist-heavy but still impressive.',
        isAlternative: false,
      },
      {
        time: '10:15',
        title: 'Okochi Sanso Garden',
        locationId: 'okochi-sanso-garden',
        description: 'Hidden gem! 1,000\u00A5 incl. matcha.',
        isAlternative: false,
      },
      {
        time: '11:00',
        title: 'eXcafe Arashiyama',
        locationId: 'excafe-arashiyama',
        description: 'Grill dango at your table + matcha.',
        isAlternative: false,
      },
      {
        time: '11:30',
        title: 'Shigetsu (Tenryu-ji)',
        locationId: 'shigetsu',
        description: 'Shojin Ryori with zen garden view. Book Hana course!',
        isAlternative: false,
      },
      {
        time: '14:30',
        title: 'Kurama Onsen',
        locationId: 'kurama-onsen',
        description: 'Rotenburo with mountain views. 2,500\u00A5.',
        isAlternative: false,
        tip: 'Take the Eizan Line from Demachiyanagi to Kurama Onsen (~30 min).',
      },
      {
        time: '19:30',
        title: 'ZIRAEL Vegan Restaurant',
        locationId: 'zirael-vegan',
        description: 'Dumplings & chocolate cake.',
        isAlternative: false,
      },
      {
        time: '19:30',
        title: 'Vegan Ramen UZU (Michelin!)',
        locationId: 'vegan-ramen-uzu',
        description: 'Michelin-starred vegan ramen. Reservation required!',
        isAlternative: true,
      },
    ],
  },

  // ─── DAY 4 ────────────────────────────────────────────────────────────
  {
    day: 4,
    date: 'Thursday, April 23',
    title: 'Fushimi Inari & flight to Okinawa',
    region: 'kyoto',
    emoji: '⛩',
    activities: [
      {
        time: '09:30',
        title: 'Fushimi Inari Taisha',
        locationId: 'fushimi-inari-taisha',
        description: 'Thousands of red torii gates.',
        isAlternative: false,
      },
      {
        time: '12:30',
        title: 'Fushimi Sake District',
        locationId: 'fushimi-sake-district',
        description: 'Sake tasting at historic breweries.',
        isAlternative: false,
      },
      {
        time: '13:30',
        title: 'MERCY Vegan Factory',
        locationId: 'mercy-vegan-factory',
        description:
          'Vegan gimbap & matcha pudding. Right at the station!',
        isAlternative: false,
      },
      {
        time: '13:30',
        title: 'UNO Ramen',
        locationId: 'uno-ramen',
        description: '100% vegan + gluten-free ramen.',
        isAlternative: true,
      },
      {
        time: '17:00',
        title: 'Flight KIX \u2192 Naha',
        locationId: 'kansai-airport',
        description: 'Peach/Jetstar ~4,000\u00A5. Arrives ~19:00.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 5 ────────────────────────────────────────────────────────────
  {
    day: 5,
    date: 'Friday, April 24',
    title: 'Exploring Naha',
    region: 'okinawa',
    emoji: '\uD83C\uDFF0',
    activities: [
      {
        time: '10:00',
        title: 'Shuri Castle',
        locationId: 'shuri-castle',
        description: 'Seat of the Ryukyu Kingdom.',
        isAlternative: false,
      },
      {
        time: '12:30',
        title: 'Natural Food Mana',
        locationId: 'natural-food-mana',
        description: 'Rotating set lunch ~10 dishes.',
        isAlternative: false,
      },
      {
        time: '15:00',
        title: 'Kokusai-dori & Makishi Market',
        locationId: 'kokusai-dori',
        description: 'Try jimami dofu & shima dofu.',
        isAlternative: false,
      },
      {
        time: '18:00',
        title: 'Tamatebako',
        locationId: 'tamatebako',
        description: 'Vegan izakaya! Seaweed tempura, umi-budo, laksa.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 6 ────────────────────────────────────────────────────────────
  {
    day: 6,
    date: 'Saturday, April 25',
    title: 'Kerama Islands day trip',
    region: 'okinawa',
    emoji: '\uD83C\uDF0A',
    activities: [
      {
        time: '08:30',
        title: 'buuluu.buuluu',
        locationId: 'buuluu-buuluu',
        description: 'Avocado toast & flat white. Cash only!',
        isAlternative: false,
      },
      {
        time: '10:00',
        title: 'Ferry Tomari Port \u2192 Zamami',
        locationId: 'tomari-port',
        description: 'High-speed ferry to Zamami Island.',
        isAlternative: false,
      },
      {
        time: '11:00',
        title: 'Zamami Island & Furuzamami Beach',
        locationId: 'furuzamami-beach',
        description: 'Snorkel at Furuzamami Beach until 16:00.',
        isAlternative: false,
      },
      {
        time: '16:00',
        title: 'Last ferry back to Naha',
        locationId: 'tomari-port',
        description: 'Return ferry from Zamami.',
        isAlternative: false,
      },
      {
        time: '18:30',
        title: 'LaLa Zorba',
        locationId: 'lala-zorba',
        description: 'Vegan Okinawa soba & taco rice.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 7 ────────────────────────────────────────────────────────────
  {
    day: 7,
    date: 'Sunday, April 26',
    title: 'North Okinawa nature roadtrip',
    region: 'okinawa',
    emoji: '\uD83C\uDF3F',
    activities: [
      {
        time: '09:30',
        title: 'Cape Manzamo',
        locationId: 'cape-manzamo',
        description: 'Dramatic cliffs with elephant trunk rock.',
        isAlternative: false,
      },
      {
        time: '11:30',
        title: 'Sesoko Beach',
        locationId: 'sesoko-beach',
        description: 'Crystal clear water, snorkeling. 1,000\u00A5 parking.',
        isAlternative: false,
      },
      {
        time: '11:30',
        title: 'Emerald Beach',
        locationId: 'emerald-beach',
        description: 'Turquoise water, free beach.',
        isAlternative: true,
      },
      {
        time: '13:00',
        title: 'Gajimaru',
        locationId: 'gajimaru',
        description: 'Vegan ramen, gyoza & gelato. Closed Fri.',
        isAlternative: false,
      },
      {
        time: '15:00',
        title: 'Hiji Falls',
        locationId: 'hiji-falls',
        description: 'Subtropical rainforest hike ~40 min each way.',
        isAlternative: false,
      },
      {
        time: '18:30',
        title: 'American Village (Sunset Beach)',
        locationId: 'american-village',
        description: 'Sunset on the beach.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 8 ────────────────────────────────────────────────────────────
  {
    day: 8,
    date: 'Monday, April 27',
    title: 'Beach day & departure',
    region: 'okinawa',
    emoji: '\u2708',
    activities: [
      {
        time: '10:00',
        title: 'Beach (Naminoue Beach or west coast)',
        locationId: 'naminoue-beach',
        description: 'Last sun and sea.',
        isAlternative: false,
      },
      {
        time: '12:00',
        title: 'Last Okinawa lunch',
        locationId: 'kokusai-dori',
        description: 'Jimami dofu, beni-imo tart, mozuku seaweed.',
        isAlternative: false,
      },
      {
        time: '14:00',
        title: 'Naha Airport \u2192 Seoul',
        locationId: 'naha-airport',
        description: 'Departure flight to Seoul.',
        isAlternative: false,
      },
    ],
  },
];
