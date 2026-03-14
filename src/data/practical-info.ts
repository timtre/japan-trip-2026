export interface TransportItem {
  route: string;
  details: string;
  cost: string;
  costEur: string;
}

export interface BudgetItem {
  category: string;
  item: string;
  costJpy: string;
  costEur: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  details: string;
  timeframe: string;
  url?: string;
}

export const transportInfo: TransportItem[] = [
  {
    route: 'Seoul \u2192 Osaka KIX',
    details: '~2h flight. Peach, Jeju Air, T\'way, Jin Air.',
    cost: 'From ~\u00A55,000',
    costEur: 'From ~\u20AC28',
  },
  {
    route: 'Haruka Express KIX \u2192 Kyoto',
    details: '~75 min direct express train from Kansai Airport to Kyoto Station.',
    cost: '~\u00A53,000',
    costEur: '~\u20AC16',
  },
  {
    route: 'Kyoto bus/subway day pass',
    details: 'Unlimited bus & subway rides within Kyoto.',
    cost: '~\u00A5600/day',
    costEur: '~\u20AC3.30/day',
  },
  {
    route: 'KIX \u2192 Naha (Okinawa)',
    details: '~2h flight. Peach or Jetstar.',
    cost: 'From ~\u00A54,000',
    costEur: 'From ~\u20AC22',
  },
  {
    route: 'Zamami ferry (round trip)',
    details: 'High-speed ferry from Tomari Port, Naha to Zamami Island.',
    cost: '~\u00A56,000',
    costEur: '~\u20AC33',
  },
  {
    route: 'Okinawa rental car',
    details: 'Essential for North Okinawa day trip (Day 7). Book in advance.',
    cost: '~\u00A55,000\u2013\u00A58,000/day',
    costEur: '~\u20AC28\u2013\u20AC44/day',
  },
];

export const budgetItems: BudgetItem[] = [
  // Flights
  {
    category: 'Flights',
    item: 'Seoul \u2192 Osaka KIX',
    costJpy: '\u00A58,000\u2013\u00A515,000',
    costEur: '\u20AC44\u2013\u20AC83',
  },
  {
    category: 'Flights',
    item: 'KIX \u2192 Naha',
    costJpy: '\u00A54,000\u2013\u00A56,000',
    costEur: '\u20AC22\u2013\u20AC33',
  },
  {
    category: 'Flights',
    item: 'Naha \u2192 Seoul',
    costJpy: '\u00A58,000\u2013\u00A515,000',
    costEur: '\u20AC44\u2013\u20AC83',
  },

  // Accommodation
  {
    category: 'Accommodation',
    item: 'Kyoto 4 nights (per person)',
    costJpy: '\u00A528,000\u2013\u00A548,000',
    costEur: '\u20AC155\u2013\u20AC265',
  },
  {
    category: 'Accommodation',
    item: 'Okinawa 4 nights (per person)',
    costJpy: '\u00A518,000\u2013\u00A530,000',
    costEur: '\u20AC100\u2013\u20AC165',
  },

  // Food (daily per person)
  {
    category: 'Food (daily)',
    item: 'Breakfast',
    costJpy: '\u00A5500\u2013\u00A51,000',
    costEur: '\u20AC2.80\u2013\u20AC5.50',
  },
  {
    category: 'Food (daily)',
    item: 'Lunch',
    costJpy: '\u00A51,000\u2013\u00A52,000',
    costEur: '\u20AC5.50\u2013\u20AC11',
  },
  {
    category: 'Food (daily)',
    item: 'Dinner',
    costJpy: '\u00A51,500\u2013\u00A54,000',
    costEur: '\u20AC8\u2013\u20AC22',
  },
  {
    category: 'Food (daily)',
    item: 'Snacks & drinks',
    costJpy: '~\u00A5500',
    costEur: '~\u20AC2.80',
  },

  // Transport
  {
    category: 'Transport',
    item: 'Haruka Express (KIX \u2192 Kyoto)',
    costJpy: '~\u00A53,000',
    costEur: '~\u20AC16',
  },
  {
    category: 'Transport',
    item: 'Kyoto bus/subway pass (4 days)',
    costJpy: '~\u00A52,400',
    costEur: '~\u20AC13',
  },
  {
    category: 'Transport',
    item: 'Taxi rides (estimated)',
    costJpy: '~\u00A53,000',
    costEur: '~\u20AC16',
  },
  {
    category: 'Transport',
    item: 'Zamami ferry (round trip)',
    costJpy: '~\u00A56,000',
    costEur: '~\u20AC33',
  },
  {
    category: 'Transport',
    item: 'Rental car (1 day)',
    costJpy: '\u00A55,000\u2013\u00A58,000',
    costEur: '\u20AC28\u2013\u20AC44',
  },

  // Activities
  {
    category: 'Activities',
    item: 'Kurama Onsen',
    costJpy: '~\u00A53,250',
    costEur: '~\u20AC18',
  },
  {
    category: 'Activities',
    item: 'Temple entries (total)',
    costJpy: '\u00A53,000\u2013\u00A55,000',
    costEur: '\u20AC16\u2013\u20AC28',
  },

  // Total
  {
    category: 'Total',
    item: 'Estimated total per person (8 days)',
    costJpy: '\u00A5127,000\u2013\u00A5218,000',
    costEur: '\u20AC700\u2013\u20AC1,200',
  },
];

