import os
from dotenv import load_dotenv
from together import Together

load_dotenv()

# Initialize Together AI client
client = Together(api_key=os.getenv("TOGETHER_API_KEY"))

SYSTEM_PROMPT = """You are a caring and empathetic AI health companion for elderly Singaporean patients 
managing chronic conditions like Type 2 Diabetes. 
Speak simply and warmly. Avoid medical jargon. 
If the patient seems unwell or mentions serious symptoms, advise them to contact their doctor.
Always reply in the same language the patient uses (English, Mandarin, or Malay).
Keep responses brief - 2-3 sentences maximum."""

# Store conversation history per patient
patient_sessions = {}

def get_or_create_session(patient_id: str):
    """Get or create conversation history for a patient"""
    if patient_id not in patient_sessions:
        patient_sessions[patient_id] = []
    return patient_sessions[patient_id]

def chat(patient_id: str, user_message: str) -> str:
    """
    Chat with the AI health companion using Together AI + Gemma
    
    Args:
        patient_id: Unique identifier for the patient
        user_message: The message from the patient
        
    Returns:
        AI response as a string
    """
    # Get conversation history
    history = get_or_create_session(patient_id)
    
    # Build messages for Together AI
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Add conversation history (last 6 messages = 3 exchanges)
    for msg in history[-6:]:
        messages.append(msg)
    
    # Add current user message
    messages.append({"role": "user", "content": user_message})
    
    try:
        print(f"🔍 Calling Together AI with Gemma...")
        
        # Call Together AI with Google Gemma
        response = client.chat.completions.create(
            model="google/gemma-3n-E4B-it",  # Free Gemma model
            messages=messages,
            max_tokens=150,
            temperature=0.7,
            top_p=0.9,
            stream=False
        )
        
        # Extract response
        assistant_message = response.choices[0].message.content.strip()
        
        print(f"✅ Response: {assistant_message[:100]}...")
        
        # Update conversation history
        history.append({"role": "user", "content": user_message})
        history.append({"role": "assistant", "content": assistant_message})
        
        # Keep only last 20 messages to avoid token limits
        if len(history) > 20:
            history = history[-20:]
            patient_sessions[patient_id] = history
        
        return assistant_message
        
    except Exception as e:
        print(f"❌ Error calling Together AI: {e}")
        return "I apologize, I'm having trouble responding right now. Please try again in a moment, or contact your healthcare provider if this is urgent."

def clear_session(patient_id: str):
    """Clear conversation history for a patient"""
    if patient_id in patient_sessions:
        del patient_sessions[patient_id]
