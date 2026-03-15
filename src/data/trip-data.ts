export interface Activity {
  time: string;
  title: string;
  locationId: string;
  description: string;
  isAlternative: boolean;
  tip?: string;
  transportToNext?: 'walk' | 'bus' | 'train' | 'car' | 'ferry' | 'flight' | 'monorail';
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
        transportToNext: 'walk',
      },
      {
        time: '17:00',
        title: 'Kamo River heading north',
        locationId: 'kamo-river',
        description:
          'The further north, the quieter and more local. Perfect for an evening stroll.',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '18:00',
        title: 'ZIRAEL Vegan Restaurant (Gion)',
        locationId: 'zirael-vegan',
        description:
          'Vegan dumplings & chocolate cake, right in Gion. Mon until 7 PM \u2013 arrive early!',
        isAlternative: false,
        transportToNext: 'walk',
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
        transportToNext: 'walk',
      },
      {
        time: '10:30',
        title: 'Ninenzaka & Teapot lanes',
        locationId: 'ninenzaka',
        description: 'Charming lanes downhill from the temple.',
        isAlternative: false,
        transportToNext: 'bus',
      },
      {
        time: '11:30',
        title: 'Murin-an Garden',
        locationId: 'murin-an-garden',
        description:
          "Locals say it's Kyoto's most beautiful garden. Tea included. Closed Wed!",
        isAlternative: false,
        transportToNext: 'bus',
      },
      {
        time: '13:00',
        title: 'VOG Kyoto',
        locationId: 'vog-kyoto',
        description: 'Vegan Butter Keema Masala & Mango Lassi.',
        isAlternative: false,
        transportToNext: 'bus',
      },
      {
        time: '15:00',
        title: 'Kinkaku-ji (Golden Pavilion)',
        locationId: 'kinkaku-ji',
        description: 'If only one temple, make it this one.',
        isAlternative: false,
        transportToNext: 'bus',
      },
      {
        time: '16:30',
        title: 'Story Coffee',
        locationId: 'story-coffee',
        description: 'One of the best espressos in Kyoto. Has oat milk!',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '17:30',
        title: 'Sanjo Shopping Street',
        locationId: 'sanjo-shopping-street',
        description: 'Local alternative to touristy Nishiki Market.',
        isAlternative: false,
        transportToNext: 'walk',
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
    emoji: '\u2668',
    activities: [
      {
        time: '09:30',
        title: 'Arashiyama Bamboo Grove',
        locationId: 'arashiyama-bamboo-grove',
        description: 'Tourist-heavy but still impressive.',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '10:15',
        title: 'Okochi Sanso Garden',
        locationId: 'okochi-sanso-garden',
        description: 'Hidden gem! 1,000\u00A5 incl. matcha.',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '11:00',
        title: 'eXcafe Arashiyama',
        locationId: 'excafe-arashiyama',
        description: 'Grill dango at your table + matcha.',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '11:30',
        title: 'Shigetsu (Tenryu-ji)',
        locationId: 'shigetsu',
        description: 'Shojin Ryori with zen garden view. Book Hana course!',
        isAlternative: false,
        transportToNext: 'train',
      },
      {
        time: '14:30',
        title: 'Kurama Onsen',
        locationId: 'kurama-onsen',
        description: 'Rotenburo with mountain views. 2,500\u00A5.',
        isAlternative: false,
        tip: 'Take the Eizan Line from Demachiyanagi to Kurama Onsen (~30 min).',
        transportToNext: 'train',
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
    emoji: '\u26E9',
    activities: [
      {
        time: '09:30',
        title: 'Fushimi Inari Taisha',
        locationId: 'fushimi-inari-taisha',
        description: 'Thousands of red torii gates.',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '12:30',
        title: 'Fushimi Sake District',
        locationId: 'fushimi-sake-district',
        description: 'Sake tasting at historic breweries.',
        isAlternative: false,
        transportToNext: 'train',
      },
      {
        time: '13:30',
        title: 'MERCY Vegan Factory',
        locationId: 'mercy-vegan-factory',
        description:
          'Vegan gimbap & matcha pudding. Right at the station!',
        isAlternative: false,
        transportToNext: 'train',
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
        transportToNext: 'flight',
      },
      {
        time: '19:30',
        title: 'Tamatebako',
        locationId: 'tamatebako',
        description: 'Vegan izakaya! Seaweed tempura, umi-budo, laksa.',
        isAlternative: false,
      },
      {
        time: '19:30',
        title: 'LaLa Zorba',
        locationId: 'lala-zorba',
        description: 'Vegan Okinawa soba & taco rice. Near Kokusai-d\u014Dri.',
        isAlternative: true,
      },
    ],
  },

  // ─── DAY 5 ────────────────────────────────────────────────────────────
  {
    day: 5,
    date: 'Friday, April 24',
    title: 'Kerama Islands day trip',
    region: 'okinawa',
    emoji: '\uD83C\uDF0A',
    activities: [
      {
        time: '08:00',
        title: 'buuluu.buuluu',
        locationId: 'buuluu-buuluu',
        description: 'Avocado toast & flat white, 10 min from Tomari Port. Cash only!',
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '09:00',
        title: 'Ferry Tomari Port \u2192 Zamami',
        locationId: 'tomari-port',
        description: 'Queen Zamami fast ferry ~50 min. Book tickets in advance!',
        isAlternative: false,
        transportToNext: 'ferry',
      },
      {
        time: '10:00',
        title: 'Zamami Island & Furuzamami Beach',
        locationId: 'furuzamami-beach',
        description: 'Snorkel at Furuzamami Beach, rent a scooter, explore viewpoints.',
        isAlternative: false,
        tip: 'Book ferry tickets 1\u20132 weeks ahead via the Zamami Village website. Very popular near Golden Week!',
        transportToNext: 'ferry',
      },
      {
        time: '16:20',
        title: 'Last ferry back to Naha',
        locationId: 'tomari-port',
        description: "Check times \u2013 don't miss it!",
        isAlternative: false,
        transportToNext: 'walk',
      },
      {
        time: '18:30',
        title: 'LaLa Zorba',
        locationId: 'lala-zorba',
        description: 'Vegan Okinawa soba & taco rice. Near Kokusai-d\u014Dri. Mon/Thu\u2013Sun from 5:30 PM.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 6 ────────────────────────────────────────────────────────────
  {
    day: 6,
    date: 'Saturday, April 25',
    title: 'Shuri Castle & North Okinawa',
    region: 'okinawa',
    emoji: '\uD83C\uDFF0',
    activities: [
      {
        time: '09:30',
        title: 'Shuri Castle',
        locationId: 'shuri-castle',
        description: 'Seat of the Ryukyu Kingdom. Great views over Naha. 1\u20132 hours is enough. Open 8:30 AM\u20136:30 PM.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '12:00',
        title: 'Pick up rental car (Naha)',
        locationId: 'kokusai-dori',
        description: 'Head north on Route 58 \u2013 the scenic coastal road (~1.5h to Nago).',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '13:30',
        title: 'Cape Manzamo (on the way)',
        locationId: 'cape-manzamo',
        description: 'Dramatic cliffs with elephant trunk rock formation. 100\u00A5 (~\u20AC0.55) entry. Quick stop.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '15:00',
        title: 'Hiji Falls (Yanbaru National Park)',
        locationId: 'hiji-falls',
        description: 'Subtropical rainforest hike to waterfall \u2013 ~40 min each way. North of Nago.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '18:00',
        title: 'Check-in Nago area',
        locationId: 'nago',
        description: 'Base for 2 nights. Coastal Airbnb or hotel. ~1.5h to Naha Airport on Monday.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '19:00',
        title: 'Gajimaru',
        locationId: 'gajimaru',
        description: 'Vegan ramen, gyoza & gelato in Onna (~20 min south). Closed Fri \u2013 open Sat!',
        isAlternative: false,
        tip: 'Dinner options with a car: Gajimaru in Onna (\u26054.8), niceness in Nago (\u26054.4, organic farm-to-table, Thu\u2013Sun lunch only), or Cookhal in Nago (\u26054.4, farm cafe, daily until 5 PM).',
      },
    ],
  },

  // ─── DAY 7 ────────────────────────────────────────────────────────────
  {
    day: 7,
    date: 'Sunday, April 26',
    title: 'Beach day & sunset',
    region: 'okinawa',
    emoji: '\uD83C\uDF3F',
    activities: [
      {
        time: '10:00',
        title: 'Sesoko Beach (Sesoko Island)',
        locationId: 'sesoko-beach',
        description: 'Crystal clear water, snorkeling right from the beach. ~15 min from Nago. 1,000\u00A5 (~\u20AC5.50) parking.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '10:00',
        title: 'Emerald Beach (Ocean Expo Park)',
        locationId: 'emerald-beach',
        description: 'Turquoise water straight from a postcard. Free beach in the park. ~20 min from Nago.',
        isAlternative: true,
      },
      {
        time: '13:00',
        title: 'Lunch \u2013 pick your spot!',
        locationId: 'gajimaru',
        description: 'Earthful Burger (Sat+Sun only!), Kuma Kitchen (vegan bento takeaway), or Gajimaru in Onna.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '14:30',
        title: 'More beach time',
        locationId: 'sesoko-beach',
        description: 'Mission Beach, Tiger Beach, or revisit Sesoko \u2013 follow your mood.',
        isAlternative: false,
        tip: 'Okinawa is one of the world\u2019s five Blue Zones. The secret to longevity here is Ikigai \u2013 \u201Cyour reason for getting up in the morning.\u201D',
        transportToNext: 'car',
      },
      {
        time: '17:30',
        title: 'American Village (Sunset Beach)',
        locationId: 'american-village',
        description: 'Colorful beach district \u2013 sunset on the beach. Blue Seal Ice Cream (beni-imo flavor!) is often vegan. ~40 min south of Nago.',
        isAlternative: false,
      },
    ],
  },

  // ─── DAY 8 ────────────────────────────────────────────────────────────
  {
    day: 8,
    date: 'Monday, April 27',
    title: 'Beach, Naha & departure',
    region: 'okinawa',
    emoji: '\u2708',
    activities: [
      {
        time: '09:00',
        title: 'Morning beach (Nago area)',
        locationId: 'nago',
        description: 'Last chance to enjoy the ocean \u2013 Sesoko Beach or your hotel beach.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '11:00',
        title: 'Drive to Naha (~1.5h)',
        locationId: 'kokusai-dori',
        description: 'Scenic coastal Route 58 south.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '12:00',
        title: 'Kokusai-d\u014Dri & Makishi Market',
        locationId: 'kokusai-dori',
        description: 'Quick walk through Naha\u2019s main street. Pick up souvenirs, try jimami dofu & beni-imo tart.',
        isAlternative: false,
        transportToNext: 'car',
      },
      {
        time: '13:30',
        title: 'Return rental car at Naha Airport',
        locationId: 'naha-airport',
        description: 'Most rental companies have airport drop-off. Allow 30 min for shuttle + paperwork.',
        isAlternative: false,
      },
      {
        time: '15:00',
        title: 'Naha Airport \u2192 Seoul',
        locationId: 'naha-airport',
        description: 'Return flight to Seoul (~2h).',
        isAlternative: false,
      },
    ],
  },
];
