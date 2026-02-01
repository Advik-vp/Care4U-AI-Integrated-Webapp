#!/usr/bin/env python
"""Check all mail config"""

import os
from dotenv import load_dotenv

load_dotenv()

print("Environment variables:")
print(f"MAIL_SERVER: {os.getenv('MAIL_SERVER')}")
print(f"MAIL_PORT: {os.getenv('MAIL_PORT')}")
print(f"MAIL_USE_TLS: {os.getenv('MAIL_USE_TLS')}")
print(f"MAIL_USERNAME: {os.getenv('MAIL_USERNAME')}")
print(f"MAIL_DEBUG: {os.getenv('MAIL_DEBUG')}")

print("\nConfig class:")
from config import Config

print(f"MAIL_SERVER: {Config.MAIL_SERVER}")
print(f"MAIL_PORT: {Config.MAIL_PORT}")
print(f"MAIL_USE_TLS: {Config.MAIL_USE_TLS}")
print(f"MAIL_USERNAME: {Config.MAIL_USERNAME}")
print(f"MAIL_DEBUG: {Config.MAIL_DEBUG}")
