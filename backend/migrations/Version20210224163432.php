<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210224163432 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE account (id INT AUTO_INCREMENT NOT NULL, agence_id INT DEFAULT NULL, cashier_id INT DEFAULT NULL, account_number VARCHAR(50) NOT NULL, balance DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, status TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_7D3656A4D725330D (agence_id), INDEX IDX_7D3656A42EDB0489 (cashier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE agence (id INT AUTO_INCREMENT NOT NULL, phone_number VARCHAR(20) NOT NULL, address VARCHAR(255) NOT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, fullname VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(20) NOT NULL, nic_number VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(75) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id INT AUTO_INCREMENT NOT NULL, account_id INT DEFAULT NULL, deposit_id INT DEFAULT NULL, withdrawal_id INT DEFAULT NULL, deposit_client_id INT DEFAULT NULL, withdrawal_client_id INT DEFAULT NULL, amount DOUBLE PRECISION NOT NULL, deposit_at DATETIME NOT NULL, withdrew_at DATETIME DEFAULT NULL, transfert_code VARCHAR(15) NOT NULL, frees DOUBLE PRECISION NOT NULL, deposit_frees DOUBLE PRECISION DEFAULT NULL, withdrawal_fees DOUBLE PRECISION DEFAULT NULL, state_fees DOUBLE PRECISION DEFAULT NULL, sytem_fees DOUBLE PRECISION DEFAULT NULL, INDEX IDX_723705D19B6B5FBA (account_id), INDEX IDX_723705D19815E4B1 (deposit_id), INDEX IDX_723705D1697D393B (withdrawal_id), INDEX IDX_723705D11DCCF776 (deposit_client_id), INDEX IDX_723705D18920075 (withdrawal_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, agence_id INT DEFAULT NULL, role_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(150) DEFAULT NULL, lastname VARCHAR(75) DEFAULT NULL, phone_number VARCHAR(20) NOT NULL, status TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649D725330D (agence_id), INDEX IDX_8D93D649D60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE account ADD CONSTRAINT FK_7D3656A4D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('ALTER TABLE account ADD CONSTRAINT FK_7D3656A42EDB0489 FOREIGN KEY (cashier_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D19B6B5FBA FOREIGN KEY (account_id) REFERENCES account (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D19815E4B1 FOREIGN KEY (deposit_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1697D393B FOREIGN KEY (withdrawal_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D11DCCF776 FOREIGN KEY (deposit_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D18920075 FOREIGN KEY (withdrawal_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D649D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D649D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D19B6B5FBA');
        $this->addSql('ALTER TABLE account DROP FOREIGN KEY FK_7D3656A4D725330D');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D649D725330D');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D11DCCF776');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D18920075');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D649D60322AC');
        $this->addSql('ALTER TABLE account DROP FOREIGN KEY FK_7D3656A42EDB0489');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D19815E4B1');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1697D393B');
        $this->addSql('DROP TABLE account');
        $this->addSql('DROP TABLE agence');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE `user`');
    }
}
