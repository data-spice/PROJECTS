import smtplib
import os 
from dotenv import load_dotenv

load_dotenv()

email=os.getenv('email')
password=os.getenv('password')

with smtplib.SMTP('localhost',1025) as smtp:
    # smtp.ehlo()
    # smtp.starttls()
    # smtp.ehlo()

    # smtp.login(email,password)

    subject="MY EMAIL"
    body="Testing local emails"
    msg=f"Subject: {subject}\n\n{body}"

    smtp.sendmail(email,'myvicgit@gmail.com',msg)