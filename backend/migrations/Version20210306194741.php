<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210306194741 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agence ADD withdrawal_account_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE agence ADD CONSTRAINT FK_64C19AA9F77CB33E FOREIGN KEY (withdrawal_account_id) REFERENCES account (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19AA9F77CB33E ON agence (withdrawal_account_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agence DROP FOREIGN KEY FK_64C19AA9F77CB33E');
        $this->addSql('DROP INDEX UNIQ_64C19AA9F77CB33E ON agence');
        $this->addSql('ALTER TABLE agence DROP withdrawal_account_id');
    }
}
