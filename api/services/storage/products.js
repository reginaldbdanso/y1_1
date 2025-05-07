const mockProducts = [
  {
    id: 1,
    image: "/imgs/phone 1.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Samsung Galaxy S23 Ultra",
    rating: 4.8,
    reviews: 320,
    price: 1199.99,
    brand: "Samsung",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "200MP Wide-angle Camera",
      "Snapdragon 8 Gen 2 Processor",
      "5000mAh Battery",
      "8K Video Recording",
    ],
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
    image: "/imgs/phone 2.png",
    badge: "LIMITED OFFER",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    title: "Apple iPhone 14 Pro Max",
    rating: 4.9,
    reviews: 450,
    price: 1299.99,
    brand: "Apple",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "48MP Main Camera",
      "A16 Bionic Chip",
      "Dynamic Island",
      "Always-On Display",
    ],
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
    image: "/imgs/phone 3.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Google Pixel 7 Pro",
    rating: 4.7,
    reviews: 280,
    price: 899.99,
    brand: "Google",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "Tensor G2 Chip",
      "50MP Triple Camera System",
      "24-Hour Battery Life",
      "Advanced Photo Editing",
    ],
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
    image: "/imgs/phone 4.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "BEST SELLER",
    title: "OnePlus 11 5G",
    rating: 4.6,
    reviews: 210,
    price: 699.99,
    brand: "OnePlus",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "Snapdragon 8 Gen 2",
      "100W SUPERVOOC Charging",
      "50MP Triple Camera",
      "Hasselblad Camera",
    ],
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
        title: "Hasselblad Camera",
        content:
          "Experience the next generation of mobile photography with the OnePlus 11 5G's Hasselblad Camera. Natural colors and professional-grade image quality in every shot.",
      },
      {
        title: "100W SUPERVOOC Charging",
        content:
          "Never wait long for a full charge. The 100W SUPERVOOC charging technology takes your battery from 1-100% in just 25 minutes.",
      },
      {
        title: "Snapdragon 8 Gen 2",
        content:
          "Powered by the latest Snapdragon 8 Gen 2, experience up to 35% faster CPU performance and 25% faster GPU performance compared to the previous generation.",
      },
    ],
  },
  {
    id: 5,
    image: "/imgs/phone 5.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Xiaomi 13 Pro",
    rating: 4.5,
    reviews: 150,
    price: 749.99,
    brand: "Xiaomi",
    condition: "Second",
    stock: 10,
    category: "Phones",
    features: [
      "Leica Optics Camera",
      "Snapdragon 8 Gen 2",
      "120W HyperCharge",
      "IP68 Water Resistance",
    ],
    specs: [
      "Display: 6.73-inch AMOLED",
      "Resolution: 3200 x 1440 pixels",
      "RAM: 12GB",
      "Storage: 256GB/512GB",
      "Front Camera: 32MP",
      "Rear Camera: 50MP + 50MP + 50MP",
      "Battery: 4820mAh",
      "OS: MIUI 14 based on Android 13",
    ],
    descriptions: [
      {
        title: "Leica Professional Optical Lens",
        content:
          "The Xiaomi 13 Pro features a professional Leica optical lens system with a 50MP main camera, 50MP telephoto, and 50MP ultra-wide camera for stunning photography in any scenario.",
      },
      {
        title: "120W HyperCharge",
        content:
          "With 120W HyperCharge technology, the Xiaomi 13 Pro can be fully charged in just 19 minutes, ensuring you're always ready for whatever the day brings.",
      },
      {
        title: "Ceramic Body Design",
        content:
          "The premium ceramic body offers exceptional durability and a luxurious feel, while the IP68 rating ensures protection against water and dust in any environment.",
      },
    ],
  },
  {
    id: 6,
    image: "/imgs/phone 6.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Samsung Galaxy Z Flip 4",
    rating: 4.4,
    reviews: 190,
    price: 999.99,
    brand: "Samsung",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "Foldable Display",
      "FlexCam",
      "Snapdragon 8+ Gen 1",
      "IPX8 Water Resistance",
    ],
    specs: [
      "Main Display: 6.7-inch Dynamic AMOLED 2X",
      "Cover Display: 1.9-inch Super AMOLED",
      "Resolution: 2640 x 1080 pixels (main)",
      "RAM: 8GB",
      "Storage: 128GB/256GB/512GB",
      "Front Camera: 10MP",
      "Rear Camera: 12MP + 12MP",
      "Battery: 3700mAh",
      "OS: Android 12, One UI 4.1.1",
    ],
    descriptions: [
      {
        title: "Flex Mode",
        content:
          "Samsung Galaxy Z Flip4 stands on its own at the perfect angle for hands-free selfies. Set it down and strike a pose for the camera, then add effects on the go.",
      },
      {
        title: "Compact and Pocketable",
        content:
          "The compact, foldable design fits easily in your pocket or bag. When folded, it's roughly half the size of a traditional smartphone, making it ultra-portable.",
      },
      {
        title: "Customizable Cover Screen",
        content:
          "The 1.9-inch Cover Screen lets you do more without opening your phone. Take selfies, reply to texts, and access widgets—all from the Cover Screen.",
      },
    ],
  },
  {
    id: 7,
    image: "/imgs/phone 7.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Apple iPhone 13",
    rating: 4.7,
    reviews: 340,
    price: 799.99,
    brand: "Apple",
    condition: "Refurbished",
    stock: 10,
    category: "Phones",
    features: [
      "A15 Bionic Chip",
      "Dual Camera System",
      "Super Retina XDR Display",
      "Ceramic Shield",
    ],
    specs: [
      "Display: 6.1-inch Super Retina XDR OLED",
      "Resolution: 2532 x 1170 pixels",
      "RAM: 4GB",
      "Storage: 128GB/256GB/512GB",
      "Front Camera: 12MP",
      "Rear Camera: 12MP + 12MP",
      "Battery: 3240mAh",
      "OS: iOS 15, upgradable to iOS 16",
    ],
    descriptions: [
      {
        title: "A15 Bionic Chip",
        content:
          "The A15 Bionic chip powers incredible experiences in iPhone 13, with a 6-core CPU that crushes the competition. The 16-core Neural Engine is capable of 15.8 trillion operations per second, enabling Cinematic mode and more.",
      },
      {
        title: "Advanced Dual-Camera System",
        content:
          "The advanced dual-camera system with a new Wide camera gathers 47% more light for better photos and videos. Sensor-shift optical image stabilization keeps shots steady even when you're not.",
      },
      {
        title: "Super Retina XDR Display",
        content:
          "The Super Retina XDR display is 28% brighter, up to 800 nits, so it's easier to see in full sunlight. And it still delivers an amazing HDR experience with true blacks and over a billion colors.",
      },
    ],
  },
  {
    id: 8,
    image: "/imgs/phone 8.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Google Pixel 6a",
    rating: 4.3,
    reviews: 130,
    price: 449.99,
    brand: "Google",
    condition: "Second",
    stock: 10,
    category: "Phones",
    features: [
      "Google Tensor Chip",
      "12MP Dual Camera",
      "24-Hour Battery Life",
      "Titan M2 Security",
    ],
    specs: [
      "Display: 6.1-inch OLED",
      "Resolution: 2400 x 1080 pixels",
      "RAM: 6GB",
      "Storage: 128GB",
      "Front Camera: 8MP",
      "Rear Camera: 12.2MP + 12MP",
      "Battery: 4410mAh",
      "OS: Android 12, upgradable to Android 13",
    ],
    descriptions: [
      {
        title: "Google Tensor",
        content:
          "Google Tensor is the first chip designed by Google just for Pixel. It helps make Pixel 6a faster, more secure, and more efficient. Apps load quickly, and the interface feels smooth.",
      },
      {
        title: "Adaptive Battery",
        content:
          "Pixel's Adaptive Battery can last over 24 hours. Turn on Extreme Battery Saver, and the battery can last up to 72 hours. It learns your favorite apps and doesn't waste power on the ones you rarely use.",
      },
      {
        title: "Fast, Accurate Photos",
        content:
          "Take beautiful photos with Pixel's 12 megapixel camera and Google's expert image processing. Magic Eraser makes distractions disappear. And with Real Tone, everyone's skin tone is authentically represented.",
      },
    ],
  },
  {
    id: 9,
    image: "/imgs/phone 9.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Realme GT 3",
    rating: 4.2,
    reviews: 120,
    price: 599.99,
    brand: "Realme",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "240W SuperVOOC Charging",
      "Snapdragon 8+ Gen 1",
      "144Hz AMOLED Display",
      "Pulse Interface Design",
    ],
    specs: [
      "Display: 6.74-inch AMOLED",
      "Resolution: 2772 x 1240 pixels",
      "RAM: 8GB/12GB/16GB",
      "Storage: 128GB/256GB/512GB/1TB",
      "Front Camera: 16MP",
      "Rear Camera: 50MP + 8MP + 2MP",
      "Battery: 4600mAh",
      "OS: Realme UI 4.0 based on Android 13",
    ],
    descriptions: [
      {
        title: "World's Fastest Charging",
        content:
          "The Realme GT 3 features groundbreaking 240W SuperVOOC charging technology that can fully charge the phone in just 9 minutes and 30 seconds, setting a new industry standard.",
      },
      {
        title: "Pulse Interface Design",
        content:
          "The unique Pulse Interface around the camera module features customizable RGB lighting that can display different colors for notifications, charging status, and more.",
      },
      {
        title: "Flagship Performance",
        content:
          "Powered by the Snapdragon 8+ Gen 1 processor and up to 16GB of RAM, the Realme GT 3 delivers exceptional performance for gaming, multitasking, and demanding applications.",
      },
    ],
  },
  {
    id: 10,
    image: "/imgs/phone 10.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Nothing Phone (1)",
    rating: 4.1,
    reviews: 100,
    price: 499.99,
    brand: "Nothing",
    condition: "New",
    stock: 10,
    category: "Phones",
    features: [
      "Glyph Interface",
      "Snapdragon 778G+",
      "50MP Dual Camera",
      "Wireless Charging",
    ],
    specs: [
      "Display: 6.55-inch OLED",
      "Resolution: 2400 x 1080 pixels",
      "RAM: 8GB/12GB",
      "Storage: 128GB/256GB",
      "Front Camera: 16MP",
      "Rear Camera: 50MP + 50MP",
      "Battery: 4500mAh",
      "OS: Nothing OS based on Android 12",
    ],
    descriptions: [
      {
        title: "Glyph Interface",
        content:
          "The unique Glyph Interface on the back of the phone uses 900 LEDs to create distinctive lighting patterns for notifications, charging status, and more, offering a new way to communicate.",
      },
      {
        title: "Minimalist Design",
        content:
          "The Nothing Phone (1) features a transparent back that reveals selected components, creating a unique aesthetic that stands out from traditional smartphone designs.",
      },
      {
        title: "Nothing OS",
        content:
          "Nothing OS delivers a clean, distraction-free experience that's fast, smooth, and personal. The hardware and software speak the same visual language, with custom fonts, sounds, and graphical elements.",
      },
    ],
  },
  {
    id: 11,
    image: "/imgs/phone 11.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Samsung Galaxy A54",
    rating: 4.0,
    reviews: 220,
    price: 449.99,
    brand: "Samsung",
    condition: "Refurbished",
    stock: 10,
    category: "Phones",
    features: [
      "50MP OIS Camera",
      "Super AMOLED Display",
      "5000mAh Battery",
      "IP67 Water Resistance",
    ],
    specs: [
      "Display: 6.4-inch Super AMOLED",
      "Resolution: 2340 x 1080 pixels",
      "RAM: 6GB/8GB",
      "Storage: 128GB/256GB",
      "Front Camera: 32MP",
      "Rear Camera: 50MP + 12MP + 5MP",
      "Battery: 5000mAh",
      "OS: Android 13, One UI 5.1",
    ],
    descriptions: [
      {
        title: "Awesome Camera",
        content:
          "Capture stunning details with the 50MP main camera featuring Optical Image Stabilization. The advanced AI processing ensures your photos look great even in challenging lighting conditions.",
      },
      {
        title: "Smooth Display",
        content:
          "The 6.4-inch Super AMOLED display with 120Hz refresh rate delivers smooth scrolling and vibrant colors, making everything from gaming to browsing look incredible.",
      },
      {
        title: "Long-lasting Battery",
        content:
          "The 5000mAh battery keeps you going all day and into the night. When you need a boost, 25W Super Fast Charging gets you back to full power quickly.",
      },
    ],
  },
  {
    id: 12,
    image: "/imgs/phone 12.png",
    thumbnails: [
      "/imgs/phone1-thumb1.png",
      "/imgs/phone1-thumb2.png",
      "/imgs/phone1-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Motorola Edge 30 Ultra",
    rating: 4.3,
    reviews: 140,
    price: 699.99,
    brand: "Motorola",
    condition: "Second",
    stock: 10,
    category: "Phones",
    features: [
      "200MP Camera",
      "125W TurboPower Charging",
      "Snapdragon 8+ Gen 1",
      "144Hz pOLED Display",
    ],
    specs: [
      "Display: 6.67-inch pOLED",
      "Resolution: 2400 x 1080 pixels",
      "RAM: 8GB/12GB",
      "Storage: 128GB/256GB/512GB",
      "Front Camera: 60MP",
      "Rear Camera: 200MP + 50MP + 12MP",
      "Battery: 4610mAh",
      "OS: Android 12",
    ],
    descriptions: [
      {
        title: "Industry-Leading Camera",
        content:
          "The Motorola Edge 30 Ultra features the world's first 200MP camera sensor, capturing incredible detail in every shot. The advanced pixel-binning technology ensures excellent low-light performance.",
      },
      {
        title: "Blazing Fast Charging",
        content:
          "With 125W TurboPower charging, you can get a full day's power in just 7 minutes. The phone also supports 50W wireless charging and 10W reverse wireless charging for your accessories.",
      },
      {
        title: "Immersive Display",
        content:
          "The 6.67-inch pOLED display with 144Hz refresh rate delivers ultra-smooth scrolling and gaming. The HDR10+ support and 1B colors ensure vibrant, lifelike visuals for all your content.",
      },
    ],
  },
  //imgs/ Adding products for other categories
  {
    id: 13,
    image: "/imgs/Dell XPS 15.png",
    thumbnails: [
      "/imgs/laptop-thumb1.png",
      "/imgs/laptop-thumb2.png",
      "/imgs/laptop-thumb3.png",
    ],
    badge: "LIMITED OFFER ",
    title: "Dell XPS 15",
    rating: 4.7,
    reviews: 280,
    price: 1499.99,
    brand: "Dell",
    condition: "New",
    stock: 10,
    category: "Laptops",
    features: [
      "12th Gen Intel Core i7",
      "NVIDIA RTX 3050 Ti",
      '15.6" 4K OLED Display',
      "32GB DDR5 RAM",
    ],
    specs: [
      "Processor: Intel Core i7-12700H (14 cores, up to 4.7GHz)",
      "Graphics: NVIDIA GeForce RTX 3050 Ti, 4GB GDDR6",
      "RAM: 32GB DDR5 4800MHz",
      "Storage: 1TB PCIe NVMe SSD",
      'Display: 15.6" 4K UHD+ (3840 x 2400) OLED Touch',
      "Battery: 86Whr, up to 13 hours",
      "Ports: 2x Thunderbolt 4, 1x USB-C 3.2, SD card reader, headphone jack",
      "Weight: 4.22 lbs (1.92 kg)",
    ],
    descriptions: [
      {
        title: "Stunning 4K OLED Display",
        content:
          "The Dell XPS 15 features a breathtaking 4K OLED display with 100% DCI-P3 color coverage, perfect for creative professionals. The InfinityEdge design maximizes screen space in a compact form factor.",
      },
      {
        title: "Powerhouse Performance",
        content:
          "With the latest 12th Gen Intel Core i7 processor and NVIDIA RTX graphics, the XPS 15 handles demanding tasks like video editing, 3D rendering, and gaming with ease.",
      },
      {
        title: "Premium Build Quality",
        content:
          "Crafted from CNC machined aluminum and carbon fiber, the XPS 15 combines durability with lightweight design. The large precision touchpad and edge-to-edge keyboard provide a comfortable user experience.",
      },
    ],
  },
  {
    id: 14,
    image: "/imgs/Keyboard Cover.jpeg",
    thumbnails: [
      "/imgs/laptop-thumb1.png",
      "/imgs/laptop-thumb2.png",
      "/imgs/laptop-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: 'MacBook Pro 16"',
    rating: 4.8,
    reviews: 350,
    price: 2499.99,
    brand: "Apple",
    condition: "New",
    stock: 10,
    category: "Laptops",
    features: [
      "M2 Pro/Max Chip",
      '16" Liquid Retina XDR Display',
      "Up to 96GB Unified Memory",
      "Up to 22 Hours Battery Life",
    ],
    specs: [
      "Processor: Apple M2 Pro or M2 Max",
      "RAM: 16GB/32GB/64GB/96GB unified memory",
      "Storage: 512GB/1TB/2TB/4TB/8TB SSD",
      'Display: 16.2" Liquid Retina XDR (3456 x 2234)',
      "Graphics: Up to 38-core GPU",
      "Battery: Up to 22 hours",
      "Ports: 3x Thunderbolt 4, HDMI, SDXC card slot, headphone jack, MagSafe 3",
      "Weight: 4.7 lbs (2.15 kg)",
    ],
    descriptions: [
      {
        title: "Revolutionary Apple Silicon",
        content:
          "The M2 Pro and M2 Max chips deliver extraordinary performance with industry-leading power efficiency. Handle intensive tasks like 8K video editing, complex 3D rendering, and machine learning workloads with ease.",
      },
      {
        title: "Stunning Liquid Retina XDR Display",
        content:
          "The 16-inch Liquid Retina XDR display uses mini-LED technology to deliver extreme dynamic range with 1000 nits of sustained brightness and 1600 nits of peak brightness for HDR content.",
      },
      {
        title: "Pro Connectivity",
        content:
          "With Thunderbolt 4, HDMI, SDXC card slot, and MagSafe charging, the MacBook Pro offers versatile connectivity for all your professional needs. The 1080p FaceTime HD camera ensures you look your best in video calls.",
      },
      {
        title: "All-Day Battery Life",
        content:
          "The MacBook Pro delivers up to 22 hours of battery life, the longest ever in a Mac. Work unplugged all day and well into the night, no matter where you are.",
      },
    ],
  },
  {
    id: 15,
    image: "/imgs/Logitech MX Master 3.jpeg",
    thumbnails: [
      "/imgs/accessory-thumb1.png",
      "/imgs/accessory-thumb2.png",
      "/imgs/accessory-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Logitech MX Master 3",
    rating: 4.6,
    reviews: 420,
    price: 99.99,
    brand: "Logitech",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "Electromagnetic Scrolling",
      "8K DPI Precision Sensor",
      "App-Specific Customization",
      "Multi-Device Control",
    ],
    specs: [
      "Sensor: Darkfield high precision, 8000 DPI",
      "Buttons: 7 buttons (including gesture button)",
      "Scroll Wheel: MagSpeed electromagnetic scrolling",
      "Battery: Rechargeable Li-Po (500 mAh), up to 70 days on full charge",
      "Wireless: Bluetooth Low Energy and Logitech Unifying USB receiver",
      "Range: 10m wireless range",
      "Multi-device: Connect up to 3 devices",
      "Weight: 141g",
    ],
    descriptions: [
      {
        title: "MagSpeed Electromagnetic Scrolling",
        content:
          "The MX Master 3 features revolutionary MagSpeed electromagnetic scrolling that's precise enough to stop on a pixel and fast enough to scroll 1,000 lines in a second. It's also nearly silent.",
      },
      {
        title: "App-Specific Customizations",
        content:
          "Customize buttons and optimize your workflow with app-specific profiles for Adobe Photoshop, Adobe Premiere Pro, Final Cut Pro, Google Chrome, Microsoft Office, and more.",
      },
      {
        title: "Flow Cross-Computer Control",
        content:
          "Work seamlessly on multiple computers with Flow technology. Simply move your cursor to the edge of one screen and it appears on the other computer. You can even copy and paste text, images, and files between computers.",
      },
    ],
  },
  {
    id: 16,
    image: "/imgs/Samsung Curved Monitor.jpg",
    thumbnails: [
      "/imgs/monitor-thumb1.png",
      "/imgs/monitor-thumb2.png",
      "/imgs/monitor-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: 'Samsung 32" Curved',
    rating: 4.5,
    reviews: 180,
    price: 349.99,
    brand: "Samsung",
    condition: "New",
    stock: 10,
    category: "Monitors",
    features: [
      "1000R Curved Display",
      "QLED Technology",
      "144Hz Refresh Rate",
      "1ms Response Time",
    ],
    specs: [
      "Screen Size: 32 inches",
      "Resolution: 2560 x 1440 (WQHD)",
      "Panel Type: VA",
      "Refresh Rate: 144Hz",
      "Response Time: 1ms (MPRT)",
      "Curvature: 1000R",
      "Color Support: 125% sRGB, 95% DCI-P3",
      "Ports: 1x DisplayPort 1.2, 2x HDMI 2.0, USB Hub",
    ],
    descriptions: [
      {
        title: "Immersive 1000R Curved Screen",
        content:
          'The Samsung 32" Curved Monitor features an industry-leading 1000R curvature that matches the natural curve of the human eye, reducing eye strain and providing a more immersive viewing experience.',
      },
      {
        title: "QLED Technology",
        content:
          "Samsung's QLED technology delivers a billion shades of accurate color with 125% sRGB coverage. Quantum Dot technology ensures colors stay true and vibrant, even in bright scenes.",
      },
      {
        title: "Smooth Gaming Experience",
        content:
          "With a 144Hz refresh rate and 1ms response time, this monitor eliminates lag and motion blur for smooth gameplay. AMD FreeSync Premium technology prevents screen tearing for a seamless gaming experience.",
      },
    ],
  },
  {
    id: 17,
    image: "/imgs/TP-Link Archer AX6000.jpeg",
    thumbnails: [
      "/imgs/network-thumb1.png",
      "/imgs/network-thumb2.png",
      "/imgs/network-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "TP-Link Archer AX6000",
    rating: 4.3,
    reviews: 150,
    price: 299.99,
    brand: "TP-Link",
    condition: "New",
    stock: 10,
    category: "Network",
    features: [
      "Wi-Fi 6 Technology",
      "6000Mbps Total Speed",
      "8 Gigabit LAN Ports",
      "2.5G WAN Port",
    ],
    specs: [
      "Wi-Fi Standard: 802.11ax (Wi-Fi 6)",
      "Speed: 4804Mbps (5GHz) + 1148Mbps (2.4GHz)",
      "Processor: 1.8GHz Quad-Core CPU",
      "Memory: 1GB RAM",
      "Ports: 1x 2.5Gbps WAN, 8x Gigabit LAN, 1x USB 3.0, 1x USB-C 3.0",
      "Antennas: 8 high-performance external antennas",
      "Security: WPA3, HomeCare with Antivirus, Parental Controls",
      "Coverage: Up to 3,500 sq. ft.",
    ],
    descriptions: [
      {
        title: "Next-Gen Wi-Fi 6 Technology",
        content:
          "The Archer AX6000 leverages the latest Wi-Fi 6 technology to deliver faster speeds, greater capacity, and reduced network congestion. Connect more devices simultaneously without sacrificing performance.",
      },
      {
        title: "Ultra Connectivity",
        content:
          "With a 2.5Gbps WAN port and eight Gigabit LAN ports, this router provides exceptional wired connectivity options. The USB 3.0 and USB-C ports allow for high-speed data sharing across your network.",
      },
      {
        title: "Powerful Processing",
        content:
          "The 1.8GHz quad-core CPU and 1GB RAM ensure smooth performance even when the network is handling multiple demanding tasks simultaneously, from 4K streaming to online gaming.",
      },
      {
        title: "Comprehensive Security",
        content:
          "TP-Link HomeCare provides robust security with real-time antivirus protection, intrusion prevention, and advanced parental controls to keep your family safe online.",
      },
    ],
  },
  {
    id: 18,
    image: "/imgs/Cyberpunk 2077.jpg",
    thumbnails: [
      "/imgs/game-thumb1.png",
      "/imgs/game-thumb2.png",
      "/imgs/game-thumb3.png",
    ],
    badge: "LIMITED OFFER",
    title: "Cyberpunk 2077",
    rating: 4.0,
    reviews: 520,
    price: 59.99,
    brand: "CD Projekt",
    condition: "New",
    stock: 10,
    category: "PC Games",
    features: [
      "Open-World RPG",
      "Ray Tracing Support",
      "Character Customization",
      "Multiple Endings",
    ],
    specs: [
      "Genre: Open-World RPG",
      "Developer: CD Projekt RED",
      "Publisher: CD Projekt",
      "Release Date: December 10, 2020",
      "Platforms: PC, PlayStation, Xbox",
      "ESRB Rating: Mature 17+",
      "Languages: Full audio and text in 10+ languages",
      "Storage Required: 70GB available space",
    ],
    descriptions: [
      {
        title: "Immersive Open World",
        content:
          "Cyberpunk 2077 is set in Night City, a megalopolis obsessed with power, glamour, and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
      },
      {
        title: "Cutting-Edge Visuals",
        content:
          "Experience the most visually stunning open-world ever created. Ray tracing technology brings unprecedented realism to the neon-lit streets of Night City, with dynamic lighting and detailed reflections.",
      },
      {
        title: "Branching Storyline",
        content:
          "Your choices shape the story and the world around you. With multiple ways to approach each situation and numerous endings, every decision you make has consequences that affect your journey through Night City.",
      },
      {
        title: "Deep Character Customization",
        content:
          "Create your own cyberpunk with a customizable cyberware, skillset, and playstyle. Upgrade your character with different perks and augmentations as you level up to become the ultimate mercenary outlaw.",
      },
    ],
  },
  {
    id: 19,
    image: "/imgs/AirPods Max.png",
    thumbnails: [
      "/imgs/AirPods Max-thumb1.png",
      "/imgs/AirPods Max-thumb2.png",
      "/imgs/AirPods Max-thumb3.png",
    ],
    badge: "POPULAR",
    title: "AirPods Max",
    rating: 4.8,
    reviews: 320,
    price: 549.99,
    brand: "Apple",
    condition: "New",
    stock: 10,
    category: "Audio",
    features: [
      "High-Fidelity Audio",
      "Active Noise Cancellation",
      "Spatial Audio",
      "20-Hour Battery Life",
    ],
    specs: [
      "Drivers: 40mm dynamic drivers",
      "Connectivity: Bluetooth 5.0",
      "Battery Life: Up to 20 hours",
      "Weight: 384.8g",
      "Sensors: Optical, position, case-detect, gyroscope, accelerometer",
    ],
    descriptions: [
      {
        title: "Exceptional Sound Quality",
        content:
          "Custom-designed driver delivers rich, deep bass and crisp, clean high frequencies. The perfect balance for any type of music.",
      },
      {
        title: "Active Noise Cancellation",
        content:
          "Block out the world and focus on what you're listening to with advanced active noise cancellation technology.",
      },
    ],
  },
  {
    id: 20,
    image: "/imgs/Edifier Speakers.png",
    thumbnails: [
      "/imgs/Edifier Speakers-thumb1.png",
      "/imgs/Edifier Speakers-thumb2.png",
      "/imgs/Edifier Speakers-thumb3.png",
    ],
    badge: "BEST VALUE",
    title: "Edifier Speakers",
    rating: 4.7,
    reviews: 245,
    price: 129.99,
    brand: "Edifier",
    condition: "New",
    stock: 10,
    category: "Audio",
    features: [
      "Bookshelf Speakers",
      "Bluetooth Connectivity",
      "Wood Enclosure",
      "Remote Control",
    ],
    specs: [
      "Type: 2.0 Bookshelf Speakers",
      "Output Power: 42W RMS",
      "Frequency Response: 55Hz-20KHz",
      "Input: Bluetooth, RCA, Optical",
    ],
    descriptions: [
      {
        title: "Studio Quality Sound",
        content:
          "Experience rich, full sound with these compact bookshelf speakers. Perfect for desktop use or small room audio setups.",
      },
    ],
  },
  {
    id: 21,
    image: "/imgs/USB-C Charger.png",
    thumbnails: [
      "/imgs/USB-C Charger-thumb1.png",
      "/imgs/USB-C Charger-thumb2.png",
      "/imgs/USB-C Charger-thumb3.png",
    ],
    badge: "ESSENTIAL",
    title: "USB-C Charger",
    rating: 4.6,
    reviews: 189,
    price: 39.99,
    brand: "Samsung",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "Fast Charging",
      "25W Power Output",
      "Compact Design",
      "USB-C to C Cable Included",
    ],
    specs: [
      "Input: 100-240V, 50/60Hz",
      "Output: 5V/3A, 9V/2.77A, 15V/1.66A, PPS",
      "Technology: USB Power Delivery 3.0",
      "Cable Length: 1.5m",
    ],
    descriptions: [
      {
        title: "Super Fast Charging",
        content:
          "Power up your devices in minutes with this 25W fast charger. Compatible with a wide range of USB-C devices.",
      },
    ],
  },
  {
    id: 22,
    image: "/imgs/AirTag Cases.png",
    thumbnails: [
      "/imgs/AirTag Cases-thumb1.png",
      "/imgs/AirTag Cases-thumb2.png",
      "/imgs/AirTag Cases-thumb3.png",
    ],
    badge: "NEW ARRIVAL",
    title: "AirTag Cases",
    rating: 4.5,
    reviews: 120,
    price: 29.99,
    brand: "Apple",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "Protective Design",
      "Multiple Colors",
      "Keyring Attachment",
      "Silicone Material",
    ],
    specs: [
      "Material: Silicone",
      "Compatibility: Apple AirTag",
      "Colors: Blue, Gray, Pink",
      "Attachment: Metal keyring",
    ],
    descriptions: [
      {
        title: "Stylish Protection",
        content:
          "Keep your AirTag protected while adding a pop of color with these durable silicone cases. Available in multiple colors to match your style.",
      },
    ],
  },
  {
    id: 23,
    image: "/imgs/Huawei MateBook.png",
    thumbnails: [
      "/imgs/Huawei MateBook-thumb1.png",
      "/imgs/Huawei MateBook-thumb2.png",
      "/imgs/Huawei MateBook-thumb3.png",
    ],
    badge: "TOP RATED",
    title: "Huawei MateBook",
    rating: 4.6,
    reviews: 210,
    price: 999.99,
    brand: "Huawei",
    condition: "New",
    stock: 10,
    category: "Laptops",
    features: [
      "Ultra-thin Design",
      "11th Gen Intel Core",
      '13.3" 3K Display',
      "Long Battery Life",
    ],
    specs: [
      "Processor: 11th Gen Intel Core i7",
      "RAM: 16GB LPDDR4x",
      "Storage: 512GB NVMe SSD",
      'Display: 13.3" 3:2 3K (3000x2000) touchscreen',
      "Battery: 56Wh, up to 13 hours",
    ],
    descriptions: [
      {
        title: "Ultra-Portable Powerhouse",
        content:
          "The Huawei MateBook combines premium design with powerful performance in an ultra-thin package. Perfect for professionals on the go.",
      },
    ],
  },
  {
    id: 24,
    image: "/imgs/USB Condenser Microphone.png",
    thumbnails: [
      "/imgs/USB Microphone-thumb1.png",
      "/imgs/USB Microphone-thumb2.png",
      "/imgs/USB Microphone-thumb3.png",
    ],
    badge: "POPULAR",
    title: "USB Condenser Microphone",
    rating: 4.4,
    reviews: 175,
    price: 69.99,
    brand: "FIFINE",
    condition: "New",
    stock: 10,
    category: "Audio",
    features: [
      "Plug & Play USB",
      "Cardioid Pattern",
      "Gain Control",
      "Zero-Latency Monitoring",
    ],
    specs: [
      "Type: Condenser microphone",
      "Polar Pattern: Cardioid",
      "Sample Rate: 24bit/192kHz",
      "Frequency Response: 20Hz-20kHz",
      "Connection: USB",
    ],
    descriptions: [
      {
        title: "Studio-Quality Recording",
        content:
          "Capture professional-sounding audio for podcasts, streaming, voice-overs, and more with this easy-to-use USB condenser microphone.",
      },
    ],
  },
  {
    id: 25,
    image: "/imgs/Wooden PC Case.png",
    thumbnails: [
      "/imgs/Wooden PC Case-thumb1.png",
      "/imgs/Wooden PC Case-thumb2.png",
      "/imgs/Wooden PC Case-thumb3.png",
    ],
    badge: "EXCLUSIVE",
    title: "Wooden PC Case",
    rating: 4.7,
    reviews: 85,
    price: 299.99,
    brand: "Volta",
    condition: "New",
    stock: 10,
    category: "PC Components",
    features: [
      "Wooden Construction",
      "Minimalist Design",
      "USB-C Ports",
      "Quiet Cooling",
    ],
    specs: [
      "Material: Natural wood with aluminum accents",
      "Form Factor: Mini-ITX / Micro-ATX",
      "Front I/O: 2x USB 3.0, 1x USB-C, Audio in/out",
      "Dimensions: 350 x 250 x 100mm",
    ],
    descriptions: [
      {
        title: "Nature Meets Technology",
        content:
          "This unique wooden PC case combines natural materials with modern computer design for a stunning desktop centerpiece that stands out from typical metal and plastic cases.",
      },
    ],
  },
  {
    id: 26,
    image: "/imgs/Smart Watch.png",
    thumbnails: [
      "/imgs/Smart Watch-thumb1.png",
      "/imgs/Smart Watch-thumb2.png",
      "/imgs/Smart Watch-thumb3.png",
    ],
    badge: "NEW ARRIVAL",
    title: "Smart Watch",
    rating: 4.3,
    reviews: 150,
    price: 199.99,
    brand: "Amazfit",
    condition: "New",
    stock: 10,
    category: "Wearables",
    features: [
      "AMOLED Display",
      "Heart Rate Monitoring",
      "Sleep Tracking",
      "5 ATM Water Resistance",
    ],
    specs: [
      'Display: 1.65" AMOLED',
      "Battery: Up to 14 days",
      "Sensors: Heart rate, accelerometer, gyroscope",
      "Connectivity: Bluetooth 5.0, GPS",
      "Compatibility: Android, iOS",
    ],
    descriptions: [
      {
        title: "Your Health Companion",
        content:
          "Track your fitness goals, monitor your health metrics, and stay connected with notifications on your wrist with this feature-packed smart watch.",
      },
    ],
  },
  {
    id: 27,
    image: "/imgs/Power Cable.png",
    thumbnails: [
      "/imgs/Power Cable-thumb1.png",
      "/imgs/Power Cable-thumb2.png",
      "/imgs/Power Cable-thumb3.png",
    ],
    badge: "ESSENTIAL",
    title: "Power Cable",
    rating: 4.5,
    reviews: 120,
    price: 12.99,
    brand: "Anker",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "Universal AC Power",
      "6ft Length",
      "Heavy Duty",
      "Compatible with Most Devices",
    ],
    specs: [
      "Type: 3-prong AC power cable",
      "Length: 6 feet (1.8m)",
      "Rating: 10A, 125V",
      "Material: PVC insulation, copper conductors",
    ],
    descriptions: [
      {
        title: "Reliable Power Connection",
        content:
          "This standard 3-prong power cable works with most computers, monitors, printers, and other electronic devices that use the common IEC C13 connector.",
      },
    ],
  },
  {
    id: 28,
    image: "/imgs/USB-C Cable.png",
    thumbnails: [
      "/imgs/USB-C Cable-thumb1.png",
      "/imgs/USB-C Cable-thumb2.png",
      "/imgs/USB-C Cable-thumb3.png",
    ],
    badge: "BEST SELLER",
    title: "USB-C Cable",
    rating: 4.7,
    reviews: 230,
    price: 19.99,
    brand: "Satechi",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "USB-C to USB-C",
      "100W Power Delivery",
      "10Gbps Data Transfer",
      "Durable Design",
    ],
    specs: [
      "Type: USB-C to USB-C",
      "Length: 6 inches (15cm)",
      "Power: Up to 100W (20V/5A)",
      "Data Transfer: 10Gbps",
      "Material: Braided nylon",
    ],
    descriptions: [
      {
        title: "Compact & Powerful",
        content:
          "This short but mighty USB-C cable supports fast charging and high-speed data transfer in a compact form factor, perfect for travel or reducing desktop clutter.",
      },
    ],
  },
  {
    id: 29,
    image: "/imgs/USB Drive.png",
    thumbnails: [
      "/imgs/USB Drive-thumb1.png",
      "/imgs/USB Drive-thumb2.png",
      "/imgs/USB Drive-thumb3.png",
    ],
    badge: "LIMITED EDITION",
    title: "USB Drive",
    rating: 4.2,
    reviews: 95,
    price: 24.99,
    brand: "Spotify",
    condition: "New",
    stock: 10,
    category: "Storage",
    features: [
      "32GB Capacity",
      "USB 3.0 Speed",
      "Swivel Design",
      "Branded Finish",
    ],
    specs: [
      "Capacity: 32GB",
      "Interface: USB 3.0",
      "Read Speed: Up to 100MB/s",
      "Write Speed: Up to 30MB/s",
      "Dimensions: 21.3 x 12 x 4.6mm",
    ],
    descriptions: [
      {
        title: "Spotify Branded Storage",
        content:
          "This limited edition USB flash drive featuring Spotify branding combines style with functionality, offering quick data transfers in a compact, swivel-protected design.",
      },
    ],
  },
  {
    id: 30,
    image: "/imgs/Braided Cable.png",
    thumbnails: [
      "/imgs/Braided Cable-thumb1.png",
      "/imgs/Braided Cable-thumb2.png",
      "/imgs/Braided Cable-thumb3.png",
    ],
    badge: "PREMIUM",
    title: "Braided Cable",
    rating: 4.9,
    reviews: 320,
    price: 34.99,
    brand: "Nomad",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "USB to Lightning",
      "MFi Certified",
      "Kevlar Reinforced",
      "Cable Management Strap",
    ],
    specs: [
      "Type: USB-A to Lightning",
      "Length: 1.5m (5ft)",
      "Material: Braided ballistic nylon",
      "Strength: Kevlar core reinforcement",
      "Compatibility: All Lightning devices",
    ],
    descriptions: [
      {
        title: "Built to Last",
        content:
          "This premium braided cable with Kevlar reinforcement is designed to withstand heavy daily use without fraying or breaking. The integrated cable management strap keeps things tidy when not in use.",
      },
    ],
  },
  {
    id: 31,
    image: "/imgs/Travel Case.png",
    thumbnails: [
      "/imgs/Travel Case-thumb1.png",
      "/imgs/Travel Case-thumb2.png",
      "/imgs/Travel Case-thumb3.png",
    ],
    badge: "TRAVEL ESSENTIAL",
    title: "Travel Case",
    rating: 4.8,
    reviews: 175,
    price: 29.99,
    brand: "BAGSMART",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "Electronics Organizer",
      "Water-Resistant",
      "Multiple Compartments",
      "Compact Design",
    ],
    specs: [
      "Material: Carbon fiber PU leather exterior",
      "Dimensions: 9.4 x 6.3 x 1.2 inches",
      "Weight: 8.5oz",
      "Compartments: Multiple elastic loops, mesh pockets, and pouches",
    ],
    descriptions: [
      {
        title: "Stay Organized On The Go",
        content:
          "Keep your cables, chargers, earbuds, and small electronics neatly organized in this compact travel case. The water-resistant exterior protects your gadgets while the multiple compartments ensure everything has its place.",
      },
    ],
  },
  {
    id: 32,
    image: "/imgs/S7 Headphone.png",
    thumbnails: [
      "/imgs/Headphones-thumb1.png",
      "/imgs/Headphones-thumb2.png",
      "/imgs/Headphones-thumb3.png",
    ],
    badge: "PREMIUM AUDIO",
    title: "S7 Headphones",
    rating: 4.6,
    reviews: 210,
    price: 349.99,
    brand: "Sennheiser",
    condition: "New",
    stock: 10,
    category: "Audio",
    features: [
      "High-Resolution Audio",
      "Active Noise Cancellation",
      "Comfortable Design",
      "Bluetooth 5.2",
    ],
    specs: [
      "Type: Over-ear, closed-back",
      "Drivers: 40mm dynamic drivers",
      "Frequency Response: 6Hz-22kHz",
      "Battery Life: Up to 30 hours",
      "Connectivity: Bluetooth 5.2, 3.5mm wired",
    ],
    descriptions: [
      {
        title: "Audiophile-Grade Sound",
        content:
          "Experience exceptional sound quality with these premium headphones featuring custom-tuned drivers and advanced acoustic engineering for clear, detailed audio reproduction across all frequencies.",
      },
    ],
  },
  {
    id: 33,
    image: "/imgs/USB Hub.png",
    thumbnails: [
      "/imgs/USB Hub-thumb1.png",
      "/imgs/USB Hub-thumb2.png",
      "/imgs/USB Hub-thumb3.png",
    ],
    badge: "VERSATILE",
    title: "USB Hub",
    rating: 4.5,
    reviews: 180,
    price: 79.99,
    brand: "Anker",
    condition: "New",
    stock: 10,
    category: "Accessories",
    features: [
      "7-in-1 Hub",
      "4K HDMI Output",
      "100W Power Delivery",
      "SD Card Reader",
    ],
    specs: [
      "Ports: USB-C PD, HDMI, 2x USB-A 3.0, SD card reader, microSD card reader",
      "Video Output: 4K@60Hz",
      "Power Delivery: Up to 100W pass-through",
      "Data Transfer: Up to 5Gbps",
      "Dimensions: 115 x 28 x 9mm",
    ],
    descriptions: [
      {
        title: "All-in-One Connectivity",
        content:
          "Expand your laptop's capabilities with this sleek 7-in-1 USB-C hub. Connect to displays, transfer data, read memory cards, and charge your device—all through a single USB-C connection.",
      },
    ],
  },
  {
    id: 34,
    image: "/imgs/Smart Watch Call.png",
    thumbnails: [
      "/imgs/Smart Watch Call-thumb1.png",
      "/imgs/Smart Watch Call-thumb2.png",
      "/imgs/Smart Watch Call-thumb3.png",
    ],
    badge: "FAMILY FRIENDLY",
    title: "Smart Watch Call",
    rating: 4.4,
    reviews: 135,
    price: 159.99,
    brand: "Xplora",
    condition: "New",
    stock: 10,
    category: "Wearables",
    features: ["4G Calling", "GPS Tracking", "SOS Button", "Water Resistant"],
    specs: [
      'Display: 1.4" touchscreen',
      "Connectivity: 4G LTE, WiFi, Bluetooth",
      "Battery: Up to 3 days standby",
      "Camera: 2MP front-facing",
      "Water Resistance: IP67",
      "Compatibility: iOS, Android (via app)",
    ],
    descriptions: [
      {
        title: "Stay Connected with Family",
        content:
          "This smart watch with calling features enables children to stay connected with parents while providing location tracking, SOS alerts, and safe communication features for peace of mind.",
      },
    ],
  },

  {
    id: 35,
    image: "/imgs/leather-handbag.jpeg",
    thumbnails: [
      "/imgs/leather-handbag-thumb1.png",
      "/imgs/leather-handbag-thumb2.png",
      "/imgs/leather-handbag-thumb3.png",
    ],
    badge: "NEW ARRIVAL",
    title: "Luxury Leather Handbag",
    rating: 4.8,
    reviews: 120,
    price: 149.99,
    brand: "Elegance Paris",
    condition: "New",
    stock: 10,
    category: "Fashion",
    features: [
      "Genuine Leather Material",
      "Handcrafted Design",
      "Adjustable Shoulder Strap",
      "Gold-Tone Hardware",
    ],
    specs: [
      "Material: 100% Genuine Leather",
      "Dimensions: 12” x 8” x 5”",
      "Strap Length: Adjustable up to 45 inches",
      "Lining: Premium Satin Fabric",
      "Closure: Magnetic Snap & Zipper",
    ],
    descriptions: [
      {
        title: "Timeless Elegance",
        content:
          "Crafted from premium genuine leather, this luxurious handbag embodies sophistication and style. With a spacious interior and gold-tone hardware, it's the perfect companion for any occasion.",
      },
    ],
  },
  {
    id: 36,
    image: "/imgs/organic-fertilizer.jpeg",
    thumbnails: [
      "/imgs/organic-fertilizer-thumb1.png",
      "/imgs/organic-fertilizer-thumb2.png",
      "/imgs/organic-fertilizer-thumb3.png",
    ],
    badge: "BEST SELLER",
    title: "Organic Fertilizer",
    rating: 4.7,
    reviews: 85,
    price: 29.99,
    brand: "GreenHarvest",
    condition: "New",
    stock: 10,
    category: "Agriculture",
    features: [
      "100% Organic & Eco-Friendly",
      "Enhances Soil Fertility",
      "Rich in Essential Nutrients",
      "Suitable for All Crops",
    ],
    specs: [
      "Type: Organic Compost",
      "Weight: 10kg Bag",
      "Nutrient Ratio: NPK 5-3-2",
      "Application: Vegetables, Fruits, Flowers, Grains",
      "Storage: Keep in a Cool, Dry Place",
    ],
    descriptions: [
      {
        title: "Boost Your Harvest Naturally",
        content:
          "GreenHarvest Organic Fertilizer is a premium soil enhancer designed to improve plant health and increase yield. Made from all-natural ingredients, it ensures sustainable farming and rich, fertile soil.",
      },
    ],
  },
];
