import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langdetect import detect

load_dotenv()

llm = ChatOpenAI(model="gpt-4o", api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = SystemMessage(content="""
You are a caring and empathetic AI health companion for elderly Singaporean patients 
managing chronic conditions like Type 2 Diabetes. 
Speak simply and warmly. Avoid medical jargon. 
If the patient seems unwell or mentions serious symptoms, advise them to contact their doctor.
Always reply in the same language the patient uses.
""")

patient_sessions = {}

def get_or_create_session(patient_id: str):
    if patient_id not in patient_sessions:
        patient_sessions[patient_id] = [SYSTEM_PROMPT]
    return patient_sessions[patient_id]

def chat(patient_id: str, user_message: str) -> str:
    history = get_or_create_session(patient_id)
    
    history.append(HumanMessage(content=user_message))
    
    response = llm.invoke(history)
    
    history.append(AIMessage(content=response.content))
    
    return response.content
