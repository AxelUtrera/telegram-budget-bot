import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DecimalTransformer } from "../transformers/decimal.transformer";
import { TransactionTypes } from "./enums/transaction-types.enum";
import { UserEntity } from "./user.entity";

@Entity({ name: "bills" })
export class BillEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "PK_bills" })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bills )
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "phone",
    foreignKeyConstraintName: "FK_users_bills",
  })
  user: UserEntity;

  @Column({ type: "numeric", nullable: true, transformer: new DecimalTransformer() })
  amount: number;

  @Column({ type:"text", nullable: true })
  description: string;

  @Column({ name: "payment_method", type: "text", nullable: true })
  paymentMethod: string;

  @Column({ name: "transaction_type", type: "text", nullable: true, enum: TransactionTypes })
  transactionType: string;

  @Column({ name: "created_at", type: "timestamptz", nullable: true, default: new Date() })
  createdAt: Date
}
