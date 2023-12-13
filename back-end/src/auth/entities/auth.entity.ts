import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'token' })
export class Auth {
  @PrimaryColumn({ unique: true })
  fingerprint: string;

  @Column()
  id_user: number;

  @Column({ unique: true })
  refresh_token: string;

  @UpdateDateColumn()
  updated_at: Date;
}