export const checklistItems: ChecklistItem[] = [
  {
    id: 'flights-seoul-kix',
    text: 'Book flight Seoul \u2192 Osaka KIX',
    details: 'Peach, Jeju Air, T\'way, or Jin Air. Check Skyscanner.',
    timeframe: '6\u20138 weeks before',
    url: 'https://www.skyscanner.net/transport/flights/sel/kix/',
  },
  {
    id: 'flights-kix-naha',
    text: 'Book flight KIX \u2192 Naha',
    details: 'Peach or Jetstar. Afternoon flight on Apr 23.',
    timeframe: '6\u20138 weeks before',
    url: 'https://www.skyscanner.net/transport/flights/kix/oka/',
  },
  {
    id: 'flights-naha-seoul',
    text: 'Book flight Naha \u2192 Seoul',
    details: 'Afternoon departure on Apr 27.',
    timeframe: '6\u20138 weeks before',
    url: 'https://www.skyscanner.net/transport/flights/oka/sel/',
  },
  {
    id: 'accommodation-kyoto',
    text: 'Book Kyoto accommodation',
    details: 'Try a traditional Machiya! 4 nights (Apr 20\u201323).',
    timeframe: '4\u20136 weeks before',
    url: 'https://www.booking.com/searchresults.html?ss=Kyoto',
  },
  {
    id: 'accommodation-okinawa',
    text: 'Book Okinawa accommodation',
    details: 'Naha area for Days 5\u20136, consider north for Day 7. 4 nights (Apr 24\u201327).',
    timeframe: '4\u20136 weeks before',
    url: 'https://www.booking.com/searchresults.html?ss=Naha%2C+Okinawa',
  },
  {
    id: 'reserve-shigetsu',
    text: 'Reserve Shigetsu (Tenryu-ji)',
    details: 'Book Hana course. Lunch only, closed Thu.',
    timeframe: '2\u20134 weeks before',
    url: 'https://www.tenryuji.com/shigetsu/en/',
  },
  {
    id: 'reserve-uzu',
    text: 'Reserve Vegan Ramen UZU',
    details: 'Michelin-starred, limited seats. Reservation required.',
    timeframe: '2\u20134 weeks before',
    url: 'https://www.tablecheck.com/en/shops/uzu-kyoto/reserve',
  },
  {
    id: 'reserve-awomb',
    text: 'Reserve AWOMB Nishikiyamachi',
    details: 'Reservation in Japanese required. From 6 PM.',
    timeframe: '2\u20134 weeks before',
    url: 'https://www.awomb.com/',
  },
  {
    id: 'reserve-little-heaven',
    text: 'Reserve Little Heaven',
    details: 'Reserve by email for vegan sushi course.',
    timeframe: '2\u20134 weeks before',
    url: 'https://www.instagram.com/little_heaven_kyoto/',
  },
  {
    id: 'zamami-ferry',
    text: 'Book Zamami ferry tickets',
    details: 'Round trip from Tomari Port. Sells out on weekends!',
    timeframe: '1\u20132 weeks before',
    url: 'https://www.vill.zamami.okinawa.jp/ship/en/',
  },
  {
    id: 'car-rental',
    text: 'Book rental car for Day 7',
    details: 'Needed for North Okinawa roadtrip. International driving permit required.',
    timeframe: '1\u20132 weeks before',
    url: 'https://www.tocoo.jp/en/',
  },
  {
    id: 'reserve-towzen',
    text: 'Reserve Towzen (Shimogamo)',
    details: 'Reserve via Line messaging app.',
    timeframe: '1 week before',
    url: 'https://www.instagram.com/towzen_kyoto/',
  },
  {
    id: 'happycow-app',
    text: 'Download HappyCow app',
    details: 'Best app for finding vegan restaurants worldwide.',
    timeframe: 'Before departure',
    url: 'https://www.happycow.net/mobile',
  },
  {
    id: 'vegan-card',
    text: 'Prepare vegan allergy card in Japanese',
    details: 'Print or save on phone. Explain dietary needs in Japanese.',
    timeframe: 'Before departure',
    url: 'https://www.justhungry.com/japan-dining-out-cards',
  },
  {
    id: 'esim',
    text: 'Get eSIM for Japan',
    details: 'Ubigi, Airalo, or similar. Data-only eSIM works great.',
    timeframe: 'Before departure',
    url: 'https://www.airalo.com/japan',
  },
];

