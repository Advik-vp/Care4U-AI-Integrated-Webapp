# API Flow

## Overview
The system uses a RESTful API with Flask backend and React frontend.

## Key Endpoints
- /api/patients: Patient management
- /api/doctors: Doctor management
- /api/appointments: Appointment scheduling
- /api/ai: AI services (symptom checker, chatbot)
- /api/careplans: Care plan management

## Authentication
- JWT-based auth
- Roles: patient, doctor, admin

## Data Flow
1. Frontend sends requests to backend
2. Backend processes, calls AI services if needed
3. Responses formatted and sent back