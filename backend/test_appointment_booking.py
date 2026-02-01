#!/usr/bin/env python
"""Test appointment booking with email notification"""

import json
import requests
from time import sleep

# First register and login as a patient
print("🔄 Testing appointment booking with email notifications...\n")

# Register patient
patient_data = {
    "username": f"testpatient_{int(sleep(0))}", 
    "email": "advikvivan72@gmail.com",
    "password": "Test@1234",
    "full_name": "Test Patient",
    "role": "patient"
}

print(f"1️⃣ Registering patient...")
response = requests.post("http://localhost:5000/api/auth/register", json=patient_data)
print(f"Response: {response.status_code}")

# Register doctor
doctor_data = {
    "username": f"testdoctor_{int(sleep(0))}", 
    "email": "doc@example.com",
    "password": "Test@1234",
    "full_name": "Dr. Test Doctor",
    "specialization": "General",
    "role": "doctor"
}

print(f"2️⃣ Registering doctor...")
response = requests.post("http://localhost:5000/api/auth/register", json=doctor_data)
print(f"Response: {response.status_code}")
doctor_data_response = response.json()
print(f"Doctor registered with ID: {doctor_data_response.get('user_id')}\n")

# Login as patient
print(f"3️⃣ Logging in as patient...")
login_data = {"username": patient_data["username"], "password": patient_data["password"]}
response = requests.post("http://localhost:5000/api/auth/login", json=login_data)
print(f"Response: {response.status_code}")
token = response.json().get('token')
print(f"Token: {token[:20]}...\n")

# Book appointment
print(f"4️⃣ Booking appointment...")
headers = {"Authorization": f"Bearer {token}"}
appointment_data = {
    "doctor_id": doctor_data_response.get('user_id'),
    "date": "2026-02-15",
    "time": "10:00 AM",
    "symptoms": "Headache, fever"
}

response = requests.post("http://localhost:5000/api/patient/appointments", json=appointment_data, headers=headers)
print(f"Response: {response.status_code}")
print(f"Response: {response.json()}\n")

if response.status_code == 200:
    print("✅ Appointment booked successfully!")
    print("📧 Check your email for confirmation (advikvivan72@gmail.com)")
else:
    print(f"❌ Error: {response.json()}")
