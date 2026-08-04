import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS

# Carrega as variáveis do .env
load_dotenv()

# Variáveis locais com os valores do arquivo .env
document_path = os.getenv("DOCUMENT_PATH", "docs/Manual_Lumora_Semijoias_Ficticio.pdf")
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY não encontrada no arquivo .env")

print(f"Lendo documento em: {document_path}")
loader = PyPDFLoader(document_path)
docs = loader.load()
print(f"{len(docs)} página(s) carregada(s).")

print("Dividindo o texto em pedaços (chunks)...")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(docs)
print(f"Documento dividido em {len(chunks)} chunk(s).")

print("Gerando embeddings e criando o vector store FAISS...")
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=api_key
)

vectorstore = FAISS.from_documents(chunks, embeddings)
vectorstore.save_local("faiss_index")

print("Vector store salvo com sucesso em ./faiss_index/!")