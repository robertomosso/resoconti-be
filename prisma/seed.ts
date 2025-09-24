import { PrismaClient } from '@prisma/client';
import { ForeignLanguagesEnum, OfficesEnum } from '../src/const';
const prisma = new PrismaClient();

async function main() {
    // ProgrammingLanguages
    await prisma.office.createMany({
        data: [
            { name: OfficesEnum.PESCARA },
            { name: OfficesEnum.TERAMO },
            { name: OfficesEnum.ROMA },
            { name: OfficesEnum.MILANO },
            { name: OfficesEnum.TORINO },
            { name: OfficesEnum.MESSINA },
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
            { name: ForeignLanguagesEnum.INGLESE_AVANZATO },
            { name: ForeignLanguagesEnum.INGLESE_INTERMEDIO },
            { name: ForeignLanguagesEnum.INGLESE_BASE },
            { name: ForeignLanguagesEnum.SPAGNOLO_AVANZATO },
            { name: ForeignLanguagesEnum.SPAGNOLO_INTERMEDIO },
            { name: ForeignLanguagesEnum.SPAGNOLO_BASE },
            { name: ForeignLanguagesEnum.FRANCESE_AVANZATO },
            { name: ForeignLanguagesEnum.FRANCESE_INTERMEDIO },
            { name: ForeignLanguagesEnum.FRANCESE_BASE },
            { name: ForeignLanguagesEnum.TEDESCO_AVANZATO },
            { name: ForeignLanguagesEnum.TEDESCO_INTERMEDIO },
            { name: ForeignLanguagesEnum.TEDESCO_BASE },
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