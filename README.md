# 🤖 Agente Lumina

> Agente de Inteligência Artificial desenvolvido durante o **Tech IA Builder do Oracle Next Education (ONE)**, com foco em Inteligência Artificial Generativa, RAG, dados e Cloud.

O **Agente Lumina** é uma aplicação de Inteligência Artificial capaz de responder perguntas utilizando informações específicas de uma base de conhecimento previamente carregada.

**[Veja o site clicando aqui](https://agente-lumina.duckdns.org/)**

O projeto foi desenvolvido como parte da formação **Tech IA Builder do Oracle Next Education (ONE)**, uma etapa avançada do programa voltada para **Inteligência Artificial, Automação, Dados e Cloud**, e também contempla o desafio proposto pela **Alura**.

A solução utiliza uma arquitetura baseada em **RAG (Retrieval-Augmented Generation)**, permitindo que o agente consulte uma base de conhecimento antes de gerar suas respostas.

Em vez de depender somente do conhecimento geral do modelo de IA, o agente realiza uma busca por informações relevantes e utiliza os documentos encontrados como contexto para o **Google Gemini** gerar a resposta.

---

## 🎯 Sobre o projeto

O Agente Lumina foi desenvolvido com o objetivo de colocar em prática conceitos de **Inteligência Artificial Generativa**, integração com modelos de linguagem, busca vetorial e arquitetura RAG.

A ideia principal é:

**Usuário faz uma pergunta → o sistema busca informações relevantes → essas informações são utilizadas como contexto → o Gemini gera a resposta.**

O projeto também permitiu trabalhar com diferentes etapas do desenvolvimento de uma aplicação real, desde a construção do agente e da interface até sua **containerização com Docker e implantação em Cloud utilizando a Oracle Cloud Infrastructure (OCI)**.

---

## 🧠 Como funciona?

O funcionamento do Agente Lumina pode ser dividido em etapas:

### 1. Preparação da base de conhecimento

Antes de o usuário fazer uma pergunta, os documentos utilizados pelo agente precisam ser processados.

O conteúdo é transformado em **embeddings** (representações numéricas que representam semanticamente os textos). Esses embeddings são armazenados no **FAISS** (como se fosse um banco de dados vetorial), permitindo realizar buscas por similaridade posteriormente.

```text
Documentos
    ↓
Processamento do conteúdo
    ↓
Embeddings
    ↓
FAISS
    ↓
Base de conhecimento pronta
```

---

### 2. Usuário faz uma pergunta

Quando o usuário envia uma pergunta pelo chat, ela é recebida pela aplicação desenvolvida em **Python + Flask**.

```text
Usuário
   ↓
Frontend
   ↓
API Flask
   ↓
LangChain
```

---

### 3. A pergunta é transformada em embedding

O **LangChain** atua como uma camada de integração entre os componentes utilizados no projeto.

A pergunta do usuário também é transformada em um **embedding** para comparar semanticamente a pergunta com os textos existentes na base. O objetivo não é simplesmente procurar palavras iguais, mas encontrar conteúdos que tenham significado semelhante.

---

### 4. FAISS procura os documentos mais relevantes

O embedding da pergunta é enviado para o **FAISS** que compara o embedding da pergunta com os embeddings armazenados anteriormente e identifica os documentos mais semelhantes. No caso do Agente Lumina, ficou configurado para retornar os **3 documentos mais relevantes**.

---

### 5. RAG utiliza os documentos como contexto

O RAG é uma arquitetura que combina duas etapas:

* **Retrieval (recuperação):** encontrar informações relevantes na base de conhecimento.
* **Generation (geração):** utilizar essas informações para gerar a resposta.

No Agente Lumina, o FAISS realiza a recuperação dos documentos relevantes e esses documentos são utilizados como **contexto para o modelo de IA**, ou seja, o modelo de IA irá gerar uma resposta humanizada com base nas informações retornadas.

---

### 6. Gemini gera a resposta

O **Google Gemini 3.6 Flash** é o modelo de linguagem utilizado como motor de geração do agente. Ele recebe a pergunta do usuário juntamente com o contexto recuperado pelo processo de RAG.

A partir dessas informações, o Gemini interpreta o contexto e gera uma resposta adequada à pergunta.

---

### 7. A resposta retorna para o usuário

Depois que o Gemini gera a resposta, o resultado retorna pela aplicação Flask até o frontend.

---

## 🛠️ Tecnologias utilizadas

### 🤖 Inteligência Artificial

| Tecnologia        | Utilização                                                             |
| ----------------- | ---------------------------------------------------------------------- |
| **Google Gemini** | Modelo de linguagem responsável pela geração das respostas             |
| **LangChain**     | Integração e orquestração do fluxo de IA                               |
| **Embeddings**    | Representação vetorial de perguntas e documentos                       |
| **FAISS**         | Armazenamento e busca por similaridade entre vetores                   |
| **RAG**           | Arquitetura que combina recuperação de contexto e geração de respostas |

### 💻 Backend

| Tecnologia   | Utilização                                   |
| ------------ | -------------------------------------------- |
| **Python**   | Linguagem principal do projeto               |
| **Flask**    | Desenvolvimento do backend e API             |
| **Gunicorn** | Servidor utilizado para executar a aplicação |

### 🎨 Frontend

* HTML
* CSS
* JavaScript

O frontend é responsável pela interface do chat e pela comunicação com o backend.

### 🐳 Infraestrutura

| Tecnologia                            | Utilização                               |
| ------------------------------------- | ---------------------------------------- |
| **Docker**                            | Containerização da aplicação             |
| **Oracle Cloud Infrastructure (OCI)** | Hospedagem da aplicação                  |
| **OCI Container Registry (OCIR)**     | Armazenamento das imagens Docker         |
| **OCI Load Balancer**                 | Distribuição do tráfego para a aplicação |

---

## ☁️ Deploy na Oracle Cloud

Além do desenvolvimento do agente, o projeto também envolveu sua implantação em ambiente de nuvem utilizando a **Oracle Cloud Infrastructure (OCI)**.

A aplicação foi containerizada com Docker e posteriormente disponibilizada em uma Compute Instance (máquina virtual) da Oracle Cloud. Para armazenar e distribuir a imagem Docker, foi utilizado o OCI Container Registry (OCIR). A imagem Docker foi construída para a arquitetura **AMD64**, armazenada no **OCI Container Registry** e executada em uma máquina virtual da OCI.

Também foi configurado um Load Balancer, responsável por receber as requisições externas e encaminhá-las para a aplicação em execução na máquina virtual.

---

## 🔐 DNS, domínio e HTTPS

Para disponibilizar o Agente Lumina com acesso externo, também foi configurado um DNS utilizando o DuckDNS, associando um domínio à infraestrutura da aplicação.

Também foi configurado um certificado SSL/TLS, permitindo que a aplicação seja acessada utilizando HTTPS. O certificado é utilizado para estabelecer uma conexão criptografada entre o navegador do usuário e a infraestrutura da aplicação.

Dessa forma, o projeto conta com:

🌐 DuckDNS — gerenciamento do domínio e DNS.
🔒 SSL/TLS — criptografia da comunicação através de HTTPS.
⚖️ OCI Load Balancer — ponto de entrada para as requisições externas.
☁️ OCI Compute Instance — máquina virtual responsável pela execução da aplicação.
🐳 Docker — containerização do agente.

---

## 🌎 Fluxo completo da aplicação

Considerando desde a pergunta do usuário até a infraestrutura de Cloud, o funcionamento completo pode ser representado assim:

                         USUÁRIO
                            │
                            ↓
                  🌐 Domínio DuckDNS
                            │
                            ↓
                   🔒 HTTPS / SSL-TLS
                            │
                            ↓
                  ⚖️ OCI Load Balancer
                            │
                            ↓
                  ☁️ Compute Instance
                            │
                            ↓
                      🐳 Docker
                            │
                            ↓
                      Flask / API
                            │
                            ↓
                        LangChain
                            │
                            ↓
                     Embedding Model
                            │
                            ↓
                          FAISS
                            │
                      3 documentos
                       relevantes
                            │
                            ↓
                           RAG
                            │
                   Pergunta + Contexto
                            │
                            ↓
                     Gemini 3.6 Flash
                            │
                            ↓
                         Resposta
                            │
                            ↓
                         Usuário

## 📚 Base de conhecimento

O Agente Lumina utiliza uma base de conhecimento previamente processada para realizar a busca vetorial e gerar suas respostas.

📄 **[Visualizar a base de conhecimento utilizada](docs/Manual_Instituto_Lumina.pdf)**

## 👩‍💻 Desenvolvido por

**Maria Eduarda de Sales Miranda**

Projeto desenvolvido para fins de estudo, formação e portfólio.
