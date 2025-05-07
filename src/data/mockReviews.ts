export interface ReviewData {
    title: string
    rating: number
    content: string
    author: string
    productId: string
  }
  
  export const mockReviews: ReviewData[] = [
    // Reviews for Samsung Galaxy S23 Ultra (id: 1)
    {
      title: "Best smartphone camera ever",
      rating: 5,
      content:
        "The 200MP camera on this phone is absolutely incredible. I've taken photos that look like they were shot with a professional DSLR. The S Pen is also super useful for taking notes and editing photos.",
      author: "Michael Chen",
      productId: 1,
    },
    {
      title: "Amazing display, battery could be better",
      rating: 4,
      content:
        "The display is stunning with vibrant colors and deep blacks. Performance is top-notch, but I was expecting better battery life from a flagship phone. Still, it easily lasts a full day of heavy use.",
      author: "Sarah Johnson",
      productId: 1,
    },
    {
      title: "S Pen is a game changer",
      rating: 5,
      content:
        "Coming from a Note user, the S Pen integration is seamless. The phone is blazing fast and the camera system is versatile for any shooting situation. Highly recommend!",
      author: "David Williams",
      productId: 1,
    },
  
    // Reviews for iPhone 14 Pro Max (id: 2)
    {
      title: "Dynamic Island is innovative",
      rating: 5,
      content:
        "The Dynamic Island is such a clever way to handle the notch. Camera quality is exceptional, especially in low light. iOS 16 feels very polished and the always-on display is well implemented.",
      author: "Emma Thompson",
      productId: 2,
    },
    {
      title: "Best iPhone yet",
      rating: 5,
      content:
        "The 48MP camera is a huge upgrade from previous iPhones. Battery life is impressive, easily lasting 1.5 days with moderate use. The build quality is premium as expected from Apple.",
      author: "James Wilson",
      productId: 2,
    },
    {
      title: "Great but expensive",
      rating: 4,
      content:
        "This is definitely the best smartphone I've ever used, but the price is hard to justify. The camera system and performance are outstanding, but I wish it had faster charging.",
      author: "Olivia Martinez",
      productId: 2,
    },
  
    // Reviews for Google Pixel 7 Pro (id: 3)
    {
      title: "Computational photography at its best",
      rating: 5,
      content:
        "The camera on the Pixel 7 Pro is simply amazing. Features like Magic Eraser and Photo Unblur are genuinely useful. Clean Android experience with timely updates is a big plus.",
      author: "Robert Garcia",
      productId: 3,
    },
    {
      title: "Great software, average hardware",
      rating: 4,
      content:
        "Google's software is what makes this phone shine. The camera processing is incredible, but the hardware feels a step behind Apple and Samsung in terms of build quality.",
      author: "Jennifer Lee",
      productId: 3,
    },
    {
      title: "Battery life could be better",
      rating: 4,
      content:
        "The Pixel 7 Pro is a great phone with an exceptional camera, but the battery life is just average. The clean Android experience and quick updates make up for it though.",
      author: "Thomas Brown",
      productId: 3,
    },
  
    // Reviews for OnePlus 11 5G (id: 4)
    {
      title: "Incredible value flagship",
      rating: 5,
      content:
        "The OnePlus 11 offers flagship performance at a more reasonable price. The Hasselblad camera tuning produces natural colors, and the 100W charging is incredibly fast.",
      author: "Sophia Rodriguez",
      productId: 4,
    },
    {
      title: "Fast and smooth",
      rating: 5,
      content:
        "OxygenOS is still one of the best Android skins out there. The 120Hz display is buttery smooth, and the performance is top-notch. Battery life is excellent too.",
      author: "Daniel Kim",
      productId: 4,
    },
    {
      title: "Missing wireless charging",
      rating: 4,
      content:
        "This phone has almost everything I want, but the lack of wireless charging is disappointing. Otherwise, it's a fantastic device with great performance and cameras.",
      author: "Ava Johnson",
      productId: 4,
    },
  ]
  
  