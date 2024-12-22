import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BillEntity } from "./bill.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn({ primaryKeyConstraintName:"PK_users" })
  phone: string;

  @Column({ type:"text", nullable: false })
  name: string;

  @ManyToOne(
    () => BillEntity,
    (bill) => bill.user,
    { createForeignKeyConstraints: false },
  )
  bills: BillEntity[];

  @Column({ type: "timestamptz", nullable: false, default: new Date() })
  created_at: Date;

  @Column({ type: "timestamptz", nullable: true })
  updated_at: Date;
}
