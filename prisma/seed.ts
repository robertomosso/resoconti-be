import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // ProgrammingLanguages
    await prisma.office.createMany({
        data: [
            { name: 'Torino' },
            { name: 'Teramo' },
            { name: 'Pescara' },
        ],
        skipDuplicates: true,
    });

    // ProgrammingLanguages
    await prisma.programmingLanguages.createMany({
        data: [
            { name: 'Javascript' },
            { name: 'Typescript' },
            { name: 'Java' },
            { name: 'Python' },
        ],
        skipDuplicates: true,
    });

    // FrontendTechnologies
    await prisma.frontendTechnologies.createMany({
        data: [
            { name: 'Angular' },
            { name: 'Angular material' },
            { name: 'Bootstrap' },
            { name: 'RxJs' },
            { name: 'NgRx' },
            { name: 'Vue' },
            { name: 'Pinia' },
        ],
        skipDuplicates: true,
    });

    // BackendTechnologies
    await prisma.backendTechnologies.createMany({
        data: [
            { name: 'Spring' },
            { name: 'Hibernate' },
            { name: 'Express' },
        ],
        skipDuplicates: true,
    });

    // Database
    await prisma.database.createMany({
        data: [
            { name: 'Postgres' },
            { name: 'MySql' },
            { name: 'MongoDB' },
        ],
        skipDuplicates: true,
    });

    // SoftwareUsed
    await prisma.softwareUsed.createMany({
        data: [
            { name: 'Visual Studio Code' },
            { name: 'Eclipse' },
            { name: 'Postman' },
            { name: 'Git' },
        ],
        skipDuplicates: true,
    });

    // ForeignLanguageLevel
    await prisma.foreignLanguageLevel.createMany({
        data: [
            { name: 'Inglese|Avanzato' },
            { name: 'Inglese|Intermedio' },
            { name: 'Inglese|Base' },
            { name: 'Spagnolo|Avanzato' },
            { name: 'Spagnolo|Intermedio' },
            { name: 'Spagnolo|Base' },
            { name: 'Francese|Avanzato' },
            { name: 'Francese|Intermedio' },
            { name: 'Francese|Base' },
            { name: 'Tedesco|Avanzato' },
            { name: 'Tedesco|Intermedio' },
            { name: 'Tedesco|Base' },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });