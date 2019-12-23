import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1577050003842 implements MigrationInterface {
    name = 'Init1577050003842';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "thing" ("id" SERIAL NOT NULL, "type" text NOT NULL, "title" character varying(50) NOT NULL, "alias" character varying(50) NOT NULL, "description" character varying(100), "value" jsonb NOT NULL, CONSTRAINT "PK_e7757c5911e20acd09faa22d1ac" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "title" character varying(50), "description" character varying(100), "@type" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "alias" character varying(50) NOT NULL, "thingId" integer NOT NULL, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_688d280549f68d7fe49b1c2d379" FOREIGN KEY ("thingId") REFERENCES "thing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_688d280549f68d7fe49b1c2d379"`, undefined);
        await queryRunner.query(`DROP TABLE "property"`, undefined);
        await queryRunner.query(`DROP TABLE "thing"`, undefined);
    }

}
