-- DropForeignKey
ALTER TABLE `historialclinico` DROP FOREIGN KEY `HistorialClinico_citaId_fkey`;

-- AlterTable
ALTER TABLE `historialclinico` MODIFY `citaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `HistorialClinico` ADD CONSTRAINT `HistorialClinico_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id_cita`) ON DELETE SET NULL ON UPDATE CASCADE;
