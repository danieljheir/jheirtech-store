export const categories = [
  "All",
  "CPU",
  "GPU",
  "RAM",
  "Storage",
  "Motherboard",
  "PSU",
  "Cooling",
  "Case",
];

export const categoryIcons = {
  CPU: "🧠",
  GPU: "🎮",
  RAM: "⚡",
  Storage: "💾",
  Motherboard: "🔌",
  PSU: "🔋",
  Cooling: "❄️",
  Case: "🖥️",
};

const products = [
  { id: 1, name: "Ryzen 7 7800X3D", category: "CPU", price: 389, specs: "8 cores · 16 threads · 5.0 GHz boost", stock: 12, badge: "Best seller" },
  { id: 2, name: "Core i5-14600K", category: "CPU", price: 289, specs: "14 cores · 20 threads · 5.3 GHz boost", stock: 9, badge: "" },
  { id: 3, name: "GeForce RTX 4070 Super", category: "GPU", price: 599, specs: "12 GB GDDR6X · Ray tracing · DLSS 3", stock: 6, badge: "Hot" },
  { id: 4, name: "Radeon RX 7800 XT", category: "GPU", price: 479, specs: "16 GB GDDR6 · 2.4 GHz · FSR 3", stock: 8, badge: "" },
  { id: 5, name: "Vengeance 32GB DDR5", category: "RAM", price: 109, specs: "2×16 GB · 6000 MHz · CL30", stock: 25, badge: "" },
  { id: 6, name: "Trident Z5 RGB 16GB", category: "RAM", price: 69, specs: "2×8 GB · 6400 MHz · RGB", stock: 0, badge: "" },
  { id: 7, name: "970 EVO Plus 1TB", category: "Storage", price: 79, specs: "NVMe Gen3 · 3500 MB/s read", stock: 30, badge: "Student pick" },
  { id: 8, name: "990 Pro 2TB", category: "Storage", price: 169, specs: "NVMe Gen4 · 7450 MB/s read", stock: 14, badge: "" },
  { id: 9, name: "ROG Strix B650-A", category: "Motherboard", price: 219, specs: "AM5 · DDR5 · WiFi 6E · ATX", stock: 7, badge: "" },
  { id: 10, name: "MAG Z790 Tomahawk", category: "Motherboard", price: 229, specs: "LGA1700 · DDR5 · WiFi 6E · ATX", stock: 5, badge: "" },
  { id: 11, name: "RM850x 850W Gold", category: "PSU", price: 139, specs: "80+ Gold · Fully modular", stock: 18, badge: "" },
  { id: 12, name: "Focus GX-750 750W", category: "PSU", price: 99, specs: "80+ Gold · Fully modular", stock: 11, badge: "" },
  { id: 13, name: "Peerless Assassin 120", category: "Cooling", price: 39, specs: "Dual tower · 6 heatpipes · 120 mm", stock: 22, badge: "Great value" },
  { id: 14, name: "Kraken 240 AIO", category: "Cooling", price: 139, specs: "240 mm radiator · LCD pump head", stock: 6, badge: "" },
  { id: 15, name: "H5 Flow Airflow Case", category: "Case", price: 94, specs: "ATX mid tower · 2 fans included", stock: 15, badge: "" },
  { id: 16, name: "Lancool 216 RGB", category: "Case", price: 109, specs: "ATX mid tower · 2×160 mm fans", stock: 10, badge: "" },
];

export const money = (n) => "$" + n.toLocaleString("en-US");

export default products;
