import smtplib
import os
from dotenv import load_dotenv


load_dotenv()

email_address=os.getenv('email')
email_pass=os.getenv('password')

print(email_address)
print(email_pass)

with smtplib.SMTP('smtp.gmail.com',587) as smtp:
    smtp.ehlo()
    smtp.starttls()
    smtp.ehlo()

    smtp.login(email_address,email_pass)

    subject="TEXT EMAIL"
    body="If you see this then it means that the email has worked."

    msg=f"Subject:{subject}\n\n{body}"
# sender,receiver ,message
    smtp.sendmail(email_address,'myvicgit@gmail.com',msg)

