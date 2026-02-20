import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create an issue
  const issue = await prisma.issue.create({
    data: {
      year: 2026,
      volume: 1,
      issue: 1,
      published: new Date('2026-02-20'),
      description: 'Inaugural issue of MJIMR'
    }
  })
  console.log('Issue created:', issue)

  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: 'Dr. John Smith',
      email: 'john.smith@example.com',
      affiliation: 'Harvard Medical School, Boston, USA',
      orcid: '0000-0001-2345-6789'
    }
  })
  console.log('Author 1 created:', author1)

  const author2 = await prisma.author.create({
    data: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      affiliation: 'Stanford University School of Medicine, California, USA',
      orcid: '0000-0002-3456-7890'
    }
  })
  console.log('Author 2 created:', author2)

  // Create article
  const article = await prisma.article.create({
    data: {
      title: 'Novel Approaches in Cancer Immunotherapy: A Comprehensive Review',
      abstract: 'Cancer immunotherapy has revolutionized the treatment landscape for various malignancies. This comprehensive review examines recent advances in immune checkpoint inhibitors, CAR-T cell therapy, and cancer vaccines. We discuss the mechanisms of action, clinical efficacy, and emerging challenges in the field. Our analysis includes data from over 50 clinical trials and highlights promising future directions for personalized cancer treatment.',
      content: `Introduction

Cancer immunotherapy represents one of the most significant advances in oncology in recent decades. By harnessing the power of the immune system to recognize and destroy cancer cells, these therapies have transformed treatment outcomes for patients with previously untreatable cancers.

Methods

We conducted a systematic review of literature published between 2020 and 2026, focusing on three main categories of immunotherapy: immune checkpoint inhibitors, CAR-T cell therapy, and cancer vaccines.

Results

Our analysis revealed significant improvements in overall survival rates across multiple cancer types. Immune checkpoint inhibitors showed particular promise in melanoma and non-small cell lung cancer, with 5-year survival rates improving by 30-40%.

Discussion

While immunotherapy has shown remarkable success, challenges remain including immune-related adverse events and primary resistance mechanisms. Future research should focus on combination strategies and biomarker development.

Conclusion

Cancer immunotherapy continues to evolve rapidly, offering new hope for patients with advanced malignancies. Continued research and clinical trials are essential to optimize treatment strategies and expand the benefits to more patients.`,
      keywords: 'cancer, immunotherapy, checkpoint inhibitors, CAR-T cells, personalized medicine',
      pages: '1-15',
      doi: '10.1234/mjimr.2026.01.001',
      publishedAt: new Date('2026-02-20'),
      issueId: issue.id,
      authors: {
        create: [
          {
            authorId: author1.id,
            order: 1
          },
          {
            authorId: author2.id,
            order: 2
          }
        ]
      }
    }
  })
  console.log('Article created:', article)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
