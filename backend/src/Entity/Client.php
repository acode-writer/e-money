<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ClientRepository::class)
 */
class Client
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $fullname;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $nicNumber;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="depositClient")
     */
    private $deposit;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="withdrawalClient")
     */
    private $withdrawal;

    public function __construct()
    {
        $this->deposit = new ArrayCollection();
        $this->withdrawal = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(?string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getNicNumber(): ?string
    {
        return $this->nicNumber;
    }

    public function setNicNumber(string $nicNumber): self
    {
        $this->nicNumber = $nicNumber;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getDeposit(): Collection
    {
        return $this->deposit;
    }

    public function addDeposit(Transaction $deposit): self
    {
        if (!$this->deposit->contains($deposit)) {
            $this->deposit[] = $deposit;
            $deposit->setDepositClient($this);
        }

        return $this;
    }

    public function removeDeposit(Transaction $deposit): self
    {
        if ($this->deposit->removeElement($deposit)) {
            // set the owning side to null (unless already changed)
            if ($deposit->getDepositClient() === $this) {
                $deposit->setDepositClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getWithdrawal(): Collection
    {
        return $this->withdrawal;
    }

    public function addWithdrawal(Transaction $withdrawal): self
    {
        if (!$this->withdrawal->contains($withdrawal)) {
            $this->withdrawal[] = $withdrawal;
            $withdrawal->setWithdrawalClient($this);
        }

        return $this;
    }

    public function removeWithdrawal(Transaction $withdrawal): self
    {
        if ($this->withdrawal->removeElement($withdrawal)) {
            // set the owning side to null (unless already changed)
            if ($withdrawal->getWithdrawalClient() === $this) {
                $withdrawal->setWithdrawalClient(null);
            }
        }

        return $this;
    }
}
