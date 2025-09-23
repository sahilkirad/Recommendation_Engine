# File: packages/api-backend/app/db/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship, declarative_base

# Use declarative_base() from sqlalchemy.orm
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    products = relationship("Product", back_populates="owner", cascade="all, delete-orphan")

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # Relationships
    api_keys = relationship("ApiKey", back_populates="owner")
    business_rules = relationship("BusinessRule", back_populates="owner")

class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship
    owner = relationship("User", back_populates="api_keys")

class BusinessRule(Base):
    __tablename__ = "business_rules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    condition_field = Column(String, nullable=False)
    condition_value = Column(String, nullable=False)
    action_type = Column(String, nullable=False)
    action_value = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relationship
    owner = relationship("User", back_populates="business_rules")

class Product(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="products")