import httpx
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Configuração FastAPI-Mail (Opcional, depende das settings)
conf = None
if settings.SMTP_SERVER and settings.SMTP_PORT:
    try:
        conf = ConnectionConfig(
            MAIL_USERNAME=settings.SMTP_USER or "",
            MAIL_PASSWORD=settings.SMTP_PASSWORD or "",
            MAIL_FROM=settings.EMAIL_FROM or "noreply@kitanda.com",
            MAIL_PORT=settings.SMTP_PORT,
            MAIL_SERVER=settings.SMTP_SERVER,
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=bool(settings.SMTP_USER),
            VALIDATE_CERTS=True
        )
    except Exception as e:
        logger.error(f"Erro ao configurar email: {e}")

async def send_email_async(subject: str, email_to: str, body: str):
    """
    Envia um email de forma assíncrona.
    Se não houver configuração SMTP, simula o envio no log.
    """
    if not conf:
        logger.info(f"[SIMULAÇÃO] Email para {email_to} - Assunto: {subject} - Corpo: {body}")
        return True

    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=body,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        logger.info(f"Email enviado com sucesso para {email_to}")
        return True
    except Exception as e:
        logger.error(f"Erro ao enviar email para {email_to}: {e}")
        return False

async def send_sms_async(numero_telefone: str, mensagem: str):
    """
    Envia SMS de forma assíncrona.
    Depende de SMS_PROVIDER_URL definido no .env.
    """
    if not settings.SMS_PROVIDER_URL:
        logger.info(f"[SIMULAÇÃO] SMS para {numero_telefone} - Mensagem: {mensagem}")
        return True

    try:
        async with httpx.AsyncClient() as client:
            # Estrutura genérica de payload
            payload = {
                "to": numero_telefone,
                "message": mensagem,
                "sender": settings.SMS_SENDER_ID
            }
            # Se a API exigir Auth header
            headers = {}
            if settings.SMS_API_KEY:
                headers["Authorization"] = f"Bearer {settings.SMS_API_KEY}"
            
            response = await client.post(
                settings.SMS_PROVIDER_URL,
                json=payload,
                headers=headers,
                timeout=10.0
            )
            response.raise_for_status()
            logger.info(f"SMS enviado para {numero_telefone}")
            return True
    except Exception as e:
        logger.error(f"Erro ao enviar SMS para {numero_telefone}: {e}")
        return False
