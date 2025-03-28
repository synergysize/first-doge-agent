# First Doge Agent ($FDA) Official Website

A React-based website for the First Doge Agent, highlighting government grant savings and transparency through the $FDA token.

## Features

- Modern, sleek React application with Framer Motion animations
- Integration with the DOGE API for grant data
- Interactive data visualization and filtering
- Chatbot that answers user queries based on DOGE API data
- Mobile-responsive official-looking government design
- Subtle but clear references to $FDA tokenization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/first-doge-agent.git
cd first-doge-agent
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── assets/       # Images, icons, and other static assets
  ├── components/   # React components
  ├── hooks/        # Custom React hooks
  ├── utils/        # Utility functions
  ├── App.js        # Main application component
  ├── index.js      # Application entry point
  └── index.css     # Global styles
```

## Deployment Instructions

### Hosting on GitHub

1. Create a new repository on GitHub.

2. Initialize and push your local repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/first-doge-agent.git
git push -u origin main
```

### Deploying to Vercel

1. Sign up for a Vercel account at [vercel.com](https://vercel.com) if you don't have one.

2. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

3. Deploy directly from GitHub:

   a. Go to the [Vercel dashboard](https://vercel.com/dashboard)
   b. Click "Import Project" or "New Project"
   c. Select "Import Git Repository"
   d. Choose your GitHub repository (first-doge-agent)
   e. Configure project settings:
      - Framework Preset: React
      - Build Command: `npm run build`
      - Output Directory: `build`
   f. Click "Deploy"

4. Alternatively, deploy using Vercel CLI:
```bash
vercel login
vercel
```

5. Your site will be available at a Vercel URL (e.g., `first-doge-agent.vercel.app`). You can also configure a custom domain in the Vercel dashboard.

## Continuous Deployment

With Vercel and GitHub integration, any push to your main branch will automatically trigger a new deployment. This enables a smooth continuous deployment workflow.

## API Integration

The application connects to the DOGE API at `https://api.doge.gov/savings/grants` to fetch grant data. The API parameters include:

- `sort_by`: 'value'
- `sort_order`: 'desc'
- `page`: 1
- `per_page`: 10

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## License

This project is licensed under the MIT License - see the LICENSE file for details.