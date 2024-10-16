export class Transaction {
    id: number;
    transaction_type_id: number;
    walletId: number;
    amount: number;
    date: string;
    note: string;
    category_id: number;
    constructor(
        id = 0,
        transaction_type_id = 0,
        walletId = 0,
        amount = 0,
        date = "",
        note = "",
        category_id = 0
    ) {
        this.id = id;
        this.transaction_type_id = transaction_type_id;
        this.walletId = walletId;
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.category_id = category_id
    }
}
