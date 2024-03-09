import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"

@Entity({ name: "users", schema: "nextjs" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string
}

@Entity({ name: "customers", schema: "nextjs" })
export class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    image_url: string
}

@Entity({ name: "invoices", schema: "nextjs" })
export class Invoice {
    @PrimaryGeneratedColumn("uuid")
    id: string

    // @ManyToOne(() => Customer, customer => customer.id)
    // @OneToMany(() => Customer, customer => customer.id)
    // @OneToOne(() => Customer)
    // @JoinColumn()
    // customer: Customer
    @Column("uuid")
    customer_id: string
    
    @Column()
    amount: number

    @Column()
    date: string
    
    @Column()
    status: string
}

@Entity({ name: "revenue", schema: "nextjs" })
export class Revenue {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    month: string

    @Column()
    revenue: number
}