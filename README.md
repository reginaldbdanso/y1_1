# YannsTechHub - Daily Deals

A modern React application for YannsTechHub's daily deals section, built with TypeScript and styled-components.

## Features

- Responsive design that works on desktop and mobile devices
- Modern UI with smooth transitions and animations
- Product grid with sorting functionality
- Wishlist and cart functionality
- Clean and maintainable code structure

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yanns-tech-hub
```

2. Install dependencies:
```bash
npm install
```

3. Copy your images to the `public/imgs` directory:
- Logo.png
- Logo (1).png
- All product images (phone 1.png through phone 12.png)
- Social media icons (Facebook.png, Twitter.png, etc.)
- UI icons (Search - 7.png, Profile - 3.png, Buy - 6.png, etc.)

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   ├── ProductCard.tsx
  │   └── DailyDeals.tsx
  ├── data/              # Mock data and types
  │   └── mockProducts.ts
  ├── styles/            # Global styles
  ├── assets/           # Static assets
  ├── App.tsx           # Main App component
  └── index.tsx         # Entry point
```

## Technologies Used

- React
- TypeScript
- styled-components
- Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 