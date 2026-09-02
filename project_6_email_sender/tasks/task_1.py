import requests
import smtplib
import os
from dotenv import load_dotenv
from email.message import EmailMessage

load_dotenv()
email=os.getenv('email')
password=os.getenv("password")

msg=EmailMessage()
msg['Subject']="SCHEDULED MAIL"
msg['From']=email
msg['To']='myvicgit@gmail.com'
msg.set_content("We about to get rich brother")


data=requests.get('https://jsonplaceholder.typicode.com/todos/1')

if data.ok==True:
    try:
        with smtplib.SMTP("smtp.gmail.com") as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()

            smtp.login(email,password)
            smtp.send_message(msg)



    except Exception:
        print("Some unknown error occured")


else:
    print(f"Peocessing failed.\nBad Error code: {data.status_code}")