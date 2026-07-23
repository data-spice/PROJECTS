import re
from datetime import datetime
import json


def enter_expense():
    description=input("Describe the expense (ie. Lunch, Swimming e.t.c): ")
    print()
    category=input("Enter the category of the expense (ie Food, Leisure): ")
    print()
    amount=(input(f"Enter the amount to be spent on {description} (ie 1200.56 , 100 etc): "))
    print()
    date=input("Enter the date that this expense occured (ie. dd/mm/yyyy 16/11/2026): ")
    print()

    return (description,category,amount,date)

def validate_details(description,category,amount,date):
    date_pattern=r"^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$"
    if not re.fullmatch(date_pattern,date):
        print()
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        print("  The date must be in the format of DD/MM/YYYY   ")
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        print()
        return False
    else:
        try:
            datetime.strptime(date,"%d/%m/%Y")
            print("Valid date")
        except ValueError:
            print("Invalid date")
            return False
            
        
    if description and category:
        pass
    else:
        print()
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        print("   Check if description or category is missing   ")
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        print()
        return False

    if re.fullmatch(r"^\d+(\.\d+)?$",amount):
        pass
    else:
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        print("    Invalid amount details re enter details      ")
        print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        return False
    
    return True

def loader_json(description,category,amount,date):
    amount=float(amount)
    try:
        with open("expenses.json","r") as file:
            current_data=json.load(file)
    except (FileNotFoundError,json.JSONDecodeError):
        current_data=[]
    new_data={
        "description":description,
        "category":category,
        "amount":amount,
        "date":date
    }

    current_data.append(new_data)

    with open("expenses.json",'w') as file:
        json.dump(current_data,file,indent=4)

    return True


def display_expenses():

    try:
        with open("expenses.json","r") as file:
            data=json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        print("-----------------------------------------")
        print("    NO EXPENSES HAVE BEEN RECORDED YET   ")
        print("-----------------------------------------")
        return 1
        
    print()
    print()
    print("="*30)
    print("     YOUR EXPENSES     ")
    print("="*30)

    
    for i,exp in enumerate(data,start=1):

        print(f"Expense_no  :{i}")
        print(f"Description : {exp['description']}")
        print(f"Category    : {exp['category']}")
        print(f"Amount      : {exp['amount']:.2f}")
        print(f"Date        : {exp['date']}")
        print("<"*15,">"*14)
        print()

def continue_menu():
    choice = input("Add another expense? (y/n): ").lower()

    if choice == "y":
        return True

    check = input("View all expenses? (y/n): ").lower()

    if check == "y":
        display_expenses()

    return False


def run():
    while True:
        print("\n" + "=" * 50)
        print("            WELCOME TO THE EXPENSE MANAGER")
        print("=" * 50)
        print("1. Add Expense")
        print("2. View Expenses")
        print("3. Exit")
        print("=" * 50)

        choice = input("Enter your choice: ")

        if choice == "1":
            running = True

            while running:
                description, category, amount, date = enter_expense()

                if validate_details(description, category, amount, date):
                    loader_json(description, category, amount, date)

                    print("==================================")
                    print("   EXPENSE LOADED SUCCESSFULLY    ")
                    print("==================================")

                    if not continue_menu():
                        running = False

                else:
                    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                    print("     AN ERROR OCCURRED. PLEASE TRY AGAIN BELOW   ")
                    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                    print()

        elif choice == "2":
            display_expenses()

        elif choice == "3":
            print("\nThank you for using Expense Manager.")
            break

        else:
            print("Invalid option. Please choose 1, 2 or 3.")

if __name__ == "__main__":
    run()