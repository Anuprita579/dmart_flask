# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from utils.otp_utils import generate_otp, send_otp_email, verify_otp

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/send-otp", methods=["POST"])
def send_otp():
    try:
        data = request.get_json()
        email = data.get("email")
        if not email:
            return jsonify({"error": "Email required"}), 400
        
        otp = generate_otp(email)
        if send_otp_email(email, otp):
            return jsonify({"message": "OTP sent to email."}), 200
        else:
            return jsonify({"error": "Failed to send email. Check server logs."}), 500
    except Exception as e:
        print(f"Error in send_otp: {e}")
        return jsonify({"error": "Server error"}), 500

@auth_bp.route("/verify-otp", methods=["POST"])
def check_otp():
    data = request.get_json()
    email = data.get("email")
    otp = data.get("otp")

    if verify_otp(email, otp):
        return jsonify({"message": "OTP verified successfully."}), 200
    return jsonify({"error": "Invalid OTP"}), 400
