-- CreateTable
CREATE TABLE `Practicante` (
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(10) NOT NULL,
    `estrato` INTEGER NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,
    `periodo` INTEGER NOT NULL,
    `jornada` VARCHAR(10) NOT NULL,
    `ano_matricula` INTEGER NOT NULL,

    PRIMARY KEY (`numero_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesional` (
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(10) NOT NULL,
    `estrato` INTEGER NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`numero_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paciente` (
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(10) NOT NULL,
    `estrato` INTEGER NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,
    `escolaridad` VARCHAR(20) NOT NULL,
    `numero_documento_practicante` INTEGER NULL,
    `numero_documento_profesional` INTEGER NULL,

    PRIMARY KEY (`numero_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id_cita` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `hora` TIME NOT NULL,
    `lugar` VARCHAR(50) NOT NULL,
    `numero_documento_paciente` INTEGER NOT NULL,
    `numero_documento_profesional` INTEGER NULL,
    `numero_documento_practicante` INTEGER NULL,

    PRIMARY KEY (`id_cita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialClinico` (
    `id_historial_clinico` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo_consulta` VARCHAR(100) NOT NULL,
    `remitido` VARCHAR(100) NOT NULL,
    `estado_proceso` VARCHAR(50) NOT NULL,
    `diagnostico` VARCHAR(200) NOT NULL,
    `numero_documento_paciente` INTEGER NOT NULL,

    PRIMARY KEY (`id_historial_clinico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendario` (
    `id_calendario` INTEGER NOT NULL AUTO_INCREMENT,
    `disponibilidad_practicante` DATETIME(3) NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `lugar_cita` VARCHAR(50) NOT NULL,
    `numero_documento_paciente` INTEGER NOT NULL,

    PRIMARY KEY (`id_calendario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_numero_documento_practicante_fkey` FOREIGN KEY (`numero_documento_practicante`) REFERENCES `Practicante`(`numero_documento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_numero_documento_profesional_fkey` FOREIGN KEY (`numero_documento_profesional`) REFERENCES `Profesional`(`numero_documento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_numero_documento_paciente_fkey` FOREIGN KEY (`numero_documento_paciente`) REFERENCES `Paciente`(`numero_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_numero_documento_profesional_fkey` FOREIGN KEY (`numero_documento_profesional`) REFERENCES `Profesional`(`numero_documento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_numero_documento_practicante_fkey` FOREIGN KEY (`numero_documento_practicante`) REFERENCES `Practicante`(`numero_documento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialClinico` ADD CONSTRAINT `HistorialClinico_numero_documento_paciente_fkey` FOREIGN KEY (`numero_documento_paciente`) REFERENCES `Paciente`(`numero_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendario` ADD CONSTRAINT `Calendario_numero_documento_paciente_fkey` FOREIGN KEY (`numero_documento_paciente`) REFERENCES `Paciente`(`numero_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
