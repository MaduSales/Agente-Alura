import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# Carrega as variáveis do .env
load_dotenv()

# Busca o valor da chave API
api_key = os.getenv("GOOGLE_API_KEY")

def get_agent_chain():
    # Carrega os embeddings e o índice FAISS gerado anteriormente
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=api_key
    )
    
    if not os.path.exists("faiss_index"):
        raise FileNotFoundError("Índice FAISS não encontrado! Execute 'python ingest.py' primeiro.")
        
    vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    
    # Configura o modelo LLM do Gemini
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.2,
        google_api_key=api_key
    )
    
    # Prompt estrito para garantir que o agente responda apenas com base na documentação
    system_prompt = (
        "Você é um assistente virtual oficial da Lumora Semijoias. "
        "Responda à pergunta do usuário utilizando exclusivamente o contexto recuperado abaixo. "
        "Se a informação não estiver presente no contexto, oriente educadamente o cliente a entrar em contato com o atendimento oficial. "
        "Nunca invente informações, prazos ou regras.\n\n"
        "Contexto:\n{context}"
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
    
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    return rag_chain