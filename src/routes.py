from src.agent import get_agent_chain
from flask import render_template, request, jsonify
from src import app

# Inicializa o agente
chain = get_agent_chain()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    # Dados recebidos do navegador
    dados = request.get_json()
    user_message = dados.get("message", "")

    if not user_message:
        return jsonify({"error":"Mensagem vazia"}), 400

    if user_message.lower() == "sair":
        return jsonify({"response":"Até logo! Se precisar, é só chamar :)"})
    
    try:
        response = chain.invoke({"input":user_message}) # Envia pergunta para chain
        answer = response.get("answer", str(response)) if isinstance(response, dict) else str(response) # Trata o texto da resposta em diversos casos
        return jsonify({"response":answer})

        '''Retorna um dicionário:
             {
                "input" : pergunta
                "answer" : resposta
             }
            
            '''

    except Exception as e:
        print(f"Algo deu errado: {e}")
        return jsonify({"error":"Ocorreu um erro interno."}), 500

        