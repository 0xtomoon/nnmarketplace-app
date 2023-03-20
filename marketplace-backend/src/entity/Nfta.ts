import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Nfta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token_id: number;

  @Column({
    nullable: true
  })
  token_uri: string;

  @Column({
    nullable: true
  })
  image: string;

  @Column({
    nullable: true
  })
  owner: string;

  @Column()
  listed: boolean;

  @Column()
  price: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
    created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", select: false })
    updated_at: Date;
}