export const insiderTips: string[] = [
  'Kyoto temples are best visited early morning (before 9 AM) to avoid crowds.',
  'Carry cash \u2013 many smaller restaurants and cafes in both Kyoto and Okinawa are cash only.',
  'The Eizan Line from Demachiyanagi to Kurama is a scenic ride through the mountains (~30 min).',
  'Gion is nearly empty at night and magically lit \u2013 walk through after dinner.',
  'In Okinawa, rent a car for anything outside Naha. Public transport is limited.',
  'Zamami ferry tickets sell out on weekends \u2013 book in advance.',
  'Cherry blossom season in Kyoto is typically late March to mid-April. Late April may catch the last blooms.',
  'Many restaurants close on specific weekdays \u2013 always check before visiting.',
  'Convenience stores (konbini) have surprisingly good vegan onigiri options \u2013 look for ume (plum) and kombu (seaweed).',
  'Tap water is safe to drink throughout Japan. Bring a reusable bottle.',
];

export const veganTips: string[] = [
  'Download HappyCow before your trip \u2013 it is the best resource for finding vegan food in Japan.',
  'Carry a vegan allergy card in Japanese explaining what you cannot eat (meat, fish, dairy, eggs, dashi).',
  'Dashi (fish stock) is in almost everything by default. Always ask if dishes are made without it.',
  'Shojin Ryori (Buddhist temple cuisine) is traditionally vegan and a must-try in Kyoto.',
  'Konbini onigiri: ume (plum), kombu (seaweed), and sekihan (red bean rice) are usually vegan.',
  'Look for the kanji \u7D20 (su) which indicates vegetarian/vegan Buddhist food.',
  'Many izakaya dishes look vegan but contain hidden dashi or bonito flakes \u2013 always ask.',
  'Okinawa has unique vegan-friendly ingredients: jimami dofu, umi-budo (sea grapes), and mozuku seaweed.',
  'Soy milk (tonyu) is widely available and many cafes offer it as an alternative.',
  'Japanese bread and pastries often contain dairy and eggs \u2013 check ingredients or ask.',
];

export const accommodationTips = {
  kyoto: [
    'Stay in a traditional Machiya (wooden townhouse) for an authentic Kyoto experience.',
    'Higashiyama and Gion areas are central for temple-hopping and nightlife.',
    'Kyoto Station area is convenient for transport but less atmospheric.',
    'Book early for April \u2013 cherry blossom season is peak tourism.',
    'Budget option: hostels near Nijo or Karasuma from ~\u00A53,500/night.',
  ],
  okinawa: [
    'Stay in Naha for Days 5\u20136 to be close to Kokusai-dori and Tomari Port.',
    'Consider moving to a beach resort area (Chatan/Onna) for Day 7 if doing the roadtrip.',
    'Naha guesthouses offer great value from ~\u00A52,500/night.',
    'Airbnb apartments with kitchens are a good option for preparing simple meals.',
    'Many Okinawa hotels include breakfast \u2013 check if vegan options are available.',
  ],
};
