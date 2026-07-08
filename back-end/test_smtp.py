import os
import sys

# Adiciona a pasta back-end ao path para poder importar a app
sys.path.insert(0, r"c:\Users\Uveli Afonso\Desktop\F.Programção\Kitanda\Kitanda\back-end")

from dotenv import load_dotenv
load_dotenv(r"c:\Users\Uveli Afonso\Desktop\F.Programção\Kitanda\Kitanda\back-end\.env")

from app.core.email import send_email

print("A testar envio de email...")
print("SMTP_SERVER:", os.getenv("SMTP_SERVER"))
print("SMTP_PORT:", os.getenv("SMTP_PORT"))
print("SMTP_USER:", os.getenv("SMTP_USER"))
print("EMAIL_FROM:", os.getenv("EMAIL_FROM"))

try:
    res = send_email("U.A.uveli.afonso@gmail.com", "Teste de SMTP", "<p>Teste</p>")
    print(f"Resultado do send_email: {res}")
except Exception as e:
    print(f"Excecao nao capturada: {e}")
