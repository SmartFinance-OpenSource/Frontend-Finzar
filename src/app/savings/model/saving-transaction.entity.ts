export class SavingTransaction {
    id: number;
    saving_id: number
    amount: number;
    date: string;
    note: string;

    constructor(
        id = 0,
        saving_id = 0,
        amount = 0,
        date = '',
        note = ''

    ) {
        this.id = id;
        this.saving_id = saving_id;
        this.amount = amount;
        this.date = date;
        this.note = note;


    }

}
