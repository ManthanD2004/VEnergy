from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime


# Load environment variables (optional now)
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

print("Username:", os.environ.get("MAIL_USER"))
print("Password Length:", len(os.environ.get("MAIL_PASSWORD")))

# Email Configuration - Hardcoded for now
app.config['MAIL_SERVER'] = os.environ.get("MAIL_SERVER")
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USER")  # Replace with your Gmail
app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD")  # Replace with your Gmail app password
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get("MAIL_USER")  # Replace with your Gmail

# Admin email for receiving notifications
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")  # Replace with your admin email


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)
db.init_app(app)
mail = Mail(app)


# Database Model - Fixed to match your frontend form
class Inquiry(db.Model):
    """Model for solar inquiries."""
    __tablename__ = 'inquiries'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    solar_type: Mapped[str] = mapped_column(String(50), nullable=False)
    electricity_bill: Mapped[str] = mapped_column(String(50), nullable=False)
    finance_interest: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class ContactSubmission(db.Model):
    """Model for contact form submissions."""
    __tablename__ = 'contact_submissions'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


def calculate(solar_type, unit_in_kw):
    price = 0
    units = 0
    space_req = 0
    savings = 0
    sys_size = 0
    if solar_type == 'Home':
        if not unit_in_kw <= 0:
            new_sys_size = sys_size + unit_in_kw
            new_price = (price+100000)+(45000*(unit_in_kw-1))
            new_units = units + (1440 * unit_in_kw)
            new_space_req = space_req + (40*unit_in_kw)
            new_savings = savings + (10080*unit_in_kw)
            if 1 <= unit_in_kw <= 2:
                new_subsidy = 30000
            else:
                new_subsidy = 78000
            return new_sys_size, new_price, new_units, new_space_req, new_savings, new_subsidy

    else:
        if not unit_in_kw <= 0:
            new_sys_size = sys_size + unit_in_kw
            new_price = (price + 110000) + (30000 * (unit_in_kw-1))
            new_units = units + (1440 * unit_in_kw)
            new_space_req = space_req + (40 * unit_in_kw)
            new_savings = savings + (10080 * unit_in_kw)
            new_subsidy = 0
            return new_sys_size, new_price, new_units, new_space_req, new_savings, new_subsidy


def send_notification_email(inquiry_id):
    """Send notification email to admin and confirmation email to user"""
    try:
        # Get inquiry from database using the ID
        inquiry = db.session.get(Inquiry, inquiry_id)
        if not inquiry:
            print(f"No inquiry found with ID: {inquiry_id}")
            return False

        # Admin notification
        admin_msg = Message(
            f'New Solar {inquiry.solar_type.title()} Inquiry from {inquiry.full_name}',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[ADMIN_EMAIL]
        )
        admin_msg.body = f"""
New solar inquiry received:

Customer Details:
- Name: {inquiry.full_name}
- Email: {inquiry.email}
- Phone: {inquiry.phone}
- Location: {inquiry.city}, {inquiry.state}

Solar Requirements:
- Type: {inquiry.solar_type.title()}
- Monthly Electricity Bill: {inquiry.electricity_bill}
- Interested in Finance: {inquiry.finance_interest.title()}

Inquiry Time: {inquiry.created_at}

Please follow up with the customer promptly.

Best regards,
Minsun Solar System
        """

        # User confirmation
        user_msg = Message(
            'Thank you for your solar inquiry - Minsun Solar',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[inquiry.email]
        )
        user_msg.body = f"""
Dear {inquiry.full_name},

Thank you for your interest in Minsun Solar's solar solutions!

We have received your inquiry for {inquiry.solar_type} solar installation in {inquiry.city}, {inquiry.state}.

Our team will review your requirements and contact you within 24 hours to discuss:
- Customized solar solution for your needs
- Cost estimates and savings projections
- Installation timeline
- {"Financing options" if inquiry.finance_interest.lower() == "yes" else "Payment options"}

If you have any immediate questions, feel free to contact us directly.

Best regards,
Minsun Solar Team
Phone: 7441100802
Email: minsunbpl@gmail.com
        """

        # Send both emails
        mail.send(admin_msg)
        mail.send(user_msg)
        print(f"Successfully sent emails for inquiry ID: {inquiry_id}")
        return True

    except Exception as e:
        print(f"Error sending email for inquiry ID {inquiry_id}: {e}")
        return False


