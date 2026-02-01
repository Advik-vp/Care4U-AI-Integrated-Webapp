import requests
import json
import time

BASE_URL = "http://localhost:5000/api"

print("=" * 60)
print("TESTING APPOINTMENT BOOKING WITH EMAIL NOTIFICATIONS")
print("=" * 60)

# 1. Register a doctor
print("\n1️⃣ Registering Doctor...")
doctor_data = {
    "username": "dr_email_test",
    "email": "doctor_email_test@gmail.com",
    "password": "Test@1234",
    "full_name": "Dr. Email Test",
    "specialization": "General",
    "role": "doctor"
}

try:
    resp = requests.post(f"{BASE_URL}/auth/register", json=doctor_data, timeout=5)
    print(f"Status: {resp.status_code}")
    doctor_response = resp.json()
    doctor_id = doctor_response.get('user_id')
    print(f"✅ Doctor registered with ID: {doctor_id}")
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

# 2. Register a patient
print("\n2️⃣ Registering Patient...")
patient_data = {
    "username": "patient_email_test",
    "email": "advikvivan72@gmail.com",  # Using your email
    "password": "Test@1234",
    "full_name": "Patient Email Test",
    "role": "patient"
}

try:
    resp = requests.post(f"{BASE_URL}/auth/register", json=patient_data, timeout=5)
    print(f"Status: {resp.status_code}")
    patient_response = resp.json()
    patient_id = patient_response.get('user_id')
    print(f"✅ Patient registered with ID: {patient_id}")
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

# 3. Login as patient
print("\n3️⃣ Logging in as Patient...")
login_data = {
    "username": "patient_email_test",
    "password": "Test@1234"
}

try:
    resp = requests.post(f"{BASE_URL}/auth/login", json=login_data, timeout=5)
    print(f"Status: {resp.status_code}")
    login_response = resp.json()
    token = login_response.get('token')
    print(f"✅ Token obtained: {token[:30]}...")
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

# 4. Book an appointment
print("\n4️⃣ Booking Appointment...")
appointment_data = {
    "doctor_id": doctor_id,
    "date": "2026-02-20",
    "time": "02:30 PM",
    "symptoms": "Fever and headache"
}

headers = {"Authorization": f"Bearer {token}"}

try:
    resp = requests.post(f"{BASE_URL}/patient/appointments", json=appointment_data, headers=headers, timeout=10)
    print(f"Status: {resp.status_code}")
    appointment_response = resp.json()
    print(f"Response: {json.dumps(appointment_response, indent=2)}")
    
    if resp.status_code == 200:
        print("\n✅ APPOINTMENT BOOKED SUCCESSFULLY!")
        print("📧 Check the following emails for notifications:")
        print(f"   - Patient email: {patient_data['email']}")
        print(f"   - Doctor email: doctor_email_test@gmail.com (not real, just test)")
    else:
        print(f"\n❌ Failed to book appointment")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
