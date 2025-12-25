# Xandeum pNode Analytics Platform

Real-time analytics platform for Xandeum provider nodes.

## Features

- Real-time pNode monitoring
- Performance metrics and health scoring
- Network topology visualization
- Advanced filtering and search
- Data export (CSV/JSON)
- Mobile-responsive design

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Recharts
- Zustand

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your pRPC endpoint

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```
NEXT_PUBLIC_PRPC_ENDPOINT=<your-prpc-endpoint>
```

## Project Structure

```
/app                 # Next.js app router pages
/components          # React components
  /charts            # Chart components
  /tables            # Table components
  /layout            # Layout components
  /filters           # Filter components
/lib                 # Utility functions
  /api               # API client
  /hooks             # Custom React hooks
  /utils             # Helper functions
  /validators        # Zod schemas
/types               # TypeScript definitions
/constants           # Constants
```

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel --prod
```

## License

MIT
