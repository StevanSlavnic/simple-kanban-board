<?php

namespace App\Repository;

use App\Entity\Card\Card;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Card|null find($id, $lockMode = null, $lockVersion = null)
 * @method Card|null findOneBy(array $criteria, array $orderBy = null)
 * @method Card[]    findAll()
 * @method Card[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Card::class);
    }

    // /**
    //  * @return Card[] Returns an array of Card objects
    //  */
//    public function findByStatus($value)
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.status = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.updatedAt', 'DESC')
//            ->getQuery()
//            ->getResult()
//            ;
//    }

    public function findAllById()
    {
        return $this->createQueryBuilder('c')
            ->orderBy('c.id', 'DESC')
            ->getQuery()
            ->getResult()
            ;
    }


//    public function findOneBySomeField($value): ?Card
//    {
//        return $this->createQueryBuilder('c')
//            ->select('c')
//            ->addSelect("(CASE WHEN c.priority like 'high' THEN 0
//           WHEN c.priority like 'medium' THEN 1
//           WHEN c.priority like 'low' THEN 2
//           ELSE 999 END) AS HIDDEN fixed_order")
//            ->andWhere('c.priority IN (:priority)')
//            ->setParameters(array(
//                'priority' => array('high', 'medium', 'low')))
//            ->orderBy('fixed_order', 'ASC')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

}
