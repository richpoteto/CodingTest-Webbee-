import {
  MigrationInterface, QueryRunner, Table,
  TableForeignKey,
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
   public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'premiumId',
            type: 'integer'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    //Room table
    await queryRunner.createTable(
      new Table({
        name: 'Room',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Seat table
    await queryRunner.createTable(
      new Table({
        name: 'Seat',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'roomId',
            type: 'integer'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );



    // Film table
    await queryRunner.createTable(
      new Table({
        name: 'Film',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Premium table
    await queryRunner.createTable(
      new Table({
        name: 'Premium',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'percentage',
            type: 'float'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Book table
    await queryRunner.createTable(
      new Table({
        name: 'Book',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'integer'
          },
          {
            name: 'roomId',
            type: 'integer'
          },
          {
            name: 'seatId',
            type: 'integer'
          },
          {
            name: 'filmId',
            type: 'integer'
          },
          {
            name: 'premiumId',
            type: 'integer'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // plan table
    await queryRunner.createTable(
      new Table({
        name: 'Plan',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'roomId',
            type: 'integer'
          },
          {
            name: 'filmId',
            type: 'integer'
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Seat',
      new TableForeignKey({
        columnNames: ['roomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Room',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'User',
      new TableForeignKey({
        columnNames: ['premiumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Premium',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Book',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'Book',
      new TableForeignKey({
        columnNames: ['roomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Room',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'Book',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Seat',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'Book',
      new TableForeignKey({
        columnNames: ['filmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Film',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'Book',
      new TableForeignKey({
        columnNames: ['premiumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Premium',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'Plan',
      new TableForeignKey({
        columnNames: ['roomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Room',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'Plan',
      new TableForeignKey({
        columnNames: ['filmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Film',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
