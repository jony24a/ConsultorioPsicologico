-- CreateTable
CREATE TABLE `Personal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `estrato` VARCHAR(50) NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,
    `disponibilidad` VARCHAR(50) NOT NULL,
    `es_profesional` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Personal_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paciente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `estrato` VARCHAR(50) NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,
    `escolaridad` VARCHAR(50) NOT NULL,
    `disponibilidad` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Paciente_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id_cita` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `hora` TIME NOT NULL,
    `lugar` VARCHAR(50) NOT NULL,
    `pacienteId` INTEGER NOT NULL,
    `personalId` INTEGER NOT NULL,

    PRIMARY KEY (`id_cita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialClinico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo_consulta` VARCHAR(100) NOT NULL,
    `remitido` VARCHAR(100) NOT NULL,
    `diagnostico` VARCHAR(200) NOT NULL,
    `tratamiento` VARCHAR(200) NOT NULL,
    `estado_proceso` VARCHAR(50) NOT NULL,
    `pacienteId` INTEGER NOT NULL,
    `citaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialConversacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroUsuario` VARCHAR(191) NOT NULL,
    `tratDatos` VARCHAR(191) NOT NULL DEFAULT '',
    `historial` JSON NULL,
    `agendamiento` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HistorialConversacion_numeroUsuario_key`(`numeroUsuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_personalId_fkey` FOREIGN KEY (`personalId`) REFERENCES `Personal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialClinico` ADD CONSTRAINT `HistorialClinico_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id_cita`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialClinico` ADD CONSTRAINT `HistorialClinico_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