def send_contact_notification_email(contact_id):
    """Send notification email to admin and confirmation email for contact form"""
    try:
        # Get contact submission from database using the ID
        contact = db.session.get(ContactSubmission, contact_id)
        if not contact:
            print(f"No contact submission found with ID: {contact_id}")
            return False

        # Admin notification
        admin_msg = Message(
            f'New Contact Form Submission from {contact.name}',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[ADMIN_EMAIL]
        )
        admin_msg.body = f"""
New contact form submission received:

Contact Details:
- Name: {contact.name}
- Email: {contact.email}
- Phone: {contact.phone}

Submission Time: {contact.created_at}

Please follow up with the customer promptly.

Best regards,
Minsun Solar System
        """

        # User confirmation
        user_msg = Message(
            'Thank you for contacting us - Minsun Solar',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[contact.email]
        )
        user_msg.body = f"""
Dear {contact.name},

Thank you for contacting Minsun Solar!

We have received your contact form submission and our team will get back to you within 24 hours.

If you have any immediate questions, feel free to contact us directly.

Best regards,
Minsun Solar Team
Phone: 7441100802
Email: minsunbpl@gmail.com

"""

        # Send both emails
        mail.send(admin_msg)
        mail.send(user_msg)
        print(f"Successfully sent emails for contact submission ID: {contact_id}")
        return True

    except Exception as e:
        print(f"Error sending email for contact submission ID {contact_id}: {e}")
        return False


@app.route('/api/submit-inquiry', methods=['POST'])
def submit_inquiry():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400

        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'state', 'city', 'solarType', 'electricityBill',
                           'financeInterest']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return jsonify({
                'success': False,
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        # Create new inquiry
        new_inquiry = Inquiry(
            full_name=data['fullName'],
            email=data['email'],
            phone=data['phone'],
            state=data['state'],
            city=data['city'],
            solar_type=data['solarType'],
            electricity_bill=data['electricityBill'],
            finance_interest=data['financeInterest']
        )

        # Save to database
        db.session.add(new_inquiry)
        db.session.commit()

        # Send emails using the saved inquiry ID
        email_sent = send_notification_email(new_inquiry.id)

        return jsonify({
            'success': True,
            'message': 'Inquiry submitted successfully! We will contact you soon.',
            'email_sent': email_sent,
            'inquiry_id': new_inquiry.id
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error in submit_inquiry: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while processing your inquiry. Please try again.'
        }), 500


@app.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    try:
        inquiries = db.session.query(Inquiry).order_by(Inquiry.created_at.desc()).all()

        inquiries_data = []
        for inquiry in inquiries:
            inquiries_data.append({
                'id': inquiry.id,
                'full_name': inquiry.full_name,
                'email': inquiry.email,
                'phone': inquiry.phone,
                'state': inquiry.state,
                'city': inquiry.city,
                'solar_type': inquiry.solar_type,
                'electricity_bill': inquiry.electricity_bill,
                'finance_interest': inquiry.finance_interest,
                'created_at': inquiry.created_at.isoformat()
            })

        return jsonify({
            'success': True,
            'inquiries': inquiries_data,
            'total': len(inquiries_data)
        }), 200

    except Exception as e:
        print(f"Error in get_inquiries: {e}")
        return jsonify({
            'success': False,
            'message': 'Error fetching inquiries'
        }), 500


@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400

        # Validate required fields
        required_fields = ['name', 'phone', 'email']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return jsonify({
                'success': False,
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        # Create new contact submission
        new_contact = ContactSubmission(
            name=data['name'],
            phone=data['phone'],
            email=data['email']
        )

        # Save to database
        db.session.add(new_contact)
        db.session.commit()

        # Send emails using the saved contact submission ID
        email_sent = send_contact_notification_email(new_contact.id)

        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully! We will get back to you soon.',
            'email_sent': email_sent,
            'contact_id': new_contact.id
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error in submit_contact: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while processing your contact form. Please try again.'
        }), 500


@app.route("/calculator", methods=['POST'])
def calculator():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400

        # Validate required fields
        required_fields = ['solar_type', 'units_in_kw']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return jsonify({
                'success': False,
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        solar_type = data['solar_type']
        units_in_kw = float(data['units_in_kw'])

        result = calculate(solar_type, units_in_kw)
        if not result:
            return jsonify({
                'success': False,
                'message': 'Invalid input or calculation failed.'
            }), 400

        system_size, price, units, space_req, savings, subsidy = result

        return jsonify({
            'success': True,
            'system_size': system_size,
            'price': price,
            'units': units,
            'space_required': space_req,
            'savings': savings,
            'subsidy': subsidy
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error in calculator: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while processing your calculation. Please try again.'
        }), 500


# Optional: Add this route to view contact submissions (similar to your inquiries route)
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = db.session.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).all()

        contacts_data = []
        for contact in contacts:
            contacts_data.append({
                'id': contact.id,
                'name': contact.name,
                'phone': contact.phone,
                'email': contact.email,
                'created_at': contact.created_at.isoformat()
            })

        return jsonify({
            'success': True,
            'contacts': contacts_data,
            'total': len(contacts_data)
        }), 200

    except Exception as e:
        print(f"Error in get_contacts: {e}")
        return jsonify({
            'success': False,
            'message': 'Error fetching contacts'
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'Backend is running',
        'timestamp': datetime.utcnow().isoformat()
    }), 200


# Create database tables
def init_db():
    with app.app_context():
        db.create_all()
        print("Database tables created successfully")


if __name__ == '__main__':
    init_db()
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=False, port=5000)
