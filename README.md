"Autonomous AI agent using LangChain + Groq that independently manages clinic scheduling via multi-turn conversation and tool calling"


1st → MERN Project (Full stack engineering — most relevant for SDE)
2nd → MediAgent (AI agent — shows you're ahead of the curve)
3rd → Flask Project (Backend Python — supports both above)


================================================================
MEDIAGENT — PROJECT BRIEF (UPDATED WITH REACT)
Autonomous AI Appointment Scheduling Agent
Resume Project
================================================================

----------------------------------------------------------------
1. WHAT WE ARE BUILDING
----------------------------------------------------------------
MediAgent is an autonomous AI agent that manages clinic
appointment scheduling without any human involvement.

A patient types: "Book appointment with Dr. Sharma tomorrow 10am"
The agent understands it, checks available slots in the database,
books it, sends a confirmation email — all by itself.

This is NOT a chatbot. It actually performs actions using tools
(Python functions). That is what makes it an agent.

If a slot is NOT available — the agent automatically reads the
empty result from the database and replies with available
alternatives. No crash. No error. Fully conversational.

----------------------------------------------------------------
2. ONE LINE SUMMARY FOR RESUME
----------------------------------------------------------------
"Built an autonomous AI agent using LangChain + Groq (LLaMA 3)
that independently manages clinic appointments via multi-turn
conversation, tool-calling, and automated email confirmations
— reducing manual scheduling effort by ~80%."

----------------------------------------------------------------
3. TECH STACK
----------------------------------------------------------------
Layer              Tool & Purpose
---------------------------------------------------------
Frontend UI        React — chat interface (App.jsx)
API Layer          Flask — single /chat endpoint
Agent Framework    LangChain — decides which tool to call
LLM                Groq API (LLaMA 3) — understands messages
Agent Tools        Python functions — check, book, cancel
Database           SQLite — stores slots & appointments
Email              SendGrid — sends confirmation emails
Deployment         Render (backend) + Vercel (frontend)

----------------------------------------------------------------
5. HOW IT WORKS — STEP BY STEP
----------------------------------------------------------------
1. Patient types message in React chat UI
2. React sends POST request to Flask /chat endpoint
3. Flask passes message to LangChain agent
4. LangChain + LLaMA 3 understands the intent
5. Agent calls check_slots() — queries SQLite database
6. If slot available — calls book_appointment() — writes to DB
7. If slot NOT available — agent replies with available options
8. email_service.py sends confirmation email via resend
9. Flask returns agent reply to React
10. React displays the reply in the chat window

----------------------------------------------------------------
6. AGENT TOOLS (3 Python functions in tools.py)
----------------------------------------------------------------
check_slots(date, time, doctor_name)
  → queries SQLite, returns available or unavailable

book_appointment(patient_name, date, time, doctor_name, email)
  → writes appointment to DB, triggers confirmation email

cancel_appointment(appointment_id)
  → deletes appointment from DB

----------------------------------------------------------------
7. BUILD PLAN (ONE DAY — 3-4 hrs/day)
----------------------------------------------------------------
Morning   (2-3 hrs) → database.py + tools.py + seed.py
Afternoon (2-3 hrs) → agent.py + app.py (Flask API)
Evening   (2 hrs)   → React frontend (App.jsx, components)
Night     (1 hr)    → SendGrid email + testing + GitHub push

----------------------------------------------------------------
8. REQUIREMENTS.TXT
----------------------------------------------------------------
langchain
langchain-groq
langchain-community
flask
flask-cors
sendgrid
python-dotenv

----------------------------------------------------------------
9. WHAT TO TELL CLAUDE IN A NEW CHAT
----------------------------------------------------------------
Copy paste this at the start of every new chat:

"I am building MediAgent — an autonomous AI appointment
scheduling agent for healthcare clinics.

Tech stack:
- Backend: Python, Flask, LangChain, Groq API (LLaMA 3), SQLite, SendGrid
- Frontend: React (App.jsx, ChatWindow.jsx, InputBar.jsx)
- Flask has a single /chat endpoint that React calls

Agent has 3 tools: check_slots(), book_appointment(),
cancel_appointment()

If a slot is not available the agent suggests alternatives
from the database automatically.

I am a beginner to agentic AI but comfortable with Python
and React.

This is a resume project. Help me build:
[WRITE WHAT YOU NEED — e.g. database.py and tools.py
from scratch, step by step]"

----------------------------------------------------------------
10. RESUME BULLET POINTS (READY TO USE)
----------------------------------------------------------------
- Built autonomous AI agent using LangChain + Groq (LLaMA 3)
  that independently manages clinic scheduling via multi-turn
  conversation and tool-calling

- Implemented 3 agentic tools (check availability, book, cancel)
  backed by SQLite with fallback to suggest alternative slots
  when requested time is unavailable

- Integrated SendGrid for automated email confirmations,
  reducing manual scheduling effort by ~80%

- Built React chat UI connected to Flask REST API, deployed
  backend on Render and frontend on Vercel with live demo link

================================================================
END OF BRIEF
================================================================




For Groq — go to console.groq.com → sign up free → API Keys → Create key
For SendGrid — go to sendgrid.com → sign up free → Settings → API Keys → Create key. Also verify your sender email inside SendGrid or emails won't send.

User → React → Flask → Agent → Tools → DB/Email → STRING response → React
