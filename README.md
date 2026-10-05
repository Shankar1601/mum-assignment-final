MUM Digital Agency - Full Stack Clone

A modern, responsive, and SEO-optimized full-stack web application replicating the homepage of MUM Digital Agency. This project includes a pixel-perfect frontend replication, a functional contact form, and a secure backend admin dashboard for complete CRUD operations.

🔗 Live Project Links

Frontend Application: https://mum-assignment-final.vercel.app/

Admin Dashboard: https://mum-assignment-final.vercel.app/admin

Backend API (Render): https://mum-assignment-final.onrender.com

GitHub Repository: https://github.com/Shankar1601/mum-assignment-final.git

🛠️ Technology Stack & Technical Decisions

Frontend (Vercel)

React.js & Vite: Chosen for blazing-fast local development and optimized production builds.

Vanilla CSS (Mobile-First): Implemented a custom, responsive design system without heavy frameworks to maintain strict control over the exact layout, typography, and animations matching the reference site.

Lenis: Integrated for buttery-smooth scrolling physics, crucial for matching the premium feel of the original agency website.

Lucide React: Used for lightweight, scalable SVG icons.

Backend (Render)

Node.js & Express.js: A lightweight, robust framework for building the REST API to handle form submissions and admin CRUD operations.

CORS Security: Configured to strictly accept requests only from the deployed Vercel frontend URL.

Database (Neon DB / PostgreSQL)

PostgreSQL: A powerful relational database perfect for structured form data. Hosted via Neon DB for seamless serverless scaling and connection pooling.

⚙️ How It Works

User Interaction: Users visit the frontend (Vercel) and interact with the responsive UI.

Form Submission: When a user submits the contact form, the React frontend performs initial validation, then sends a POST request to the Express API (Render).

Data Storage: The Node/Express backend validates the payload and securely inserts the record into the PostgreSQL database (Neon).

Admin Management: Navigating to the /admin route loads the dashboard. The frontend queries the backend API to fetch all submissions, allowing the user to View, Edit, or Delete records (Full CRUD) directly from the database.