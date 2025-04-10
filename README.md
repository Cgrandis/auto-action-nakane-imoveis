
# REAL-ESTATE-AUTOMATION

This project is a real estate automation application aimed at improving customer interaction and management for a real estate agency. It integrates various technologies including Next.js, Prisma, WhatsApp Web API, and custom AI models for efficient and seamless communication with customers.

## Features

- **WhatsApp Integration**: The application uses WhatsApp Web API (via `whatsapp-web.js`) to connect with customers and provide real-time responses via a conversational AI model (Gemma + Mistral).
- **Real Estate Agent Management**: Allows adding, deleting, and updating real estate agents (corretores), which can be chosen by customers for property viewings.
- **Company Information**: Stores and manages company information (e.g., name, address, Instagram).
- **Contact Management**: Saves contacts from WhatsApp, allowing filtering and managing them from the frontend.
- **User Interaction**: The system can automatically handle customer inquiries, schedule visits, and provide property details.

## Technologies Used

- **Next.js**: Framework for building the frontend of the application.
- **Prisma**: Database ORM to interact with PostgreSQL, storing company data, agents, contacts, etc.
- **WhatsApp Web API** (`whatsapp-web.js`): Integration for sending and receiving WhatsApp messages.
- **Custom AI**: Integration with Ollama + Mistral for intelligent responses.
- **PostgreSQL**: Database for storing company and agent information, and contact details.

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/real-estate-automation.git
cd real-estate-automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Ensure you have a PostgreSQL instance running. Then, configure the database connection in the `.env` file.

```env
DATABASE_URL=postgresql://user:password@localhost:5432/real_estate_automation_db
```

Run the migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```

### 4. Running the Application

- **Backend**: Run the WhatsApp integration service and the AI model interaction.

```bash
npm run wa
```

- **Frontend**: Start the Next.js application.

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Application Flow

1. **WhatsApp Integration**: When a customer contacts the real estate agency via WhatsApp, the system responds based on predefined scripts and available properties. 
2. **Adding and Managing Agents**: The `Cadastro Corretor` allows the agency to manage real estate agents (corretores), and the customer can choose their preferred agent for property viewings.
3. **Company Info**: The `Cadastro Empresa` stores and displays the real estate agency’s information such as name, address, and Instagram.
4. **Contact Management**: The `ContatoList` component allows filtering contacts based on location (Brazilian or international numbers) and area codes (DDD).

## Features to be Improved

- **Memory of AI**: The AI model's memory can be extended to recall more contextual data during a conversation.
- **User Experience Enhancements**: There will be further work on improving the UI/UX for the filters and contact management.
- **Contact Data Enrichment**: Add extra fields such as email for better data tracking.

## Contributions

Feel free to fork the repository, contribute, and submit pull requests for improvements!

---

Thank you for using **REAL-ESTATE-AUTOMATION**.