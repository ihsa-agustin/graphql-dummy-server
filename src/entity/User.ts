import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  identity_number: string;

  @Field()
  @Column()
  health_insurance_name: string;

  @Field()
  @Column()
  health_insurance_id: string;

  @Field()
  @Column()
  mobile_phone: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  number: string;

  @Field()
  @Column()
  apartment_suit: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  neighborhood: string;

  @Field()
  @Column()
  province: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  emergency_phone: string;

  @Field()
  @Column()
  password: string;
}
