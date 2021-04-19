import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  user_id: number;

  @Field()
  @Column()
  user_identification: string;

  @Field()
  @Column()
  user_identification_type: string;

  @Field()
  @Column()
  user_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  email_verified: boolean;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  is_blocked: boolean;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  identities: string;

  @Field()
  @Column()
  created_at: string;
}