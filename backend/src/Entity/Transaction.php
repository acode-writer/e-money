<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 */
class Transaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     */
    private $depositAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $withdrewAt;

    /**
     * @ORM\Column(type="string", length=15, unique=true)
     */
    private $transfertCode;

    /**
     * @ORM\Column(type="float")
     */
    private $fees;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $depositFees;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $withdrawalFees;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $stateFees;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $sytemFees;

    /**
     * @ORM\ManyToOne(targetEntity=Account::class, inversedBy="transactions")
     */
    private $account;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="depositTransactions")
     */
    private $deposit;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="withdrawalTransactions")
     */
    private $withdrawal;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="deposit", cascade={"persist"})
     */
    private $depositClient;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="withdrawal", cascade={"persist"})
     */
    private $withdrawalClient;

    /**
     * @ORM\ManyToOne(targetEntity=Account::class, inversedBy="withdrawals")
     */
    private $withdrawalAccount;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDepositAt(): ?\DateTimeInterface
    {
        return $this->depositAt;
    }

    public function setDepositAt(\DateTimeInterface $depositAt): self
    {
        $this->depositAt = $depositAt;

        return $this;
    }

    public function getWithdrewAt(): ?\DateTimeInterface
    {
        return $this->withdrewAt;
    }

    public function setWithdrewAt(?\DateTimeInterface $withdrewAt): self
    {
        $this->withdrewAt = $withdrewAt;

        return $this;
    }

    public function getTransfertCode(): ?string
    {
        return $this->transfertCode;
    }

    public function setTransfertCode(string $transfertCode): self
    {
        $this->transfertCode = $transfertCode;

        return $this;
    }

    public function getFees(): ?float
    {
        return $this->fees;
    }

    public function setFees(float $fees): self
    {
        $this->fees = $fees;

        return $this;
    }

    public function getDepositFees(): ?float
    {
        return $this->depositFees;
    }

    public function setDepositFees(?float $depositFees): self
    {
        $this->depositFees = $depositFees;

        return $this;
    }

    public function getWithdrawalFees(): ?float
    {
        return $this->withdrawalFees;
    }

    public function setWithdrawalFees(?float $withdrawalFees): self
    {
        $this->withdrawalFees = $withdrawalFees;

        return $this;
    }

    public function getStateFees(): ?float
    {
        return $this->stateFees;
    }

    public function setStateFees(?float $stateFees): self
    {
        $this->stateFees = $stateFees;

        return $this;
    }

    public function getSytemFees(): ?float
    {
        return $this->sytemFees;
    }

    public function setSytemFees(?float $sytemFees): self
    {
        $this->sytemFees = $sytemFees;

        return $this;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }

    public function setAccount(?Account $account): self
    {
        $this->account = $account;

        return $this;
    }

    public function getDeposit(): ?User
    {
        return $this->deposit;
    }

    public function setDeposit(?User $deposit): self
    {
        $this->deposit = $deposit;

        return $this;
    }

    public function getWithdrawal(): ?User
    {
        return $this->withdrawal;
    }

    public function setWithdrawal(?User $withdrawal): self
    {
        $this->withdrawal = $withdrawal;

        return $this;
    }

    public function getDepositClient(): ?Client
    {
        return $this->depositClient;
    }

    public function setDepositClient(?Client $depositClient): self
    {
        $this->depositClient = $depositClient;

        return $this;
    }

    public function getWithdrawalClient(): ?Client
    {
        return $this->withdrawalClient;
    }

    public function setWithdrawalClient(?Client $withdrawalClient): self
    {
        $this->withdrawalClient = $withdrawalClient;

        return $this;
    }

    public function getWithdrawalAccount(): ?Account
    {
        return $this->withdrawalAccount;
    }

    public function setWithdrawalAccount(?Account $withdrawalAccount): self
    {
        $this->withdrawalAccount = $withdrawalAccount;

        return $this;
    }

}
