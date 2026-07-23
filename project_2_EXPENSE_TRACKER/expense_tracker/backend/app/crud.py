from decimal import Decimal

from sqlalchemy import desc, func, select
from sqlalchemy.orm import Session

from app import models, schemas


def get_expenses(db: Session) -> list[models.Expense]:
    statement = select(models.Expense).order_by(desc(models.Expense.expense_date), desc(models.Expense.created_at))
    return list(db.scalars(statement).all())


def get_expenses_by_category(db: Session, category: str) -> list[models.Expense]:
    statement = (
        select(models.Expense)
        .where(func.lower(models.Expense.category) == category.lower())
        .order_by(desc(models.Expense.expense_date), desc(models.Expense.created_at))
    )
    return list(db.scalars(statement).all())


def create_expense(db: Session, expense: schemas.ExpenseCreate) -> models.Expense:
    db_expense = models.Expense(**expense.model_dump())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def delete_expense(db: Session, expense_id: int) -> bool:
    db_expense = db.get(models.Expense, expense_id)
    if db_expense is None:
        return False

    db.delete(db_expense)
    db.commit()
    return True


def get_total_expenses(db: Session) -> Decimal:
    total = db.scalar(select(func.coalesce(func.sum(models.Expense.amount), 0)))
    return Decimal(total).quantize(Decimal("0.01"))
