export interface Product {
  id: number
  image: string
  thumbnails: string[]
  badge: string
  title: string
  rating: number
  reviews: number
  price: number
  brand: string
  condition: string
  category: string
  features: string[]
  specs: string[]
  descriptions: Array<{
    title: string
    content: string
  }>
}

export const mockProducts: Product[] = [
  {
    id: 1,
    image: "https://placehold.co/400x400?text=Samsung+Galaxy+S23",
    thumbnails: [
      "https://placehold.co/400x400?text=Galaxy+S23+Angle+1",
      "https://placehold.co/400x400?text=Galaxy+S23+Angle+2",
      "https://placehold.co/400x400?text=Galaxy+S23+Angle+3",
    ],
    badge: "LIMITED OFFER",
    title: "Samsung Galaxy S23 Ultra",
    rating: 4.8,
    reviews: 320,
    price: 1199.99,
    brand: "Samsung",
    condition: "New",
    category: "Phones",
    features: ["200MP Wide-angle Camera", "Snapdragon 8 Gen 2 Processor", "5000mAh Battery", "8K Video Recording"],
    specs: [
      "Display: 6.8-inch Dynamic AMOLED 2X",
      "Resolution: 3088 x 1440 pixels",
      "RAM: 12GB",
      "Storage: 256GB/512GB/1TB",
      "Front Camera: 12MP",
      "Rear Camera: 200MP + 12MP + 10MP + 10MP",
      "Battery: 5000mAh",
      "OS: Android 13, One UI 5.1",
    ],
    descriptions: [
      {
        title: "Revolutionary Camera System",
        content:
          "Capture stunning detail with the 200MP wide-angle camera. The Galaxy S23 Ultra gives you the freedom to take truly cinematic photos and videos with multiple cameras and pro-grade settings.",
      },
      {
        title: "S Pen Built In",
        content:
          "The built-in S Pen keeps the legacy of Note alive. Plus, it helps you ditch the dependency on notebooks, making sketches and jotting notes effortless and eco-friendly.",
      },
      {
        title: "Nightography",
        content:
          "Whether you're headed to a concert or just staying out late, you can capture epic content in any lighting. The camera's enhanced AI keeps details clear, so your low light photos and videos will be bright and colorful from dusk to dawn.",
      },
    ],
  },
  {
    id: 2,
    image: "https://placehold.co/400x400?text=iPhone+14+Pro",
    thumbnails: [
      "https://placehold.co/400x400?text=iPhone+14+Angle+1",
      "https://placehold.co/400x400?text=iPhone+14+Angle+2",
      "https://placehold.co/400x400?text=iPhone+14+Angle+3",
    ],
    badge: "BEST SELLER",
    title: "Apple iPhone 14 Pro Max",
    rating: 4.9,
    reviews: 450,
    price: 1299.99,
    brand: "Apple",
    condition: "New",
    category: "Phones",
    features: ["48MP Main Camera", "A16 Bionic Chip", "Dynamic Island", "Always-On Display"],
    specs: [
      "Display: 6.7-inch Super Retina XDR OLED",
      "Resolution: 2796 x 1290 pixels",
      "RAM: 6GB",
      "Storage: 128GB/256GB/512GB/1TB",
      "Front Camera: 12MP",
      "Rear Camera: 48MP + 12MP + 12MP",
      "Battery: 4323mAh",
      "OS: iOS 16",
    ],
    descriptions: [
      {
        title: "Dynamic Island",
        content:
          "Introducing Dynamic Island, a truly Apple innovation that's fluid, fun, and seamlessly integrates hardware and software. This interactive feature bubbles up alerts and Live Activities — so you don't miss them while you're doing something else.",
      },
      {
        title: "Pro Camera System",
        content:
          "For the first time ever, see incredible detail up close thanks to a quad-pixel sensor with 48MP Main camera. Up to 4x the resolution for jaw-dropping cropping. Cinematic mode now in 4K HDR at 24 fps — the film industry standard.",
      },
      {
        title: "All-Day Battery Life",
        content:
          "iPhone 14 Pro Max has the best battery life ever in an iPhone. So whether you're checking in on various social media platforms, streaming high-definition video, or gaming with console-level graphics, you'll experience longer-lasting battery life.",
      },
    ],
  },
  {
    id: 3,
    image: "https://placehold.co/400x400?text=Google+Pixel+7",
    thumbnails: [
      "https://placehold.co/400x400?text=Pixel+7+Angle+1",
      "https://placehold.co/400x400?text=Pixel+7+Angle+2",
      "https://placehold.co/400x400?text=Pixel+7+Angle+3",
    ],
    badge: "NEW ARRIVAL",
    title: "Google Pixel 7 Pro",
    rating: 4.7,
    reviews: 280,
    price: 899.99,
    brand: "Google",
    condition: "New",
    category: "Phones",
    features: ["Tensor G2 Chip", "50MP Triple Camera System", "24-Hour Battery Life", "Advanced Photo Editing"],
    specs: [
      "Display: 6.7-inch LTPO OLED",
      "Resolution: 3120 x 1440 pixels",
      "RAM: 12GB",
      "Storage: 128GB/256GB/512GB",
      "Front Camera: 10.8MP",
      "Rear Camera: 50MP + 12MP + 48MP",
      "Battery: 5000mAh",
      "OS: Android 13",
    ],
    descriptions: [
      {
        title: "Google Tensor G2",
        content:
          "Google Tensor G2 makes Pixel 7 Pro faster, more efficient, and more secure than previous Pixel phones. It also powers amazing camera features like Photo Unblur and Cinematic Blur.",
      },
      {
        title: "Pro-Level Camera",
        content:
          "The Pixel 7 Pro camera system includes upgraded ultrawide and telephoto lenses, plus Macro Focus. And with the advanced image processing of Tensor G2, photos and videos are stunning even in low light.",
      },
      {
        title: "Titan M2 Security",
        content:
          "The Titan M2 security chip helps protect your personal data, PINs, and passwords. And with Google's Protected Computing, your personal info is even more secure.",
      },
    ],
  },
  {
    id: 4,
    image: "https://placehold.co/400x400?text=OnePlus+11",
    thumbnails: [
      "https://placehold.co/400x400?text=OnePlus+11+Angle+1",
      "https://placehold.co/400x400?text=OnePlus+11+Angle+2",
      "https://placehold.co/400x400?text=OnePlus+11+Angle+3",
    ],
    badge: "SALE",
    title: "OnePlus 11 5G",
    rating: 4.6,
    reviews: 210,
    price: 799.99,
    brand: "OnePlus",
    condition: "New",
    category: "Phones",
    features: ["Snapdragon 8 Gen 2", "Hasselblad Camera", "100W SUPERVOOC Charging", "120Hz AMOLED Display"],
    specs: [
      "Display: 6.7-inch AMOLED LTPO 3.0",
      "Resolution: 3216 x 1440 pixels",
      "RAM: 8GB/16GB",
      "Storage: 128GB/256GB",
      "Front Camera: 16MP",
      "Rear Camera: 50MP + 48MP + 32MP",
      "Battery: 5000mAh",
      "OS: OxygenOS 13 based on Android 13",
    ],
    descriptions: [
      {
        title: "Hasselblad Camera for Mobile",
        content:
          "The OnePlus 11 5G features the 3rd Gen Hasselblad Camera for Mobile with a 50MP main sensor. Capture natural colors and amazing details in any lighting condition.",
      },
      {
        title: "100W SUPERVOOC Fast Charging",
        content:
          "The 5000mAh battery with 100W SUPERVOOC fast charging technology gives you a day's power in just 10 minutes, ensuring you're always ready to go.",
      },
      {
        title: "Snapdragon 8 Gen 2",
        content:
          "Experience elite gaming performance with the Snapdragon 8 Gen 2 Mobile Platform. Enjoy faster CPU and GPU speeds with improved power efficiency for all-day gaming.",
      },
    ],
  },
]

