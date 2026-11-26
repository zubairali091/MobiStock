// Demo products loaded on the first visit so the dashboard is not empty.
// They can be edited or deleted from the Products page.

const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString();

const base = { model: "", ramStorage: "", color: "", imei: "" };

export const seedProducts = [
  { ...base, id: "p1", name: "Galaxy A15", brand: "Samsung", model: "SM-A155F", ramStorage: "6GB / 128GB", color: "Black", imei: "356938035643809", category: "Mobiles", purchasePrice: 41500, salePrice: 45500, quantity: 8, createdAt: daysAgo(9), updatedAt: daysAgo(2) },
  { ...base, id: "p2", name: "Redmi Note 13", brand: "Xiaomi", model: "23129RAA4G", ramStorage: "8GB / 256GB", color: "Midnight Black", imei: "867530049211037", category: "Mobiles", purchasePrice: 52000, salePrice: 56500, quantity: 3, createdAt: daysAgo(8), updatedAt: daysAgo(1) },
  { ...base, id: "p3", name: "Spark 20 Pro", brand: "Tecno", model: "KJ6", ramStorage: "8GB / 256GB", color: "Moonlit Silver", imei: "351247086530921", category: "Mobiles", purchasePrice: 38000, salePrice: 41500, quantity: 0, createdAt: daysAgo(8), updatedAt: daysAgo(3) },
  { ...base, id: "p4", name: "iPhone 13", brand: "Apple", model: "A2633", ramStorage: "4GB / 128GB", color: "Blue", imei: "353879234512660", category: "Mobiles", purchasePrice: 168000, salePrice: 179000, quantity: 2, createdAt: daysAgo(7), updatedAt: daysAgo(1) },
  { ...base, id: "p5", name: "Hot 40i", brand: "Infinix", model: "X6528B", ramStorage: "4GB / 128GB", color: "Palm Blue", imei: "358901264477152", category: "Mobiles", purchasePrice: 26500, salePrice: 29500, quantity: 12, createdAt: daysAgo(7), updatedAt: daysAgo(4) },
  { ...base, id: "p6", name: "20W Fast Charger", brand: "Samsung", model: "EP-TA800", color: "White", category: "Accessories", purchasePrice: 1400, salePrice: 2200, quantity: 25, createdAt: daysAgo(6), updatedAt: daysAgo(2) },
  { ...base, id: "p7", name: "Type-C Data Cable", brand: "Anker", model: "A8852", color: "Black", category: "Accessories", purchasePrice: 650, salePrice: 1100, quantity: 4, createdAt: daysAgo(6), updatedAt: daysAgo(1) },
  { ...base, id: "p8", name: "Wireless Earbuds", brand: "Oraimo", model: "FreePods 4", color: "Black", category: "Accessories", purchasePrice: 3800, salePrice: 5200, quantity: 9, createdAt: daysAgo(5), updatedAt: daysAgo(5) },
  { ...base, id: "p9", name: "9H Glass Protector", brand: "Generic", model: "Galaxy A15", color: "Clear", category: "Tempered Glass", purchasePrice: 90, salePrice: 250, quantity: 60, createdAt: daysAgo(5), updatedAt: daysAgo(2) },
  { ...base, id: "p10", name: "Privacy Glass", brand: "Generic", model: "iPhone 13", color: "Black", category: "Tempered Glass", purchasePrice: 180, salePrice: 450, quantity: 3, createdAt: daysAgo(4), updatedAt: daysAgo(1) },
  { ...base, id: "p11", name: "Screen Combo", brand: "Samsung", model: "Galaxy A15", color: "Black", category: "Spare Parts", purchasePrice: 6800, salePrice: 9000, quantity: 0, createdAt: daysAgo(4), updatedAt: daysAgo(2) },
  { ...base, id: "p12", name: "Battery 5000mAh", brand: "Xiaomi", model: "Redmi Note 13", color: "", category: "Spare Parts", purchasePrice: 1900, salePrice: 3000, quantity: 7, createdAt: daysAgo(3), updatedAt: daysAgo(3) },
];

export const seedActivity = [
  { id: "a3", type: "update", text: "Updated Privacy Glass stock", at: daysAgo(1) },
  { id: "a2", type: "update", text: "Updated Galaxy A15 stock", at: daysAgo(2) },
  { id: "a1", type: "add", text: "Added Redmi Note 13", at: daysAgo(8) },
];
