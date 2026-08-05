from agent import get_agent_chain

def main():
    print("Inicializando Agente Lumora Semijoias...")
    try:
        chain = get_agent_chain()
    except Exception as e:
        print(f"Erro ao inicializar Agente {e}")
        return
    
    print("\nAgente Lumora iniciado! Digite 'sair' para encerrar.")
    while True:
        pergunta = input("\nFaça uma pergunta: ").strip()
        if pergunta.lower() == "sair":
            print("\nAté mais!")
            break
        if not pergunta:
            continue

        print("\nPensando, aguarde...")
        try:
            resposta = chain.invoke({"input": pergunta}) 
            print(f"\nResposta: {resposta['answer']}\n" + "-"*50)
            '''É um dicionário:
             {
                "input" : pergunta
                "answer" : resposta
             }
            
            '''
        except Exception as e:
            print(f"\nAlgo deu errado: {e}\n")

if __name__ == "__main__":
    main()

        