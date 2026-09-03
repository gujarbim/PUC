def soma(v, k) -> bool:

    n = len(v)

    for i in range(n):
        for j in range(n):
            if i != j and v[i] + v[j] == k:
                return True
            
    return False

n = int(input("Entre com um numero inteiro qualquer: "))
v = []


for i in range(5):
v = int(input("Entre com um numero inteiro qualquer: ")) 

print(soma(v, n))