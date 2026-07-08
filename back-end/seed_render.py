import asyncio
import sys
from pathlib import Path
import os
from sqlalchemy.orm import Session
from sqlalchemy import text

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal, engine
from app.models.models import (
    Base, Utilizador, PerfilVendedor, Categoria, Produto, Servico,
    TipoUtilizadorEnum, TipoVendedorEnum, TipoLojaEnum, GeneroEnum, Endereco
)
from app.core.security import hash_password as get_password_hash

def delete_existing_seed_data(db: Session):
    print("A limpar dados antigos...")
    # Delete test users by email to avoid breaking the schema with drop_all
    emails = ["comprador@teste.com", "vendedor@teste.com", "empresa@teste.com", "admin@kitanda.com"]
    users = db.query(Utilizador).filter(Utilizador.email.in_(emails)).all()
    for u in users:
        db.delete(u)
    db.commit()

def create_categorias(db: Session):
    print("A garantir que existem categorias...")
    cats = [
        Categoria(nome="Tecnologia", tipo="produto", ordem=1),
        Categoria(nome="Moda", tipo="produto", ordem=2),
        Categoria(nome="Casa & Jardim", tipo="produto", ordem=3),
        Categoria(nome="Tecnologia", tipo="servico", ordem=1),
        Categoria(nome="Reparações", tipo="servico", ordem=2),
        Categoria(nome="Consultoria", tipo="servico", ordem=3),
    ]
    for c in cats:
        exists = db.query(Categoria).filter_by(nome=c.nome, tipo=c.tipo).first()
        if not exists:
            db.add(c)
    db.commit()

def create_users_and_products(db: Session):
    print("A criar utilizadores e produtos...")
    senha_hash = get_password_hash("password123")

    # 1. Comprador
    comprador = Utilizador(
        nome_completo="João Comprador",
        nome_utilizador="joaocompra",
        email="comprador@teste.com",
        numero_telefone="+244910000001",
        senha_hash=senha_hash,
        tipo_utilizador=TipoUtilizadorEnum.comprador,
        email_verificado=True
    )
    
    # 2. Vendedor Individual
    vendedor_ind = Utilizador(
        nome_completo="Maria Vendedora",
        nome_utilizador="mariavende",
        email="vendedor@teste.com",
        numero_telefone="+244920000002",
        senha_hash=senha_hash,
        tipo_utilizador=TipoUtilizadorEnum.vendedor,
        email_verificado=True
    )

    # 3. Empresa
    empresa = Utilizador(
        nome_completo="Admin Tech Lda",
        nome_utilizador="techlda",
        email="empresa@teste.com",
        numero_telefone="+244930000003",
        senha_hash=senha_hash,
        tipo_utilizador=TipoUtilizadorEnum.vendedor,
        email_verificado=True
    )

    # 4. Administrador
    admin = Utilizador(
        nome_completo="Administrador Kitanda",
        nome_utilizador="admin_geral",
        email="admin@kitanda.com",
        numero_telefone="+244940000004",
        senha_hash=senha_hash,
        tipo_utilizador=TipoUtilizadorEnum.admin,
        email_verificado=True
    )

    db.add_all([comprador, vendedor_ind, empresa, admin])
    db.commit()

    # Adicionar Endereços com coordenadas (Latitude / Longitude) para o mapa
    db.add(Endereco(utilizador_id=comprador.id, provincia="Luanda", municipio="Talatona", bairro="Morro Bento", latitude=-8.9248, longitude=13.1818))
    db.add(Endereco(utilizador_id=vendedor_ind.id, provincia="Luanda", municipio="Belas", bairro="Kilamba", latitude=-8.9882, longitude=13.2657))
    db.add(Endereco(utilizador_id=empresa.id, provincia="Benguela", municipio="Lobito", bairro="Restinga", latitude=-12.3464, longitude=13.5383))
    db.commit()

    # Adicionar Perfis de Vendedor
    perfil_ind = PerfilVendedor(
        utilizador_id=vendedor_ind.id,
        nome_loja="Loja da Maria",
        descricao_loja="Moda e acessórios feitos à mão.",
        tipo_vendedor=TipoVendedorEnum.individual,
        tipo_loja=TipoLojaEnum.produtos,
        verificado=True
    )

    perfil_emp = PerfilVendedor(
        utilizador_id=empresa.id,
        nome_loja="Tech Angola Lda",
        descricao_loja="Tudo em informática e reparação.",
        tipo_vendedor=TipoVendedorEnum.empresa,
        tipo_loja=TipoLojaEnum.ambos,
        verificado=True
    )

    db.add_all([perfil_ind, perfil_emp])
    db.commit()

    # Criar Produtos e Servicos
    cat_tec = db.query(Categoria).filter_by(nome="Tecnologia", tipo="produto").first()
    cat_moda = db.query(Categoria).filter_by(nome="Moda", tipo="produto").first()
    cat_rep = db.query(Categoria).filter_by(nome="Reparações", tipo="servico").first()

    produtos = [
        Produto(vendedor_id=perfil_ind.id, categoria_id=cat_moda.id, nome="Vestido Samakaka", descricao="Vestido artesanal", preco=15000, stock=10),
        Produto(vendedor_id=perfil_ind.id, categoria_id=cat_moda.id, nome="Bolsa de Couro", descricao="Bolsa de couro natural", preco=25000, stock=5),
        Produto(vendedor_id=perfil_emp.id, categoria_id=cat_tec.id, nome="Portátil Asus i7", descricao="16GB RAM, 512GB SSD", preco=650000, stock=3),
        Produto(vendedor_id=perfil_emp.id, categoria_id=cat_tec.id, nome="Rato Sem Fios", descricao="Rato ergonómico", preco=12000, stock=50),
    ]

    servicos = [
        Servico(vendedor_id=perfil_emp.id, categoria_id=cat_rep.id, nome="Formatação de PC", descricao="Instalação de Windows e Office", preco_base=15000, duracao_estimada="2h"),
        Servico(vendedor_id=perfil_emp.id, categoria_id=cat_rep.id, nome="Reparação de Telemóveis", descricao="Troca de ecrã e bateria", preco_base=20000, duracao_estimada="1 dia"),
    ]

    db.add_all(produtos + servicos)
    db.commit()

    return comprador, vendedor_ind, empresa

def main():
    db = SessionLocal()
    try:
        delete_existing_seed_data(db)
        create_categorias(db)
        c, v, e = create_users_and_products(db)
        
        print("\n" + "="*50)
        print("DADOS GERADOS COM SUCESSO (Sem destruir a BD)!")
        print("Aceda com a senha: password123")
        print("="*50)
        print(f"1. COMPRADOR: {c.email}")
        print(f"2. VENDEDOR (Individual): {v.email}")
        print(f"3. EMPRESA: {e.email}")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"Erro ao gerar dados: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    main()
