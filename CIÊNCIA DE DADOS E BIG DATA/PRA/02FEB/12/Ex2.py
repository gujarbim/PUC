# Escreva um programa que solicite ao usuário um número inteiro positivo e imprima todos os triplos pitagóricos (a, b, c) tais que a² + b² = c² e a, b, c ≤ n.

n = int(input("Entre com um número inteiro positivo: "))

for a in range(1, n + 1):
    for b in range(1, n + 1):
        for c in range(1, n + 1):
            if (a <= b <= c) and (a**2 + b**2 == c**2):
                print(a, b, c)

# O código acima solicita ao usuário que insira um número inteiro positivo e, em seguida, utiliza três loops aninhados para iterar sobre os valores de a, b e c. Ele verifica se a, b e c formam um triplo pitagórico (a² + b² = c²) e se a é menor ou igual a b, e b é menor ou igual a c. Se essas condições forem atendidas, o programa imprime os valores de a, b e c.