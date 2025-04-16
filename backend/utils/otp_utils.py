import smtplib
import random
from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

print(f"Email address loaded: {EMAIL_ADDRESS}")
print(f"Email password loaded: {'*****' if EMAIL_PASSWORD else 'Not loaded'}")

# Store OTPs temporarily
otp_store = {}

def generate_otp(email):
    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp
    return otp

def send_otp_email(recipient_email, otp):
    msg = EmailMessage()
    msg['Subject'] = "Your WebX_Dmart OTP"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = recipient_email
    msg.set_content(f"Your OTP is: {otp}")
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.set_debuglevel(1) 
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            print("Login successful!")
            return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def verify_otp(email, otp):
    return otp_store.get(email) == otp