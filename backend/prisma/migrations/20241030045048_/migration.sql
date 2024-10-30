-- CreateTable
CREATE TABLE `Practicante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `estrato` VARCHAR(50) NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,
    `periodo` VARCHAR(50) NOT NULL,
    `jornada` VARCHAR(10) NOT NULL,
    `ano_matricula` INTEGER NOT NULL,

    UNIQUE INDEX `Practicante_id_key`(`id`),
    UNIQUE INDEX `Practicante_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_documento` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `estrato` VARCHAR(50) NOT NULL,
    `barrio` VARCHAR(50) NOT NULL,
    `localidad` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Profesional_id_key`(`id`),
    UNIQUE INDEX `Profesional_numero_documento_key`(`numero_documento`),
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
    `numero_documento_practicante` INTEGER NULL,
    `numero_documento_profesional` INTEGER NULL,

    UNIQUE INDEX `Paciente_id_key`(`id`),
    UNIQUE INDEX `Paciente_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`id`)
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
