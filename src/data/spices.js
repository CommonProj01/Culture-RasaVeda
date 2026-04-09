export const spices = [
  {
    id: 1, name: "Turmeric", emoji: "🟡",
    flavor: "Earthy", intensity: 3,
    color: ["#c8890a","#f0c040"],
    region: "Kerala, Tamil Nadu",
    health: ["Anti-inflammatory", "Antioxidant", "Boosts immunity", "Liver detox"],
    recipes: ["Dal Tadka", "Chole", "Biryani", "Golden Milk"],
    pairs: ["Cumin", "Coriander", "Ginger", "Black Pepper"],
    description: "India's golden spice, used for over 4000 years. Curcumin gives it its signature colour and healing power."
  },
  {
    id: 2, name: "Cumin", emoji: "🤎",
    flavor: "Warming", intensity: 4,
    color: ["#6b3a10","#c97a30"],
    region: "Rajasthan, Gujarat",
    health: ["Aids digestion", "Reduces bloating", "Iron-rich", "Anti-diabetic"],
    recipes: ["Dal Fry", "Jeera Rice", "Raita", "Chole"],
    pairs: ["Coriander", "Turmeric", "Chili", "Mustard"],
    description: "The backbone of Indian tempering. Its earthy warmth is released when it crackles in hot oil."
  },
  {
    id: 3, name: "Cardamom", emoji: "💚",
    flavor: "Sweet", intensity: 5,
    color: ["#1a5c2e","#3db870"],
    region: "Kerala, Karnataka",
    health: ["Freshens breath", "Anti-nausea", "Blood pressure control", "Antioxidant"],
    recipes: ["Chai", "Biryani", "Kheer", "Gulab Jamun"],
    pairs: ["Cinnamon", "Cloves", "Saffron", "Nutmeg"],
    description: "The 'Queen of Spices'. Its intense floral sweetness perfumes both biryanis and desserts alike."
  },
  {
    id: 4, name: "Red Chili", emoji: "🌶️",
    flavor: "Pungent", intensity: 9,
    color: ["#8b0000","#e03030"],
    region: "Andhra Pradesh, Rajasthan",
    health: ["Boosts metabolism", "Pain relief (capsaicin)", "Rich in Vitamin C", "Improves circulation"],
    recipes: ["Laal Maas", "Vindaloo", "Mirchi Bajji", "Sambar"],
    pairs: ["Garlic", "Cumin", "Coriander", "Tamarind"],
    description: "Brought by the Portuguese, now inseparable from Indian cooking. Kashmiri chili gives colour; bird's eye gives fire."
  },
  {
    id: 5, name: "Cinnamon", emoji: "🟤",
    flavor: "Sweet", intensity: 4,
    color: ["#7a3b10","#c97a2e"],
    region: "Kerala, Sri Lanka border",
    health: ["Blood sugar regulation", "Anti-inflammatory", "Heart health", "Antifungal"],
    recipes: ["Biryani", "Masala Chai", "Pulao", "Shahi Korma"],
    pairs: ["Cardamom", "Cloves", "Star Anise", "Cumin"],
    description: "True cinnamon (Ceylon) is delicate and sweet. Cassia (the common kind) is bolder. Both are stars in garam masala."
  },
  {
    id: 6, name: "Mustard Seeds", emoji: "⚫",
    flavor: "Pungent", intensity: 6,
    color: ["#3a3a1a","#8a8a2e"],
    region: "Bengal, South India",
    health: ["Digestive stimulant", "Anti-cancer (selenium)", "Omega-3 source", "Relieves arthritis"],
    recipes: ["Sambar", "Aloo Sabzi", "Bengali Fish Curry", "Pickles"],
    pairs: ["Curry Leaves", "Turmeric", "Asafoetida", "Green Chili"],
    description: "The pop of mustard seeds in hot oil signals the start of South Indian cooking. Black > brown > yellow in pungency."
  },
  {
    id: 7, name: "Cloves", emoji: "🖤",
    flavor: "Warming", intensity: 8,
    color: ["#2c1a0e","#6b3a20"],
    region: "Kerala (Maluku origin)",
    health: ["Antibacterial", "Numbs toothache", "Liver protectant", "Blood sugar control"],
    recipes: ["Biryani", "Masala Chai", "Nihari", "Garam Masala"],
    pairs: ["Cardamom", "Cinnamon", "Black Pepper", "Bay Leaf"],
    description: "Once worth more than gold, cloves were traded in ancient spice routes. Eugenol makes them nature's antiseptic."
  },
  {
    id: 8, name: "Coriander", emoji: "🌿",
    flavor: "Cooling", intensity: 2,
    color: ["#2a5c1a","#5ab83a"],
    region: "Pan India",
    health: ["Lowers cholesterol", "Digestive aid", "Cooling effect", "Rich in Vitamin K"],
    recipes: ["Dal", "Chutneys", "Pulao", "Kadai Paneer"],
    pairs: ["Cumin", "Turmeric", "Chili", "Garlic"],
    description: "Both seeds and leaves are used. Seeds are warming; fresh leaves are cooling. The 'do-it-all' spice of India."
  },
  {
    id: 9, name: "Fenugreek", emoji: "🟫",
    flavor: "Earthy", intensity: 6,
    color: ["#5c4011","#a07830"],
    region: "Rajasthan, Punjab",
    health: ["Blood sugar control", "Milk production (lactation)", "Reduces bad cholesterol", "Anti-inflammatory"],
    recipes: ["Methi Paratha", "Dal Makhani", "Aloo Methi", "Kasuri Methi Paneer"],
    pairs: ["Cumin", "Mustard", "Turmeric", "Garlic"],
    description: "Slightly bitter seeds that add depth to curries. Dried leaves (kasuri methi) are the secret behind restaurant curries."
  },
  {
    id: 10, name: "Black Pepper", emoji: "⚫",
    flavor: "Pungent", intensity: 7,
    color: ["#1a1a1a","#555555"],
    region: "Kerala (Malabar Coast)",
    health: ["Enhances nutrient absorption", "Antioxidant", "Anti-inflammatory", "Improves brain function"],
    recipes: ["Rasam", "Pepper Chicken", "Chettinad Curry", "Garam Masala"],
    pairs: ["Turmeric", "Ginger", "Cardamom", "Cloves"],
    description: "The 'King of Spices'. Piperine in black pepper dramatically increases curcumin absorption from turmeric — a perfect pair."
  },
  {
    id: 11, name: "Ginger", emoji: "🫚",
    flavor: "Warming", intensity: 7,
    color: ["#8b5e20","#d4a040"],
    region: "Kerala, Meghalaya",
    health: ["Nausea relief", "Anti-inflammatory", "Immunity booster", "Improves digestion"],
    recipes: ["Masala Chai", "Chole", "Halwa", "Almost every curry"],
    pairs: ["Garlic", "Turmeric", "Black Pepper", "Cardamom"],
    description: "Half of the essential ginger-garlic paste. Fresh ginger brings heat and aroma; dry ginger is more concentrated."
  },
  {
    id: 12, name: "Saffron", emoji: "🧡",
    flavor: "Sweet", intensity: 5,
    color: ["#8b4513","#e08030"],
    region: "Kashmir",
    health: ["Mood enhancer", "Antioxidant", "Memory booster", "Menstrual relief"],
    recipes: ["Biryani", "Kheer", "Kesari Bath", "Shahi Korma"],
    pairs: ["Cardamom", "Rose Water", "Milk", "Cinnamon"],
    description: "The world's most expensive spice by weight. Each thread is a hand-picked stigma of the Crocus sativus flower."
  },
];

// Pairing guide — which spices go together
export const spicePairings = [
  { base: "Turmeric",  pairs: ["Cumin", "Coriander", "Ginger", "Black Pepper"] },
  { base: "Cardamom", pairs: ["Cinnamon", "Cloves", "Saffron", "Black Pepper"] },
  { base: "Cumin",    pairs: ["Coriander", "Chili", "Mustard Seeds", "Turmeric"] },
  { base: "Ginger",   pairs: ["Garlic", "Turmeric", "Cardamom", "Cumin"] },
];