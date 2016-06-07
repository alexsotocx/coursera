#python3
n = int(input())
phone_book = {}
for i in range(n):
  inp = input().split()
  if len(inp) == 3:
    add, number, name = inp
    number = int(number)
    phone_book[number] = name
  else:
    operation, number = inp
    number = int(number)
    if operation == "find":
      if number in phone_book:
        print(phone_book[number])
      else:
        print("not found")
    else:
      if number in phone_book:
        del phone_book[number]