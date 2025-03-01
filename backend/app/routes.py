from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import Schema, fields, validate, ValidationError
from datetime import datetime, timedelta
from . import db
from .models import User, Event

# Create blueprints
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
event_bp = Blueprint('events', __name__, url_prefix='/api/events')

# Schemas for validation and serialization
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=validate.Length(min=6))
    created_at = fields.DateTime(dump_only=True)

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=3, max=120))
    description = fields.Str(required=True)
    location = fields.Str(required=True)
    event_date = fields.DateTime(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    user_id = fields.Int(dump_only=True)
    category = fields.Str(validate=validate.Length(max=50))
    capacity = fields.Int()
    creator = fields.Nested(lambda: UserSchema(only=("id", "username")), dump_only=True)

# Initialize schemas
user_schema = UserSchema()
event_schema = EventSchema()
events_schema = EventSchema(many=True)

# Auth routes
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        user_data = user_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=user_data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    
    if User.query.filter_by(email=user_data['email']).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # Create new user
    new_user = User(
        username=user_data['username'],
        email=user_data['email']
    )
    new_user.set_password(user_data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    # Create access token
    access_token = create_access_token(identity=new_user.id)
    
    return jsonify({
        "message": "User registered successfully",
        "user": user_schema.dump(new_user),
        "access_token": access_token
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 401
    
    # Create access token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "message": "Login successful",
        "user": user_schema.dump(user),
        "access_token": access_token
    }), 200

# Event routes
@event_bp.route('', methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()
    
    try:
        event_data = event_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    # Create new event
    new_event = Event(
        title=event_data['title'],
        description=event_data['description'],
        location=event_data['location'],
        event_date=event_data['event_date'],
        user_id=current_user_id,
        category=event_data.get('category'),
        capacity=event_data.get('capacity')
    )
    
    db.session.add(new_event)
    db.session.commit()
    
    return jsonify({
        "message": "Event created successfully",
        "event": event_schema.dump(new_event)
    }), 201

@event_bp.route('', methods=['GET'])
def get_events():
    page = request.args.get('page', 1, type=int)
    per_page = 20  # Show 20 events per page as requested
    
    # Get events with pagination
    events = Event.query.order_by(Event.event_date.desc()).paginate(page=page, per_page=per_page)
    
    return jsonify({
        "events": events_schema.dump(events.items),
        "total": events.total,
        "pages": events.pages,
        "current_page": events.page
    }), 200

@event_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    
    return jsonify({
        "event": event_schema.dump(event)
    }), 200

@event_bp.route('/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    
    # Check if the current user is the creator of the event
    if event.user_id != current_user_id:
        return jsonify({"error": "Unauthorized to update this event"}), 403
    
    try:
        event_data = event_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    # Update event fields
    for key, value in event_data.items():
        setattr(event, key, value)
    
    db.session.commit()
    
    return jsonify({
        "message": "Event updated successfully",
        "event": event_schema.dump(event)
    }), 200

@event_bp.route('/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    
    # Check if the current user is the creator of the event
    if event.user_id != current_user_id:
        return jsonify({"error": "Unauthorized to delete this event"}), 403
    
    db.session.delete(event)
    db.session.commit()
    
    return jsonify({
        "message": "Event deleted successfully"
    }), 200 