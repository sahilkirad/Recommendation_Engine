import csv
import io
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db import models
from app.api.endpoints.auth import get_db
from app.api.endpoints.api_key import get_current_user # Use this for developer auth
from app.schemas import ProductResponse

router = APIRouter()

@router.get("/catalog", response_model=List[ProductResponse])
def get_catalog(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) # Use the logged-in user
):
    """Retrieves the catalog for the authenticated developer."""
    return db.query(models.Product).filter(models.Product.user_id == current_user.id).all()


@router.post("/catalog/upload", response_model=List[ProductResponse])
def upload_catalog(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) # Use the logged-in user
):
    """
    Uploads a CSV catalog for the authenticated developer, deleting the old
    catalog and syncing the new one. CSV format must be: id,name,category
    """
    if not file.filename or not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")

    # Delete old catalog for this user
    db.query(models.Product).filter(models.Product.user_id == current_user.id).delete()
    
    new_products = []
    try:
        contents = file.file.read().decode('utf-8-sig')
        csv_reader = csv.DictReader(io.StringIO(contents))
        for row in csv_reader:
            row_lower = {k.lower().strip(): v for k, v in row.items() if k}
            
            product = models.Product(
                id=row_lower['id'],
                name=row_lower['name'],
                category=row_lower['category'],
                user_id=current_user.id # Use the logged-in user's ID
            )
            new_products.append(product)
        
        db.add_all(new_products)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing CSV file: {str(e)}")
    finally:
        file.file.close()

    return db.query(models.Product).filter(models.Product.user_id == current_user.id).all()