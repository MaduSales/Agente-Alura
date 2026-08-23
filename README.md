# Agente de Inteligência Artificial - Projeto Oracle Next Education (Tech Builder IA)

# 🎓 Instituto Lumina - Agente de Inteligência Artificial & RAG

<div align="center">

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![LangChain](https://img.shields.io/badge/LangChain-Orquestração-orange)
![Gemini](https://img.shields.io/badge/Google%20Gemini-LLM-blueviolet)
![Flask](https://img.shields.io/badge/Flask-Web-lightgrey)

*Assistente virtual inteligente desenvolvido para a Secretaria Virtual e Suporte Acadêmico do Instituto Lumina, utilizando técnicas avançadas de RAG (Retrieval-Augmented Generation).*

</div>

---

## 📋 Sobre o Projeto
O **Instituto Lumina** é uma instituição educacional fictícia criada para este desafio. O objetivo deste projeto foi desenvolver um **Agente de IA especializado** capaz de responder a dúvidas de estudantes e interessados com base estrita na base de conhecimento oficial da instituição (Manual Corporativo em PDF), evitando alucinações e garantindo respostas precisas sobre cursos, prazos, formas de pagamento e políticas acadêmicas.

---

## 🛠️ Arquitetura da Solução (RAG)
O fluxo da informação segue o padrão moderno de RAG (Recuperação Aumentada por Recuperação):

```text
[ Documento PDF (Manual Lumina) ] 
       │
       ▼
[ Chunking (RecursiveCharacterTextSplitter) ]
       │
       ▼
[ Geração de Embeddings (GoogleGenerativeAIEmbeddings) ]
       │
       ▼
[ Vector Store Local (FAISS) ] ◄── [ Pergunta do Usuário ]
       │                                     │
       └──────────────┬──────────────────────┘
                      ▼
     [ Busca de Contexto Relevante ]
                      │
                      ▼
     [ LLM (Gemini) + Prompt do Sistema ]
                      │
                      ▼
     [ Resposta Acolhedora e Precisa ao Aluno ]
```

## 🚀 Tecnologias Utilizadas

* **Python** (Linguagem principal)
* **LangChain** (Framework para orquestração de LLMs e pipelines de RAG)
* **Google Generative AI (Gemini)** (Modelo de linguagem e embeddings)
* **FAISS (CPU)** (Banco de dados vetorial leve e em memória)
* **Flask** (Framework web para a interface de chat)
* **PyPDF** (Extração de texto de documentos)

---

## 💬 Exemplos Reais de Interações

* **Pergunta do Aluno:** *"Quais são as formas de pagamento aceitas e posso parcelar?"*
  * **Resposta do Agente:** *"Aceitamos PIX, boleto bancário e cartões de crédito. O parcelamento pode ser feito em até 6x sem juros no cartão de crédito, respeitando o valor mínimo da parcela estipulado no checkout."*

* **Pergunta do Aluno:** *"Me arrependi da compra do curso. Posso pedir reembolso?"*
  * **Resposta do Agente:** *"Sim! Você tem o direito de cancelamento e reembolso integral garantido em até sete (7) dias corridos contados a partir da data de contratação do curso."*
