from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db


router = APIRouter(prefix="/expenses", tags=["expenses"])


@router.get("", response_model=list[schemas.ExpenseRead])
def read_expenses(db: Session = Depends(get_db)) -> list[schemas.ExpenseRead]:
    return crud.get_expenses(db)


@router.post("", response_model=schemas.ExpenseRead, status_code=status.HTTP_201_CREATED)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)) -> schemas.ExpenseRead:
    return crud.create_expense(db, expense)


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(expense_id: int, db: Session = Depends(get_db)) -> None:
    deleted = crud.delete_expense(db, expense_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found",
        )


@router.get("/category/{category}", response_model=list[schemas.ExpenseRead])
def read_expenses_by_category(category: str, db: Session = Depends(get_db)) -> list[schemas.ExpenseRead]:
    return crud.get_expenses_by_category(db, category)


@router.get("/total", response_model=schemas.TotalResponse)
def read_total_expenses(db: Session = Depends(get_db)) -> schemas.TotalResponse:
    return schemas.TotalResponse(total=crud.get_total_expenses(db))
