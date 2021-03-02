<?php

namespace App\Entity;

use App\Repository\AccountRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AccountRepository::class)
 */
class Account
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $accountNumber;

    /**
     * @ORM\Column(type="float")
     */
    private $balance;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;



    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="accounts")
     */
    private $cashier;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="account")
     */
    private $transactions;

    /**
     * @ORM\OneToOne(targetEntity=Agence::class, inversedBy="account", cascade={"persist", "remove"})
     */
    private $agence;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="withdrawalAccount")
     */
    private $withdrawals;

    /**
     * @ORM\OneToOne(targetEntity=Agence::class, mappedBy="withdrawalAccount", cascade={"persist", "remove"})
     */
    private $withdrawalAgence;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->withdrawals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAccountNumber(): ?string
    {
        return $this->accountNumber;
    }

    public function setAccountNumber(string $accountNumber): self
    {
        $this->accountNumber = $accountNumber;

        return $this;
    }

    public function getBalance(): ?float
    {
        return $this->balance;
    }

    public function setBalance(float $balance): self
    {
        $this->balance = $balance;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }
    

    public function getCashier(): ?User
    {
        return $this->cashier;
    }

    public function setCashier(?User $cashier): self
    {
        $this->cashier = $cashier;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setAccount($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getAccount() === $this) {
                $transaction->setAccount(null);
            }
        }

        return $this;
    }

    public function getAgence(): ?Agence
    {
        return $this->agence;
    }

    public function setAgence(?Agence $agence): self
    {
        $this->agence = $agence;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getWithdrawals(): Collection
    {
        return $this->withdrawals;
    }

    public function addWithdrawal(Transaction $withdrawal): self
    {
        if (!$this->withdrawals->contains($withdrawal)) {
            $this->withdrawals[] = $withdrawal;
            $withdrawal->setWithdrawalAccount($this);
        }

        return $this;
    }

    public function removeWithdrawal(Transaction $withdrawal): self
    {
        if ($this->withdrawals->removeElement($withdrawal)) {
            // set the owning side to null (unless already changed)
            if ($withdrawal->getWithdrawalAccount() === $this) {
                $withdrawal->setWithdrawalAccount(null);
            }
        }

        return $this;
    }

    public function getWithdrawalAgence(): ?Agence
    {
        return $this->withdrawalAgence;
    }

    public function setWithdrawalAgence(?Agence $withdrawalAgence): self
    {
        // unset the owning side of the relation if necessary
        if ($withdrawalAgence === null && $this->withdrawalAgence !== null) {
            $this->withdrawalAgence->setWithdrawalAccount(null);
        }

        // set the owning side of the relation if necessary
        if ($withdrawalAgence !== null && $withdrawalAgence->getWithdrawalAccount() !== $this) {
            $withdrawalAgence->setWithdrawalAccount($this);
        }

        $this->withdrawalAgence = $withdrawalAgence;

        return $this;
    }
}
