# TMDB Movie App

A modern movie browsing application built with Next.js, TypeScript, and TailwindCSS. Browse movies, search for your favorites, and get detailed information about each movie.

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- TMDB API
- Jest & Testing Library

### Setup

1. Clone the repository:
```bash
git clone https://github.com/affanmirza/tmdb-app.git
cd tmdb-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Get your TMDB API credentials:
     1. Go to [TMDB](https://www.themoviedb.org/)
     2. Create an account or sign in
     3. Go to your profile settings
     4. Click on "API" in the left sidebar
     5. Click "Create" or "Request an API key"
     6. Choose "Developer" option
     7. Fill in the required information
     8. Once approved, you'll get your API key
     9. For the access token:
        - Go to [TMDB API Settings](https://www.themoviedb.org/settings/api)
        - Click "Create" under "Request Token"
        - Follow the steps to create your access token
   - Update `.env.local` with your credentials:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token_here
   ```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```
