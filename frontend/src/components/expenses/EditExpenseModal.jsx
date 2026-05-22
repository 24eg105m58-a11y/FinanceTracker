import ExpenseFormModal from "./ExpenseFormModal";

function EditExpenseModal({
  expense,
  totalIncome,
  totalExpenses,
  onClose,
  onUpdated,
}) {

  return (
    <ExpenseFormModal
      expense={expense}
      totalIncome={
        totalIncome
      }
      totalExpenses={
        totalExpenses
      }
      onClose={onClose}
      onSaved={onUpdated}
    />
  );
}

export default EditExpenseModal;